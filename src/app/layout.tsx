import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#059669", // Typical for PGF Primary
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Pema Ga-Tshal Foundation | Empowering Himalayan Communities",
    template: "%s | Pema Ga-Tshal Foundation",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NonProfitOrganization",
    "name": "Pema Ga-Tshal Foundation",
    "description": "Empowering Himalayan and rural communities of Nepal by supporting Padmai Ga-tshal Choiling School.",
    "url": "https://pemagatshal.org",
    "logo": "https://pemagatshal.org/apple-touch-icon.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressCountry": "Nepal"
    },
    "sameAs": [
      "https://facebook.com/PemaGaTshalFoundation",
      "https://instagram.com/PemaGaTshalFoundation"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
