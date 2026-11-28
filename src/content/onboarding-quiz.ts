import type { OnboardingQuizData } from "@/content/schemas";

export const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "Computing & Tech",
  "Languages",
  "Art & Design",
  "Business & Economics",
] as const;

export const ONBOARDING_QUIZ: OnboardingQuizData = {
  questions: [
    {
      id: "oq-1",
      i18n: {
        en: { prompt: "In a school group project, which role feels most natural to you?" },
        ms: { prompt: "Dalam projek berkumpulan sekolah, peranan manakah paling semula jadi untuk anda?" },
      },
      options: [
        {
          id: "oq-1-a",
          icon: "Code2",
          primaryTrait: "BU",
          secondaryTrait: "AN",
          i18n: {
            en: { label: "Building the app, prototype, or working model" },
            ms: { label: "Membina aplikasi, prototaip, atau model yang berfungsi" },
          },
        },
        {
          id: "oq-1-b",
          icon: "Palette",
          primaryTrait: "CR",
          secondaryTrait: "SO",
          i18n: {
            en: { label: "Designing the look, slides, and story for the team" },
            ms: { label: "Mereka bentuk paparan, slaid, dan jalan cerita pasukan" },
          },
        },
        {
          id: "oq-1-c",
          icon: "Users",
          primaryTrait: "SO",
          secondaryTrait: "EN",
          i18n: {
            en: { label: "Presenting to the class and organizing teammates" },
            ms: { label: "Membentang di hadapan kelas dan menyelaraskan rakan" },
          },
        },
        {
          id: "oq-1-d",
          icon: "Search",
          primaryTrait: "AN",
          secondaryTrait: "BU",
          i18n: {
            en: { label: "Checking facts, testing errors, and verifying details" },
            ms: { label: "Menyemak fakta, menguji ralat, dan mengesahkan perincian" },
          },
        },
      ],
    },
    {
      id: "oq-2",
      i18n: {
        en: { prompt: "When something breaks or goes wrong, what do you do first?" },
        ms: { prompt: "Apabila sesuatu rosak atau bermasalah, apakah tindakan pertama anda?" },
      },
      options: [
        {
          id: "oq-2-a",
          icon: "Cpu",
          primaryTrait: "AN",
          secondaryTrait: "BU",
          i18n: {
            en: { label: "Trace the steps logically to find the root cause" },
            ms: { label: "Jejak langkah secara logik untuk mencari punca utama" },
          },
        },
        {
          id: "oq-2-b",
          icon: "HeartHandshake",
          primaryTrait: "SO",
          secondaryTrait: "AN",
          i18n: {
            en: { label: "Ask people affected how they feel and what happened" },
            ms: { label: "Tanya pihak terlibat tentang keadaan dan apa yang berlaku" },
          },
        },
        {
          id: "oq-2-c",
          icon: "Sparkles",
          primaryTrait: "CR",
          secondaryTrait: "BU",
          i18n: {
            en: { label: "Sketch a fresh workaround or new way to solve it" },
            ms: { label: "Lakar alternatif baharu atau cara kreatif menyelesaikannya" },
          },
        },
        {
          id: "oq-2-d",
          icon: "Briefcase",
          primaryTrait: "EN",
          secondaryTrait: "SO",
          i18n: {
            en: { label: "Take charge and coordinate who handles each task" },
            ms: { label: "Ambil alih dan selaraskan siapa menguruskan setiap tugas" },
          },
        },
      ],
    },
    {
      id: "oq-3",
      i18n: {
        en: { prompt: "Which weekend activity sounds the most fun to you?" },
        ms: { prompt: "Aktiviti hujung minggu manakah yang paling menyeronokkan bagi anda?" },
      },
      options: [
        {
          id: "oq-3-a",
          icon: "Terminal",
          primaryTrait: "BU",
          secondaryTrait: "CR",
          i18n: {
            en: { label: "Coding a mini-game or tinkering with gadgets" },
            ms: { label: "Menulis kod permainan mini atau mencuba gajet" },
          },
        },
        {
          id: "oq-3-b",
          icon: "Utensils",
          primaryTrait: "CR",
          secondaryTrait: "EN",
          i18n: {
            en: { label: "Testing a new recipe or crafting something by hand" },
            ms: { label: "Mencuba resipi baharu atau menghasilkan kraf tangan" },
          },
        },
        {
          id: "oq-3-c",
          icon: "Scale",
          primaryTrait: "AN",
          secondaryTrait: "SO",
          i18n: {
            en: { label: "Joining a debate club or solving mystery puzzles" },
            ms: { label: "Menyertai kelab debat atau menyelesaikan teka-teki misteri" },
          },
        },
        {
          id: "oq-3-d",
          icon: "HeartPulse",
          primaryTrait: "SO",
          secondaryTrait: "BU",
          i18n: {
            en: { label: "Volunteering at a community or health awareness booth" },
            ms: { label: "Menjadi sukarelawan di gerai komuniti atau kesihatan" },
          },
        },
      ],
    },
    {
      id: "oq-4",
      i18n: {
        en: { prompt: "What kind of challenge excites you the most?" },
        ms: { prompt: "Cabaran jenis apakah yang paling mengujakan anda?" },
      },
      options: [
        {
          id: "oq-4-a",
          icon: "Puzzle",
          primaryTrait: "AN",
          secondaryTrait: "CR",
          i18n: {
            en: { label: "Cracking a tricky logic or science problem" },
            ms: { label: "Memecahkan masalah logik atau sains yang mencabar" },
          },
        },
        {
          id: "oq-4-b",
          icon: "MessageCircle",
          primaryTrait: "SO",
          secondaryTrait: "EN",
          i18n: {
            en: { label: "Helping someone understand a difficult topic or feel better" },
            ms: { label: "Membantu seseorang memahami topik sukar atau berasa lebih baik" },
          },
        },
        {
          id: "oq-4-c",
          icon: "Layers",
          primaryTrait: "CR",
          secondaryTrait: "BU",
          i18n: {
            en: { label: "Turning a blank page into an intuitive, beautiful design" },
            ms: { label: "Menukar halaman kosong menjadi reka bentuk yang kemas dan menarik" },
          },
        },
        {
          id: "oq-4-d",
          icon: "TrendingUp",
          primaryTrait: "EN",
          secondaryTrait: "BU",
          i18n: {
            en: { label: "Launching a small school stall or club initiative" },
            ms: { label: "Melancarkan gerai kecil atau inisiatif kelab di sekolah" },
          },
        },
      ],
    },
    {
      id: "oq-5",
      i18n: {
        en: { prompt: "Where do you picture yourself doing your best work?" },
        ms: { prompt: "Di manakah anda membayangkan diri melakukan kerja terbaik anda?" },
      },
      options: [
        {
          id: "oq-5-a",
          icon: "Laptop",
          primaryTrait: "BU",
          secondaryTrait: "AN",
          i18n: {
            en: { label: "A collaborative tech workspace with screens and whiteboards" },
            ms: { label: "Ruang kerja teknologi kolaboratif dengan skrin dan papan putih" },
          },
        },
        {
          id: "oq-5-b",
          icon: "Stethoscope",
          primaryTrait: "SO",
          secondaryTrait: "AN",
          i18n: {
            en: { label: "A clinic, hospital, or lab helping patients directly" },
            ms: { label: "Klinik, hospital, atau makmal yang membantu pesakit secara langsung" },
          },
        },
        {
          id: "oq-5-c",
          icon: "Landmark",
          primaryTrait: "AN",
          secondaryTrait: "SO",
          i18n: {
            en: { label: "A courtroom, council room, or advocacy office" },
            ms: { label: "Mahkamah, bilik rundingan, atau pejabat guaman" },
          },
        },
        {
          id: "oq-5-d",
          icon: "Flame",
          primaryTrait: "CR",
          secondaryTrait: "EN",
          i18n: {
            en: { label: "A lively design studio or bustling culinary kitchen" },
            ms: { label: "Studio reka bentuk yang rancak atau dapur kulinari yang sibuk" },
          },
        },
      ],
    },
    {
      id: "oq-6",
      i18n: {
        en: { prompt: "How do you prefer to learn a brand-new skill?" },
        ms: { prompt: "Bagaimanakah cara anda suka mempelajari kemahiran baharu?" },
      },
      options: [
        {
          id: "oq-6-a",
          icon: "Wrench",
          primaryTrait: "BU",
          secondaryTrait: "CR",
          i18n: {
            en: { label: "Hands-on trial and error until it works" },
            ms: { label: "Cuba jaya secara praktikal sehingga berjaya" },
          },
        },
        {
          id: "oq-6-b",
          icon: "BookOpen",
          primaryTrait: "AN",
          secondaryTrait: "SO",
          i18n: {
            en: { label: "Reading clear rules, evidence, and case examples" },
            ms: { label: "Membaca peraturan, bukti, dan contoh kes yang jelas" },
          },
        },
        {
          id: "oq-6-c",
          icon: "Eye",
          primaryTrait: "CR",
          secondaryTrait: "SO",
          i18n: {
            en: { label: "Observing visual demos and experimenting with style" },
            ms: { label: "Menonton demo visual dan bereksperimen dengan gaya" },
          },
        },
        {
          id: "oq-6-d",
          icon: "Mic",
          primaryTrait: "EN",
          secondaryTrait: "SO",
          i18n: {
            en: { label: "Discussing ideas out loud with mentors and peers" },
            ms: { label: "Berbincang idea secara langsung dengan mentor dan rakan" },
          },
        },
      ],
    },
    {
      id: "oq-7",
      i18n: {
        en: { prompt: "Which compliment from a teacher makes you proudest?" },
        ms: { prompt: "Pujian guru manakah yang paling membanggakan anda?" },
      },
      options: [
        {
          id: "oq-7-a",
          icon: "CheckCircle2",
          primaryTrait: "AN",
          secondaryTrait: "BU",
          i18n: {
            en: { label: '"Your reasoning is super clear and well structured."' },
            ms: { label: '"Hujah dan pemikiran anda sangat tersusun dan jelas."' },
          },
        },
        {
          id: "oq-7-b",
          icon: "Sparkles",
          primaryTrait: "CR",
          secondaryTrait: "EN",
          i18n: {
            en: { label: '"Your idea is original and easy for everyone to enjoy."' },
            ms: { label: '"Idea anda asli dan mudah dinikmati semua orang."' },
          },
        },
        {
          id: "oq-7-c",
          icon: "Heart",
          primaryTrait: "SO",
          secondaryTrait: "AN",
          i18n: {
            en: { label: '"You always notice when someone needs support."' },
            ms: { label: '"Anda sentiasa peka apabila seseorang perlukan sokongan."' },
          },
        },
        {
          id: "oq-7-d",
          icon: "Rocket",
          primaryTrait: "EN",
          secondaryTrait: "BU",
          i18n: {
            en: { label: '"You turned a rough idea into a real finished result."' },
            ms: { label: '"Anda berjaya menukar idea ringkas menjadi hasil sebenar."' },
          },
        },
      ],
    },
    {
      id: "oq-8",
      i18n: {
        en: { prompt: "If you could improve one thing in Malaysia right now, what would you pick?" },
        ms: { prompt: "Jika anda boleh menambah baik satu perkara di Malaysia sekarang, apakah pilihan anda?" },
      },
      options: [
        {
          id: "oq-8-a",
          icon: "Smartphone",
          primaryTrait: "BU",
          secondaryTrait: "AN",
          i18n: {
            en: { label: "Faster, safer digital apps for schools and families" },
            ms: { label: "Aplikasi digital yang lebih pantas dan selamat untuk sekolah" },
          },
        },
        {
          id: "oq-8-b",
          icon: "ShieldCheck",
          primaryTrait: "SO",
          secondaryTrait: "AN",
          i18n: {
            en: { label: "Better healthcare access and patient care in communities" },
            ms: { label: "Akses penjagaan kesihatan yang lebih baik untuk komuniti" },
          },
        },
        {
          id: "oq-8-c",
          icon: "Scale",
          primaryTrait: "AN",
          secondaryTrait: "SO",
          i18n: {
            en: { label: "Fairer rules and clearer rights for everyday citizens" },
            ms: { label: "Peraturan yang lebih adil dan hak yang jelas untuk rakyat" },
          },
        },
        {
          id: "oq-8-d",
          icon: "ChefHat",
          primaryTrait: "CR",
          secondaryTrait: "EN",
          i18n: {
            en: { label: "Creative spaces, accessible design, and healthier local food" },
            ms: { label: "Ruang kreatif, reka bentuk inklusif, dan makanan tempatan sihat" },
          },
        },
      ],
    },
  ],
  careerWeights: {
    "software-engineer": {
      subjectWeights: {
        Mathematics: 2,
        "Computing & Tech": 3,
        Science: 1,
      },
      traitWeights: {
        AN: 3,
        BU: 2,
        CR: 1,
      },
    },
    "junior-lawyer": {
      subjectWeights: {
        Languages: 3,
        "Business & Economics": 2,
        Mathematics: 1,
      },
      traitWeights: {
        AN: 3,
        SO: 2,
        EN: 1,
      },
    },
    "future-doctor": {
      subjectWeights: {
        Science: 3,
        Mathematics: 1,
        Languages: 1,
      },
      traitWeights: {
        SO: 3,
        AN: 2,
      },
    },
    "product-designer": {
      subjectWeights: {
        "Art & Design": 3,
        "Computing & Tech": 2,
        Languages: 1,
      },
      traitWeights: {
        CR: 3,
        SO: 2,
        BU: 1,
      },
    },
    "master-chef": {
      subjectWeights: {
        "Art & Design": 2,
        "Business & Economics": 2,
        Science: 1,
      },
      traitWeights: {
        CR: 3,
        EN: 2,
        BU: 1,
      },
    },
  },
  matchReasonTemplates: {
    en: {
      twoSubjects:
        "Matches your love for {subject1} and {subject2}, plus your strength in {trait}.",
      oneSubject: "Builds on your interest in {subject1} and your {trait}.",
      traitOnly: "Strong fit for your {trait}.",
      traitPhrases: {
        AN: "analytical problem-solving",
        CR: "creative visual thinking",
        SO: "people-first empathy and communication",
        BU: "hands-on building mindset",
        EN: "initiative and leadership",
      },
      subjectLabels: {
        Mathematics: "Mathematics",
        Science: "Science",
        "Computing & Tech": "Computing & Tech",
        Languages: "Languages",
        "Art & Design": "Art & Design",
        "Business & Economics": "Business & Economics",
      },
    },
    ms: {
      twoSubjects:
        "Padan dengan minat anda dalam {subject1} dan {subject2}, serta kekuatan anda dalam {trait}.",
      oneSubject: "Membina asas minat anda dalam {subject1} serta {trait}.",
      traitOnly: "Sangat sesuai dengan {trait} anda.",
      traitPhrases: {
        AN: "penyelesaian masalah secara analitik",
        CR: "pemikiran kreatif dan visual",
        SO: "empati dan komunikasi mesra insan",
        BU: "semangat membina secara praktikal",
        EN: "inisiatif dan kepimpinan",
      },
      subjectLabels: {
        Mathematics: "Matematik",
        Science: "Sains",
        "Computing & Tech": "Pengkomputeran & Teknologi",
        Languages: "Bahasa",
        "Art & Design": "Seni & Reka Bentuk",
        "Business & Economics": "Perniagaan & Ekonomi",
      },
    },
  },
};
