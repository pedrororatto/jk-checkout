"use client";

import { useEffect, useState } from "react";
import type { CatalogItem } from "@/lib/server/catalog";
import { formatBRL } from "@/lib/format";

type Props = { items: CatalogItem[]; total: number; onRemove: (id: string) => void };

export default function CartBar({ items, total, onRemove }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Ao voltar do checkout pelo botão "voltar", a página pode vir do bfcache ainda em loading.
  useEffect(() => {
    const reset = () => setLoading(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  if (items.length === 0) return null;

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productIds: items.map((i) => i.id) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.paymentUrl) throw new Error(data.error || "Não foi possível gerar seu checkout. Tente novamente.");
      window.location.href = data.paymentUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado. Tente novamente.");
      setLoading(false);
    }
  }

  const count = `${items.length} ${items.length === 1 ? "curso" : "cursos"}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 md:bottom-6 md:left-1/2 md:w-full md:max-w-xl md:-translate-x-1/2 md:px-4">
      {error && (
        <p role="alert" className="mx-3 mb-2 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-800 shadow md:mx-0">
          {error}
        </p>
      )}
      <div className="bg-navy-dark text-cream shadow-[0_-4px_20px_rgb(0_0_0/0.2)] md:rounded-2xl md:shadow-2xl">
        {expanded && (
          <ul className="hidden max-h-56 overflow-y-auto border-b border-cream/15 px-5 py-3 md:block">
            {items.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 py-1.5 text-sm">
                <span className="truncate">{i.name}</span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="text-cream/80">{formatBRL(i.price)}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(i.id)}
                    className="rounded text-xs text-gold underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    remover
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center gap-3 px-4 pt-3 pb-1 sm:px-5">
          <div className="min-w-0 flex-1">
            <p className="font-semibold">
              {count} · {formatBRL(total)}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="hidden rounded text-xs text-cream/75 hover:text-cream focus-visible:outline-2 focus-visible:outline-gold md:inline"
            >
              {expanded ? "Ocultar cursos ▾" : "Ver cursos ▴"}
            </button>
          </div>
          <button
            type="button"
            onClick={checkout}
            disabled={loading}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-gold px-5 py-3 font-bold text-navy-dark transition duration-150 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream disabled:cursor-wait disabled:opacity-80"
          >
            {loading && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-navy-dark border-t-transparent" />}
            {loading ? "Gerando seu checkout…" : "Finalizar compra"}
          </button>
        </div>
        <p className="px-4 pb-3 text-right text-[0.7rem] text-cream/70 sm:px-5">Pagamento seguro processado pela Eduzz.</p>
      </div>
    </div>
  );
}
