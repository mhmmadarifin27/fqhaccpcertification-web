import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { ToastProvider } from "../context/ToastContext";

export const metadata: Metadata = {
  title: "PT FOOD QUALITY CERTIFICATION | Lembaga Sertifikasi HACCP Terakreditasi KAN",
  description: "PT FOOD QUALITY CERTIFICATION - Lembaga Sertifikasi HACCP Terakreditasi Komite Akreditasi Nasional (KAN). Mitra terpercaya dalam sertifikasi keamanan pangan nasional dan internasional.",
  keywords: [
    "Lembaga Sertifikasi HACCP",
    "Sertifikasi HACCP Terakreditasi KAN",
    "Sertifikasi Keamanan Pangan",
    "HACCP Indonesia",
    "Audit HACCP",
    "Sertifikasi Industri Pangan",
    "Sertifikasi Food Safety",
    "Sertifikasi HACCP Nasional",
    "Lembaga Sertifikasi Keamanan Pangan",
    "PT FOOD QUALITY CERTIFICATION"
  ].join(", "),
  icons: {
    icon: "/logo.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="h-full scroll-smooth antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-body bg-white text-slate-900">
        <ToastProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
