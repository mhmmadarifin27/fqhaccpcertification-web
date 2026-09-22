import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { ToastProvider } from "../context/ToastContext";

const siteUrl = "https://www.foodqualitycertification.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PT FOOD QUALITY CERTIFICATION | Lembaga Sertifikasi HACCP Indonesia",
    template: "%s | PT FOOD QUALITY CERTIFICATION",
  },
  description:
    "PT FOOD QUALITY CERTIFICATION (foodqualitycertification.id) - Lembaga Sertifikasi HACCP Independen & Profesional. Layanan audit dan sertifikasi sistem manajemen keamanan pangan SNI CXC 1:1969 di Indonesia.",
  keywords: [
    "food quality certification",
    "food quality certification indonesia",
    "PT FOOD QUALITY CERTIFICATION",
    "foodqualitycertification.id",
    "Lembaga Sertifikasi HACCP",
    "Sertifikasi HACCP Indonesia",
    "Sertifikasi Keamanan Pangan",
    "HACCP Indonesia",
    "Audit HACCP",
    "SNI CXC 1:1969",
    "Sertifikasi Industri Pangan",
    "Sertifikasi Food Safety",
    "Lembaga Sertifikasi Pangan Yogyakarta",
  ].join(", "),
  authors: [{ name: "PT FOOD QUALITY CERTIFICATION", url: siteUrl }],
  creator: "PT FOOD QUALITY CERTIFICATION",
  publisher: "PT FOOD QUALITY CERTIFICATION",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "PT FOOD QUALITY CERTIFICATION",
    title: "PT FOOD QUALITY CERTIFICATION | Lembaga Sertifikasi HACCP Indonesia",
    description:
      "Lembaga Sertifikasi HACCP Independen & Profesional. Audit dan sertifikasi sistem manajemen mutu & keamanan pangan SNI CXC 1:1969 terpercaya di Indonesia.",
    images: [
      {
        url: "/hero1.jpg",
        width: 1200,
        height: 630,
        alt: "PT FOOD QUALITY CERTIFICATION - Lembaga Sertifikasi HACCP Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT FOOD QUALITY CERTIFICATION | Lembaga Sertifikasi HACCP Indonesia",
    description:
      "Lembaga Sertifikasi HACCP Independen & Profesional. Sertifikasi mutu & keamanan pangan SNI CXC 1:1969 terpercaya.",
    images: ["/hero1.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    // Allows easy placement if user has Google Search Console code:
    // google: "your-google-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "PT FOOD QUALITY CERTIFICATION",
      alternateName: [
        "Food Quality Certification",
        "PT FQC",
        "FQC HACCP",
        "foodqualitycertification.id",
      ],
      url: siteUrl,
      logo: `${siteUrl}/logo2.png`,
      image: `${siteUrl}/hero1.jpg`,
      description:
        "Lembaga Sertifikasi HACCP Independen dan Profesional berstandar SNI CXC 1:1969 di Indonesia.",
      email: "fqhaccpcertification@gmail.com",
      telephone: "+62-822-4793-6392",
      address: {
        "@type": "PostalAddress",
        streetAddress: "TAJEM RT 004 RW 031, Maguwoharjo, Depok",
        addressLocality: "Kabupaten Sleman",
        addressRegion: "Daerah Istimewa Yogyakarta",
        postalCode: "55282",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -7.7656,
        longitude: 110.4354,
      },
      sameAs: [
        "https://www.google.com/maps/search/?api=1&query=Maguwoharjo+Depok+Sleman+Yogyakarta",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "PT FOOD QUALITY CERTIFICATION",
      url: siteUrl,
      priceRange: "$$",
      telephone: "+62-822-4793-6392",
      address: {
        "@type": "PostalAddress",
        streetAddress: "TAJEM RT 004 RW 031, Maguwoharjo, Depok",
        addressLocality: "Kabupaten Sleman",
        addressRegion: "Daerah Istimewa Yogyakarta",
        postalCode: "55282",
        addressCountry: "ID",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "PT FOOD QUALITY CERTIFICATION",
      alternateName: "Food Quality Certification",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: ["id", "en"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full scroll-smooth antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon-96.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body bg-white text-slate-900">
        <ToastProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
