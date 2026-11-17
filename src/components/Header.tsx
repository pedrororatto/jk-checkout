import Image from "next/image";
import Link from "next/link";

export const SCHOOL_URL = process.env.SCHOOL_URL || "https://johnknoxonline.alpaclass.com";

export default function Header() {
  return (
    <header className="bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          <Image src="/logo-john-knox.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full bg-navy-dark" />
          <span className="font-serif text-xl leading-tight font-semibold sm:text-2xl">Centro de Estudos John Knox</span>
        </Link>
        <a
          href={SCHOOL_URL}
          className="shrink-0 rounded-full border border-cream/50 px-3 py-2 text-sm font-semibold text-cream underline-offset-4 hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-gold sm:rounded sm:border-0 sm:p-0 sm:font-normal sm:text-cream/80 sm:hover:bg-transparent sm:hover:text-cream sm:hover:underline"
        >
          <span className="sm:hidden">Já sou aluno →</span>
          <span className="hidden sm:inline">Já sou aluno → acessar a escola</span>
        </a>
      </div>
    </header>
  );
}
