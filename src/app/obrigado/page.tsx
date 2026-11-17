import type { Metadata } from "next";
import Link from "next/link";
import Header, { SCHOOL_URL } from "@/components/Header";

export const metadata: Metadata = { title: "Pedido recebido — Centro de Estudos John Knox" };

export default function Obrigado() {
  const host = new URL(SCHOOL_URL).host;
  return (
    <>
      <Header />
      <main className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          <h1 className="font-serif text-4xl font-semibold text-ink">Pedido recebido! 🙏</h1>
          <p className="mt-3 text-text/85">Assim que o pagamento for confirmado, seus cursos serão liberados na escola.</p>

          <h2 className="mt-8 font-serif text-2xl font-semibold text-ink">Como acessar seus cursos</h2>
          <ol className="mt-4 list-inside list-decimal space-y-3 marker:font-bold marker:text-ink">
            <li>
              Acesse <strong>{host}</strong>.
            </li>
            <li>
              Clique em <strong>“Esqueci minha senha”</strong>.
            </li>
            <li>
              Informe o <strong>mesmo e-mail usado na compra</strong> e crie sua senha.
            </li>
          </ol>

          <p className="mt-6 rounded-lg bg-cream px-4 py-3 text-sm text-text/85">
            Pagou com boleto? A liberação pode levar até 3 dias úteis.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={SCHOOL_URL}
              className="rounded-lg bg-gold px-5 py-3 text-center font-bold text-navy-dark hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Acessar a escola
            </a>
            <Link
              href="/"
              className="rounded-lg border border-ink/40 px-5 py-3 text-center font-semibold text-ink hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
