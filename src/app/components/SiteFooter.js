export default function SiteFooter({ content }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] px-5 py-14 text-[#f9ece3] sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#946c2d]/45 pt-10 lg:grid-cols-[0.9fr_1.4fr]">
        <div>
          <p className="font-display text-4xl leading-none text-[#f9ece3] sm:text-5xl">
            {content.footer.brand}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#d8c8b5]">{content.footer.signature}</p>
          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-[#b79a5c]">
            {content.footer.copyright.replace("{year}", year)}
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {content.footer.legalSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-sm uppercase tracking-[0.22em] text-[#b79a5c]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#e7d2c3]">{section.copy}</p>
            </section>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#946c2d]/30 pt-6 text-sm text-[#d8c8b5] sm:flex-row sm:items-center sm:justify-between">
        <p>{content.footer.legalNote}</p>
        <p>
          {content.footer.creditPrefix}{" "}
          <a
            href="https://www.luisloredo.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#f9ece3] underline decoration-[#b79a5c] underline-offset-4 transition hover:text-[#b79a5c]"
          >
            luisloredo.ch
          </a>
        </p>
      </div>
    </footer>
  );
}
