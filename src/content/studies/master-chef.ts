import type { StudyLessonContent } from "@/content/schemas";

export const MASTER_CHEF_STUDIES: StudyLessonContent[] = [
  {
    id: "study-chef-1",
    careerId: "master-chef",
    readMinutes: 4,
    xpReward: 30,
    skillId: "problem-solving",
    i18n: {
      en: {
        title: "Kitchen Hygiene & Preventing Cross-Contamination",
        sections: [
          {
            heading: "1. Safe Food Prep Habits",
            body: [
              "Professional kitchens use color-coded cutting boards—separate boards for raw meat and fresh fruit—to stop harmful bacteria from spreading.",
              "Washing hands, checking cooking temperatures, and chilling leftovers promptly keep diners healthy.",
            ],
            keyTerms: [
              { term: "Cross-Contamination", definition: "Transfer of harmful bacteria from raw food to ready-to-eat food." },
              { term: "Mise en Place", definition: "Preparing and organizing all ingredients cleanly before cooking starts." },
            ],
          },
        ],
      },
      ms: {
        title: "Kebersihan Dapur & Mencegah Pencemaran Silang",
        sections: [
          {
            heading: "1. Amalan Penyediaan Makanan Selamat",
            body: [
              "Dapur profesional menggunakan papan pemotong berkod warna—berasingan untuk daging mentah dan buah segar—bagi menghalang penyebaran bakteria.",
              "Mencuci tangan, menyemak suhu masakan, dan menyejukkan lebihan dengan cepat menjaga kesihatan pelanggan.",
            ],
            keyTerms: [
              { term: "Pencemaran Silang", definition: "Pemindahan bakteria berbahaya daripada makanan mentah ke makanan sedia dimakan." },
              { term: "Mise en Place", definition: "Menyediakan dan menyusun semua bahan dengan kemas sebelum memasak." },
            ],
          },
        ],
      },
    },
  },
  {
    id: "study-chef-2",
    careerId: "master-chef",
    readMinutes: 4,
    xpReward: 30,
    skillId: "communication",
    i18n: {
      en: {
        title: "Balanced Nutrition & Zero-Waste Kitchens",
        sections: [
          {
            heading: "1. Suku-Suku Separuh & Smart Prep",
            body: [
              "Malaysia's Suku-Suku Separuh plate balances half vegetables and fruits, a quarter protein, and a quarter whole grains.",
              "Tracking portion sizes and turning safe surplus vegetables into soups or stocks cuts kitchen waste and saves money.",
            ],
            keyTerms: [
              { term: "Suku-Suku Separuh", definition: "Malaysia's healthy meal guide: half produce, quarter protein, quarter carbs." },
              { term: "Food Costing", definition: "Calculating ingredient costs per portion to run a sustainable kitchen." },
            ],
          },
        ],
      },
      ms: {
        title: "Nutrisi Seimbang & Dapur Sifar Pembaziran",
        sections: [
          {
            heading: "1. Suku-Suku Separuh & Penyediaan Pintar",
            body: [
              "Pinggan Sihat Malaysia (Suku-Suku Separuh) menyeimbangkan separuh sayur dan buah, suku protein, dan suku karbohidrat.",
              "Mengira saiz hidangan dan mengolah lebihan sayur yang selamat menjadi sup mengurangkan pembaziran serta kos.",
            ],
            keyTerms: [
              { term: "Suku-Suku Separuh", definition: "Panduan pinggan sihat Malaysia: separuh sayur/buah, suku protein, suku karbohidrat." },
              { term: "Pengkosan Makanan", definition: "Mengira kos bahan bagi setiap hidangan untuk dapur yang mampan." },
            ],
          },
        ],
      },
    },
  },
];
