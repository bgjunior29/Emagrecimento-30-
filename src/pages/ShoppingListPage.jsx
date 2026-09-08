import { useMemo, useState } from "react";
import { AppShell } from "../components/Layout";
import { defaultShoppingList, productsCatalog } from "../data/mockData";

function getStoredList() {
  if (typeof window === "undefined") return defaultShoppingList;

  try {
    const stored = JSON.parse(
      localStorage.getItem("em30plus_shopping_list") || "null",
    );
    return stored || defaultShoppingList;
  } catch {
    return defaultShoppingList;
  }
}

export default function ShoppingListPage() {
  const [list, setList] = useState(getStoredList);
  const [customItem, setCustomItem] = useState("");
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const toggleItem = (id) => {
    const next = list.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );

    setList(next);
    localStorage.setItem("em30plus_shopping_list", JSON.stringify(next));
  };

  const addCustomItem = () => {
    const trimmed = customItem.trim();
    if (!trimmed) return;

    const nextItem = {
      id: `custom-${Date.now()}`,
      name: trimmed,
      qty: "1 item",
      category: "Personalizado",
      checked: false,
    };

    const next = [nextItem, ...list];
    setList(next);
    localStorage.setItem("em30plus_shopping_list", JSON.stringify(next));
    setCustomItem("");
  };

  const generateList = () => {
    const next = [...defaultShoppingList].map((item) => ({
      ...item,
      checked: item.checked || false,
    }));

    setList(next);
    localStorage.setItem("em30plus_shopping_list", JSON.stringify(next));
    setMessage("Lista atualizada com base no plano alimentar.");
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart((current) =>
        current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      return;
    }

    setCart((current) => [...current, { ...product, quantity: 1 }]);
  };

  const finalizePurchase = () => {
    if (cart.length === 0) {
      setMessage("Escolha pelo menos um produto para finalizar a compra.");
      return;
    }

    setMessage(
      `Pedido confirmado. Total: R$ ${total.toFixed(2).replace(".", ",")}`,
    );
    setCart([]);
  };

  return (
    <AppShell pageTitle="Lista de compras">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                Compras
              </p>
              <h3 className="mt-1 text-xl font-black text-slate-900">
                Itens da semana
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Copiar lista
              </button>
              <button
                type="button"
                onClick={generateList}
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Gerar lista
              </button>
            </div>
          </div>

          <div className="mb-4 flex gap-2">
            <input
              value={customItem}
              onChange={(event) => setCustomItem(event.target.value)}
              placeholder="Adicionar item extra"
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={addCustomItem}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Adicionar
            </button>
          </div>

          <div className="space-y-3">
            {list.map((item) => (
              <div
                key={item.id}
                className="reveal-up lift-on-hover flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                  />
                  <div>
                    <div
                      className={`font-medium ${item.checked ? "text-slate-400 line-through" : "text-slate-900"}`}
                    >
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.category}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-700">
                  {item.qty}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900">
              Produtos recomendados
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {productsCatalog.map((product) => (
                <div
                  key={product.id}
                  className="reveal-up lift-on-hover rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                      {product.badge}
                    </span>
                    <span className="text-xs text-slate-500">
                      {product.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {product.name}
                  </h4>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-black text-slate-900">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900">Carrinho</h3>
            <div className="mt-5 space-y-3">
              {cart.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Nenhum item adicionado ainda.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-3"
                  >
                    <div>
                      <div className="font-medium text-slate-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Qtd: {item.quantity}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                <span>Total</span>
                <span className="text-xl font-black text-slate-900">
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <button
                type="button"
                onClick={finalizePurchase}
                className="w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Finalizar compra
              </button>
              {message ? (
                <p className="mt-3 text-sm text-emerald-700">{message}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
