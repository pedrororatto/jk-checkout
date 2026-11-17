import Image from "next/image";
import type { CatalogItem } from "@/lib/server/catalog";
import { formatBRL } from "@/lib/format";

type Props = { course: CatalogItem; selected: boolean; onToggle: () => void };

export default function CourseCard({ course, selected, onToggle }: Props) {
  const kids = course.category === "infantil";
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className="group block w-full rounded-xl text-left focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <div
        className={`grain relative flex aspect-video items-center justify-center overflow-hidden border-3 px-5 transition duration-150 ${
          kids ? "rounded-3xl bg-linear-to-br from-sky to-sky-light" : "texture-navy rounded-lg"
        } ${selected ? "-translate-y-1 border-gold shadow-xl" : "border-transparent shadow-sm group-hover:-translate-y-0.5 group-hover:shadow-md"}`}
      >
        {course.image ? (
          // a capa já traz o título; o nome segue acessível via alt
          <Image src={course.image} alt={course.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        ) : (
          /* selo com a logo (fundo CSS: se o arquivo faltar, simplesmente não aparece) */
          <span
            aria-hidden
            className="absolute top-2.5 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full bg-[url(/logo-john-knox.png)] bg-cover opacity-30"
          />
        )}
        <span
          aria-hidden
          className={`absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold transition duration-150 ${
            selected ? "bg-gold text-navy-dark" : "border-2 border-cream/70 bg-navy-dark/40"
          }`}
        >
          {selected && "✓"}
        </span>

        {!course.image && <span className="flex w-full flex-col items-center text-center">
          <span className="flex w-full items-center justify-center gap-3">
            <span aria-hidden className="h-px w-5 shrink-0 bg-cream/60" />
            <span
              className={`line-clamp-3 text-white uppercase ${
                kids
                  ? "text-base font-extrabold [text-shadow:0_1px_3px_rgb(0_0_0/0.45)]"
                  : "font-serif text-lg leading-snug font-semibold tracking-wide text-cream sm:text-xl"
              }`}
            >
              {course.name}
            </span>
            <span aria-hidden className="h-px w-5 shrink-0 bg-cream/60" />
          </span>
          {course.subtitle && (
            <span className="mt-2 text-[0.65rem] tracking-[0.2em] text-cream/85 uppercase">{course.subtitle}</span>
          )}
        </span>}
      </div>
      <span className="mt-2 block px-1 font-semibold text-ink">{formatBRL(course.price)}</span>
    </button>
  );
}
