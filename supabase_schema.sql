-- =======================================================================
-- SQL SCHEMA & MIGRATION FOR PT FOOD QUALITY CERTIFICATION (SUPABASE)
-- =======================================================================
-- Jalankan script SQL ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- =======================================================================

-- 1. TABEL PENGAJUAN SERTIFIKASI (Inquiries / Form Online)
CREATE TABLE IF NOT EXISTS public.sertifikasi (
    id BIGSERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    company_address TEXT DEFAULT '',
    pic_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    industry TEXT NOT NULL,
    haccp_status TEXT NOT NULL,
    message TEXT DEFAULT '',
    ticket_number TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TABEL GALERI FOTO (Gallery Items)
CREATE TABLE IF NOT EXISTS public.galeri (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABEL BERITA & ARTIKEL (News Items)
CREATE TABLE IF NOT EXISTS public.berita (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABEL PROYEK & KLIEN (Our Latest Projects)
CREATE TABLE IF NOT EXISTS public.proyek (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    "desc" TEXT DEFAULT '',
    image_url TEXT NOT NULL,
    year TEXT DEFAULT '2026',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. TABEL PEGAWAI & TIM AUDITOR (Team Members)
CREATE TABLE IF NOT EXISTS public.pegawai (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'tphp-ugm',
    is_lead BOOLEAN DEFAULT false,
    image_url TEXT NOT NULL,
    experience TEXT DEFAULT '',
    auditor_exp TEXT DEFAULT '',
    motto TEXT DEFAULT '',
    education TEXT[] DEFAULT '{}',
    standards TEXT[] DEFAULT '{}',
    haccp TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =======================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Memberikan akses baca & tulis penuh (Anon Key) untuk website & admin
-- =======================================================================

ALTER TABLE public.sertifikasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proyek ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pegawai ENABLE ROW LEVEL SECURITY;

-- Policy untuk tabel sertifikasi
DROP POLICY IF EXISTS "Public Full Access Sertifikasi" ON public.sertifikasi;
CREATE POLICY "Public Full Access Sertifikasi" ON public.sertifikasi FOR ALL USING (true) WITH CHECK (true);

-- Policy untuk tabel galeri
DROP POLICY IF EXISTS "Public Full Access Galeri" ON public.galeri;
CREATE POLICY "Public Full Access Galeri" ON public.galeri FOR ALL USING (true) WITH CHECK (true);

-- Policy untuk tabel berita
DROP POLICY IF EXISTS "Public Full Access Berita" ON public.berita;
CREATE POLICY "Public Full Access Berita" ON public.berita FOR ALL USING (true) WITH CHECK (true);

-- Policy untuk tabel proyek
DROP POLICY IF EXISTS "Public Full Access Proyek" ON public.proyek;
CREATE POLICY "Public Full Access Proyek" ON public.proyek FOR ALL USING (true) WITH CHECK (true);

-- Policy untuk tabel pegawai
DROP POLICY IF EXISTS "Public Full Access Pegawai" ON public.pegawai;
CREATE POLICY "Public Full Access Pegawai" ON public.pegawai FOR ALL USING (true) WITH CHECK (true);

-- =======================================================================
-- SEED DATA AWAL (Opsional - Data Contoh Default)
-- =======================================================================

-- Data awal Proyek
INSERT INTO public.proyek (name, category, "desc", image_url, year)
VALUES 
('PT Ritel Pangan Nusantara', 'LOGISTIK & RITEL MODERN', 'Sertifikasi sistem HACCP untuk fasilitas gudang penyimpanan rantai dingin dan jaringan 45 gerai ritel modern di Indonesia.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80', '2025'),
('PT Samudra Frozen Foods', 'INDUSTRI OLAHAN SEAFOOD', 'Audit sertifikasi fasilitas pabrik pemrosesan dan pembekuan udang ekspor standar kualifikasi internasional.', 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80', '2025'),
('PT Boga Katering Utama', 'JASA BOGA IN-FLIGHT & INDUSTRI', 'Sertifikasi HACCP dapur pusat penyedia katering penerbangan dengan kapasitas produksi 10.000 porsi per hari.', 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80', '2026'),
('PT Nusa Dairy Premium', 'INDUSTRI OLAHAN SUSU', 'Penerbitan sertifikat kesesuaian HACCP untuk unit pengolahan dan pasteurisasi susu segar serta yogurt kemasan.', 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=600&q=80', '2026')
ON CONFLICT DO NOTHING;

-- Data awal Galeri
INSERT INTO public.galeri (title, description, category, image_url)
VALUES
('Audit Lapangan di Pabrik Pengolahan Susu Yogyakarta', 'Auditor PT Food Quality Certification mengecek tangki pasteurisasi dan titik kendali kritis suhu susu.', 'Audit', 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=600&q=80'),
('Penyerahan Sertifikat HACCP PT Segar Minuman Nusantara', 'Prosesi penyerahan sertifikat kelayakan sistem HACCP pasca pemenuhan audit kesesuaian.', 'Event', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'),
('Pelatihan Internal Calon Auditor Angkatan IV', 'Kegiatan peningkatan kompetensi teknis bagi para auditor internal keamanan pangan.', 'Pelatihan', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80'),
('Piagam Akreditasi Lembaga Sertifikasi KAN Resmi', 'Sertifikat akreditasi LSHACCP-009-IDN yang diserahkan oleh ketua KAN pusat.', 'Penghargaan', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=80')
ON CONFLICT DO NOTHING;

-- Data awal Berita
INSERT INTO public.berita (title, content, category, image_url)
VALUES
('PT Food Quality Certification Dapatkan Akreditasi Penuh dari KAN', 'Kami dengan bangga mengumumkan bahwa PT FOOD QUALITY CERTIFICATION secara resmi telah terakreditasi penuh oleh Komite Akreditasi Nasional (KAN) dengan nomor registrasi LSHACCP-009-IDN.', 'Pengumuman', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80'),
('Pentingnya Penerapan HACCP pada UMKM Kuliner Modern', 'Sistem Hazard Analysis and Critical Control Points (HACCP) kini tidak lagi hanya diperuntukkan bagi industri skala besar.', 'Edukasi', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80')
ON CONFLICT DO NOTHING;
