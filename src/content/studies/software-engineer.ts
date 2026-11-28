import type { StudyLessonContent } from "@/content/schemas";

export const SOFTWARE_ENGINEER_STUDIES: StudyLessonContent[] = [
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
  {
    id: "study-se-2",
    careerId: "software-engineer",
    readMinutes: 4,
    xpReward: 30,
    skillId: "problem-solving",
    i18n: {
      en: {
        title: "Thinking in Algorithms & Clean Logic",
        sections: [
          {
            heading: "1. Breaking Big Problems into Small Steps",
            body: [
              "An algorithm is a clear step-by-step recipe for solving a problem, like sorting exam scores or finding the shortest bus route.",
              "Software engineers break big features into small, testable pure functions so bugs are easy to spot.",
            ],
            keyTerms: [
              { term: "Algorithm", definition: "A finite, unambiguous sequence of steps to solve a task." },
              { term: "Pure Function", definition: "A function whose output depends only on its inputs with no hidden side effects." },
            ],
          },
        ],
      },
      ms: {
        title: "Berfikir Secara Algoritma & Logik Kemas",
        sections: [
          {
            heading: "1. Memecahkan Masalah Besar Kepada Langkah Kecil",
            body: [
              "Algoritma ialah langkah tersusun untuk menyelesaikan masalah, seperti menyusun markah peperiksaan atau mencari laluan bas terpantas.",
              "Jurutera perisian memecahkan ciri besar kepada fungsi kecil yang mudah diuji supaya pepijat mudah dikesan.",
            ],
            keyTerms: [
              { term: "Algoritma", definition: "Urutan langkah yang jelas dan terhingga untuk menyelesaikan tugasan." },
              { term: "Fungsi Tulen", definition: "Fungsi yang keluarannya hanya bergantung pada input tanpa kesan sampingan tersembunyi." },
            ],
          },
        ],
      },
    },
  },
  {
    id: "study-se-3",
    careerId: "software-engineer",
    readMinutes: 5,
    xpReward: 30,
    skillId: "accessibility",
    i18n: {
      en: {
        title: "Security & Accessibility by Default",
        sections: [
          {
            heading: "1. Protecting Users & Designing for Everyone",
            body: [
              "Great engineers never treat security or accessibility as afterthoughts. Prepared SQL statements block injection, and salted hashing protects passwords.",
              "Semantic HTML, keyboard focus rings, and readable color contrast ensure every Malaysian student can use your app.",
            ],
            keyTerms: [
              { term: "Prepared Statement", definition: "A parameterized query that separates SQL code from user input." },
              { term: "WCAG AA", definition: "International accessibility guidelines for readable contrast and keyboard support." },
            ],
          },
        ],
      },
      ms: {
        title: "Keselamatan & Aksesibiliti Sejak Awal",
        sections: [
          {
            heading: "1. Melindungi Pengguna & Rekaan Untuk Semua",
            body: [
              "Jurutera hebat tidak pernah mengabaikan keselamatan atau aksesibiliti. Pernyataan berparameter menghalang suntikan SQL, dan pencincangan bersalt melindungi kata laluan.",
              "HTML semantik, garis fokus papan kekunci, dan kontras warna yang jelas memastikan setiap pelajar boleh menggunakan aplikasi anda.",
            ],
            keyTerms: [
              { term: "Pernyataan Berparameter", definition: "Pertanyaan yang memisahkan kod SQL daripada input pengguna." },
              { term: "WCAG AA", definition: "Garis panduan aksesibiliti antarabangsa untuk kontras dan sokongan papan kekunci." },
            ],
          },
        ],
      },
    },
  },
];
