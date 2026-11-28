import type { DreamyCareerEntry } from "./schemas";

export const DREAMY_KB: Record<string, DreamyCareerEntry> = {
  "software-engineer": {
    careerId: "software-engineer",
    salaryRange: {
      entry: [3500, 5000],
      mid: [5500, 9000],
      senior: [9500, 16000],
    },
    salarySource: "JobStreet MY & MDEC Tech Salary Guide (Estimated)",
    estimatedBadge: "Estimated (MY)",
    i18n: {
      en: {
        title: "Software Engineer",
        subtitle: "Build apps, websites, and secure digital systems",
        summary:
          "Software engineers solve everyday challenges by building web apps, mobile services, and cloud tools. Fresh graduates in Malaysia start around RM 3,500 – RM 5,000/mo.",
        matchReason:
          "Strong analytical thinking and coding skills directly match software engineering tracks.",
      },
      ms: {
        title: "Jurutera Perisian",
        subtitle: "Bina aplikasi, laman web, dan sistem digital selamat",
        summary:
          "Jurutera perisian menyelesaikan cabaran harian dengan membina aplikasi web, servis telefon pintar, dan sistem awan. Graduan baharu di Malaysia bermula sekitar RM 3,500 – RM 5,000/bln.",
        matchReason:
          "Pemikiran analitikal dan kemahiran mengekod sangat padan dengan laluan kejuruteraan perisian.",
      },
    },
    routes: [
      {
        uniKey: "um",
        uniName: "Universiti Malaya (UM)",
        uniType: "public",
        i18n: {
          en: {
            applicationNote: "Apply through UPUOnline after SPM & Pre-U results.",
            spmRequirements: [
              "Credit in SPM Mathematics & Additional Mathematics",
              "Credit in Physics or Computer Science",
              "Pass in Bahasa Melayu and Sejarah",
            ],
            preU: { name: "Matrikulasi (Science/ICT) or Asasi Sains UM", duration: "1 year" },
            degree: { name: "Bachelor of Computer Science (Software Engineering)", duration: "3.5–4 years" },
          },
          ms: {
            applicationNote: "Mohon melalui UPUOnline selepas keputusan SPM & Pra-U.",
            spmRequirements: [
              "Kredit dalam Matematik & Matematik Tambahan SPM",
              "Kredit dalam Fizik atau Sains Komputer",
              "Lulus Bahasa Melayu dan Sejarah",
            ],
            preU: { name: "Matrikulasi (Sains/ICT) atau Asasi Sains UM", duration: "1 tahun" },
            degree: { name: "Sarjana Muda Sains Komputer (Kejuruteraan Perisian)", duration: "3.5–4 tahun" },
          },
        },
      },
      {
        uniKey: "uitm",
        uniName: "Universiti Teknologi MARA (UiTM)",
        uniType: "public",
        i18n: {
          en: {
            applicationNote: "Apply via UPUOnline or direct UiTM intake portal.",
            spmRequirements: [
              "Credit in SPM Mathematics",
              "Credit in a Science or Technical subject",
              "Pass in English, BM, and Sejarah",
            ],
            preU: { name: "Diploma in Computer Science / Asasi Kejuruteraan", duration: "1–2.5 years" },
            degree: { name: "Bachelor of Computer Science (Hons.)", duration: "3 years" },
          },
          ms: {
            applicationNote: "Mohon melalui UPUOnline atau portal kemasukan UiTM.",
            spmRequirements: [
              "Kredit dalam Matematik SPM",
              "Kredit dalam subjek Sains atau Teknikal",
              "Lulus Bahasa Inggeris, BM, dan Sejarah",
            ],
            preU: { name: "Diploma Sains Komputer / Asasi Kejuruteraan", duration: "1–2.5 tahun" },
            degree: { name: "Sarjana Muda Sains Komputer (Kepujian)", duration: "3 tahun" },
          },
        },
      },
      {
        uniKey: "mmu",
        uniName: "Multimedia University (MMU)",
        uniType: "private",
        i18n: {
          en: {
            applicationNote: "Apply directly via MMU admissions with SPM forecast or actual results.",
            spmRequirements: [
              "5 credits in SPM including Mathematics",
              "Pass in English, Bahasa Melayu, and Sejarah",
            ],
            preU: { name: "Foundation in Information Technology", duration: "1 year" },
            degree: { name: "Bachelor of Computer Science (Software Engineering)", duration: "3 years" },
          },
          ms: {
            applicationNote: "Mohon terus melalui portal MMU dengan keputusan percubaan atau sebenar SPM.",
            spmRequirements: [
              "5 kredit SPM termasuk Matematik",
              "Lulus Bahasa Inggeris, Bahasa Melayu, dan Sejarah",
            ],
            preU: { name: "Asasi Teknologi Maklumat", duration: "1 tahun" },
            degree: { name: "Sarjana Muda Sains Komputer (Kejuruteraan Perisian)", duration: "3 tahun" },
          },
        },
      },
    ],
  },

  "junior-lawyer": {
    careerId: "junior-lawyer",
    salaryRange: {
      entry: [3200, 4800],
      mid: [5500, 9500],
      senior: [10000, 18000],
    },
    salarySource: "Malaysian Bar & JobStreet MY (Estimated)",
    estimatedBadge: "Estimated (MY)",
    i18n: {
      en: {
        title: "Junior Lawyer",
        subtitle: "Advocate for fairness, review contracts, and interpret laws",
        summary:
          "Lawyers protect people's rights, draft agreements, and represent clients in court or corporate boardrooms. Fresh chambering graduates start around RM 3,200 – RM 4,800/mo.",
        matchReason:
          "High verbal communication and analytical debate traits indicate strong legal aptitude.",
      },
      ms: {
        title: "Peguam Muda",
        subtitle: "Bela keadilan, semak kontrak, dan tafsir undang-undang",
        summary:
          "Peguam mempertahankan hak insan, menggubal perjanjian, dan mewakili anak guam di mahkamah atau syarikat korporat. Graduan kamar bermula sekitar RM 3,200 – RM 4,800/bln.",
        matchReason:
          "Komunikasi lisan yang mantap dan hujah berfakta membuktikan kecenderungan bidang perundangan.",
      },
    },
    routes: [
      {
        uniKey: "um",
        uniName: "Universiti Malaya (UM)",
        uniType: "public",
        i18n: {
          en: {
            applicationNote: "Highly competitive UPUOnline program; interview & law aptitude test required.",
            spmRequirements: [
              "At least A- in SPM English & Bahasa Melayu",
              "Credit in Mathematics or History",
              "Pass in Sejarah",
            ],
            preU: { name: "STPM (Arts/Social Science) or Asasi Undang-Undang", duration: "1–1.5 years" },
            degree: { name: "Bachelor of Laws (LL.B)", duration: "4 years" },
          },
          ms: {
            applicationNote: "Program UPUOnline berdaya saing tinggi; temuduga & ujian kelayakan undang-undang diperlukan.",
            spmRequirements: [
              "Sekurang-kurangnya A- dalam Bahasa Inggeris & Bahasa Melayu SPM",
              "Kredit dalam Matematik atau Sejarah",
              "Lulus Sejarah",
            ],
            preU: { name: "STPM (Sastera/Sains Sosial) atau Asasi Undang-Undang", duration: "1–1.5 tahun" },
            degree: { name: "Sarjana Muda Undang-Undang (LL.B)", duration: "4 tahun" },
          },
        },
      },
      {
        uniKey: "uitm",
        uniName: "Universiti Teknologi MARA (UiTM)",
        uniType: "public",
        i18n: {
          en: {
            applicationNote: "Apply through UPUOnline for Asasi Undang-Undang KPT / UiTM.",
            spmRequirements: [
              "Minimum 5 credits including English and Bahasa Melayu",
              "Pass in Mathematics",
            ],
            preU: { name: "Asasi Undang-Undang (UiTM / KPT)", duration: "1 year" },
            degree: { name: "Bachelor of Legal Studies (Hons) & LL.B", duration: "4 years" },
          },
          ms: {
            applicationNote: "Mohon melalui UPUOnline untuk Asasi Undang-Undang KPT / UiTM.",
            spmRequirements: [
              "Minimum 5 kredit termasuk Bahasa Inggeris dan Bahasa Melayu",
              "Lulus Matematik",
            ],
            preU: { name: "Asasi Undang-Undang (UiTM / KPT)", duration: "1 tahun" },
            degree: { name: "Sarjana Muda Pengajian Undang-Undang & LL.B", duration: "4 tahun" },
          },
        },
      },
    ],
  },

  "future-doctor": {
    careerId: "future-doctor",
    salaryRange: {
      entry: [4200, 5800],
      mid: [6500, 11000],
      senior: [12000, 22000],
    },
    salarySource: "MOH Malaysia & Glassdoor MY (Estimated)",
    estimatedBadge: "Estimated (MY)",
    i18n: {
      en: {
        title: "Future Doctor",
        subtitle: "Diagnose conditions, care for patients, and protect community health",
        summary:
          "Doctors combine biological science with compassionate care to heal injuries and manage diseases. Malaysian housemen start at roughly RM 4,200 – RM 5,800/mo including allowances.",
        matchReason:
          "Curiosity in human biology, care for others, and steady diagnostic thinking lead naturally to medicine.",
      },
      ms: {
        title: "Doktor Masa Depan",
        subtitle: "Diagnosis penyakit, rawat pesakit, dan pelihara kesihatan awam",
        summary:
          "Doktor menggabungkan sains biologi dengan sifat penyayang untuk merawat kecederaan dan penyakit. Pegawai perubatan siswazah (houseman) bermula sekitar RM 4,200 – RM 5,800/bln termasuk elaun.",
        matchReason:
          "Minat dalam biologi manusia, sifat prihatin, dan ketelitian diagnosis adalah asas kerjaya doktor.",
      },
    },
    routes: [
      {
        uniKey: "um",
        uniName: "Universiti Malaya (UM)",
        uniType: "public",
        i18n: {
          en: {
            applicationNote: "Requires top-tier UPU merit scores, Bio/Chem/Physics SPM straight As.",
            spmRequirements: [
              "Minimum 5As in SPM including Biology, Chemistry, Physics, Mathematics",
              "Pass in Sejarah and Bahasa Melayu",
            ],
            preU: { name: "Matrikulasi KPM (Sains Hayat) or Asasi Sains UM", duration: "1 year" },
            degree: { name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)", duration: "5 years" },
          },
          ms: {
            applicationNote: "Memerlukan markah merit UPU tertinggi dan deretan A dalam subjek Sains SPM.",
            spmRequirements: [
              "Minimum 5A dalam SPM termasuk Biologi, Kimia, Fizik, Matematik",
              "Lulus Sejarah dan Bahasa Melayu",
            ],
            preU: { name: "Matrikulasi KPM (Sains Hayat) atau Asasi Sains UM", duration: "1 tahun" },
            degree: { name: "Sarjana Muda Perubatan & Pembedahan (MBBS)", duration: "5 tahun" },
          },
        },
      },
      {
        uniKey: "ukm",
        uniName: "Universiti Kebangsaan Malaysia (UKM)",
        uniType: "public",
        i18n: {
          en: {
            applicationNote: "Hospital Canselor Tuanku Muhriz (HCTM) clinical teaching hospital.",
            spmRequirements: [
              "Straight As in Science Stream SPM",
              "Excellent co-curricular merit mark",
            ],
            preU: { name: "Asasi Pintar UKM or Matrikulasi Sains", duration: "1 year" },
            degree: { name: "Doctor of Medicine (MD)", duration: "5 years" },
          },
          ms: {
            applicationNote: "Hospital pengajar klinikal Hospital Canselor Tuanku Muhriz (HCTM).",
            spmRequirements: [
              "Semua A dalam Aliran Sains SPM",
              "Markah kokurikulum cemerlang",
            ],
            preU: { name: "Asasi Pintar UKM atau Matrikulasi Sains", duration: "1 tahun" },
            degree: { name: "Doktor Perubatan (MD)", duration: "5 tahun" },
          },
        },
      },
    ],
  },

  "product-designer": {
    careerId: "product-designer",
    salaryRange: {
      entry: [3200, 4500],
      mid: [5000, 8000],
      senior: [8500, 14000],
    },
    salarySource: "JobStreet MY & Glassdoor MY (Estimated)",
    estimatedBadge: "Estimated (MY)",
    i18n: {
      en: {
        title: "Product Designer",
        subtitle: "Craft intuitive user experiences and design accessible interfaces",
        summary:
          "Product designers blend human empathy with visual structure to make digital products effortless to use. Malaysian entry designers earn around RM 3,200 – RM 4,500/mo.",
        matchReason:
          "Creative empathy, visual hierarchy, and an interest in human behavior fit product design.",
      },
      ms: {
        title: "Pereka Produk",
        subtitle: "Reka pengalaman pengguna yang intuitif dan antara muka inklusif",
        summary:
          "Pereka produk menggabungkan empati manusia dengan struktur visual agar teknologi mudah digunakan. Pereka junior di Malaysia bermula sekitar RM 3,200 – RM 4,500/bln.",
        matchReason:
          "Kreativiti berempati, kepekaan visual, dan minat terhadap tingkah laku pengguna amat sesuai untuk reka bentuk produk.",
      },
    },
    routes: [
      {
        uniKey: "uitm",
        uniName: "Universiti Teknologi MARA (UiTM)",
        uniType: "public",
        i18n: {
          en: {
            applicationNote: "Faculty of Art & Design; portfolio review and drawing assessment required.",
            spmRequirements: [
              "Credit in Pendidikan Seni Visual or portfolio interview",
              "Credit in Mathematics & English",
              "Pass in Bahasa Melayu and Sejarah",
            ],
            preU: { name: "Diploma in Graphic Design & Digital Media", duration: "2.5 years" },
            degree: { name: "Bachelor of Arts (Hons) in Graphic & Interaction Design", duration: "3 years" },
          },
          ms: {
            applicationNote: "Fakulti Seni Lukis & Seni Reka; semakan portfolio dan ujian lukisan diperlukan.",
            spmRequirements: [
              "Kredit dalam Pendidikan Seni Visual atau temuduga portfolio",
              "Kredit dalam Matematik & Bahasa Inggeris",
              "Lulus Bahasa Melayu dan Sejarah",
            ],
            preU: { name: "Diploma Reka Bentuk Grafik & Media Digital", duration: "2.5 tahun" },
            degree: { name: "Sarjana Muda Seni Reka Grafik & Interaksi", duration: "3 tahun" },
          },
        },
      },
      {
        uniKey: "sunway",
        uniName: "Sunway University",
        uniType: "private",
        i18n: {
          en: {
            applicationNote: "Direct application with creative portfolio and SPM credit qualifications.",
            spmRequirements: [
              "5 SPM credits including English and Mathematics",
              "Art portfolio interview",
            ],
            preU: { name: "Foundation in Arts or Design Diploma", duration: "1 year" },
            degree: { name: "Bachelor of Design in Interactive Media & UX", duration: "3 years" },
          },
          ms: {
            applicationNote: "Permohonan terus dengan portfolio kreatif dan kelayakan kredit SPM.",
            spmRequirements: [
              "5 kredit SPM termasuk Bahasa Inggeris dan Matematik",
              "Temuduga portfolio seni",
            ],
            preU: { name: "Asasi Sastera atau Diploma Reka Bentuk", duration: "1 tahun" },
            degree: { name: "Sarjana Muda Reka Bentuk Media Interaktif & UX", duration: "3 tahun" },
          },
        },
      },
    ],
  },

  "master-chef": {
    careerId: "master-chef",
    salaryRange: {
      entry: [2600, 3800],
      mid: [4200, 6800],
      senior: [7500, 13000],
    },
    salarySource: "DOSM & JobStreet MY Hospitality (Estimated)",
    estimatedBadge: "Estimated (MY)",
    i18n: {
      en: {
        title: "Master Chef",
        subtitle: "Lead high-standard kitchens, balance flavors, and champion food safety",
        summary:
          "Chefs innovate flavours, coordinate kitchen stations, and oversee culinary hygiene. Commis chefs and culinary juniors start around RM 2,600 – RM 3,800/mo.",
        matchReason:
          "Hands-on execution, sensory precision, and teamwork in high-energy settings suit culinary arts.",
      },
      ms: {
        title: "Cef Utama",
        subtitle: "Terajui dapur profesional, seimbangkan rasa, dan utamakan keselamatan makanan",
        summary:
          "Cef mencipta rasa baharu, menyelaras bahagian dapur, dan memastikan kebersihan makanan tertinggi. Pembantu cef bermula sekitar RM 2,600 – RM 3,800/bln.",
        matchReason:
          "Kemahiran praktikal, ketelitian deria rasa, dan kerjasama pantas sangat padan dengan seni kulinari.",
      },
    },
    routes: [
      {
        uniKey: "uitm",
        uniName: "Universiti Teknologi MARA (UiTM)",
        uniType: "public",
        i18n: {
          en: {
            applicationNote: "Faculty of Hotel & Tourism Management at UiTM Puncak Alam / Dungun.",
            spmRequirements: [
              "Credit in Bahasa Melayu and Mathematics or Science",
              "Pass in English and Sejarah",
            ],
            preU: { name: "Diploma in Culinary Arts", duration: "2.5 years" },
            degree: { name: "Bachelor of Science (Hons) in Culinary Arts Management", duration: "3 years" },
          },
          ms: {
            applicationNote: "Fakulti Pengurusan Hotel & Pelancongan UiTM Puncak Alam / Dungun.",
            spmRequirements: [
              "Kredit dalam Bahasa Melayu dan Matematik atau Sains",
              "Lulus Bahasa Inggeris dan Sejarah",
            ],
            preU: { name: "Diploma Seni Kulinari", duration: "2.5 tahun" },
            degree: { name: "Sarjana Muda Sains (Kepujian) Pengurusan Seni Kulinari", duration: "3 tahun" },
          },
        },
      },
      {
        uniKey: "taylors",
        uniName: "Taylor's University",
        uniType: "private",
        i18n: {
          en: {
            applicationNote: "School of Hospitality, Tourism & Events; culinary lab practicals.",
            spmRequirements: [
              "3–5 SPM credits including pass in English and Bahasa Melayu",
            ],
            preU: { name: "Diploma in Culinary Arts", duration: "2 years" },
            degree: { name: "Bachelor of Culinary Management (Hons)", duration: "3 years" },
          },
          ms: {
            applicationNote: "Pusat Pengajian Hospitaliti & Pelancongan Taylor's; amali makmal kulinari.",
            spmRequirements: [
              "3–5 kredit SPM termasuk lulus Bahasa Inggeris dan Bahasa Melayu",
            ],
            preU: { name: "Diploma Seni Kulinari", duration: "2 tahun" },
            degree: { name: "Sarjana Muda Pengurusan Kulinari (Kepujian)", duration: "3 tahun" },
          },
        },
      },
    ],
  },
};

export function getDreamyCareer(careerId: string): DreamyCareerEntry | undefined {
  return DREAMY_KB[careerId];
}
