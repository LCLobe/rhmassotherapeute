"use client";

import Image from "next/image";
import { useState } from "react";

import ContactModal from "./ContactModal";
import LanguageSelector from "./LanguageSelector";

export default function HomeNavigation({ content, extras, locale, services }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[rgba(148,126,76,0.28)] bg-[rgba(249,236,227,0.78)] px-3 py-2 shadow-[0_18px_60px_rgba(68,58,40,0.11)] backdrop-blur-xl"
      >
        <a href="#top" className="flex items-center gap-3" aria-label="RH.Massotherapie home">
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
          <span className="hidden text-sm tracking-[0.24em] text-[#443a28] lg:inline">
            {"RH.MASSOTH\u00c9RAPIE"}
          </span>
        </a>

        <div className="flex items-center gap-2 text-sm text-[#443a28]">
          <a className="hidden rounded-full px-4 py-3 transition hover:bg-white/45 lg:inline-flex" href="#services">
            {content.nav.services}
          </a>
          <a className="hidden rounded-full px-4 py-3 transition hover:bg-white/45 lg:inline-flex" href="#about">
            {content.nav.about}
          </a>
          <LanguageSelector currentLocale={locale} />
          <details
            className="group relative lg:hidden"
            open={menuOpen}
            onToggle={(event) => setMenuOpen(event.currentTarget.open)}
          >
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-[#947e4c]/40 bg-[#fff8f2]/75 text-[#7f5614] transition hover:bg-white"
              aria-label="Open navigation menu"
            >
              <span className="text-lg leading-none transition group-open:rotate-180">⌄</span>
            </summary>
            <div className="absolute right-0 mt-3 w-56 rounded-[1.5rem] border border-[#d8c8b5] bg-[#fff8f2] p-3 shadow-2xl">
              <a className="block rounded-2xl px-4 py-3 transition hover:bg-[#f9ece3]" href="#services" onClick={closeMenu}>
                {content.nav.services}
              </a>
              <a className="block rounded-2xl px-4 py-3 transition hover:bg-[#f9ece3]" href="#about" onClick={closeMenu}>
                {content.nav.about}
              </a>
              <a className="block rounded-2xl px-4 py-3 transition hover:bg-[#f9ece3]" href="#visit" onClick={closeMenu}>
                {content.visit.cta}
              </a>
            </div>
          </details>
          <ContactModal
            triggerLabel={content.nav.contact}
            services={services}
            extras={extras}
            content={content.contact}
            locale={locale}
          />
        </div>
      </nav>
    </header>
  );
}
