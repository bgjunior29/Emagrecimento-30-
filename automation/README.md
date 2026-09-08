# Automacao Python

Motor isolado para gerar um plano semanal e uma lista de compras a partir do perfil nutricional.

## Executar

```powershell
python automation/meal_plan_engine.py --input automation/example_profile.json
```

Ou via stdin:

```powershell
Get-Content automation/example_profile.json | python automation/meal_plan_engine.py
```

A saida e JSON e pode ser consumida futuramente por um worker, cron, endpoint separado ou fila. O modulo nao acessa o banco e nao envia dados para fora.

A estimativa de calorias e informativa e nao substitui acompanhamento nutricional.
