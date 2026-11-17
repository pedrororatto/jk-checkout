// Baixa capas dos cursos, banners e logo da vitrine pública do AlpaClass para public/.
// Uso: npm run scrape:covers
import { mkdir, writeFile } from "node:fs/promises";
import { courses } from "../src/data/courses.ts";

const API = "https://learner-api.alpaclass.com/learner";
const headers = { Origin: "https://johnknoxonline.alpaclass.com", Referer: "https://johnknoxonline.alpaclass.com/" };
const root = new URL("../", import.meta.url);

async function json<T>(path: string): Promise<T> {
  const r = await fetch(API + path, { headers });
  if (!r.ok) throw new Error(`${r.status} ${path}`);
  return r.json() as Promise<T>;
}

async function save(url: string, file: string) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  await writeFile(new URL(file, root), Buffer.from(await r.arrayBuffer()));
}

type Course = { slug: string; name: string; images: { horizontal?: string } };
type Page = { items: Course[]; hasNextPage: boolean };

const team = await json<{ bannerUrl: string; bannerMobileUrl: string; favIconUrl: string }>("/teams/me");
const { categories } = await json<{ categories: { id: number }[] }>("/categories");

const bySlug = new Map<string, Course>();
for (const { id } of categories) {
  for (let page = 1; ; page++) {
    const p = await json<Page>(`/categories/${id}/courses?showUnavailableCourses=true&page=${page}&size=50`);
    p.items.forEach((c) => bySlug.set(c.slug, c));
    if (!p.hasNextPage) break;
  }
}

await mkdir(new URL("public/courses/", root), { recursive: true });
await save(team.bannerUrl, "public/banner.png");
await save(team.bannerMobileUrl, "public/banner-mobile.png");
await save(team.favIconUrl, "public/logo-john-knox.png");
await save(team.favIconUrl, "src/app/icon.png");

let ok = 0;
for (const c of courses) {
  if (!c.alpaclass) continue;
  const img = bySlug.get(c.alpaclass)?.images.horizontal;
  if (!img) {
    console.warn(`! ${c.id}: slug ${c.alpaclass} sem capa na vitrine`);
    continue;
  }
  await save(img, `public/courses/${c.id}.jpg`);
  ok++;
}
console.log(`${ok} capas + banners/logo salvos (${bySlug.size} cursos na vitrine)`);
