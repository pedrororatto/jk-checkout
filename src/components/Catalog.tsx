"use client";

import { useState } from "react";
import type { Category } from "@/data/courses";
import type { CatalogItem } from "@/lib/server/catalog";
import { formatBRL, sumBRL } from "@/lib/format";
import CourseCard from "./CourseCard";
import CartBar from "./CartBar";

const SECTIONS: { category: Category; title: string }[] = [
  { category: "adultos", title: "Disciplinas para turmas de adultos" },
  { category: "adolescentes", title: "Disciplinas para turmas de adolescentes" },
  { category: "minicursos", title: "Minicursos" },
  { category: "infantil", title: "Turmas infantis" },
];

const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export default function Catalog({ courses }: { courses: CatalogItem[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const q = normalize(query.trim());
  const visible = q ? courses.filter((c) => normalize(c.name).includes(q)) : courses;

  const chosen = courses.filter((c) => selected.has(c.id));
  const total = sumBRL(chosen.map((c) => c.price));

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-44 sm:px-6">
        <label className="mx-auto block max-w-md">
          <span className="sr-only">Buscar curso</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar curso pelo nome…"
            className="w-full rounded-full border border-ink/30 bg-white px-5 py-3 text-text placeholder:text-text/50 focus:border-ink focus:outline-2 focus:outline-ink/40"
          />
        </label>

        {SECTIONS.map(({ category, title }) => {
          const list = visible.filter((c) => c.category === category);
          if (list.length === 0) return null;
          return (
            <section key={category} className="mt-12">
              <h2 className="mb-6 font-serif text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
              <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((c) => (
                  <CourseCard key={c.id} course={c} selected={selected.has(c.id)} onToggle={() => toggle(c.id)} />
                ))}
              </div>
            </section>
          );
        })}

        {visible.length === 0 && <p className="mt-12 text-center text-text/70">Nenhum curso encontrado para “{query}”.</p>}
      </div>

      <p aria-live="polite" className="sr-only">
        {chosen.length > 0 ? `${chosen.length} cursos selecionados, total ${formatBRL(total)}` : "Nenhum curso selecionado"}
      </p>
      <CartBar items={chosen} total={total} onRemove={toggle} />
    </>
  );
}
