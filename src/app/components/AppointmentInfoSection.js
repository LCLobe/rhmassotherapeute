import ContactModal from "./ContactModal";

export default function AppointmentInfoSection({ content, extras, locale, services }) {
  return (
    <section aria-label="Appointment and quick information" className="px-5 pb-24 pt-8 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-7xl rounded-[3rem] px-6 py-8 sm:px-10 lg:px-12">
        <div className="absolute inset-0 rounded-[3rem] border border-[#947e4c]/20" />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row">
            <ContactModal
              triggerLabel={content.hero.primaryCta}
              services={services}
              extras={extras}
              content={content.contact}
              locale={locale}
              variant="primary"
            />
            <a
              href="#services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#947e4c]/50 px-6 text-sm uppercase tracking-[0.18em] text-[#443a28] transition hover:border-[#7f5614] hover:bg-white/45"
            >
              {content.hero.secondaryCta}
            </a>
          </div>

          <div className="grid flex-1 gap-4 text-sm text-[#443a28] sm:grid-cols-3 lg:max-w-2xl">
            {content.hero.highlights.map((item) => (
              <div key={item.label} className="border-l border-[#947e4c]/40 pl-4">
                <p className="uppercase tracking-[0.18em] text-[#947e4c]">{item.label}</p>
                <p className="mt-2 text-base">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
