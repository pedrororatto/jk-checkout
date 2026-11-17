import { getCatalog } from "@/lib/server/catalog";
import { createCart, EduzzError, type CartItem } from "@/lib/server/eduzz";

const MAX_ITEMS = 30;

const fail = (status: number, error: string) => Response.json({ error }, { status });

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Requisição inválida.");
  }

  // Só productIds são lidos; qualquer outro campo (ex.: price) é ignorado.
  const raw = (body as { productIds?: unknown } | null)?.productIds;
  if (!Array.isArray(raw) || raw.length < 1 || raw.length > MAX_ITEMS || !raw.every((x) => typeof x === "string")) {
    return fail(400, `Selecione de 1 a ${MAX_ITEMS} cursos.`);
  }
  const ids = [...new Set(raw as string[])];

  const orderId = `jk-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  try {
    const catalog = new Map((await getCatalog()).map((c) => [c.id, c]));
    const items: CartItem[] = [];
    for (const id of ids) {
      const c = catalog.get(id);
      if (!c) return fail(400, "Um ou mais cursos selecionados não estão disponíveis.");
      items.push({ productId: c.id, description: c.name, price: { value: c.price, currency: "BRL" }, quantity: 1 });
    }

    const paymentUrl = await createCart({ items, orderId });
    return Response.json({ paymentUrl });
  } catch (e) {
    console.error(
      `[checkout] falha ao gerar checkout ${orderId}`,
      e instanceof EduzzError ? { status: e.status, body: JSON.stringify(e.body) } : e,
    );
    return fail(502, "Não foi possível gerar seu checkout agora. Tente novamente em instantes.");
  }
}
