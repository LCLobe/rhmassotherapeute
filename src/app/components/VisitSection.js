import ContactModal from "./ContactModal";
import { localized } from "./localization";

export default function VisitSection({ content, extras, locale, services }) {
  const visibleExtras = extras.filter((extra) => extra.id !== "other");

  return (
    <section id="visit" className="px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[2.5rem] bg-[#fff8f2] p-8 shadow-[0_18px_50px_rgba(68,58,40,0.09)] md:p-12">
          <p className="text-sm uppercase tracking-[0.34em] text-[#7f5614]">{content.visit.eyebrow}</p>
          <h2 className="mt-4 font-display text-5xl leading-none text-[#443a28] md:text-7xl">{content.visit.title}</h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5d513d]">{content.visit.copy}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ContactModal
              triggerLabel={content.visit.cta}
              services={services}
              extras={extras}
              content={content.contact}
              locale={locale}
              variant="primary"
            />
            <a
              href="https://www.instagram.com/rh.massotherapeute/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#947e4c]/50 px-6 text-sm uppercase tracking-[0.18em] text-[#443a28] transition hover:border-[#7f5614] hover:bg-[#f9ece3]"
            >
              Instagram
            </a>
          </div>
        </div>
        <aside className="rounded-[2.5rem] border border-[#d8c8b5] p-8">
          <p className="text-sm uppercase tracking-[0.34em] text-[#7f5614]">{content.extras.eyebrow}</p>
          <h3 className="mt-4 font-display text-4xl leading-none text-[#443a28]">{content.extras.title}</h3>
          <ul className="mt-8 space-y-4">
            {visibleExtras.map((extra) => (
              <li key={extra.id} className="rounded-[1.5rem] bg-[#fff8f2] px-5 py-4 text-[#5d513d]">
                {localized(extra.name, locale)}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
