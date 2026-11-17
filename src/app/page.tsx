import Catalog from "@/components/Catalog";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { getCatalog, type CatalogItem } from "@/lib/server/catalog";

// Renderiza por requisição; os dados da Eduzz ficam em cache de 1h (fetch com revalidate).
export const dynamic = "force-dynamic";

export default async function Home() {
  let courses: CatalogItem[] | null = null;
  try {
    courses = await getCatalog();
  } catch (e) {
    console.error("[home] falha ao carregar catálogo", e);
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        {courses ? (
          <Catalog courses={courses} />
        ) : (
          <p className="mx-auto max-w-md px-4 py-16 text-center text-text/80">
            Não foi possível carregar os cursos agora. Atualize a página em instantes.
          </p>
        )}
      </main>
    </>
  );
}
