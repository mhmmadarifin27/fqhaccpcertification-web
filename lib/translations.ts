export type Language = "id" | "en";

export interface TranslationDictionary {
  // Navigation & Header
  nav: {
    home: string;
    profile: string;
    aboutUs: string;
    visionMission: string;
    structure: string;
    team: string;
    independence: string;
    scope: string;
    timeline: string;
    projects: string;
    gallery: string;
    faq: string;
    contact: string;
    adminPortal: string;
    applyCertification: string;
    accreditationTag: string;
  };

  // Hero Section
  hero: {
    slides: Array<{
      tagline: string;
      title: string;
      description: string;
      ctaText: string;
    }>;
    accreditedNotice: string;
  };

  // Corporate Trust & Stats
  trust: {
    activeClients: string;
    activeClientsDesc: string;
    leadAuditors: string;
    leadAuditorsDesc: string;
    satisfaction: string;
    satisfactionDesc: string;
    kanStatus: string;
    kanStatusDesc: string;
  };

  // Main Services Callout Container
  mainServices: {
    tagline: string;
    title: string;
    p1: string;
    p2: string;
    slogan1: string;
    slogan2: string;
  };

  // Why Choose Us Section
  whyUs: {
    tagline: string;
    title: string;
    subtitle: string;
    ctaButton: string;
    card1Tag: string;
    card1Title: string;
    card1Desc: string;
    card2Tag: string;
    card2Title: string;
    card2Desc: string;
    card3Tag: string;
    card3Title: string;
    card3Desc: string;
    card4Tag: string;
    card4Title: string;
    card4Desc: string;
    benefitsTitle: string;
    benefitsSubtitle: string;
    benefitsList: string[];
    targetTitle: string;
    targetSubtitle: string;
    targetList: string[];
  };

  // HACCP Certification Scope
  scope: {
    tagline: string;
    title: string;
    description: string;
    items: Array<{
      name: string;
      category: string;
      desc: string;
      icon: string;
      image: string;
    }>;
  };

  // 5-Step HACCP Timeline
  timeline: {
    tagline: string;
    title: string;
    description: string;
    steps: Array<{
      badge: string;
      title: string;
      description: string;
    }>;
  };

  // Inquiry / Application Form
  form: {
    tagline: string;
    title: string;
    description: string;
    companyName: string;
    companyNamePlaceholder: string;
    picName: string;
    picNamePlaceholder: string;
    companyAddress: string;
    companyAddressPlaceholder: string;
    picPhone: string;
    picPhonePlaceholder: string;
    picEmail: string;
    picEmailPlaceholder: string;
    industrySector: string;
    haccpStatus: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    ticketNumberLabel: string;
    newSubmissionButton: string;
    haccpOptions: {
      notImplemented: string;
      implementedNotCertified: string;
      recertification: string;
    };
    industryOptions: {
      catering: string;
      processing: string;
      beverage: string;
      slaughterhouse: string;
      storage: string;
      other: string;
    };
  };

  // Projects Section
  projects: {
    tagline: string;
    title: string;
    description: string;
    swipeHint: string;
    statusCertified: string;
  };

  // Gallery Section
  gallery: {
    tagline: string;
    title: string;
    description: string;
    swipeHint: string;
    filterAll: string;
    filterAudit: string;
    filterCertificate: string;
    filterTraining: string;
    filterKan: string;
    spotlightBadge: string;
    noPhotos: string;
    closePhoto: string;
  };

  // FAQ Section
  faq: {
    tagline: string;
    title: string;
    description: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };

  // Location & Office Section
  location: {
    tagline: string;
    title: string;
    description: string;
    addressTitle: string;
    addressSubtitle: string;
    hoursTitle: string;
    hoursWeekdays: string;
    hoursWeekend: string;
    whatsappTitle: string;
    emailTitle: string;
    openMaps: string;
  };

  // Team Page UI Labels
  teamUI: {
    filterAll: string;
    filterTphp: string;
    filterHalal: string;
    filterLead: string;
    leadBadge: string;
    showDetail: string;
    closeModal: string;
    educationHistory: string;
    workExperience: string;
    standardsTraining: string;
    haccpTraining: string;
    auditorQualification: string;
    noTraining: string;
  };

  // Footer Section
  footer: {
    companyDesc: string;
    quickLinks: string;
    contactInfo: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    kanLabel: string;
    copyright: string;
  };

