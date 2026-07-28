const fallbackLocale = "en";

export function localized(value, locale) {
  return value?.[locale] ?? value?.[fallbackLocale] ?? "";
}
