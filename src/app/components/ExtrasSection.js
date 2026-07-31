import { localized } from "./localization";

export default function ExtrasSection({ content, extras, locale }) {
  return (
    <section aria-labelledby="extras-title" className="px-5 pb-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#d8c8b5] p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#7f5614]">{content.extras.eyebrow}</p>
            <h3 id="extras-title" className="mt-4 max-w-xl font-display text-4xl leading-none text-[#443a28] md:text-5xl">
              {content.extras.title}
            </h3>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {extras.map((extra) => (
              <li key={extra.id} className="rounded-[1.5rem] bg-[#fff8f2] px-5 py-4 text-[#5d513d]">
                {localized(extra.name, locale)} - {extra.price} CHF
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
