import type { StudyLessonContent } from "@/content/schemas";

export const STUDY_LESSONS: StudyLessonContent[] = [
  {
    id: "study-se-1",
    careerId: "software-engineer",
    readMinutes: 4,
    xpReward: 30,
    skillId: "html-css",
    i18n: {
      en: {
        title: "How Web Applications Actually Work",
        sections: [
          {
            heading: "1. The Client–Server Conversation",
            body: [
              "Whenever you open an app or click a button in your browser, your device (the client) sends an HTTP request to a remote server.",
              "The server checks data safely, applies business logic, and replies with HTML, CSS, JavaScript, or JSON.",
            ],
            keyTerms: [
              { term: "Client", definition: "The browser or device requesting content." },
              { term: "Server", definition: "A computer hosting app logic and databases." },
              { term: "API", definition: "A structured contract for apps to exchange data." },
            ],
          },
          {
            heading: "2. Three Core Web Building Blocks",
            body: [
              "HTML builds semantic structure (headings, buttons, landmarks) so everyone—including screen-reader users—can navigate.",
              "CSS styles layout, spacing, and typography cleanly, while JavaScript powers interactive logic.",
            ],
          },
        ],
      },
      ms: {
        title: "Bagaimana Aplikasi Web Berfungsi",
        sections: [
          {
            heading: "1. Perbualan Pelanggan–Pelayan",
            body: [
              "Setiap kali anda membuka aplikasi atau menekan butang dalam pelayar, peranti anda (pelanggan) menghantar permintaan HTTP ke pelayan jauh.",
              "Pelayan menyemak data dengan selamat, memproses logik, dan membalas dengan HTML, CSS, JavaScript, atau JSON.",
            ],
            keyTerms: [
              { term: "Pelanggan (Client)", definition: "Pelayar atau peranti yang meminta kandungan." },
              { term: "Pelayan (Server)", definition: "Komputer yang menghoskan logik aplikasi dan pangkalan data." },
              { term: "API", definition: "Protokol tersusun untuk aplikasi bertukar-tukar data." },
            ],
          },
          {
            heading: "2. Tiga Blok Binaan Utama Web",
            body: [
              "HTML membina struktur semantik (tajuk, butang, mercu tanda) supaya semua orang—termasuk pengguna pembaca skrin—boleh menavigasi.",
              "CSS menggayakan susun atur, jarak, dan tipografi, manakala JavaScript menggerakkan logik interaktif.",
            ],
          },
        ],
      },
    },
  },
];

export function getStudiesByCareer(careerId: string): StudyLessonContent[] {
  return STUDY_LESSONS.filter((lesson) => lesson.careerId === careerId);
}

export function getStudyById(id: string): StudyLessonContent | undefined {
  return STUDY_LESSONS.find((lesson) => lesson.id === id);
}
