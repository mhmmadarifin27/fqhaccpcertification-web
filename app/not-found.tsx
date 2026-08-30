"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="max-w-md space-y-6">
          <span className="text-6xl font-black text-brand-navy block font-heading">404</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-slate-500">
            Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
          </p>
          <div>
            <Link
              href="/"
              className="inline-block bg-brand-navy hover:bg-brand-navy-dark text-white font-bold py-3 px-8 rounded-full text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
