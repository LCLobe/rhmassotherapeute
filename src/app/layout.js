import { Brawler, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const brawler = Brawler({
  variable: "--font-body",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "RH.Massoth\u00e9rapeute | Ruth Hernica",
  description:
    "Therapeutic massage services by Ruth Hernica in Yverdon-les-Bains and surroundings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${brawler.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
