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
