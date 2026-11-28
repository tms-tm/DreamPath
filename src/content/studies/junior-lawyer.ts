import type { StudyLessonContent } from "@/content/schemas";

export const JUNIOR_LAWYER_STUDIES: StudyLessonContent[] = [
  {
    id: "study-law-1",
    careerId: "junior-lawyer",
    readMinutes: 5,
    xpReward: 30,
    skillId: "communication",
    i18n: {
      en: {
        title: "Fundamentals of Justice, Evidence & Due Process",
        sections: [
          {
            heading: "1. What Is the Rule of Law?",
            body: [
              "The Rule of Law means every person—including leaders and officials—is accountable under the same public laws.",
              "Fair procedures prevent arbitrary punishment and ensure disputes are resolved calmly with evidence.",
            ],
            keyTerms: [
              { term: "Due Process", definition: "The legal requirement that the state respects a person's rights to a fair hearing." },
              { term: "Presumption of Innocence", definition: "A person is considered innocent until proven guilty by law." },
            ],
          },
        ],
      },
      ms: {
        title: "Asas Keadilan, Bukti & Proses Wajar",
        sections: [
          {
            heading: "1. Apakah Kedaulatan Undang-Undang?",
            body: [
              "Kedaulatan undang-undang bermaksud setiap individu—termasuk pemimpin dan pegawai—tertakluk kepada undang-undang awam yang sama.",
              "Prosedur yang adil menghalang hukuman sewenang-wenangnya dan menyelesaikan pertikaian secara berhemah.",
            ],
            keyTerms: [
              { term: "Proses Wajar", definition: "Keperluan undang-undang agar hak seseorang untuk didengari secara adil dihormati." },
              { term: "Anggapan Tidak Bersalah", definition: "Seseorang dianggap tidak bersalah sehingga dibuktikan bersalah mengikut undang-undang." },
            ],
          },
        ],
      },
    },
  },
  {
    id: "study-law-2",
    careerId: "junior-lawyer",
    readMinutes: 4,
    xpReward: 30,
    skillId: "problem-solving",
    i18n: {
      en: {
        title: "How Binding Contracts Work",
        sections: [
          {
            heading: "1. Offer, Acceptance, and Consideration",
            body: [
              "A valid contract needs a clear offer, mutual acceptance, lawful purpose, and something of value exchanged (consideration).",
              "Reading the fine print before signing protects students and clubs from hidden fees.",
            ],
            keyTerms: [
              { term: "Consideration", definition: "The value or promise exchanged between parties in a contract." },
              { term: "Written Record", definition: "Signed quotes or messages that prove agreed terms." },
            ],
          },
        ],
      },
      ms: {
        title: "Bagaimana Kontrak Sah Berfungsi",
        sections: [
          {
            heading: "1. Tawaran, Penerimaan, dan Balasan",
            body: [
              "Kontrak yang sah memerlukan tawaran jelas, persetujuan bersama, tujuan sah di sisi undang-undang, dan pertukaran nilai (balasan).",
              "Membaca terma halus sebelum menandatangani melindungi pelajar daripada caj tersembunyi.",
            ],
            keyTerms: [
              { term: "Balasan (Consideration)", definition: "Nilai atau janji yang ditukar antara pihak dalam kontrak." },
              { term: "Rekod Bertulis", definition: "Sebut harga bertandatangan atau mesej yang membuktikan terma dipersetujui." },
            ],
          },
        ],
      },
    },
  },
  {
    id: "study-law-3",
    careerId: "junior-lawyer",
    readMinutes: 4,
    xpReward: 30,
    skillId: "accessibility",
    i18n: {
      en: {
        title: "Privacy & Digital Rights for Minors (PDPA)",
        sections: [
          {
            heading: "1. Data Minimisation & Consent",
            body: [
              "Malaysia's Personal Data Protection Act (PDPA) encourages organizations to collect only the data they genuinely need.",
              "For students under 18, parent or guardian permission and keeping personal phone numbers private are key safeguards.",
            ],
            keyTerms: [
              { term: "Data Minimisation", definition: "Collecting only the minimum personal data needed for a task." },
              { term: "Consent", definition: "Clear, informed permission before collecting or sharing data." },
            ],
          },
        ],
      },
      ms: {
        title: "Privasi & Hak Digital Pelajar (PDPA)",
        sections: [
          {
            heading: "1. Pengurangan Data & Keizinan",
            body: [
              "Akta Perlindungan Data Peribadi (PDPA) Malaysia menggalakkan organisasi mengumpul hanya data yang benar-benar diperlukan.",
              "Bagi pelajar bawah 18 tahun, kebenaran ibu bapa atau penjaga serta menjaga kerahsiaan nombor telefon adalah langkah penting.",
            ],
            keyTerms: [
              { term: "Pengurangan Data", definition: "Mengumpul hanya data peribadi minimum yang diperlukan." },
              { term: "Keizinan", definition: "Kebenaran jelas sebelum mengumpul atau berkongsi data." },
            ],
          },
        ],
      },
    },
  },
];
