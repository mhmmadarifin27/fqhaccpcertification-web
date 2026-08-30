import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-4 max-w-md">
        <span className="text-6xl font-black text-brand-blue block">404</span>
        <h1 className="text-2xl font-bold font-heading">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-400 text-sm">
          Maaf, halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-full transition-all"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
