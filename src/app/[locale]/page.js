import Image from "next/image";
import { notFound } from "next/navigation";
import ContactModal from "../components/ContactModal";
import LanguageSelector from "../components/LanguageSelector";
import servicesData from "../../data/services.json";
import siteContent from "../../data/site-content.json";

const supportedLocales = ["fr", "en", "es"];
const fallbackLocale = "en";

function deepMerge(fallback, current) {
  if (!current || typeof current !== "object" || Array.isArray(current)) {
    return current ?? fallback;
  }

  return Object.fromEntries(
    Object.keys(fallback).map((key) => [key, deepMerge(fallback[key], current[key])])
  );
}

function localized(value, locale) {
  return value?.[locale] ?? value?.[fallbackLocale] ?? "";
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}
export default async function Home({ params }) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const content = deepMerge(siteContent[fallbackLocale], siteContent[locale]);
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[rgba(148,126,76,0.28)] bg-[rgba(249,236,227,0.78)] px-3 py-2 shadow-[0_18px_60px_rgba(68,58,40,0.11)] backdrop-blur-xl"
        >
          <a href="#top" className="flex items-center gap-3" aria-label="RH.Massotherapeute home">
            <span className="relative h-12 w-20 overflow-hidden rounded-full bg-[#0a0a0a] sm:w-24">
              <Image
                src="/brand/logo-sobre-negro.jpeg"
                alt=""
                fill
                priority
                sizes="96px"
                className="object-cover object-center"
              />
            </span>
            <span className="hidden text-sm tracking-[0.24em] text-[#443a28] sm:inline">
              RH.MASSOTHERAPEUTE
            </span>
          </a>

          <div className="flex items-center gap-2 text-sm text-[#443a28]">
            <details className="group relative hidden md:block">
              <summary className="cursor-pointer list-none rounded-full px-4 py-3 transition hover:bg-white/45">
                {content.nav.services}
              </summary>
              <div className="absolute right-0 mt-3 w-72 rounded-[1.5rem] border border-[#d8c8b5] bg-[#fff8f2] p-3 shadow-2xl">
                {servicesData.services.map((service) => (
                  <a
                    key={service.id}
                    href={`#${service.id}`}
                    className="block rounded-2xl px-4 py-3 transition hover:bg-[#f9ece3]"
                  >
                    <span className="block font-semibold">{localized(service.name, locale)}</span>
                    <span className="mt-1 block text-xs text-[#7f5614]">
                      {localized(service.durationLabel, locale)} - {service.price} CHF
                    </span>
                  </a>
                ))}
              </div>
            </details>
            <a className="hidden rounded-full px-4 py-3 transition hover:bg-white/45 md:inline-flex" href="#about">
              {content.nav.about}
            </a>
            <LanguageSelector currentLocale={locale} />
            <ContactModal
              triggerLabel={content.nav.contact}
              services={servicesData.services}
              extras={servicesData.extras}
              content={content.contact}
              locale={locale}
            />
          </div>
        </nav>
      </header>

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
                  alt="RH.Massotherapeute black and gold logo"
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

      <section aria-label="Appointment and quick information" className="px-5 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl rounded-[3rem] px-6 py-8 sm:px-10 lg:px-12">
          <div className="absolute inset-0 rounded-[3rem] border border-[#947e4c]/20" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row">
              <ContactModal
                triggerLabel={content.hero.primaryCta}
                services={servicesData.services}
                extras={servicesData.extras}
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

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {servicesData.services.map((service, index) => (
              <article
                id={service.id}
                key={service.id}
                className="group rounded-[2.25rem] border border-[#d8c8b5] bg-[#fff8f2] p-7 shadow-[0_18px_50px_rgba(68,58,40,0.09)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(68,58,40,0.14)]"
              >
                <div className="mb-10 flex items-start justify-between">
                  <span className="rounded-full border border-[#947e4c]/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#7f5614]">
                    0{index + 1}
                  </span>
                  <span className="font-display text-5xl text-[#947e4c]">{service.price}</span>
                </div>
                <h3 className="font-display text-4xl leading-none text-[#443a28]">{localized(service.name, locale)}</h3>
                <p className="mt-5 text-base leading-7 text-[#5d513d]">{localized(service.description, locale)}</p>
                <div className="mt-8 flex items-center justify-between border-t border-[#d8c8b5] pt-5">
                  <span>{localized(service.durationLabel, locale)}</span>
                  <span className="text-[#7f5614]">CHF</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <section id="visit" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2.5rem] bg-[#fff8f2] p-8 shadow-[0_18px_50px_rgba(68,58,40,0.09)] md:p-12">
            <p className="text-sm uppercase tracking-[0.34em] text-[#7f5614]">{content.visit.eyebrow}</p>
            <h2 className="mt-4 font-display text-5xl leading-none text-[#443a28] md:text-7xl">{content.visit.title}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5d513d]">{content.visit.copy}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ContactModal
                triggerLabel={content.visit.cta}
                services={servicesData.services}
                extras={servicesData.extras}
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
              {servicesData.extras.map((extra) => (
                <li key={extra.id} className="rounded-[1.5rem] bg-[#fff8f2] px-5 py-4 text-[#5d513d]">
                  {localized(extra.name, locale)}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
