import { localized } from "./localization";

export default function ServicesSection({ content, locale, services }) {
  return (
    <section id="services" className="px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#7f5614]">{content.services.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl leading-none text-[#443a28] md:text-7xl">
              {content.services.title}
            </h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-[#5d513d]">{content.services.copy}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:[grid-auto-rows:auto]">
          {services.map((service) => (
            <article
              id={service.id}
              key={service.id}
              className="group grid h-full grid-rows-[auto_auto_1fr_auto] rounded-[2.25rem] border border-[#d8c8b5] bg-[#fff8f2] p-7 shadow-[0_18px_50px_rgba(68,58,40,0.09)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(68,58,40,0.14)] md:row-span-4 md:grid-rows-subgrid"
            >
              <h3 className="font-display text-4xl text-[#947e4c]">{localized(service.name, locale)}</h3>
              <div className="mb-10 flex items-start justify-between">
                <span className="w-full text-right font-display text-3xl leading-none text-[#443a28]">
                  {localized(service.durationLabel, locale)}
                </span>
              </div>
              <p className="mt-5 text-base leading-7 text-[#5d513d]">{localized(service.description, locale)}</p>
              <div className="mt-8 flex items-center justify-between border-t border-[#d8c8b5] pt-5">
                <span></span>
                <span className="text-[#7f5614]">{service.price} CHF</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
