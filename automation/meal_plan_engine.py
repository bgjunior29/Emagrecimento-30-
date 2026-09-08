"""Motor isolado de automacao de cardapios do Emagrecimento 30+.

Uso:
    python automation/meal_plan_engine.py --input automation/example_profile.json

O script nao acessa banco, nao envia dados externos e conversa apenas por JSON.
Ele pode ser usado depois por um worker, cron ou endpoint separado.
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class Profile:
    name: str
    age: int
    height_cm: int
    weight_kg: float
    goal: str
    activity: str
    preferences: tuple[str, ...]


MEALS: dict[str, list[dict[str, Any]]] = {
    "cafe_da_manha": [
        {"name": "Omelete com abacate", "calories": 390, "ingredients": ["ovos", "abacate", "tomate"]},
        {"name": "Aveia com banana e iogurte", "calories": 420, "ingredients": ["aveia", "banana", "iogurte natural"]},
        {"name": "Pao integral com ovos", "calories": 410, "ingredients": ["pao integral", "ovos", "fruta"]},
    ],
    "almoco": [
        {"name": "Frango grelhado com quinoa e salada", "calories": 610, "ingredients": ["frango", "quinoa", "folhas", "tomate"]},
        {"name": "Salada de grao-de-bico", "calories": 520, "ingredients": ["grao-de-bico", "folhas", "cenoura", "azeite"]},
        {"name": "Bowl de arroz integral, feijao e legumes", "calories": 570, "ingredients": ["arroz integral", "feijao", "abobrinha", "cenoura"]},
    ],
    "lanche": [
        {"name": "Iogurte com frutas", "calories": 300, "ingredients": ["iogurte natural", "banana", "chia"]},
        {"name": "Smoothie verde", "calories": 290, "ingredients": ["banana", "couve", "leite"]},
    ],
    "jantar": [
        {"name": "Peixe ao forno com legumes", "calories": 640, "ingredients": ["peixe", "batata doce", "brocolis"]},
        {"name": "Wrap de frango e salada", "calories": 540, "ingredients": ["frango", "wrap integral", "folhas", "tomate"]},
        {"name": "Sopa de legumes com ovos", "calories": 430, "ingredients": ["abobora", "cenoura", "ovos", "cebola"]},
    ],
}

ACTIVITY_FACTOR = {
    "Sedentario": 1.2,
    "Levemente ativo": 1.35,
    "Moderadamente ativo": 1.55,
    "Muito ativo": 1.725,
}


def parse_profile(payload: dict[str, Any]) -> Profile:
    required = ("name", "age", "height_cm", "weight_kg", "goal", "activity")
    missing = [field for field in required if payload.get(field) in (None, "")]
    if missing:
        raise ValueError(f"Campos obrigatorios ausentes: {', '.join(missing)}")

    age = int(payload["age"])
    height_cm = int(payload["height_cm"])
    weight_kg = float(payload["weight_kg"])
    if not 12 <= age <= 90:
        raise ValueError("age deve estar entre 12 e 90")
    if not 120 <= height_cm <= 220:
        raise ValueError("height_cm deve estar entre 120 e 220")
    if not 35 <= weight_kg <= 220:
        raise ValueError("weight_kg deve estar entre 35 e 220")

    return Profile(
        name=str(payload["name"]).strip(),
        age=age,
        height_cm=height_cm,
        weight_kg=weight_kg,
        goal=str(payload["goal"]),
        activity=str(payload["activity"]),
        preferences=tuple(str(item).lower() for item in payload.get("preferences", [])),
    )


def calculate_target(profile: Profile) -> int:
    """Estimativa simples; nao substitui avaliacao de nutricionista."""
    base = (10 * profile.weight_kg) + (6.25 * profile.height_cm) - (5 * profile.age) - 161
    maintenance = base * ACTIVITY_FACTOR.get(profile.activity, 1.4)
    adjustment = -350 if "emagrecimento" in profile.goal.lower() else 0
    return max(1200, round(maintenance + adjustment))


def choose_meal(options: list[dict[str, Any]], preferences: tuple[str, ...], offset: int) -> dict[str, Any]:
    filtered = [meal for meal in options if any(pref in meal["name"].lower() or pref in " ".join(meal["ingredients"]) for pref in preferences)]
    choices = filtered or options
    return choices[offset % len(choices)]


def generate_plan(profile: Profile) -> dict[str, Any]:
    target = calculate_target(profile)
    days = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"]
    plan = []
    shopping: dict[str, int] = {}

    for day_index, day in enumerate(days):
        meals = {}
        for meal_index, (slot, options) in enumerate(MEALS.items()):
            meal = choose_meal(options, profile.preferences, day_index + meal_index)
            meals[slot] = {"name": meal["name"], "calories": meal["calories"]}
            for ingredient in meal["ingredients"]:
                shopping[ingredient] = shopping.get(ingredient, 0) + 1
        plan.append({"day": day, "meals": meals})

    return {
        "profile": {"name": profile.name, "goal": profile.goal, "activity": profile.activity},
        "estimated_daily_calories": target,
        "disclaimer": "Estimativa informativa. Procure acompanhamento profissional para um plano clinico.",
        "week": plan,
        "shopping_list": [{"name": name.title(), "quantity": quantity, "unit": "porcoes"} for name, quantity in sorted(shopping.items())],
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Gera um cardapio semanal em JSON")
    parser.add_argument("--input", type=Path, help="Arquivo JSON do perfil; se omitido, le stdin")
    args = parser.parse_args()

    try:
        raw = args.input.read_text(encoding="utf-8") if args.input else sys.stdin.read()
        profile = parse_profile(json.loads(raw))
        print(json.dumps(generate_plan(profile), ensure_ascii=False, indent=2))
        return 0
    except (OSError, json.JSONDecodeError, ValueError) as error:
        print(json.dumps({"error": str(error)}, ensure_ascii=False), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
