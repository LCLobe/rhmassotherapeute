import Image from "next/image";

export default function HeroSection({ content }) {
  return (
    <section id="top" className="relative px-5 pt-32 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(183,176,162,0.22),transparent_34%),linear-gradient(180deg,#f9ece3_0%,#fff8f2_54%,#f9ece3_100%)]" />
      <div className="relative mx-auto max-w-7xl rounded-[3rem] px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
        <div className="absolute inset-0 rounded-[3rem] border border-[#947e4c]/20" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm uppercase tracking-[0.34em] text-[#7f5614]">
              {content.hero.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(3rem,5.8vw,6.4rem)] leading-[0.92] text-[#443a28]">
              {content.hero.title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-[#5d513d]">
              {content.hero.copy}
            </p>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#947e4c]/20" />
            <div className="relative h-[88%] w-[88%] overflow-hidden rounded-full border border-[#d8c8b5] bg-[#0a0a0a] p-4 shadow-[0_30px_90px_rgba(68,58,40,0.18)]">
              <Image
                src="/brand/logo-sobre-negro.jpeg"
                alt="RH.Massotherapie black and gold logo"
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 84vw"
                className="scale-[1.35] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
