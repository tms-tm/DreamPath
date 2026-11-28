import type { CareerContent } from "@/content/schemas";

export const CAREERS: CareerContent[] = [
  {
    id: "software-engineer",
    family: "technology",
    icon: "Code2",
    baseSalary: 4500,
    salaryRange: {
      entry: [3500, 5000],
      mid: [5500, 9000],
      senior: [9500, 16000],
    },
    salarySource: "JobStreet MY & MDEC Tech Salary Guide (Estimated)",
    coreSkills: ["problem-solving", "javascript", "html-css", "accessibility"],
    i18n: {
      en: {
        title: "Software Engineer",
        subtitle: "Build helpful apps, websites, and secure digital systems",
        description:
          "Design interactive web apps, fix software bugs, protect user data, and solve real-world problems with code.",
        spmSubjects: ["Mathematics", "Additional Mathematics", "Physics", "Computer Science"],
        preUPaths: ["Matrikulasi (Science)", "STPM (Science/ICT)", "Foundation in IT", "Diploma in CS"],
        uniExamples: ["UM", "UTM", "UPM", "MMU", "APU"],
      },
      ms: {
        title: "Jurutera Perisian",
        subtitle: "Bina aplikasi berguna, laman web, dan sistem digital yang selamat",
        description:
          "Reka bentuk aplikasi web interaktif, baiki pepijat perisian, lindungi data pengguna, dan selesaikan masalah sebenar menggunakan kod.",
        spmSubjects: ["Matematik", "Matematik Tambahan", "Fizik", "Sains Komputer"],
        preUPaths: ["Matrikulasi (Sains)", "STPM (Sains/ICT)", "Asasi IT", "Diploma Sains Komputer"],
        uniExamples: ["UM", "UTM", "UPM", "MMU", "APU"],
      },
    },
  },
  {
    id: "junior-lawyer",
    family: "law",
    icon: "Scale",
    baseSalary: 4200,
    salaryRange: {
      entry: [3200, 4800],
      mid: [5500, 9500],
      senior: [10000, 18000],
    },
    salarySource: "Malaysian Bar & JobStreet MY (Estimated)",
    coreSkills: ["communication", "problem-solving", "accessibility"],
    i18n: {
      en: {
        title: "Junior Lawyer",
        subtitle: "Advocate for fairness, review contracts, and analyze evidence",
        description:
          "Research Malaysian statutes, evaluate evidence objectively, draft clear legal agreements, and defend people's rights ethically.",
        spmSubjects: ["Bahasa Melayu", "English", "History", "Moral / Pendidikan Islam"],
        preUPaths: ["STPM (Arts/Humanities)", "Foundation in Law", "A-Levels"],
        uniExamples: ["UM", "UIAM", "UKM", "UiTM", "BAC"],
      },
      ms: {
        title: "Peguam Muda",
        subtitle: "Perjuangkan keadilan, semak kontrak, dan analisis bukti",
        description:
          "Kaji undang-undang Malaysia, nilai bukti secara objektif, draf perjanjian yang jelas, dan bela hak masyarakat secara beretika.",
        spmSubjects: ["Bahasa Melayu", "Bahasa Inggeris", "Sejarah", "Pendidikan Moral / Islam"],
        preUPaths: ["STPM (Sastera/Kemanusiaan)", "Asasi Undang-Undang", "A-Levels"],
        uniExamples: ["UM", "UIAM", "UKM", "UiTM", "BAC"],
      },
    },
  },
  {
    id: "future-doctor",
    family: "healthcare",
    icon: "Stethoscope",
    baseSalary: 5200,
    salaryRange: {
      entry: [4200, 5800],
      mid: [6500, 11000],
      senior: [12000, 22000],
    },
    salarySource: "MOH Malaysia & Glassdoor MY (Estimated)",
    coreSkills: ["problem-solving", "communication", "accessibility"],
    i18n: {
      en: {
        title: "Future Doctor",
        subtitle: "Diagnose symptoms, care for patients, and apply medical science",
        description:
          "Listen to patients with empathy, interpret vital signs and lab results, choose safe treatments, and keep communities healthy.",
        spmSubjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
        preUPaths: ["Matrikulasi (Science)", "Asasi Sains", "STPM (Biology & Chemistry)", "A-Levels"],
        uniExamples: ["UM", "UKM", "USM", "UPM", "IMU"],
      },
      ms: {
        title: "Doktor Masa Depan",
        subtitle: "Diagnosis simptom, jaga pesakit, dan aplikasi sains perubatan",
        description:
          "Dengar keluhan pesakit dengan empati, tafsir tanda vital dan ujian makmal, pilih rawatan selamat, dan pelihara kesihatan komuniti.",
        spmSubjects: ["Biologi", "Kimia", "Fizik", "Matematik"],
        preUPaths: ["Matrikulasi (Sains)", "Asasi Sains", "STPM (Biologi & Kimia)", "A-Levels"],
        uniExamples: ["UM", "UKM", "USM", "UPM", "IMU"],
      },
    },
  },
  {
    id: "product-designer",
    family: "design",
    icon: "Palette",
    baseSalary: 4000,
    salaryRange: {
      entry: [3200, 4500],
      mid: [5000, 8000],
      senior: [8500, 14000],
    },
    salarySource: "JobStreet MY & Glassdoor MY (Estimated)",
    coreSkills: ["accessibility", "html-css", "communication", "problem-solving"],
    i18n: {
      en: {
        title: "Product Designer",
        subtitle: "Craft clear, inclusive interfaces and test user experiences",
        description:
          "Understand user needs, design accessible wireframes and prototypes, run usability tests, and make everyday digital tools joyful.",
        spmSubjects: ["Pendidikan Seni Visual", "Mathematics", "English", "Computer Science"],
        preUPaths: ["Foundation in Design", "Diploma in UI/UX / Multimedia", "STPM"],
        uniExamples: ["UiTM", "MMU", "Taylor's", "Sunway", "Limkokwing"],
      },
      ms: {
        title: "Pereka Produk",
        subtitle: "Cipta antara muka yang jelas, inklusif, dan uji pengalaman pengguna",
        description:
          "Fahami keperluan pengguna, reka rangka dawai dan prototaip mesra aksesibiliti, jalankan ujian kebolehgunaan, dan permudahkan alat digital harian.",
        spmSubjects: ["Pendidikan Seni Visual", "Matematik", "Bahasa Inggeris", "Sains Komputer"],
        preUPaths: ["Asasi Reka Bentuk", "Diploma UI/UX / Multimedia", "STPM"],
        uniExamples: ["UiTM", "MMU", "Taylor's", "Sunway", "Limkokwing"],
      },
    },
  },
  {
    id: "master-chef",
    family: "culinary",
    icon: "UtensilsCrossed",
    baseSalary: 3500,
    salaryRange: {
      entry: [2600, 3800],
      mid: [4200, 6800],
      senior: [7500, 13000],
    },
    salarySource: "DOSM & JobStreet MY Hospitality (Estimated)",
    coreSkills: ["communication", "problem-solving", "accessibility"],
    i18n: {
      en: {
        title: "Master Chef",
        subtitle: "Lead sustainable kitchens, balance nutrition, and craft flavours",
        description:
          "Create nutritious Malaysian and international menus, manage kitchen hygiene and food safety, reduce waste, and guide culinary teams.",
        spmSubjects: ["Sains Rumah Tangga", "Biology / Science", "Mathematics", "English"],
        preUPaths: ["Diploma in Culinary Arts", "TVET / Kolej Vokasional", "Certificate in Hospitality"],
        uniExamples: ["UiTM", "Taylor's", "UOW KDU", "Berjaya UC", "Kolej Komuniti"],
      },
      ms: {
        title: "Cef Utama",
        subtitle: "Terajui dapur mampan, seimbangkan nutrisi, dan cipta keenakan",
        description:
          "Hasilkan menu berkhasiat tempatan dan antarabangsa, jaga kebersihan serta keselamatan makanan, kurangkan pembaziran, dan bimbing pasukan dapur.",
        spmSubjects: ["Sains Rumah Tangga", "Biologi / Sains", "Matematik", "Bahasa Inggeris"],
        preUPaths: ["Diploma Seni Kulinari", "TVET / Kolej Vokasional", "Sijil Hospitaliti"],
        uniExamples: ["UiTM", "Taylor's", "UOW KDU", "Berjaya UC", "Kolej Komuniti"],
      },
    },
  },
];

export const CAREER_MAP: Record<string, CareerContent> = Object.fromEntries(
  CAREERS.map((career) => [career.id, career])
);

export function getCareerById(careerId: string): CareerContent | undefined {
  return CAREER_MAP[careerId];
}
