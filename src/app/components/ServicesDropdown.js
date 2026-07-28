import { localized } from "./localization";

export default function ServicesDropdown({ label, locale, services }) {
  return (
    <details className="group relative hidden md:block">
      <summary className="cursor-pointer list-none rounded-full px-4 py-3 transition hover:bg-white/45">
        {label}
      </summary>
      <div className="absolute right-0 mt-3 w-72 rounded-[1.5rem] border border-[#d8c8b5] bg-[#fff8f2] p-3 shadow-2xl">
        {services.map((service) => (
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
  );
}
