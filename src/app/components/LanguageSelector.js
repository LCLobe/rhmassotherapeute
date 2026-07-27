import Link from "next/link";

const FlagFrance = () => (
  <svg viewBox="0 0 3 2" aria-hidden="true" className="h-4 w-6 overflow-hidden rounded-sm shadow-sm">
    <rect width="1" height="2" x="0" fill="#002395" />
    <rect width="1" height="2" x="1" fill="#fff" />
    <rect width="1" height="2" x="2" fill="#ed2939" />
  </svg>
);

const FlagUnitedKingdom = () => (
  <svg viewBox="0 0 60 36" aria-hidden="true" className="h-4 w-6 overflow-hidden rounded-sm shadow-sm">
    <clipPath id="uk-clip"><path d="M0 0h60v36H0z" /></clipPath>
    <g clipPath="url(#uk-clip)">
      <path fill="#012169" d="M0 0h60v36H0z" />
      <path stroke="#fff" strokeWidth="6" d="m0 0 60 36M60 0 0 36" />
      <path stroke="#c8102e" strokeWidth="3.6" d="m0 0 60 36M60 0 0 36" />
      <path stroke="#fff" strokeWidth="10" d="M30 0v36M0 18h60" />
      <path stroke="#c8102e" strokeWidth="6" d="M30 0v36M0 18h60" />
    </g>
  </svg>
);

const FlagSpain = () => (
  <svg viewBox="0 0 3 2" aria-hidden="true" className="h-4 w-6 overflow-hidden rounded-sm shadow-sm">
    <rect width="3" height="2" fill="#aa151b" />
    <rect width="3" height="1" y="0.5" fill="#f1bf00" />
  </svg>
);

const languages = [
  { locale: "fr", label: "Français", shortLabel: "FR", Flag: FlagFrance },
  { locale: "en", label: "English", shortLabel: "EN", Flag: FlagUnitedKingdom },
  { locale: "es", label: "Español", shortLabel: "ES", Flag: FlagSpain },
];

export default function LanguageSelector({ currentLocale }) {
  const current = languages.find((language) => language.locale === currentLocale) ?? languages[0];
  const CurrentFlag = current.Flag;

  return (
    <details className="group relative">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full px-3 py-2 transition hover:bg-white/45" aria-label="Choose language">
        <CurrentFlag />
        <span className="text-sm uppercase tracking-[0.12em]">{current.shortLabel}</span>
        <span className="text-xs text-[#7f5614] transition group-open:rotate-180">⌄</span>
      </summary>
      <div className="absolute right-0 mt-3 w-44 rounded-[1.25rem] border border-[#d8c8b5] bg-[#fff8f2] p-2 shadow-2xl">
        {languages.map(({ locale, label, shortLabel, Flag }) => (
          <Link
            key={locale}
            href={`/${locale}`}
            aria-current={locale === currentLocale ? "page" : undefined}
            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition hover:bg-[#f9ece3] aria-[current=page]:bg-[#f9ece3]"
          >
            <Flag />
            <span>{label}</span>
            <span className="ml-auto text-xs text-[#947e4c]">{shortLabel}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}