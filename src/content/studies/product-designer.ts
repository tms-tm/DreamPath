import type { StudyLessonContent } from "@/content/schemas";

export const PRODUCT_DESIGNER_STUDIES: StudyLessonContent[] = [
  {
    id: "study-ux-1",
    careerId: "product-designer",
    readMinutes: 4,
    xpReward: 30,
    skillId: "accessibility",
    i18n: {
      en: {
        title: "Human-Centered Design & Usability Testing",
        sections: [
          {
            heading: "1. Designing Around Real People",
            body: [
              "Product designers start by observing how real students use an app, spotting where they hesitate or get confused.",
              "Clear button labels, logical grouping, and readable contrast turn frustrating screens into calm experiences.",
            ],
            keyTerms: [
              { term: "Wireframe", definition: "A simple low-detail sketch showing layout and flow before visual polish." },
              { term: "Usability Test", definition: "Watching real users try tasks to find confusing parts." },
            ],
          },
        ],
      },
      ms: {
        title: "Reka Bentuk Berpusatkan Manusia & Ujian Kebolehgunaan",
        sections: [
          {
            heading: "1. Mereka Bentuk Untuk Pengguna Sebenar",
            body: [
              "Pereka produk bermula dengan memerhati bagaimana pelajar sebenar menggunakan aplikasi dan mengenal pasti bahagian yang mengelirukan.",
              "Label butang yang jelas dan kontras mudah dibaca menjadikan skrin lebih mesra pengguna.",
            ],
            keyTerms: [
              { term: "Rangka Dawai (Wireframe)", definition: "Lakaran ringkas susun atur dan aliran sebelum penggayaan penuh." },
              { term: "Ujian Kebolehgunaan", definition: "Memerhati pengguna sebenar mencuba tugasan untuk mengesan kekeliruan." },
            ],
          },
        ],
      },
    },
  },
  {
    id: "study-ux-2",
    careerId: "product-designer",
    readMinutes: 4,
    xpReward: 30,
    skillId: "html-css",
    i18n: {
      en: {
        title: "Mobile-First Layouts & Touch Targets",
        sections: [
          {
            heading: "1. Designing for 375px Phones",
            body: [
              "Mobile-first design stacks cards cleanly in a single column so users never have to pinch-zoom or scroll sideways.",
              "Interactive buttons should be at least 44×44px so thumbs can tap accurately.",
            ],
            keyTerms: [
              { term: "Touch Target", definition: "The clickable area of a button, ideally at least 44×44 pixels." },
              { term: "Responsive Grid", definition: "A layout that adapts smoothly from 375px phones to desktop screens." },
            ],
          },
        ],
      },
      ms: {
        title: "Susun Atur Mudah Alih & Sasaran Sentuhan",
        sections: [
          {
            heading: "1. Rekaan Untuk Skrin Telefon 375px",
            body: [
              "Reka bentuk utamakan mudah alih menyusun kad dalam satu lajur supaya pengguna tidak perlu skrol ke tepi.",
              "Butang interaktif patut sekurang-kurangnya 44×44px supaya mudah ditekan dengan jari.",
            ],
            keyTerms: [
              { term: "Sasaran Sentuhan", definition: "Kawasan boleh sentuh sesuatu butang, sebaiknya sekurang-kurangnya 44×44 piksel." },
              { term: "Grid Responsif", definition: "Susun atur yang menyesuaikan diri daripada telefon 375px hingga skrin desktop." },
            ],
          },
        ],
      },
    },
  },
];
