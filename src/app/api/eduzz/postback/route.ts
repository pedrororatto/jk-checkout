// A Eduzz não enviou nada no teste; só registramos o que chegar.
export async function POST(req: Request) {
  const text = (await req.text()).slice(0, 10_000);
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {}
  console.log("[eduzz:postback]", {
    contentType: req.headers.get("content-type"),
    userAgent: req.headers.get("user-agent"),
    forwardedFor: req.headers.get("x-forwarded-for"),
    body,
  });
  return Response.json({ ok: true });
}
