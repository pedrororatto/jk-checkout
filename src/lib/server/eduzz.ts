import "server-only";

export class EduzzError extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(`Eduzz HTTP ${status}`);
  }
}

// Isolado para trocar por OAuth2 na fase 2.
export function getEduzzToken(): string {
  const token = process.env.EDUZZ_TOKEN;
  if (!token) throw new Error("EDUZZ_TOKEN não configurado");
  return token;
}

export async function eduzzFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const base = process.env.EDUZZ_API_BASE || "https://api.eduzz.com";
  const res = await fetch(base + path, {
    ...init,
    headers: {
      authorization: `bearer ${getEduzzToken()}`,
      "content-type": "application/json",
      ...init.headers,
    },
  });
  const text = await res.text();
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {}
  if (!res.ok) throw new EduzzError(res.status, body);
  return body as T;
}

export type EduzzProduct = {
  id: string | number;
  name: string;
  status: string;
  payment?: { price?: { value?: number; currency?: string } };
};

type ProductsPage = { pages: number; items: EduzzProduct[] };

export async function listAllProducts(): Promise<EduzzProduct[]> {
  const get = (n: number) =>
    eduzzFetch<ProductsPage>(`/myeduzz/v1/products?page=${n}`, { next: { revalidate: 3600 } });
  const first = await get(1);
  const rest = await Promise.all(Array.from({ length: (first.pages || 1) - 1 }, (_, i) => get(i + 2)));
  return [first, ...rest].flatMap((p) => p.items ?? []);
}

export type CartItem = {
  productId: string;
  description: string;
  price: { value: number; currency: "BRL" };
  quantity: 1;
};

export async function createCart({ items, orderId }: { items: CartItem[]; orderId: string }): Promise<string> {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site) throw new Error("NEXT_PUBLIC_SITE_URL não configurado");
  const res = await eduzzFetch<{ paymentUrl?: string }>("/sun/v1/cart", {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({
      orderId,
      postbackUrl: `${site}/api/eduzz/postback`,
      returnUrl: `${site}/obrigado`,
      items,
    }),
  });
  // Só redirecionamos o navegador para o checkout oficial da Eduzz.
  if (!res.paymentUrl?.startsWith("https://chk.eduzz.com/")) {
    throw new EduzzError(200, { unexpectedPaymentUrl: res.paymentUrl });
  }
  return res.paymentUrl;
}
