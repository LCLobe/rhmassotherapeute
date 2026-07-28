import Image from "next/image";

export default function AboutSection({ content }) {
  return (
    <section id="about" className="bg-[#0a0a0a] px-5 py-24 text-[#f9ece3] sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1fr]">
        <div className="relative min-h-72 overflow-hidden rounded-[2.5rem] border border-[#946c2d]/50">
          <Image
            src="/brand/logo-sobre-negro.jpeg"
            alt="RH monogram with golden botanical leaves"
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="scale-[1.1] object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.34em] text-[#b79a5c]">{content.about.eyebrow}</p>
          <h2 className="mt-4 font-display text-5xl leading-none md:text-7xl">{content.about.title}</h2>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-[#e7d2c3]">{content.about.copy}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {content.about.points.map((point) => (
              <div key={point} className="rounded-[1.5rem] border border-[#946c2d]/40 p-5 text-[#f9ece3]">
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
