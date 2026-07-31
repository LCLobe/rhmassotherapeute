import ContactModal from "./ContactModal";

export default function VisitSection({ content, extras, locale, services }) {
  return (
    <section id="visit" className="px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
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
      </div>
    </section>
  );
}