  // Profile Pages Translations
  profilePages: {
    tentangKami: {
      title: string;
      subtitle: string;
      legalDesc: string;
      commitmentDesc: string;
    };
    visiMisi: {
      title: string;
      subtitle: string;
      visionTitle: string;
      visionDesc: string;
      missionTitle: string;
      missions: string[];
    };
    struktur: {
      title: string;
      subtitle: string;
      chartTitle: string;
      chartDesc: string;
    };
    tim: {
      title: string;
      subtitle: string;
      expertTitle: string;
      auditorTitle: string;
    };
    independensi: {
      title: string;
      subtitle: string;
      statementTitle: string;
      commitments: string[];
    };
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  id: {
    nav: {
      home: "Beranda",
      profile: "Profil",
      aboutUs: "Tentang Kami",
      visionMission: "Visi & Misi",
      structure: "Struktur Organisasi",
      team: "Tim Expert & Auditor",
      independence: "Komitmen Independensi",
      scope: "Ruang Lingkup Audit",
      timeline: "Alur Sertifikasi",
      projects: "Klien & Proyek",
      gallery: "Galeri Foto",
      faq: "FAQ",
      contact: "Kontak",
      adminPortal: "Portal Admin",
      applyCertification: "Ajukan Sertifikasi",
      accreditationTag: "Akreditasi KAN • LSHACCP-009-IDN",
    },
    hero: {
      slides: [
        {
          tagline: "LEMBAGA SERTIFIKASI HACCP TERAKREDITASI KAN",
          title: "Mitra Terpercaya dalam Sertifikasi Keamanan Pangan",
          description:
            "PT FOOD QUALITY CERTIFICATION hadir sebagai Lembaga Sertifikasi HACCP Terakreditasi Komite Akreditasi Nasional (KAN) yang berkomitmen membantu industri pangan menerapkan Sistem Hazard Analysis and Critical Control Points (HACCP) sesuai standar nasional dan internasional.",
          ctaText: "Ajukan Sertifikasi",
        },
        {
          tagline: "PROSES TRANSPARAN & INDEPENDEN",
          title: "Memastikan Integritas & Keamanan Pangan Anda",
          description:
            "Kami memberikan layanan sertifikasi yang independen, profesional, transparan, dan berintegritas untuk memastikan keamanan pangan serta meningkatkan daya saing bisnis Anda.",
          ctaText: "Konsultasi Sekarang",
        },
        {
          tagline: "FOOD SAFETY • QUALITY • TRUST",
          title: "Pengakuan Nasional & Kepercayaan Pelanggan",
          description:
            "Sertifikasi HACCP terakreditasi KAN memberikan jaminan mutu tinggi serta memperkuat kepercayaan pelanggan terhadap produk makanan dan minuman yang Anda hasilkan.",
          ctaText: "Ajukan Sertifikasi",
        },
      ],
      accreditedNotice: "Sertifikasi Terakreditasi KAN • Pengujian Independen & Objektif",
    },
    trust: {
      activeClients: "KLIEN TERDAFTAR",
      activeClientsDesc: "Perusahaan & UMKM Pangan",
      leadAuditors: "AUDITOR AHLI",
      leadAuditorsDesc: "Akademisi UGM & UIN",
      satisfaction: "KEPUASAN KLIEN",
      satisfactionDesc: "Proses Audit Transparan",
      kanStatus: "AKREDITASI KAN",
      kanStatusDesc: "LSHACCP-009-IDN Resmi",
    },
    mainServices: {
      tagline: "LAYANAN UTAMA",
      title: "Sertifikasi Keamanan Pangan HACCP",
      p1: "Kami menyediakan layanan Sertifikasi HACCP (Hazard Analysis and Critical Control Points) terakreditasi Komite Akreditasi Nasional (KAN) bagi berbagai sektor industri pangan di seluruh Indonesia.",
      p2: "Proses sertifikasi mencakup audit kecukupan dokumen, verifikasi audit lapangan secara komprehensif, hingga penerbitan sertifikat resmi untuk memastikan produk Anda memenuhi standar regulasi nasional dan pasar global.",
      slogan1: "Standar Mutu Pangan.",
      slogan2: "Pengakuan Resmi KAN.",
    },
    whyUs: {
      tagline: "KEUNGGULAN KAMI",
      title: "Alasan Memilih PT FOOD QUALITY CERTIFICATION",
      subtitle:
        "Sebagai mitra pilihan terpercaya, kami menawarkan jaminan mutu serta keunggulan berikut untuk mendukung sertifikasi sistem keamanan pangan di perusahaan Anda.",
      ctaButton: "Ajukan Sertifikasi HACCP",
      card1Tag: "Lembaga Sertifikasi",
      card1Title: "Terakreditasi KAN",
      card1Desc:
        "Seluruh rangkaian penilaian kesesuaian audit kami dievaluasi secara ketat dan independen berdasarkan pedoman Komite Akreditasi Nasional (KAN).",
      card2Tag: "Tenaga Ahli",
      card2Title: "Auditor Kompeten",
      card2Desc:
        "Didukung auditor profesional dengan sertifikasi kompetensi resmi bidang keamanan pangan.",
      card3Tag: "Integritas",
      card3Title: "Independensi Terjamin",
      card3Desc:
        "Menjunjung tinggi prinsip ketidakberpihakan dalam seluruh proses pengujian dan keputusan sertifikasi.",
      card4Tag: "Orientasi Pelanggan",
      card4Title: "Pelayanan Profesional",
      card4Desc:
        "Respon layanan yang cepat, administrasi transparan, serta jaminan mutu hasil audit.",
      benefitsTitle: "Manfaat Sertifikasi HACCP",
      benefitsSubtitle:
        "Dengan memperoleh Sertifikasi HACCP, perusahaan Anda akan mendapatkan berbagai keuntungan strategis:",
      benefitsList: [
        "Meningkatkan kepercayaan pelanggan terhadap keamanan produk.",
        "Memenuhi seluruh persyaratan regulasi keamanan pangan nasional.",
        "Mengendalikan risiko bahaya fisik, kimia, dan biologi secara konsisten.",
        "Memperkuat posisi tawar dan daya saing perusahaan di industri.",
        "Mempermudah akses masuk ke pasar nasional (ritel modern) maupun ekspor.",
        "Meningkatkan efisiensi biaya operasional melalui minimalisasi kegagalan produk.",
        "Membangun budaya sadar keamanan pangan yang berkelanjutan bagi seluruh staf.",
      ],
      targetTitle: "Siapa yang Membutuhkan HACCP?",
      targetSubtitle:
        "Sertifikasi HACCP sangat direkomendasikan bagi rantai industri pengolahan dan penyedia pangan berikut:",
      targetList: [
        "Industri Pengolahan Pangan",
        "Industri Minuman",
        "Rumah Potong Hewan",
        "Rumah Potong Unggas",
        "Cold Storage & Logistik Beku",
        "Catering & Jasa Boga",
        "Hotel & Restoran",
        "Kafe & Toko Roti (Bakery)",
        "Industri Seafood & Hasil Laut",
        "Dairy Industry & Olahan Susu",
        "Industri Frozen Food",
        "Industri Bumbu & Penyedap",
        "Industri Makanan Ringan",
        "Distributor Produk Pangan",
      ],
    },
    scope: {
      tagline: "LSHACCP-009-IDN • SEKTOR CAKUPAN AUDIT",
      title: "Ruang Lingkup Sertifikasi HACCP",
      description:
        "Kami melayani audit dan sertifikasi Sistem Keamanan Pangan HACCP untuk berbagai sub-sektor industri pangan.",
      items: [
        {
          name: "Industri Pengolahan Makanan",
          category: "INDUSTRI PANGAN",
          desc: "Pengolahan aneka pangan olahan basah maupun kering secara higienis.",
          image: "/hero1.jpg",
          icon: "🍲",
        },
        {
          name: "Industri Minuman",
          category: "MINUMAN",
          desc: "Produksi air minum, minuman kemasan, jus segar, dan sirup.",
          image: "/hero2.jpg",
          icon: "🥤",
        },
        {
          name: "Catering / Jasa Boga",
          category: "JASA BOGA",
          desc: "Penyedia makanan pesta, kantin kantor, rumah sakit, hingga maskapai.",
          image: "/iso.jpg",
          icon: "🍱",
        },
        {
          name: "Rumah Makan & Restoran",
          category: "HORECA",
          desc: "Sajian makanan langsung saji di outlet dengan jaminan higienitas tinggi.",
          image: "/hero1.jpg",
          icon: "🍳",
        },
        {
          name: "Bakery & Pastry",
          category: "INDUSTRI PANGAN",
          desc: "Pengolahan dan pemanggangan roti, kue kering, pastry, dan dessert.",
          image: "/hero2.jpg",
          icon: "🍞",
        },
        {
          name: "Dairy Industry",
          category: "OLAHAN SUSU",
          desc: "Pengolahan susu segar, keju, mentega premium, yogurt, dan es krim.",
          image: "/iso.jpg",
          icon: "🥛",
        },
        {
          name: "Seafood Processing",
          category: "INDUSTRI PERIKANAN",
          desc: "Pengolahan hasil laut seperti ikan, udang, dan kerang segar maupun beku.",
          image: "/hero1.jpg",
          icon: "🐟",
        },
        {
          name: "Meat Processing",
          category: "INDUSTRI PETERNAKAN",
          desc: "Pengolahan daging sapi, unggas, sosis, bakso, dan olahan beku.",
          image: "/hero2.jpg",
          icon: "🥩",
        },
        {
          name: "Cold Storage",
          category: "LOGISTIK PANGAN",
          desc: "Penyimpanan rantai dingin untuk menjaga kualitas produk pangan beku.",
          image: "/iso.jpg",
          icon: "❄️",
        },
        {
          name: "Distribusi Produk Pangan",
          category: "LOGISTIK PANGAN",
          desc: "Distribusi logistik dan pengantaran bahan pangan yang aman dan higienis.",
          image: "/hero1.jpg",
          icon: "🚚",
        },
        {
          name: "Industri Bahan Baku Pangan",
          category: "INDUSTRI PANGAN",
          desc: "Produksi tepung, bumbu dasar, pengawet alami, dan perisa makanan.",
          image: "/hero2.jpg",
          icon: "🌾",
        },
      ],
    },
    timeline: {
      tagline: "TRANSPARAN & TERSTRUKTUR",
      title: "Alur Proses Sertifikasi HACCP",
      description:
        "5 Tahapan utama audit sertifikasi HACCP mulai dari pengajuan permohonan hingga penerbitan sertifikat resmi.",
      steps: [
        {
          badge: "Tahapan 1",
          title: "Pengajuan Permohonan",
          description:
            "Organisasi mengajukan aplikasi permohonan sertifikasi beserta dokumen pendukung yang dipersyaratkan kepada tim administrasi kami.",
        },
        {
          badge: "Tahapan 2",
          title: "Review Permohonan",
          description:
            "Tim teknis kami melakukan kajian mendalam terhadap ruang lingkup usaha, kesiapan dokumen, dan kesepakatan jadwal audit.",
        },
        {
          badge: "Tahapan 3",
          title: "Audit Dokumen (Tahap 1)",
          description:
            "Evaluasi dokumentasi Sistem Manajemen Keamanan Pangan HACCP yang telah disusun oleh perusahaan untuk menguji kelayakannya.",
        },
        {
          badge: "Tahapan 4",
          title: "Audit Lapangan (Tahap 2)",
          description:
            "Audit verifikasi secara langsung di fasilitas produksi untuk memastikan keselarasan penerapannya di lapangan.",
        },
        {
          badge: "Tahapan 5",
          title: "Penerbitan Sertifikat Resmi",
          description:
            "Penerbitan Sertifikat HACCP Resmi Berlogo KAN setelah seluruh rekomendasi audit dinyatakan sesuai dan lengkap.",
        },
      ],
    },
    form: {
      tagline: "LSHACCP-009-IDN • PENDAFTARAN ONLINE",
      title: "Formulir Permohonan Sertifikasi HACCP",
      description:
        "Isi data perusahaan Anda di bawah ini untuk memulai pengajuan sertifikasi HACCP terakreditasi KAN. Tim kami akan menghubungi Anda dalam waktu 1x24 jam kerja.",
      companyName: "NAMA PERUSAHAAN / PERUSAHAAN PEMOHON *",
      companyNamePlaceholder: "Contoh: PT Boga Sejahtera Indonesia",
      picName: "NAMA LENGKAP PENANGGUNG JAWAB (PIC) *",
      picNamePlaceholder: "Contoh: Bpk. Ahmad Subagyo, S.T.",
      companyAddress: "ALAMAT LENGKAP PERUSAHAAN *",
      companyAddressPlaceholder: "Contoh: Jl. Industri Raya No. 45, Jakarta Selatan, DKI Jakarta",
      picPhone: "NOMOR WHATSAPP / TELEPON AKTIF *",
      picPhonePlaceholder: "Contoh: 0812-3456-7890",
      picEmail: "ALAMAT EMAIL RESMI PERUSAHAAN *",
      picEmailPlaceholder: "Contoh: quality@bogasejahtera.co.id",
      industrySector: "KATEGORI SEKTOR INDUSTRI PANGAN *",
      haccpStatus: "STATUS PENERAPAN HACCP SAAT INI *",
      messageLabel: "CATATAN TAMBAHAN / RUANG LINGKUP PRODUK",
      messagePlaceholder: "Jelaskan jenis produk, kapasitas produksi, atau pertanyaan khusus Anda...",
      submitButton: "Kirim Permohonan Sertifikasi HACCP",
      submitting: "Mengirim Permohonan...",
      successTitle: "Permohonan Sertifikasi Berhasil Dikirim!",
      successDesc:
        "Terima kasih atas kepercayaan Anda. Permohonan Anda telah tercatat secara resmi dalam database Lembaga Sertifikasi HACCP.",
      ticketNumberLabel: "NOMOR TIKET REGISTRASI:",
      newSubmissionButton: "+ Buat Pengajuan Baru",
      haccpOptions: {
        notImplemented: "Belum Menerapkan HACCP (Perlu Pendampingan Awal)",
        implementedNotCertified: "Sudah Menerapkan HACCP (Belum Bersertifikat KAN)",
        recertification: "Resertifikasi / Perpanjangan Masa Berlaku Sertifikat KAN",
      },
      industryOptions: {
        catering: "Jasa Boga / Katering / Restoran / SPPG",
        processing: "Pengolahan Daging & Hasil Ternak",
        beverage: "Pengolahan Pangan Olahan & Minuman Kemasan",
        slaughterhouse: "Rumah Potong Hewan (RPH/RPU)",
        storage: "Pergudangan & Rantai Pasok Cold Chain",
        other: "Sektor Industri Pangan Lainnya",
      },
    },
    projects: {
      tagline: "PENGALAMAN AUDIT",
      title: "Our Latest Projects",
      description:
        "Kami telah sukses mengaudit dan menerbitkan sertifikasi HACCP bagi berbagai unit bisnis terkemuka untuk memastikan pemenuhan regulasi keamanan pangan nasional dan internasional.",
      swipeHint: "👈 Geser ke kanan untuk melihat proyek lainnya 👉",
      statusCertified: "Status: Certified",
    },
    gallery: {
      tagline: "DOKUMENTASI FOTO LAPANGAN",
      title: "Galeri Audit & Penyerahan Sertifikat",
      description:
        "Bukti rekam komitmen audit kesesuaian dan penjaminan mutu keamanan pangan di berbagai sektor industri.",
      swipeHint: "👈 Geser ke kanan untuk melihat foto lainnya 👉",
      filterAll: "Semua Foto",
      filterAudit: "Audit Lapangan",
      filterCertificate: "Penyerahan Sertifikat",
      filterTraining: "Pelatihan",
      filterKan: "Akreditasi KAN",
      spotlightBadge: "★ DOKUMENTASI UTAMA",
      noPhotos: "Tidak ada dokumentasi foto dalam kategori ini.",
      closePhoto: "Tutup foto",
    },
    faq: {
      tagline: "TANYA JAWAB",
      title: "FAQ untuk Sertifikasi HACCP",
      description: "Temukan jawaban atas pertanyaan seputar persyaratan, proses, dan manfaat sertifikasi HACCP.",
      items: [
        {
          q: "1. Apa itu HACCP?",
          a: "HACCP (Hazard Analysis and Critical Control Point) adalah sistem untuk mengidentifikasi, mengevaluasi, dan mengendalikan bahaya yang dapat memengaruhi keamanan pangan.",
        },
        {
          q: "2. Mengapa perusahaan perlu sertifikasi HACCP?",
          a: "Sertifikasi HACCP membantu memastikan sistem pengendalian keamanan pangan diterapkan secara sistematis serta meningkatkan kepercayaan pelanggan dan mitra bisnis.",
        },
        {
          q: "3. Siapa yang dapat mengajukan sertifikasi HACCP?",
          a: "Sertifikasi HACCP dapat diajukan oleh organisasi yang bergerak dalam rantai pangan, seperti industri pangan, katering, restoran, jasa boga, penyimpanan, distribusi, dan bidang terkait lainnya.",
        },
        {
          q: "4. Apa saja yang perlu disiapkan untuk sertifikasi HACCP?",
          a: "Perusahaan perlu menyiapkan sistem HACCP, termasuk analisis bahaya, pengendalian CCP, prosedur monitoring, tindakan koreksi, verifikasi, serta dokumentasi dan rekaman yang diperlukan.",
        },
        {
          q: "5. Bagaimana proses sertifikasi HACCP?",
          a: "Prosesnya meliputi pengajuan permohonan, kajian, audit, penyelesaian ketidaksesuaian (jika ada), keputusan sertifikasi, dan penerbitan sertifikat.",
        },
        {
          q: "6. Berapa lama proses sertifikasi HACCP?",
          a: "Waktu proses bergantung pada ukuran organisasi, kompleksitas proses, jumlah produk atau lokasi, serta kesiapan perusahaan sebelum audit.",
        },
        {
          q: "7. Berapa lama sertifikat HACCP berlaku?",
          a: "Masa berlaku sertifikat mengikuti skema sertifikasi dan ketentuan yang berlaku. Selama masa berlaku, dapat dilakukan audit atau surveilans sesuai ketentuan.",
        },
        {
          q: "8. Apakah setelah mendapatkan sertifikat masih dilakukan audit?",
          a: "Ya. Audit atau surveilans dilakukan sesuai skema sertifikasi untuk memastikan sistem HACCP tetap diterapkan dan dipelihara secara konsisten.",
        },
        {
          q: "9. Apakah UMKM dapat mengajukan sertifikasi HACCP?",
          a: "Ya. UMKM dapat mengajukan sertifikasi sepanjang memenuhi persyaratan dan ruang lingkup sertifikasi yang berlaku.",
        },
        {
          q: "10. Bagaimana cara mengajukan sertifikasi HACCP?",
          a: "Hubungi Lembaga Sertifikasi HACCP kami untuk mengajukan permohonan dan mendapatkan informasi mengenai persyaratan, proses, jadwal, dan biaya sertifikasi.",
        },
      ],
    },
    location: {
      tagline: "LOKASI KANTOR PERUSAHAAN",
      title: "Kantor Operasional PT Food Quality Certification",
      description:
        "Kunjungi lokasi kantor resmi kami untuk konsultasi langsung atau verifikasi dokumen sertifikasi HACCP.",
      addressTitle: "Alamat Lengkap Resmi",
      addressSubtitle: "DI YOGYAKARTA HEADQUARTERS",
      hoursTitle: "Jam Operasional Kantor:",
      hoursWeekdays: "Senin – Jumat: 08.00 – 17.00 WIB",
      hoursWeekend: "Sabtu – Minggu: Tutup (Audit Lapangan Only)",
      whatsappTitle: "Kontak WhatsApp:",
      emailTitle: "Email Resmi:",
      openMaps: "Buka di Google Maps",
    },
    teamUI: {
      filterAll: "Semua Anggota",
      filterTphp: "Tenaga Ahli TPHP UGM",
      filterHalal: "Auditor Halal UIN",
      filterLead: "Akademisi & Lead Auditor",
      leadBadge: "Lead Professional",
      showDetail: "Tampilkan Detail",
      closeModal: "Tutup Detail Profile",
      educationHistory: "Riwayat Pendidikan:",
      workExperience: "Pengalaman Kerja",
      standardsTraining: "Pelatihan Terkait Standar Mutu",
      haccpTraining: "Pelatihan HACCP / Keamanan Pangan",
      auditorQualification: "Kualifikasi & Pengalaman Auditor",
      noTraining: "Tidak ada pelatihan tercatat",
    },
    footer: {
      companyDesc:
        "Lembaga Sertifikasi HACCP Terakreditasi Komite Akreditasi Nasional (KAN) No. LSHACCP-009-IDN. Berkomitmen memberikan layanan sertifikasi keamanan pangan yang independen, profesional, dan terpercaya.",
      quickLinks: "Tautan Cepat",
      contactInfo: "Kontak & Alamat Kantor",
      addressLabel: "ALAMAT RESMI:",
      phoneLabel: "WHATSAPP / TELEPON:",
      emailLabel: "EMAIL RESMI:",
      kanLabel: "STATUS AKREDITASI KAN:",
      copyright: "© 2026 PT Food Quality Certification. All Rights Reserved.",
    },
    profilePages: {
      tentangKami: {
        title: "Tentang PT Food Quality Certification",
        subtitle: "Lembaga Sertifikasi HACCP Terakreditasi KAN (LSHACCP-009-IDN)",
        legalDesc:
          "PT Food Quality Certification beroperasi secara sah berdasarkan hukum Republik Indonesia dan terakreditasi resmi oleh Komite Akreditasi Nasional (KAN) sebagai Lembaga Sertifikasi Sistem Hazard Analysis and Critical Control Points (LSHACCP-009-IDN).",
        commitmentDesc:
          "Kami mengutamakan independensi, ketidakberpihakan, dan keahlian teknis tinggi dalam setiap tahap penilaian kesesuaian sistem keamanan pangan.",
      },
      visiMisi: {
        title: "Visi & Misi Perusahaan",
        subtitle: "Arah Strategis & Pedoman Mutu Lembaga Sertifikasi HACCP",
        visionTitle: "Visi Utama Perusahaan",
        visionDesc:
          "Menjadi Lembaga Sertifikasi HACCP Terkemuka, Terpercaya, dan Berdaya Saing Internasional dalam Menjamin Keamanan dan Mutu Pangan Nasional.",
        missionTitle: "Misi Strategis",
        missions: [
          "Menyelenggarakan jasa audit dan sertifikasi HACCP yang independen, objektif, dan sesuai standar internasional.",
          "Mendorong penerapan sistem keamanan pangan yang berkelanjutan pada seluruh rantai pasok industri pangan Indonesia.",
          "Meningkatkan kompetensi SDM auditor dan tenaga ahli keamanan pangan secara berkelanjutan.",
          "Memberikan nilai tambah bagi klien melalui penilaian kesesuaian mutu pangan yang akurat dan transparan.",
        ],
      },
      struktur: {
        title: "Struktur Organisasi Lembaga",
        subtitle: "Tata Kelola Manajemen Independen PT Food Quality Certification",
        chartTitle: "Bagan Struktur Organisasi & Dewan Pengawas Independensi",
        chartDesc:
          "Struktur kepemimpinan disusun untuk menjamin ketidakberpihakan panitia teknis, manajer mutu, dan auditor ahli.",
      },
      tim: {
        title: "Tim Expert & Auditor Ahli",
        subtitle: "Tenaga Ahli Berkualifikasi dari Akademisi TPHP UGM & UIN Sunan Kalijaga",
        expertTitle: "Tenaga Ahli Keamanan Pangan UGM",
        auditorTitle: "Auditor Halal & HACCP UIN Sunan Kalijaga",
      },
      independensi: {
        title: "Komitmen Independensi & Ketidakberpihakan",
        subtitle: "Pernyataan Keamanan Manajemen Impartialitas Sertifikasi",
        statementTitle: "Pernyataan Resmi Komitmen Independensi",
        commitments: [
          "Tidak memberikan jasa konsultasi HACCP kepada klien yang diaudit untuk mencegah konflik kepentingan.",
          "Manajemen dan auditor tidak dipengaruhi oleh tekanan komersial, finansial, atau tekanan lainnya.",
          "Menjamin kerahasiaan seluruh data audit dan informasi perusahaan klien.",
          "Menjamin keputusan sertifikasi didasarkan murni pada bukti objektif hasil evaluasi lapangan.",
        ],
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      profile: "Profile",
      aboutUs: "About Us",
      visionMission: "Vision & Mission",
      structure: "Organization Structure",
      team: "Experts & Auditors",
      independence: "Impartiality Commitment",
      scope: "Audit Scope",
      timeline: "Certification Process",
      projects: "Clients & Projects",
      gallery: "Photo Gallery",
      faq: "FAQ",
      contact: "Contact",
      adminPortal: "Admin Portal",
      applyCertification: "Apply for Certification",
      accreditationTag: "KAN Accredited • LSHACCP-009-IDN",
    },
    hero: {
      slides: [
        {
          tagline: "KAN ACCREDITED HACCP CERTIFICATION BODY",
          title: "Trusted Partner in Food Safety Certification",
          description:
            "PT FOOD QUALITY CERTIFICATION is a KAN Accredited HACCP Certification Body (No. LSHACCP-009-IDN) committed to helping the food industry implement Hazard Analysis and Critical Control Points (HACCP) systems according to national and international standards.",
          ctaText: "Apply for Certification",
        },
        {
          tagline: "TRANSPARENT & INDEPENDENT AUDIT PROCESS",
          title: "Ensuring Integrity & Food Safety Compliance",
          description:
            "We provide independent, professional, transparent, and objective certification services to guarantee food safety compliance and enhance your market competitiveness.",
          ctaText: "Consult Now",
        },
        {
          tagline: "FOOD SAFETY • QUALITY • TRUST",
          title: "National Recognition & Consumer Trust",
          description:
            "KAN accredited HACCP certification delivers high quality assurance while reinforcing customer confidence in your food and beverage products.",
          ctaText: "Apply for Certification",
        },
      ],
      accreditedNotice: "KAN Accredited Certification • Independent & Objective Assessment",
    },
    trust: {
      activeClients: "REGISTERED CLIENTS",
      activeClientsDesc: "Food Companies & SMEs",
      leadAuditors: "LEAD AUDITORS",
      leadAuditorsDesc: "UGM & UIN Academics",
      satisfaction: "CLIENT SATISFACTION",
      satisfactionDesc: "Transparent Audit Process",
      kanStatus: "KAN ACCREDITATION",
      kanStatusDesc: "Official LSHACCP-009-IDN",
    },
    mainServices: {
      tagline: "PRIMARY SERVICES",
      title: "HACCP Food Safety Certification",
      p1: "We provide National Accreditation Committee (KAN) accredited HACCP (Hazard Analysis and Critical Control Points) Certification services for various food industry sectors across Indonesia.",
      p2: "The certification process includes document adequacy audits, comprehensive on-site verification audits, and the issuance of official certificates to ensure your products meet national regulatory standards and global market demands.",
      slogan1: "Food Quality Standards.",
      slogan2: "Official KAN Recognition.",
    },
    whyUs: {
      tagline: "OUR ADVANTAGES",
      title: "Why Choose PT FOOD QUALITY CERTIFICATION",
      subtitle:
        "As your trusted partner of choice, we offer quality assurance and the following advantages to support food safety management certification in your company.",
      ctaButton: "Apply for HACCP Certification",
      card1Tag: "Certification Body",
      card1Title: "KAN Accredited",
      card1Desc:
        "All our audit conformity assessment procedures are evaluated strictly and independently according to National Accreditation Committee (KAN) guidelines.",
      card2Tag: "Expert Team",
      card2Title: "Competent Lead Auditors",
      card2Desc:
        "Supported by certified professional lead auditors with recognized competence in food safety systems.",
      card3Tag: "Integrity",
      card3Title: "Guaranteed Impartiality",
      card3Desc:
        "Upholding strict impartiality principles across all testing, evaluation, and certification decision processes.",
      card4Tag: "Customer Orientation",
      card4Title: "Professional Service",
      card4Desc:
        "Prompt service responsiveness, transparent administration, and rigorous audit quality standards.",
      benefitsTitle: "Benefits of HACCP Certification",
      benefitsSubtitle:
        "By obtaining official HACCP Certification, your enterprise gains essential strategic advantages:",
      benefitsList: [
        "Strengthens customer confidence in product quality and hygiene.",
        "Fulfills all mandatory national food safety regulatory requirements.",
        "Consistently controls physical, chemical, and biological hazard risks.",
        "Enhances commercial bargaining power and competitive positioning.",
        "Facilitates seamless entry into modern retail networks and export markets.",
        "Improves cost efficiency by minimizing batch recalls and product defects.",
        "Fosters a lasting food safety culture across all organizational levels.",
      ],
      targetTitle: "Who Needs HACCP Certification?",
      targetSubtitle:
        "HACCP Certification is strongly recommended for the following food processing and supply chain sectors:",
      targetList: [
        "Food Processing Industry",
        "Beverage Industry",
        "Animal Slaughterhouses",
        "Poultry Processing Facilities",
        "Cold Storage & Frozen Logistics",
        "Catering & Commercial Kitchens",
        "Hotels & Restaurants",
        "Cafes & Bakeries",
        "Seafood & Fisheries Processing",
        "Dairy Industry & Milk Processing",
        "Frozen Food Manufacturers",
        "Seasoning & Flavoring Industry",
        "Snack Food Industry",
        "Food Product Distributors",
      ],
    },
    scope: {
      tagline: "LSHACCP-009-IDN • AUDIT SCOPE SECTORS",
      title: "HACCP Certification Scope",
      description:
        "We provide HACCP Food Safety System audit and certification services for various sub-sectors of the food industry.",
      items: [
        {
          name: "Food Processing Industry",
          category: "FOOD INDUSTRY",
          desc: "Hygienic processing of dry and wet packaged processed foods.",
          image: "/hero1.jpg",
          icon: "🍲",
        },
        {
          name: "Beverage Industry",
          category: "BEVERAGES",
          desc: "Production of drinking water, packaged beverages, fresh juices, and syrups.",
          image: "/hero2.jpg",
          icon: "🥤",
        },
        {
          name: "Catering & Food Services",
          category: "FOOD SERVICES",
          desc: "Event catering, office canteens, hospital dining, and airline catering.",
          image: "/iso.jpg",
          icon: "🍱",
        },
        {
          name: "Restaurants & Dining Outlets",
          category: "HORECA",
          desc: "Ready-to-eat restaurant dining with high hygiene standards.",
          image: "/hero1.jpg",
          icon: "🍳",
        },
        {
          name: "Bakery & Pastry",
          category: "FOOD INDUSTRY",
          desc: "Processing and baking of breads, cookies, pastries, and desserts.",
          image: "/hero2.jpg",
          icon: "🍞",
        },
        {
          name: "Dairy Industry",
          category: "DAIRY PRODUCTS",
          desc: "Processing of fresh milk, cheese, premium butter, yogurt, and ice cream.",
          image: "/iso.jpg",
          icon: "🥛",
        },
        {
          name: "Seafood Processing",
          category: "FISHERIES",
          desc: "Processing of marine products including fish, shrimp, and shellfish.",
          image: "/hero1.jpg",
          icon: "🐟",
        },
        {
          name: "Meat Processing",
          category: "LIVESTOCK INDUSTRY",
          desc: "Processing of beef, poultry, sausages, meatballs, and frozen meats.",
          image: "/hero2.jpg",
          icon: "🥩",
        },
        {
          name: "Cold Storage",
          category: "FOOD LOGISTICS",
          desc: "Cold chain storage maintaining frozen food quality and safety.",
          image: "/iso.jpg",
          icon: "❄️",
        },
        {
          name: "Food Product Distribution",
          category: "FOOD LOGISTICS",
          desc: "Logistics distribution and safe transport of food materials.",
          image: "/hero1.jpg",
          icon: "🚚",
        },
        {
          name: "Food Raw Material Industry",
          category: "FOOD INDUSTRY",
          desc: "Production of flour, basic seasonings, natural preservatives, and flavorings.",
          image: "/hero2.jpg",
          icon: "🌾",
        },
      ],
    },
    timeline: {
      tagline: "TRANSPARENT & STRUCTURED",
      title: "HACCP Certification Process Flow",
      description:
        "5 Primary HACCP audit certification stages from application submission to official certificate issuance.",
      steps: [
        {
          badge: "Stage 1",
          title: "Application Submission",
          description:
            "Organization submits certification application form and required supporting documentation to our administration team.",
        },
        {
          badge: "Stage 2",
          title: "Application Review",
          description:
            "Our technical team reviews scope of business, document readiness, and agrees on the audit schedule.",
        },
        {
          badge: "Stage 3",
          title: "Document Audit (Stage 1)",
          description:
            "Evaluation of HACCP Food Safety Management System manual documentation to verify adequacy.",
        },
        {
          badge: "Stage 4",
          title: "On-Site Audit (Stage 2)",
          description:
            "On-site verification audit at production facilities to ensure practical field implementation.",
        },
        {
          badge: "Stage 5",
          title: "Official Certificate Issuance",
          description:
            "Issuance of Official KAN Accredited HACCP Certificate upon successful resolution of all audit findings.",
        },
      ],
    },
    form: {
      tagline: "LSHACCP-009-IDN • ONLINE REGISTRATION",
      title: "HACCP Certification Application Form",
      description:
        "Fill in your company details below to initiate your KAN accredited HACCP certification request. Our team will contact you within 1x24 business hours.",
      companyName: "COMPANY NAME / APPLICANT ORGANIZATION *",
      companyNamePlaceholder: "Example: PT Boga Sejahtera Indonesia",
      picName: "FULL NAME OF PERSON IN CHARGE (PIC) *",
      picNamePlaceholder: "Example: Mr. Ahmad Subagyo, S.T.",
      companyAddress: "COMPLETE COMPANY ADDRESS *",
      companyAddressPlaceholder: "Example: 45 Industrial Road, South Jakarta, DKI Jakarta",
      picPhone: "ACTIVE WHATSAPP / PHONE NUMBER *",
      picPhonePlaceholder: "Example: +62 812-3456-7890",
      picEmail: "OFFICIAL COMPANY EMAIL ADDRESS *",
      picEmailPlaceholder: "Example: quality@bogasejahtera.co.id",
      industrySector: "FOOD INDUSTRY SECTOR CATEGORY *",
      haccpStatus: "CURRENT HACCP IMPLEMENTATION STATUS *",
      messageLabel: "ADDITIONAL NOTES / PRODUCT SCOPE",
      messagePlaceholder: "Describe product lines, production capacity, or specific inquiries...",
      submitButton: "Submit HACCP Certification Application",
      submitting: "Submitting Application...",
      successTitle: "Certification Application Successfully Sent!",
      successDesc:
        "Thank you for your trust. Your application has been officially recorded in our HACCP Certification Body database.",
      ticketNumberLabel: "REGISTRATION TICKET NUMBER:",
      newSubmissionButton: "+ Submit Another Application",
      haccpOptions: {
        notImplemented: "HACCP Not Yet Implemented (Need Initial Guidance)",
        implementedNotCertified: "HACCP Implemented (Not Yet KAN Certified)",
        recertification: "Recertification / Renewal of KAN Certificate Validity",
      },
      industryOptions: {
        catering: "Catering / Restaurants / Food Services",
        processing: "Meat Processing & Animal Products",
        beverage: "Processed Foods & Packaged Beverages",
        slaughterhouse: "Slaughterhouses (Abattoir / Poultry)",
        storage: "Warehousing & Cold Chain Logistics",
        other: "Other Food Industry Sectors",
      },
    },
    projects: {
      tagline: "AUDIT EXPERIENCE",
      title: "Our Latest Projects",
      description:
        "We have successfully audited and certified HACCP compliance for leading enterprises to ensure adherence to national and international food safety regulations.",
      swipeHint: "👈 Swipe right to view more projects 👉",
      statusCertified: "Status: Certified",
    },
    gallery: {
      tagline: "FIELD AUDIT PHOTO DOCUMENTATION",
      title: "Audit Gallery & Certificate Handover",
      description:
        "Visual evidence demonstrating audit conformity and food safety quality assurance across food industry sectors.",
      swipeHint: "👈 Swipe right to view more photos 👉",
      filterAll: "All Photos",
      filterAudit: "Field Audit",
      filterCertificate: "Certificate Handover",
      filterTraining: "Training",
      filterKan: "KAN Accreditation",
      spotlightBadge: "★ SPOTLIGHT DOCUMENTATION",
      noPhotos: "No photo documentation in this category.",
      closePhoto: "Close photo",
    },
    faq: {
      tagline: "FREQUENTLY ASKED QUESTIONS",
      title: "FAQ for HACCP Certification",
      description: "Find clear answers to essential questions regarding the HACCP certification requirements and process.",
      items: [
        {
          q: "1. What is HACCP?",
          a: "HACCP (Hazard Analysis and Critical Control Point) is a system used to identify, evaluate, and control hazards that can affect food safety.",
        },
        {
          q: "2. Why do companies need HACCP certification?",
          a: "HACCP certification helps ensure that food safety control systems are implemented systematically, while enhancing customer and business partner confidence.",
        },
        {
          q: "3. Who can apply for HACCP certification?",
          a: "HACCP certification can be applied for by organizations operating across the food chain, such as food processing industries, catering, restaurants, food services, storage, distribution, and other related sectors.",
        },
        {
          q: "4. What needs to be prepared for HACCP certification?",
          a: "Companies need to establish a HACCP system, including hazard analysis, CCP controls, monitoring procedures, corrective actions, verification, as well as required documentation and records.",
        },
        {
          q: "5. How is the HACCP certification process conducted?",
          a: "The process includes application submission, document review, audit, non-conformity resolution (if any), certification decision, and certificate issuance.",
        },
        {
          q: "6. How long does the HACCP certification process take?",
          a: "The timeline depends on the organization's size, process complexity, number of products or locations, and the company's readiness prior to the audit.",
        },
        {
          q: "7. How long is a HACCP certificate valid?",
          a: "The validity period follows the applicable certification scheme and regulations. During the validity period, periodic surveillance audits may be conducted as required.",
        },
        {
          q: "8. Are audits still conducted after obtaining the certificate?",
          a: "Yes. Surveillance audits are performed according to the certification scheme to ensure the HACCP system remains consistently implemented and maintained.",
        },
        {
          q: "9. Can MSMEs (UMKM) apply for HACCP certification?",
          a: "Yes. MSMEs can apply for certification as long as they meet the applicable requirements and certification scope.",
        },
        {
          q: "10. How to apply for HACCP certification?",
          a: "Contact our HACCP Certification Body to submit an application and obtain information regarding requirements, process, schedule, and certification fees.",
        },
      ],
    },
    location: {
      tagline: "HEADQUARTERS LOCATION",
      title: "Operational Office of PT Food Quality Certification",
      description:
        "Visit our official headquarters for direct consultation or HACCP certification document verification.",
      addressTitle: "Official Full Address",
      addressSubtitle: "DI YOGYAKARTA HEADQUARTERS",
      hoursTitle: "Office Working Hours:",
      hoursWeekdays: "Monday – Friday: 08:00 AM – 05:00 PM WIB",
      hoursWeekend: "Saturday – Sunday: Closed (On-Site Audits Only)",
      whatsappTitle: "WhatsApp Contact:",
      emailTitle: "Official Email:",
      openMaps: "Open in Google Maps",
    },
    teamUI: {
      filterAll: "All Members",
      filterTphp: "TPHP UGM Experts",
      filterHalal: "UIN Halal Auditors",
      filterLead: "Academics & Lead Auditors",
      leadBadge: "Lead Professional",
      showDetail: "View Details",
      closeModal: "Close Profile Details",
      educationHistory: "Education Background:",
      workExperience: "Professional Experience",
      standardsTraining: "Quality Standards Training",
      haccpTraining: "HACCP & Food Safety Training",
      auditorQualification: "Auditor Qualifications & Experience",
      noTraining: "No training record",
    },
    footer: {
      companyDesc:
        "KAN Accredited HACCP Certification Body (No. LSHACCP-009-IDN). Committed to providing independent, professional, and trusted food safety certification services.",
      quickLinks: "Quick Links",
      contactInfo: "Contact & Head Office",
      addressLabel: "HEAD OFFICE ADDRESS:",
      phoneLabel: "WHATSAPP / PHONE:",
      emailLabel: "OFFICIAL EMAIL:",
      kanLabel: "KAN ACCREDITATION STATUS:",
      copyright: "© 2026 PT Food Quality Certification. All Rights Reserved.",
    },
    profilePages: {
      tentangKami: {
        title: "About PT Food Quality Certification",
        subtitle: "KAN Accredited HACCP Certification Body (LSHACCP-009-IDN)",
        legalDesc:
          "PT Food Quality Certification operates legally under the laws of the Republic of Indonesia and is officially accredited by the National Accreditation Committee (KAN) as a Hazard Analysis and Critical Control Points Certification Body (LSHACCP-009-IDN).",
        commitmentDesc:
          "We prioritize independence, impartiality, and high technical competence throughout all stages of food safety management conformity assessment.",
      },
      visiMisi: {
        title: "Company Vision & Mission",
        subtitle: "Strategic Direction & Quality Guidelines of the Certification Body",
        visionTitle: "Core Corporate Vision",
        visionDesc:
          "To become a Leading, Trusted, and Internationally Competitive HACCP Certification Body in Safeguarding National Food Safety and Quality.",
        missionTitle: "Strategic Missions",
        missions: [
          "To provide independent, objective, and international-standard HACCP audit and certification services.",
          "To promote sustainable food safety management systems across the Indonesian food industry supply chain.",
          "To continuously enhance the technical competence of lead auditors and food safety experts.",
          "To deliver value to clients through accurate, transparent, and rigorous food quality conformity assessments.",
        ],
      },
      struktur: {
        title: "Organizational Structure",
        subtitle: "Independent Governance Structure of PT Food Quality Certification",
        chartTitle: "Organizational Structure & Impartiality Committee",
        chartDesc:
          "Leadership structure designed to ensure complete impartiality of technical committees, quality managers, and lead auditors.",
      },
      tim: {
        title: "Expert Team & Lead Auditors",
        subtitle: "Highly Qualified Academics & Auditors from TPHP UGM & UIN Sunan Kalijaga",
        expertTitle: "Food Safety Experts from UGM",
        auditorTitle: "Halal & HACCP Auditors from UIN Sunan Kalijaga",
      },
      independensi: {
        title: "Commitment to Impartiality & Independence",
        subtitle: "Official Management Statement on Certification Impartiality",
        statementTitle: "Official Statement of Independence",
        commitments: [
          "We do not provide HACCP consultancy services to audited clients to prevent conflicts of interest.",
          "Management and auditors operate free from any commercial, financial, or external pressures.",
          "Full confidentiality of client data, audit findings, and proprietary company information is guaranteed.",
          "Certification decisions are based strictly on objective evidence obtained during field assessments.",
        ],
      },
    },
  },
};
