import { getImageProps } from "next/image";

export default function Hero() {
  const common = { alt: "", sizes: "100vw", priority: true };
  const { srcSet: desktop } = getImageProps({ ...common, src: "/banner.png", width: 1600, height: 400 }).props;
  const { srcSet: mobile, ...img } = getImageProps({ ...common, src: "/banner-mobile.png", width: 768, height: 400 }).props;

  return (
    <section className="texture-navy grain text-center text-cream">
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop} />
        <source srcSet={mobile} />
        <img {...img} alt="" className="block h-auto w-full" />
      </picture>
      <div className="flex flex-col items-center px-4 py-10">
        <h1 className="font-serif text-3xl font-semibold tracking-[0.18em] uppercase sm:text-5xl">Monte sua trilha de estudos</h1>
        <div className="my-5 h-px w-24 bg-gold/70" aria-hidden />
        <p className="max-w-md text-base text-cream/85 sm:text-lg">Escolha os cursos que deseja e pague tudo de uma vez.</p>
      </div>
    </section>
  );
}
