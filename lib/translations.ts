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
    visitorInfo: string;
    trainingList: string;
    haccpDocs: string;
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
      subtitle: string;
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
      bakery: string;
      meat: string;
      specialDietary: string;
      foodService: string;
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

  // Training Callout Section (Homepage)
  trainingCallout: {
    tagline: string;
    title: string;
    description1: string;
    description2: string;
    badge: string;
    ctaButton: string;
    topics: string[];
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

  // Training Program Page
  trainingPage: {
    tagline: string;
    title: string;
    subtitle: string;
    catalogTitle: string;
    catalogSubtitle: string;
    formTitle: string;
    formSubtitle: string;
    registeredCount: string;
    programs: Array<{
      id: string;
      code: string;
      title: string;
      category: string;
      duration: string;
      method: string;
      description: string;
      syllabus: string[];
      benefits: string[];
    }>;
  };

  // Pre-Audit HACCP Document Submission Page
  haccpDocsPage: {
    tagline: string;
    title: string;
    subtitle: string;
    guideTitle: string;
    guideSubtitle: string;
    section1Title: string;
    section1Desc: string;
    section2Title: string;
    section2Desc: string;
    section3Title: string;
    section3Desc: string;
    formTitle: string;
    formSubtitle: string;
    lookupLabel: string;
    lookupPlaceholder: string;
    lookupButton: string;
    lookupFound: string;
    lookupNotFound: string;
    manualToggle: string;
    changeLookup: string;
    applyPrompt: string;
    applyLink: string;
  };
};

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
      projects: "Info Pelatihan",
      gallery: "Galeri Foto",
      faq: "FAQ",
      contact: "Kontak",
      visitorInfo: "Info Pengunjung",
      trainingList: "Daftar Pelatihan",
      haccpDocs: "Berkas HACCP",
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
      leadAuditorsDesc: "Auditor Profesional & Berpengalaman",
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
        "Sertifikasi HACCP diwajibkan dan direkomendasikan bagi 4 sektor ruang lingkup industri pengolahan pangan berikut:",
      targetList: [
        "Produk bakeri",
        "Daging dan produk daging",
        "Pangan olahan untuk keperluan gizi khusus",
        "Jasa Boga / Pelayanan Pangan / SPPG",
      ],
    },
    scope: {
      tagline: "LSHACCP-009-IDN • 4 SEKTOR RUANG LINGKUP AUDIT",
      title: "Ruang Lingkup Sertifikasi HACCP",
      description:
        "PT Food Quality Certification melayani audit kesesuaian dan sertifikasi Sistem Manajemen Keamanan Pangan HACCP untuk 4 sektor ruang lingkup resmi:",
      items: [
        {
          name: "Produk Bakeri",
          category: "RUANG LINGKUP 1",
          desc: "Lini produksi aneka roti tawar/manis, kue basah, pastry, cake, biskuit, dan olahan tepung bakeri skala industri.",
          image: "/hero1.jpg",
          icon: "🍞",
        },
        {
          name: "Daging dan Produk Daging",
          category: "RUANG LINGKUP 2",
          desc: "Fasilitas pemotongan, penanganan, dan pengolahan daging sapi, unggas, sosis, bakso, nugget, serta aneka olahan daging beku.",
          image: "/hero2.jpg",
          icon: "🥩",
        },
        {
          name: "Pangan Olahan untuk Keperluan Gizi Khusus",
          category: "RUANG LINGKUP 3",
          desc: "Formulasi dan pengolahan pangan formula bayi/MP-ASI, makanan diet medis khusus, pangan fungsional, serta produk bernutrisi khusus.",
          image: "/iso.jpg",
          icon: "🥣",
        },
        {
          name: "Jasa Boga / Pelayanan Pangan / SPPG",
          category: "RUANG LINGKUP 4",
          desc: "Sentra Pengolahan Pangan Gizi (SPPG), katering industri & maskapai, penyedia makanan institusional, serta dapur pelayanan pangan massal.",
          image: "/hccp1.jpg",
          icon: "🍱",
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
          subtitle: "Isi formulir & berkas",
          description:
            "Organisasi mengajukan aplikasi permohonan sertifikasi beserta dokumen pendukung yang dipersyaratkan kepada tim administrasi kami.",
        },
        {
          badge: "Tahapan 2",
          title: "Review Permohonan",
          subtitle: "Kajian teknis & jadwal",
          description:
            "Tim teknis kami melakukan kajian mendalam terhadap ruang lingkup usaha, kesiapan dokumen, dan kesepakatan jadwal audit.",
        },
        {
          badge: "Tahapan 3",
          title: "Audit Dokumen (Tahap 1)",
          subtitle: "Evaluasi dokumen HACCP",
          description:
            "Evaluasi dokumentasi Sistem Manajemen Keamanan Pangan HACCP yang telah disusun oleh perusahaan untuk menguji kelayakannya.",
        },
        {
          badge: "Tahapan 4",
          title: "Audit Lapangan (Tahap 2)",
          subtitle: "Verifikasi lapangan",
          description:
            "Audit verifikasi secara langsung di fasilitas produksi untuk memastikan keselarasan penerapannya di lapangan.",
        },
        {
          badge: "Tahapan 5",
          title: "Penerbitan Sertifikat Resmi",
          subtitle: "Sertifikat resmi KAN",
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
      industrySector: "KATEGORI SEKTOR RUANG LINGKUP INDUSTRI PANGAN *",
      haccpStatus: "STATUS PENERAPAN HACCP SAAT INI *",
      messageLabel: "CATATAN TAMBAHAN / DETAIL RUANG LINGKUP PRODUK",
      messagePlaceholder: "Jelaskan jenis produk pangan, lini proses, atau kebutuhan sertifikasi khusus Anda...",
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
        bakery: "Produk Bakeri",
        meat: "Daging dan Produk Daging",
        specialDietary: "Pangan Olahan untuk Keperluan Gizi Khusus",
        foodService: "Jasa Boga / Pelayanan Pangan / SPPG",
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
    trainingCallout: {
      tagline: "LAYANAN PELATIHAN PROFESIONAL",
      title: "Pelatihan & Bimbingan Teknis Keamanan Pangan HACCP",
      description1:
        "PT FOOD QUALITY CERTIFICATION menyelenggarakan program pelatihan terstruktur untuk meningkatkan kapasitas SDM industri pangan, mencakup pemahaman prinsip HACCP, sistem CPPOB/GMP, hingga kualifikasi Internal Auditor bersertifikat.",
      description2:
        "Pelatihan dipandu langsung oleh Lead Auditor berpengalaman dan praktisi industri, dengan metode fleksibel baik secara online webinar maupun in-house training di perusahaan Anda.",
      badge: "Sertifikat Berbarcode Resmi & Terverifikasi",
      ctaButton: "Cek Pelatihan Lengkap →",
      topics: [
        "HACCP Awareness & Implementation",
        "Pelatihan Internal Auditor HACCP",
        "CPPOB & Good Manufacturing Practices (GMP)",
        "Analisis Bahaya & Validasi Titik Kendali Kritis (CCP)",
      ],
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
          a: "Sertifikasi HACCP dapat diajukan oleh organisasi dan pelaku usaha yang bergerak dalam 4 sektor ruang lingkup kami, yaitu: Produk bakeri, Daging dan produk daging, Pangan olahan untuk keperluan gizi khusus, serta Jasa Boga / Pelayanan Pangan / SPPG.",
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
        title: "Tim Auditor HACCP",
        subtitle: "Tenaga Ahli dan Auditor Profesional Lembaga Sertifikasi HACCP PT Food Quality Certification",
        expertTitle: "Tim Auditor & Tenaga Ahli",
        auditorTitle: "Auditor Sertifikasi HACCP",
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
    trainingPage: {
      tagline: "PUSAT PENGEMBANGAN KOMPETENSI KEAMANAN PANGAN",
      title: "Program Pelatihan & Sertifikasi Kompetensi",
      subtitle:
        "Tingkatkan pemahaman tim Anda mengenai implementasi sistem HACCP, CPPOB/GMP, dan audit keamanan pangan bersama instruktur ahli bersertifikasi PT Food Quality Certification.",
      catalogTitle: "Pilihan Program Pelatihan Resmi",
      catalogSubtitle: "Kurikulum terstruktur berbasis standar SNI CXC 1-1969, regulasi BPOM RI, dan pedoman KAN.",
      formTitle: "Formulir Pendaftaran Pelatihan Online",
      formSubtitle: "Lengkapi data peserta atau perusahaan Anda di bawah ini untuk pendaftaran program pelatihan.",
      registeredCount: "Peserta Terdaftar",
      programs: [
        {
          id: "haccp-awareness",
          code: "TR-HACCP-01",
          title: "Pelatihan Awareness & Implementasi Sistem HACCP",
          category: "Fundamental & Penerapan",
          duration: "2 Hari (16 Jam Pelajaran)",
          method: "Online Webinar / Offline In-House",
          description:
            "Memberikan pemahaman mendalam tentang 7 Prinsip dan 12 Langkah Penerapan HACCP sesuai standar Codex Alimentarius (SNI CXC 1-1969) untuk menjamin keamanan produk pangan.",
          syllabus: [
            "Pengantar Bahaya Keamanan Pangan (Biologi, Kimia, Fisik, Alergen)",
            "Program Prasyarat (PRP / CPPOB / GMP)",
            "12 Langkah Penerapan HACCP & Pembentukan Tim",
            "Penyusunan Rencana HACCP (HACCP Plan) & Penentuan CCP",
            "Sistem Monitoring, Tindakan Koreksi, dan Verifikasi",
          ],
          benefits: [
            "Sertifikat Pelatihan Resmi Berbarcode",
            "Modul Lengkap & Template Dokumen HACCP",
            "Konsultasi Interaktif dengan Lead Auditor",
          ],
        },
        {
          id: "internal-auditor",
          code: "TR-AUDIT-02",
          title: "Pelatihan Internal Auditor HACCP & Verifikasi Sistem",
          category: "Audit & Pengawasan Internal",
          duration: "2 Hari (16 Jam Pelajaran)",
          method: "Online Webinar / Offline In-House",
          description:
            "Mempersiapkan tim internal perusahaan agar mampu merencanakan, melaksanakan, dan melaporkan audit internal sistem HACCP sesuai panduan ISO 19011.",
          syllabus: [
            "Prinsip & Metodologi Audit Sistem Manajemen Pangan",
            "Teknik Penyusunan Audit Checklist & Sampling",
            "Teknik Wawancara & Pengumpulan Bukti Audit Objektif",
            "Klasifikasi Temuan Ketidaksesuaian (KNC / KC)",
            "Pelaporan Audit & Tindak Lanjut Verifikasi Perbaikan (CAPA)",
          ],
          benefits: [
            "Sertifikat Kelulusan Internal Auditor",
            "Formulir Audit Checklist & Template Laporan",
            "Studi Kasus & Simulasi Audit Lapangan Nyata",
          ],
        },
        {
          id: "cppob-gmp",
          code: "TR-GMP-03",
          title: "Pelatihan CPPOB & Good Manufacturing Practices (GMP)",
          category: "Praktik Higiene & Sanitasi",
          duration: "1 Hari (8 Jam Pelajaran)",
          method: "Online Webinar / Offline In-House",
          description:
            "Fokus pada penerapan sanitasi fasilitas, pengendalian higiene personal, pencegahan kontaminasi silang, dan kepatuhan terhadap pedoman CPPOB BPOM RI.",
          syllabus: [
            "Persyaratan Desain Fasilitas & Sanitasi Bangunan",
            "Higiene Karyawan & Protokol Kebersihan Produksi",
            "Program Pest Control & Manajemen Limbah Pangan",
            "Penanganan Bahan Baku & Pengendalian Suhu Penyimpanan",
            "Dokumentasi & Catatan Rekaman Kebersihan Rutin",
          ],
          benefits: [
            "Sertifikat Resmi CPPOB/GMP",
            "Panduan Sanitasi Standar BPOM RI",
            "Checklist Self-Assessment Fasilitas",
          ],
        },
        {
          id: "hazard-ccp-advanced",
          code: "TR-CCP-04",
          title: "Pelatihan Analisis Bahaya & Validasi Titik Kendali Kritis (CCP)",
          category: "Teknis Lanjutan",
          duration: "1 Hari (8 Jam Pelajaran)",
          method: "Online Webinar / Offline In-House",
          description:
            "Pelatihan teknis tingkat lanjut untuk menyusun matriks analisis bahaya kuantitatif, penetapan batas kritis (*Critical Limits*), serta validasi ilmiah langkah pencegahan bahaya pangan.",
          syllabus: [
            "Metodologi Penetapan Signifikansi Bahaya (Risk Assessment)",
            "Penerapan Pohon Keputusan (Decision Tree) Codex Terbaru",
            "Penetapan Batas Kritis Berbasis Data Ilmiah",
            "Teknik Validasi & Kalibrasi Instrumen Pengukuran CCP",
            "Studi Kasus Produk Pangan Kering, Beku, & Olahan Basah",
          ],
          benefits: [
            "Sertifikat Tingkat Lanjutan (Advanced)",
            "Worksheet Validasi CCP Komprehensif",
            "Bimbingan Eksklusif Penyusunan HACCP Plan",
          ],
        },
      ],
    },
    haccpDocsPage: {
      tagline: "PORTAL PRA-AUDIT SERTIFIKASI HACCP",
      title: "Unggah Dokumen Persiapan Audit HACCP",
      subtitle:
        "Portal resmi bagi pemohon sertifikasi untuk mengunggah dokumen sistem keamanan pangan SNI CXC 1:1969 (2024) sebelum pelaksanaan audit tahap 1.",
      guideTitle: "Panduan Berkas Persiapan Audit — Standar SNI CXC 1:1969 (2024)",
      guideSubtitle:
        "SNI CXC 1:1969 (2024) adalah Standar Nasional Indonesia tentang Prinsip Umum Higiene Pangan (General Principles of Food Hygiene) yang diadopsi secara identik dari standar internasional Codex Alimentarius (Codex CXC 1-1969) versi revisi terbaru.",
      section1Title: "Bagian 1: Cara Higiene yang Baik (GHP / GMP)",
      section1Desc:
        "Mengatur persyaratan prasyarat seperti fasilitas, sanitasi, kebersihan personel, pemeliharaan, serta pengendalian operasional di seluruh rantai pangan.",
      section2Title: "Bagian 2: Rencana HACCP & 7 Prinsip",
      section2Desc:
        "Mengatur 7 prinsip sistem HACCP untuk mengidentifikasi, mengevaluasi, dan mengendalikan bahaya keamanan pangan (biologis, kimia, dan fisik) secara preventif dari produksi primer hingga penyajian.",
      section3Title: "Legalitas & Pengujian Laboratorium",
      section3Desc:
        "Surat Keputusan (SK) Tim HACCP, Izin Usaha / NIB, hasil uji laboratorium mikrobiologi/kimia produk, sertifikat kalibrasi alat ukur, dan laporan audit internal terakhir.",
      formTitle: "Formulir Pengunggahan Berkas SNI CXC 1:1969 (2024)",
      formSubtitle:
        "Masukkan Email Perusahaan atau Nomor WhatsApp PIC yang didaftarkan untuk memuat data Anda secara otomatis.",
      lookupLabel: "Cari Data Permohonan (Email / No. WhatsApp / Nama Perusahaan)",
      lookupPlaceholder: "Ketik Email Resmi Perusahaan atau No. WhatsApp PIC...",
      lookupButton: "Cari & Muat Data",
      lookupFound: "Data Permohonan Terverifikasi",
      lookupNotFound: "Data permohonan tidak ditemukan. Pastikan Anda telah mengisi formulir permohonan sertifikasi sebelumnya.",
      manualToggle: "",
      changeLookup: "Ganti Pencarian",
      applyPrompt: "Belum mengajukan permohonan sertifikasi?",
      applyLink: "Ajukan Permohonan Sertifikasi di Sini →",
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
      projects: "Training Info",
      gallery: "Photo Gallery",
      faq: "FAQ",
      contact: "Contact",
      visitorInfo: "Visitor Info",
      trainingList: "Training Programs",
      haccpDocs: "HACCP Documents",
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
      leadAuditorsDesc: "Professional & Experienced Auditors",
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
        "HACCP Certification is mandatory and strongly recommended for the following 4 food industry scope sectors:",
      targetList: [
        "Bakery products",
        "Meat and meat products",
        "Processed food for special dietary needs",
        "Food Services / Catering / SPPG",
      ],
    },
    scope: {
      tagline: "LSHACCP-009-IDN • 4 OFFICIAL AUDIT SCOPE SECTORS",
      title: "HACCP Certification Scope",
      description:
        "PT Food Quality Certification provides HACCP Food Safety Management System compliance audit and certification services for 4 official sectors:",
      items: [
        {
          name: "Bakery Products",
          category: "AUDIT SCOPE 1",
          desc: "Industrial production lines for fresh breads, sweet buns, pastries, cakes, biscuits, and bakery flour products.",
          image: "/hero1.jpg",
          icon: "🍞",
        },
        {
          name: "Meat and Meat Products",
          category: "AUDIT SCOPE 2",
          desc: "Slaughtering, handling, and processing facilities for beef, poultry, sausages, meatballs, nuggets, and frozen processed meats.",
          image: "/hero2.jpg",
          icon: "🥩",
        },
        {
          name: "Processed Food for Special Dietary Needs",
          category: "AUDIT SCOPE 3",
          desc: "Formulation and processing of infant foods / complementary feeding (MP-ASI), specialized clinical medical diet foods, and functional nutrition.",
          image: "/iso.jpg",
          icon: "🥣",
        },
        {
          name: "Food Services / Catering / SPPG",
          category: "AUDIT SCOPE 4",
          desc: "Nutrition Food Processing Centers (SPPG), industrial catering, airline in-flight food, institutional dining, and mass meal services.",
          image: "/hccp1.jpg",
          icon: "🍱",
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
          subtitle: "Fill form & documents",
          description:
            "Organization submits certification application form and required supporting documentation to our administration team.",
        },
        {
          badge: "Stage 2",
          title: "Application Review",
          subtitle: "Technical review & schedule",
          description:
            "Our technical team reviews scope of business, document readiness, and agrees on the audit schedule.",
        },
        {
          badge: "Stage 3",
          title: "Document Audit (Stage 1)",
          subtitle: "HACCP document review",
          description:
            "Evaluation of HACCP Food Safety Management System manual documentation to verify adequacy.",
        },
        {
          badge: "Stage 4",
          title: "On-Site Audit (Stage 2)",
          subtitle: "On-site verification",
          description:
            "On-site verification audit at production facilities to ensure practical field implementation.",
        },
        {
          badge: "Stage 5",
          title: "Certificate Issuance",
          subtitle: "Official KAN certificate",
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
      industrySector: "FOOD INDUSTRY SECTOR SCOPE CATEGORY *",
      haccpStatus: "CURRENT HACCP IMPLEMENTATION STATUS *",
      messageLabel: "ADDITIONAL NOTES / DETAILED PRODUCT SCOPE",
      messagePlaceholder: "Describe food product lines, processing methods, or specific certification needs...",
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
        bakery: "Bakery Products",
        meat: "Meat and Meat Products",
        specialDietary: "Processed Food for Special Dietary Needs",
        foodService: "Food Services / Catering / SPPG",
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
    trainingCallout: {
      tagline: "PROFESSIONAL TRAINING SERVICES",
      title: "HACCP & Food Safety Technical Training",
      description1:
        "PT FOOD QUALITY CERTIFICATION delivers structured training programs to elevate food industry human resource capacity, covering core HACCP principles, CPPOB/GMP hygiene practices, and certified Internal Auditor qualifications.",
      description2:
        "Courses are conducted directly by certified Lead Auditors and experienced food safety practitioners, with flexible formats available via interactive webinars or on-site in-house training.",
      badge: "Official Barcoded & Verifiable Certificate",
      ctaButton: "View Complete Training Programs →",
      topics: [
        "HACCP Awareness & Implementation",
        "HACCP Internal Auditor Training",
        "CPPOB & Good Manufacturing Practices (GMP)",
        "Advanced Hazard Analysis & CCP Validation",
      ],
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
          a: "HACCP certification can be applied for by organizations and food businesses operating in our 4 official scope sectors: Bakery products, Meat and meat products, Processed food for special dietary needs, and Food Services / Catering / SPPG.",
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
        title: "HACCP Auditor Team",
        subtitle: "Professional Expert & Auditor Team of PT Food Quality Certification Body",
        expertTitle: "Auditor & Expert Team",
        auditorTitle: "HACCP Certification Auditors",
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
    trainingPage: {
      tagline: "FOOD SAFETY COMPETENCE CENTER",
      title: "Training Programs & Competence Certification",
      subtitle:
        "Upgrade your team's understanding of HACCP implementation, CPPOB/GMP, and food safety auditing with certified expert instructors from PT Food Quality Certification.",
      catalogTitle: "Official Training Program Catalog",
      catalogSubtitle: "Structured curriculum based on Codex Alimentarius (SNI CXC 1-1969), BPOM RI regulations, and KAN guidelines.",
      formTitle: "Online Training Registration Form",
      formSubtitle: "Complete participant or company details below to register for a training program.",
      registeredCount: "Registered Participants",
      programs: [
        {
          id: "haccp-awareness",
          code: "TR-HACCP-01",
          title: "HACCP System Awareness & Implementation Training",
          category: "Fundamentals & Practical Implementation",
          duration: "2 Days (16 Hours)",
          method: "Online Webinar / Offline In-House",
          description:
            "Provides comprehensive understanding of the 7 Principles and 12 Steps of HACCP according to Codex Alimentarius (SNI CXC 1-1969) standards to guarantee food product safety.",
          syllabus: [
            "Introduction to Food Safety Hazards (Biological, Chemical, Physical, Allergens)",
            "Prerequisite Programs (PRP / CPPOB / GMP)",
            "12 Steps of HACCP Implementation & Team Setup",
            "HACCP Plan Formulation & CCP Determination",
            "Monitoring Systems, Corrective Actions, and Verification",
          ],
          benefits: [
            "Official Barcoded Training Certificate",
            "Complete Modules & HACCP Document Templates",
            "Interactive Consultation with Lead Auditors",
          ],
        },
        {
          id: "internal-auditor",
          code: "TR-AUDIT-02",
          title: "HACCP Internal Auditor & System Verification Training",
          category: "Auditing & Internal Control",
          duration: "2 Days (16 Hours)",
          method: "Online Webinar / Offline In-House",
          description:
            "Prepares internal company teams to effectively plan, conduct, and report HACCP system internal audits in accordance with ISO 19011 guidelines.",
          syllabus: [
            "Principles & Methodologies of Food Safety Management Auditing",
            "Audit Checklist Preparation & Sampling Techniques",
            "Interview Techniques & Objective Evidence Collection",
            "Non-Conformity Classification (Major / Minor NC)",
            "Audit Reporting & Corrective Action (CAPA) Follow-up Verification",
          ],
          benefits: [
            "Internal Auditor Certificate of Competence",
            "Audit Checklist & Standard Report Templates",
            "Case Studies & Real-world Simulated Field Audits",
          ],
        },
        {
          id: "cppob-gmp",
          code: "TR-GMP-03",
          title: "CPPOB & Good Manufacturing Practices (GMP) Training",
          category: "Hygiene & Sanitation Practices",
          duration: "1 Day (8 Hours)",
          method: "Online Webinar / Offline In-House",
          description:
            "Focuses on facility sanitation implementation, personal hygiene controls, cross-contamination prevention, and compliance with BPOM RI CPPOB guidelines.",
          syllabus: [
            "Facility Layout & Sanitation Infrastructure Requirements",
            "Personnel Hygiene & Production Cleanliness Protocols",
            "Pest Control Programs & Food Waste Management",
            "Raw Material Handling & Temperature Controlled Storage",
            "Sanitation Logs & Routine Verification Records",
          ],
          benefits: [
            "Official CPPOB/GMP Certificate",
            "Standard Sanitation Guidelines based on BPOM RI",
            "Facility Self-Assessment Checklist",
          ],
        },
        {
          id: "hazard-ccp-advanced",
          code: "TR-CCP-04",
          title: "Hazard Analysis & Critical Control Point (CCP) Validation Training",
          category: "Advanced Technical",
          duration: "1 Day (8 Hours)",
          method: "Online Webinar / Offline In-House",
          description:
            "Advanced technical training on constructing quantitative hazard analysis matrices, establishing scientifically justified critical limits, and validating control measures.",
          syllabus: [
            "Risk Assessment & Hazard Significance Methodologies",
            "Application of the Latest Codex Decision Tree",
            "Science-based Critical Limits Establishment",
            "Validation & Calibration Techniques for CCP Monitoring Equipment",
            "Case Studies in Dry, Frozen, and Processed Food Categories",
          ],
          benefits: [
            "Advanced Level Certificate",
            "Comprehensive CCP Validation Worksheets",
            "Dedicated Guidance on HACCP Plan Construction",
          ],
        },
      ],
    },
    haccpDocsPage: {
      tagline: "HACCP CERTIFICATION PRE-AUDIT PORTAL",
      title: "Upload Pre-Audit HACCP Preparation Documents",
      subtitle:
        "Official portal for certification applicants to submit food safety documentation compliance under the SNI CXC 1:1969 (2024) standard prior to stage 1 audit.",
      guideTitle: "Audit Document Guidelines — SNI CXC 1:1969 (2024) Standard",
      guideSubtitle:
        "SNI CXC 1:1969 (2024) is the Indonesian National Standard on General Principles of Food Hygiene, an identical adoption of the latest revised Codex Alimentarius (Codex CXC 1-1969) international standard.",
      section1Title: "Section 1: Good Hygiene Practices (GHP / GMP)",
      section1Desc:
        "Regulates prerequisite requirements such as facilities, sanitation, personnel hygiene, maintenance, and operational control across the food chain.",
      section2Title: "Section 2: HACCP Plan & 7 Principles",
      section2Desc:
        "Regulates the 7 principles of the HACCP system to proactively identify, evaluate, and control food safety hazards (biological, chemical, and physical) from primary production to final presentation.",
      section3Title: "Legalities & Laboratory Test Reports",
      section3Desc:
        "HACCP Team Appointment Letter, Business License / NIB, laboratory test results (microbiological & chemical), CCP equipment calibration records, and internal audit reports.",
      formTitle: "SNI CXC 1:1969 (2024) Document Submission Form",
      formSubtitle:
        "Enter your registered Company Email or PIC Phone Number to automatically retrieve and load your application details.",
      lookupLabel: "Search Application Data (Email / WhatsApp / Company Name)",
      lookupPlaceholder: "Enter Official Email or PIC WhatsApp Phone Number...",
      lookupButton: "Find & Load Data",
      lookupFound: "Verified Application Data",
      lookupNotFound: "Application data not found. Please ensure you have previously submitted the certification application form.",
      manualToggle: "",
      changeLookup: "Change Search",
      applyPrompt: "Haven't applied for HACCP certification yet?",
      applyLink: "Apply for Certification Here →",
    },
  },
};
