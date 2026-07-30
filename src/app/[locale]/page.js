import { notFound } from "next/navigation";

import AboutSection from "../components/AboutSection";
import AppointmentInfoSection from "../components/AppointmentInfoSection";
import HeroSection from "../components/HeroSection";
import HomeNavigation from "../components/HomeNavigation";
import ServicesSection from "../components/ServicesSection";
import SiteFooter from "../components/SiteFooter";
import VisitSection from "../components/VisitSection";
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

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function Home({ params }) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const content = deepMerge(siteContent[fallbackLocale], siteContent[locale]);
  const { extras, services } = servicesData;

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <HomeNavigation content={content} extras={extras} locale={locale} services={services} />
      <HeroSection content={content} />
      <AppointmentInfoSection content={content} extras={extras} locale={locale} services={services} />
      <ServicesSection content={content} locale={locale} services={services} />
      <AboutSection content={content} />
      <VisitSection content={content} extras={extras} locale={locale} services={services} />
      <SiteFooter content={content} />
    </main>
  );
}
