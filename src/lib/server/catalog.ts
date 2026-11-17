import "server-only";
import { courses, type Category } from "@/data/courses";
import { listAllProducts } from "./eduzz";

export type CatalogItem = {
  id: string;
  name: string;
  price: number; // em reais
  category: Category;
  subtitle?: string;
  image?: string; // capa em public/courses (baixada do AlpaClass)
};

const ORDER: Record<Category, number> = { adultos: 0, adolescentes: 1, minicursos: 2, infantil: 3 };

export async function getCatalog(): Promise<CatalogItem[]> {
  const products = new Map((await listAllProducts()).map((p) => [String(p.id), p]));
  const out: CatalogItem[] = [];

  for (const c of courses) {
    if (!c.enabled) continue;
    const p = products.get(c.id);
    if (!p) {
      console.warn(`[catalog] ${c.id} está na allowlist mas não veio da Eduzz`);
      continue;
    }
    if (p.status !== "active") {
      console.warn(`[catalog] ${c.id} descartado: status "${p.status}"`);
      continue;
    }
    const price = p.payment?.price?.value;
    if (typeof price !== "number" || !(price > 0) || p.payment?.price?.currency !== "BRL") {
      console.warn(`[catalog] ${c.id} descartado: preço inválido`, p.payment?.price);
      continue;
    }
    out.push({ id: c.id, name: p.name.trim(), price, category: c.category, subtitle: c.subtitle, image: c.alpaclass && `/courses/${c.id}.jpg` });
  }

  return out.sort((a, b) => ORDER[a.category] - ORDER[b.category] || a.name.localeCompare(b.name, "pt-BR"));
}
