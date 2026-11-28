import type { QuizContent } from "@/content/schemas";

export const QUIZZES: QuizContent[] = [
  {
    id: "quiz-se-1",
    careerId: "software-engineer",
    i18n: {
      en: {
        title: "Web Fundamentals & Digital Safety",
        description:
          "Test your understanding of semantic HTML, CSS styling, JavaScript interactivity, and basic web security.",
      },
      ms: {
        title: "Asas Web & Keselamatan Digital",
        description:
          "Uji kefahaman anda tentang HTML semantik, penggayaan CSS, interaktiviti JavaScript, dan asas keselamatan web.",
      },
    },
    questions: [
      {
        id: "se-q1",
        skillId: "accessibility",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Which HTML element should be used for an interactive clickable button?",
            options: [
              {
                label: "A",
                text: '<button type="button">',
                explanation:
                  "Native buttons work with keyboards (Enter/Space) and screen readers automatically.",
              },
              {
                label: "B",
                text: '<div onclick="...">',
                explanation: "Div elements lack built-in keyboard focus and semantic roles.",
              },
              {
                label: "C",
                text: '<span class="btn">',
                explanation: "Spans are generic inline containers without button behaviour.",
              },
              {
                label: "D",
                text: '<p style="cursor:pointer">',
                explanation: "Paragraph elements represent text, not action controls.",
              },
            ],
          },
          ms: {
            question: "Elemen HTML manakah patut digunakan untuk butang interaktif yang boleh diklik?",
            options: [
              {
                label: "A",
                text: '<button type="button">',
                explanation:
                  "Butang asli berfungsi dengan papan kekunci (Enter/Space) dan pembaca skrin secara automatik.",
              },
              {
                label: "B",
                text: '<div onclick="...">',
                explanation: "Elemen div tidak mempunyai fokus papan kekunci dan peranan semantik terbina.",
              },
              {
                label: "C",
                text: '<span class="btn">',
                explanation: "Span ialah bekas sebaris umum tanpa tingkah laku butang.",
              },
              {
                label: "D",
                text: '<p style="cursor:pointer">',
                explanation: "Elemen perenggan mewakili teks, bukan kawalan tindakan.",
              },
            ],
          },
        },
      },
      {
        id: "se-q2",
        skillId: "html-css",
        correctLabel: "B",
        i18n: {
          en: {
            question: "What is the main role of CSS in a web application?",
            options: [
              {
                label: "A",
                text: "Store user passwords inside a database",
                explanation: "CSS handles presentation, not server-side databases.",
              },
              {
                label: "B",
                text: "Define visual layout, spacing, typography, and colors",
                explanation: "CSS controls visual styling and responsive layout across screen sizes.",
              },
              {
                label: "C",
                text: "Compile JavaScript into machine code",
                explanation: "Browser JavaScript engines handle script execution.",
              },
              {
                label: "D",
                text: "Send network requests to remote APIs",
                explanation: "Network calls are triggered via JavaScript APIs such as fetch().",
              },
            ],
          },
          ms: {
            question: "Apakah peranan utama CSS dalam sesebuah aplikasi web?",
            options: [
              {
                label: "A",
                text: "Menyimpan kata laluan pengguna dalam pangkalan data",
                explanation: "CSS menguruskan paparan visual, bukan pangkalan data pelayan.",
              },
              {
                label: "B",
                text: "Menentukan susun atur visual, jarak, tipografi, dan warna",
                explanation: "CSS mengawal gaya visual dan susun atur responsif merentas saiz skrin.",
              },
              {
                label: "C",
                text: "Menyusun JavaScript kepada kod mesin",
                explanation: "Enjin JavaScript pelayar mengendalikan pelaksanaan skrip.",
              },
              {
                label: "D",
                text: "Menghantar permintaan rangkaian ke API jauh",
                explanation: "Panggilan rangkaian dilakukan melalui API JavaScript seperti fetch().",
              },
            ],
          },
        },
      },
      {
        id: "se-q3",
        skillId: "problem-solving",
        correctLabel: "B",
        i18n: {
          en: {
            question: "Why should developers hash passwords instead of storing plain text?",
            options: [
              {
                label: "A",
                text: "Plain text uses too much mobile data",
                explanation: "Short text strings use negligible bandwidth.",
              },
              {
                label: "B",
                text: "Salted hashes prevent attackers from reading passwords if the database leaks",
                explanation: "One-way cryptographic hashing protects user credentials.",
              },
              {
                label: "C",
                text: "Databases can only store numbers",
                explanation: "Databases store standard UTF-8 text.",
              },
              {
                label: "D",
                text: "Browsers cannot read plain text strings",
                explanation: "Browsers display plain text strings directly.",
              },
            ],
          },
          ms: {
            question: "Mengapakah pembangun mencincang (hash) kata laluan dan tidak menyimpannya sebagai teks biasa?",
            options: [
              {
                label: "A",
                text: "Teks biasa menggunakan terlalu banyak data mudah alih",
                explanation: "Rentetan teks pendek menggunakan lebar jalur yang sangat kecil.",
              },
              {
                label: "B",
                text: "Cincangan bersalt menghalang penyerang membaca kata laluan jika pangkalan data bocor",
                explanation: "Pencincangan kriptografi sehala melindungi kelayakan pengguna.",
              },
              {
                label: "C",
                text: "Pangkalan data hanya boleh menyimpan nombor",
                explanation: "Pangkalan data menyimpan teks UTF-8 standard.",
              },
              {
                label: "D",
                text: "Pelayar tidak dapat membaca rentetan teks biasa",
                explanation: "Pelayar memaparkan teks biasa secara langsung.",
              },
            ],
          },
        },
      },
      {
        id: "se-q4",
        skillId: "javascript",
        correctLabel: "C",
        i18n: {
          en: {
            question: "Which JavaScript method transforms every item in an array into a new array?",
            options: [
              {
                label: "A",
                text: "array.push()",
                explanation: "push() adds an item to the end of an existing array.",
              },
              {
                label: "B",
                text: "array.pop()",
                explanation: "pop() removes the last item from an array.",
              },
              {
                label: "C",
                text: "array.map()",
                explanation: "map() creates a new array by transforming every element.",
              },
              {
                label: "D",
                text: "array.join()",
                explanation: "join() combines array elements into a single string.",
              },
            ],
          },
          ms: {
            question: "Kaedah JavaScript manakah menukar setiap item dalam tatasusunan menjadi tatasusunan baharu?",
            options: [
              {
                label: "A",
                text: "array.push()",
                explanation: "push() menambah item di hujung tatasusunan sedia ada.",
              },
              {
                label: "B",
                text: "array.pop()",
                explanation: "pop() membuang item terakhir daripada tatasusunan.",
              },
              {
                label: "C",
                text: "array.map()",
                explanation: "map() menghasilkan tatasusunan baharu dengan menukar setiap elemen.",
              },
              {
                label: "D",
                text: "array.join()",
                explanation: "join() menggabungkan elemen tatasusunan menjadi satu rentetan.",
              },
            ],
          },
        },
      },
      {
        id: "se-q5",
        skillId: "communication",
        correctLabel: "A",
        i18n: {
          en: {
            question: "What makes a bug report most helpful to your engineering team?",
            options: [
              {
                label: "A",
                text: "Clear steps to reproduce, expected behaviour, and actual behaviour",
                explanation: "Reproducible steps help teammates locate and fix the issue quickly.",
              },
              {
                label: "B",
                text: "Writing only 'it is broken' with no details",
                explanation: "Vague reports slow down debugging.",
              },
              {
                label: "C",
                text: "Deleting the source file before anyone checks it",
                explanation: "Deleting files removes context needed to fix the bug.",
              },
              {
                label: "D",
                text: "Waiting until launch day to mention the issue",
                explanation: "Reporting bugs early reduces risk and rework.",
              },
            ],
          },
          ms: {
            question: "Apakah yang menjadikan laporan pepijat paling membantu untuk pasukan kejuruteraan anda?",
            options: [
              {
                label: "A",
                text: "Langkah jelas untuk mengulang semula, hasil dijangka, dan hasil sebenar",
                explanation: "Langkah yang boleh diulang membantu rakan sepasukan mengenal pasti punca dengan cepat.",
              },
              {
                label: "B",
                text: "Menulis 'ia rosak' sahaja tanpa maklumat lanjut",
                explanation: "Laporan kabur melambatkan proses penyahpepijatan.",
              },
              {
                label: "C",
                text: "Memadam fail sumber sebelum sesiapa menyemaknya",
                explanation: "Memadam fail menghilangkan konteks penting untuk membaiki pepijat.",
              },
              {
                label: "D",
                text: "Menunggu sehingga hari pelancaran untuk memaklumkan masalah",
                explanation: "Melaporkan pepijat awal mengurangkan risiko dan kerja semula.",
              },
            ],
          },
        },
      },
    ],
  },
];

export function getQuizzesByCareer(careerId: string): QuizContent[] {
  return QUIZZES.filter((quiz) => quiz.careerId === careerId);
}

export function getQuizById(id: string): QuizContent | undefined {
  return QUIZZES.find((quiz) => quiz.id === id);
}
