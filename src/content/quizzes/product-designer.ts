import type { QuizContent } from "../schemas";

export const PRODUCT_DESIGNER_QUIZZES: QuizContent[] = [
  {
    id: "pd-quiz-usability",
    careerId: "product-designer",
    i18n: {
      en: {
        title: "Usability & Design Thinking Sprint",
        description:
          "Test your instincts on user research, accessibility contrast, and information hierarchy.",
      },
      ms: {
        title: "Pecutan Kebolehgunaan & Pemikiran Reka Bentuk",
        description:
          "Uji naluri anda tentang penyelidikan pengguna, kontras kebolehcapaian, dan hierarki maklumat.",
      },
    },
    questions: [
      {
        id: "pd-q1",
        skillId: "accessibility",
        correctLabel: "B",
        i18n: {
          en: {
            question:
              "What is the minimum WCAG AA contrast ratio required for normal-sized body text against its background?",
            options: [
              {
                label: "A",
                text: "2.5:1",
                explanation:
                  "2.5:1 is too low and fails both AA and AAA readability standards for body text.",
              },
              {
                label: "B",
                text: "4.5:1",
                explanation:
                  "Correct! WCAG AA requires at least 4.5:1 contrast for normal text so users with low vision can read comfortably.",
              },
              {
                label: "C",
                text: "3.0:1",
                explanation:
                  "3.0:1 applies to large text and UI components, not normal body text.",
              },
              {
                label: "D",
                text: "10.0:1",
                explanation:
                  "10.0:1 exceeds even the WCAG AAA standard of 7.0:1.",
              },
            ],
          },
          ms: {
            question:
              "Apakah nisbah kontras minimum WCAG AA yang diperlukan untuk teks badan bersaiz biasa berbanding latar belakangnya?",
            options: [
              {
                label: "A",
                text: "2.5:1",
                explanation:
                  "2.5:1 terlalu rendah dan gagal memenuhi piawaian kebolehbacaan AA dan AAA.",
              },
              {
                label: "B",
                text: "4.5:1",
                explanation:
                  "Betul! WCAG AA memerlukan sekurang-kurangnya kontras 4.5:1 untuk teks biasa agar mudah dibaca.",
              },
              {
                label: "C",
                text: "3.0:1",
                explanation:
                  "3.0:1 terpakai untuk teks besar dan komponen UI, bukan teks badan biasa.",
              },
              {
                label: "D",
                text: "10.0:1",
                explanation:
                  "10.0:1 melebihi piawaian WCAG AAA iaitu 7.0:1.",
              },
            ],
          },
        },
      },
      {
        id: "pd-q2",
        skillId: "communication",
        correctLabel: "C",
        i18n: {
          en: {
            question:
              "During a usability test, a participant hesitates for 10 seconds trying to find the 'Save' button. What should you do first?",
            options: [
              {
                label: "A",
                text: "Immediately point to the button on the screen",
                explanation:
                  "Pointing out the answer invalidates the test because it hides the discoverability issue.",
              },
              {
                label: "B",
                text: "Apologize and explain why the button is placed there",
                explanation:
                  "Defending the design biases the participant and prevents honest feedback.",
              },
              {
                label: "C",
                text: "Stay quiet, observe, and ask what they expected to see",
                explanation:
                  "Correct! Observing silently and asking open-ended questions reveals their mental model.",
              },
              {
                label: "D",
                text: "End the session and mark the task as failed",
                explanation:
                  "Ending early misses valuable insight into where users look and why.",
              },
            ],
          },
          ms: {
            question:
              "Semasa ujian kebolehgunaan, peserta teragak-agak selama 10 saat mencari butang 'Simpan'. Apakah tindakan pertama anda?",
            options: [
              {
                label: "A",
                text: "Terus tunjukkan butang tersebut pada skrin",
                explanation:
                  "Menunjukkan jawapan merosakkan ujian kerana menyembunyikan masalah kebolehjumpaan.",
              },
              {
                label: "B",
                text: "Minta maaf dan terangkan mengapa butang itu diletakkan di situ",
                explanation:
                  "Mempertahankan reka bentuk mempengaruhi peserta dan menghalang maklum balas jujur.",
              },
              {
                label: "C",
                text: "Berdiam diri, perhati, dan tanya apa yang mereka jangkakan",
                explanation:
                  "Betul! Memerhati secara senyap dan bertanya soalan terbuka mendedahkan model mental mereka.",
              },
              {
                label: "D",
                text: "Tamatkan sesi dan tandakan tugasan sebagai gagal",
                explanation:
                  "Menamatkan awal menyebabkan anda terlepas maklumat penting tentang tingkah laku pengguna.",
              },
            ],
          },
        },
      },
      {
        id: "pd-q3",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question:
              "Which research artifact maps a user's step-by-step emotions, pain points, and touchpoints across a full experience?",
            options: [
              {
                label: "A",
                text: "Customer Journey Map",
                explanation:
                  "Correct! A journey map visualizes stages, actions, emotions, and pain points end-to-end.",
              },
              {
                label: "B",
                text: "Style Guide",
                explanation:
                  "A style guide documents colors, typography, and visual tokens rather than user emotions.",
              },
              {
                label: "C",
                text: "Database Schema",
                explanation:
                  "A database schema defines backend data tables, not user touchpoints.",
              },
              {
                label: "D",
                text: "Release Notes",
                explanation:
                  "Release notes summarize shipped software changes for users or stakeholders.",
              },
            ],
          },
          ms: {
            question:
              "Artifak penyelidikan manakah yang memetakan emosi, titik kesukaran, dan titik sentuh pengguna langkah demi langkah?",
            options: [
              {
                label: "A",
                text: "Peta Perjalanan Pelanggan (Customer Journey Map)",
                explanation:
                  "Betul! Peta perjalanan memvisualisasikan peringkat, tindakan, emosi, dan titik kesukaran dari awal hingga akhir.",
              },
              {
                label: "B",
                text: "Panduan Gaya (Style Guide)",
                explanation:
                  "Panduan gaya mendokumenkan warna, tipografi, dan token visual, bukan emosi pengguna.",
              },
              {
                label: "C",
                text: "Skema Pangkalan Data",
                explanation:
                  "Skema pangkalan data mentakrifkan jadual data sistem, bukan titik sentuh pengguna.",
              },
              {
                label: "D",
                text: "Nota Keluaran (Release Notes)",
                explanation:
                  "Nota keluaran merumuskan perubahan perisian yang telah dilancarkan.",
              },
            ],
          },
        },
      },
      {
        id: "pd-q4",
        skillId: "html-css",
        correctLabel: "D",
        i18n: {
          en: {
            question:
              "Why is an 8px spacing grid commonly used in UI design systems?",
            options: [
              {
                label: "A",
                text: "Browsers cannot render odd pixel numbers",
                explanation:
                  "Browsers can render any pixel value, including odd numbers.",
              },
              {
                label: "B",
                text: "It forces every card to have identical height",
                explanation:
                  "Spacing grids create rhythm and alignment without forcing identical component heights.",
              },
              {
                label: "C",
                text: "It removes the need for responsive breakpoints",
                explanation:
                  "Responsive breakpoints are still needed for different viewport widths.",
              },
              {
                label: "D",
                text: "It creates consistent visual rhythm and scales cleanly across screen densities",
                explanation:
                  "Correct! Multiples of 8 divide cleanly across common 1x, 1.5x, and 2x display scales and keep layouts harmonious.",
              },
            ],
          },
          ms: {
            question:
              "Mengapakah grid jarak 8px sering digunakan dalam sistem reka bentuk UI?",
            options: [
              {
                label: "A",
                text: "Pelayar web tidak boleh memaparkan nombor piksel ganjil",
                explanation:
                  "Pelayar web boleh memaparkan sebarang nilai piksel termasuk nombor ganjil.",
              },
              {
                label: "B",
                text: "Ia memaksa setiap kad mempunyai ketinggian yang sama",
                explanation:
                  "Grid jarak mencipta ritma dan penjajaran tanpa memaksa ketinggian komponen yang sama.",
              },
              {
                label: "C",
                text: "Ia menghapuskan keperluan titik putus responsif",
                explanation:
                  "Titik putus responsif masih diperlukan untuk lebar skrin yang berbeza.",
              },
              {
                label: "D",
                text: "Ia mencipta ritma visual yang konsisten dan berskala kemas merentas ketumpatan skrin",
                explanation:
                  "Betul! Gandaan 8 dibahagi kemas merentas skala paparan 1x, 1.5x, dan 2x serta mengekalkan susun atur harmoni.",
              },
            ],
          },
        },
      },
      {
        id: "pd-q5",
        skillId: "accessibility",
        correctLabel: "C",
        i18n: {
          en: {
            question:
              "When designing an error state for a form input, which approach is accessible for color-blind users?",
            options: [
              {
                label: "A",
                text: "Turn the input border red without any text",
                explanation:
                  "Relying on color alone fails WCAG and leaves color-blind or screen-reader users confused.",
              },
              {
                label: "B",
                text: "Flash the whole screen briefly",
                explanation:
                  "Flashing screens can trigger seizures and do not explain what went wrong.",
              },
              {
                label: "C",
                text: "Combine color with an alert icon and clear inline error message",
                explanation:
                  "Correct! Pairing color with iconography and descriptive text communicates the error to everyone.",
              },
              {
                label: "D",
                text: "Disable the form until the page is refreshed",
                explanation:
                  "Disabling the form blocks recovery and frustrates users.",
              },
            ],
          },
          ms: {
            question:
              "Apabila mereka bentuk keadaan ralat untuk input borang, pendekatan manakah yang boleh diakses oleh pengguna buta warna?",
            options: [
              {
                label: "A",
                text: "Tukarkan sempadan input kepada merah tanpa sebarang teks",
                explanation:
                  "Bergantung pada warna sahaja gagal memenuhi WCAG dan mengelirukan pengguna buta warna atau pembaca skrin.",
              },
              {
                label: "B",
                text: "Kelipkan seluruh skrin seketika",
                explanation:
                  "Skrin berkelip boleh mencetuskan sawan dan tidak menerangkan punca ralat.",
              },
              {
                label: "C",
                text: "Gabungkan warna dengan ikon amaran dan mesej ralat sebaris yang jelas",
                explanation:
                  "Betul! Menggabungkan warna dengan ikonografi dan teks deskriptif menyampaikan ralat kepada semua pengguna.",
              },
              {
                label: "D",
                text: "Nyahdayakan borang sehingga halaman dimuat semula",
                explanation:
                  "Menyahdayakan borang menghalang pemulihan dan mengecewakan pengguna.",
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: "pd-quiz-systems",
    careerId: "product-designer",
    i18n: {
      en: {
        title: "Design Systems & Prototyping",
        description:
          "Check your grasp of component states, design tokens, and interactive prototyping.",
      },
      ms: {
        title: "Sistem Reka Bentuk & Prototaip",
        description:
          "Semak pemahaman anda tentang keadaan komponen, token reka bentuk, dan prototaip interaktif.",
      },
    },
    questions: [
      {
        id: "pd-s1",
        skillId: "html-css",
        correctLabel: "B",
        i18n: {
          en: {
            question:
              "What is the main advantage of semantic design tokens (e.g., `color-bg-surface`) over raw hex values?",
            options: [
              {
                label: "A",
                text: "They make image files smaller",
                explanation:
                  "Design tokens govern UI styles, not raster image compression.",
              },
              {
                label: "B",
                text: "They communicate intent and allow consistent theme updates from one place",
                explanation:
                  "Correct! Semantic tokens describe where a value is used so themes can update cleanly across all components.",
              },
              {
                label: "C",
                text: "They eliminate the need for CSS",
                explanation:
                  "Tokens are consumed by CSS or platform stylesheets rather than replacing them.",
              },
              {
                label: "D",
                text: "They automatically write user research reports",
                explanation:
                  "Tokens are styling variables and do not generate research reports.",
              },
            ],
          },
          ms: {
            question:
              "Apakah kelebihan utama token reka bentuk semantik (cth. `color-bg-surface`) berbanding nilai hex mentah?",
            options: [
              {
                label: "A",
                text: "Ia mengecilkan saiz fail imej",
                explanation:
                  "Token reka bentuk mengawal gaya UI, bukan pemampatan imej.",
              },
              {
                label: "B",
                text: "Ia menyampaikan tujuan penggunaan dan membolehkan kemas kini tema yang konsisten dari satu tempat",
                explanation:
                  "Betul! Token semantik menerangkan kegunaan nilai supaya tema boleh dikemas kini dengan kemas merentas komponen.",
              },
              {
                label: "C",
                text: "Ia menghapuskan keperluan CSS",
                explanation:
                  "Token digunakan oleh CSS atau helaian gaya platform, bukan menggantikannya.",
              },
              {
                label: "D",
                text: "Ia menulis laporan penyelidikan pengguna secara automatik",
                explanation:
                  "Token ialah pemboleh ubah penggayaan dan tidak menjana laporan penyelidikan.",
              },
            ],
          },
        },
      },
      {
        id: "pd-s2",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question:
              "Which set of interactive states should every clickable button component define before engineering handoff?",
            options: [
              {
                label: "A",
                text: "Default, hover, focus-visible, active, and disabled",
                explanation:
                  "Correct! Defining all five states ensures mouse, keyboard, and disabled interactions are predictable.",
              },
              {
                label: "B",
                text: "Default and hover only",
                explanation:
                  "Omitting focus-visible and disabled leaves keyboard users and blocked states undefined.",
              },
              {
                label: "C",
                text: "Print and offline only",
                explanation:
                  "Those are document/network modes rather than button interaction states.",
              },
              {
                label: "D",
                text: "Animation duration only",
                explanation:
                  "Timing alone does not define visual appearance across interaction states.",
              },
            ],
          },
          ms: {
            question:
              "Set keadaan interaktif manakah yang perlu ditakrifkan untuk setiap komponen butang boleh klik sebelum serahan kepada kejuruteraan?",
            options: [
              {
                label: "A",
                text: "Lalai (default), hover, focus-visible, aktif, dan dinyahdayakan",
                explanation:
                  "Betul! Menakrifkan kesemua lima keadaan memastikan interaksi tetikus, papan kekunci, dan keadaan tidak aktif jelas.",
              },
              {
                label: "B",
                text: "Lalai dan hover sahaja",
                explanation:
                  "Mengabaikan focus-visible dan dinyahdayakan menyebabkan pengguna papan kekunci tidak mendapat petunjuk visual.",
              },
              {
                label: "C",
                text: "Cetak dan luar talian sahaja",
                explanation:
                  "Itu ialah mod dokumen atau rangkaian, bukan keadaan interaksi butang.",
              },
              {
                label: "D",
                text: "Tempoh animasi sahaja",
                explanation:
                  "Masa sahaja tidak mentakrifkan rupa visual merentas keadaan interaksi.",
              },
            ],
          },
        },
      },
      {
        id: "pd-s3",
        skillId: "communication",
        correctLabel: "C",
        i18n: {
          en: {
            question:
              "When handing off a new checkout screen to developers, what makes the spec most actionable?",
            options: [
              {
                label: "A",
                text: "Sending only a flattened PNG screenshot",
                explanation:
                  "A PNG lacks spacing values, edge cases, and copy states.",
              },
              {
                label: "B",
                text: "Designing only the happy path with short placeholder names",
                explanation:
                  "Real names, long labels, empty states, and errors are critical for engineering.",
              },
              {
                label: "C",
                text: "Documenting empty, loading, error, and long-text edge cases alongside tokens",
                explanation:
                  "Correct! Edge cases and tokens prevent guesswork and back-and-forth during implementation.",
              },
              {
                label: "D",
                text: "Asking engineers to invent missing mobile breakpoints",
                explanation:
                  "Responsive behavior should be aligned intentionally rather than guessed.",
              },
            ],
          },
          ms: {
            question:
              "Semasa menyerahkan skrin pembayaran baharu kepada pembangun, apakah yang menjadikan spesifikasi paling mudah dilaksanakan?",
            options: [
              {
                label: "A",
                text: "Menghantar tangkapan skrin PNG rata sahaja",
                explanation:
                  "Fail PNG tidak mempunyai nilai jarak, kes pinggir, atau keadaan teks.",
              },
              {
                label: "B",
                text: "Mereka bentuk laluan ideal sahaja dengan teks contoh pendek",
                explanation:
                  "Nama sebenar, label panjang, keadaan kosong, dan ralat sangat penting untuk pelaksanaan.",
              },
              {
                label: "C",
                text: "Mendokumenkan keadaan kosong, memuatkan, ralat, dan teks panjang bersama token",
                explanation:
                  "Betul! Kes pinggir dan token mengelakkan tekaan semasa pembangunan.",
              },
              {
                label: "D",
                text: "Meminta jurutera mencipta sendiri titik putus mudah alih",
                explanation:
                  "Tingkah laku responsif perlu diselaraskan secara sengaja, bukan diteka.",
              },
            ],
          },
        },
      },
      {
        id: "pd-s4",
        skillId: "accessibility",
        correctLabel: "B",
        i18n: {
          en: {
            question:
              "What is the recommended minimum touch target size for mobile interactive controls?",
            options: [
              {
                label: "A",
                text: "16 x 16 px",
                explanation:
                  "16 px is far too small and causes frequent mis-taps on touchscreens.",
              },
              {
                label: "B",
                text: "44 x 44 px (or 48 x 48 dp)",
                explanation:
                  "Correct! Apple HIG and Material guidelines recommend at least 44–48 px/dp so fingers can tap reliably.",
              },
              {
                label: "C",
                text: "120 x 120 px",
                explanation:
                  "120 px is unnecessarily huge for standard buttons and wastes screen space.",
              },
              {
                label: "D",
                text: "24 x 24 px with zero spacing",
                explanation:
                  "24 px without generous spacing increases accidental adjacent taps.",
              },
            ],
          },
          ms: {
            question:
              "Apakah saiz sasaran sentuhan minimum yang disyorkan untuk kawalan interaktif mudah alih?",
            options: [
              {
                label: "A",
                text: "16 x 16 px",
                explanation:
                  "16 px terlalu kecil dan kerap menyebabkan salah sentuh pada skrin sentuh.",
              },
              {
                label: "B",
                text: "44 x 44 px (atau 48 x 48 dp)",
                explanation:
                  "Betul! Garis panduan Apple HIG dan Material mengesyorkan sekurang-kurangnya 44–48 px/dp untuk ketepatan sentuhan.",
              },
              {
                label: "C",
                text: "120 x 120 px",
                explanation:
                  "120 px terlalu besar untuk butang biasa dan membazirkan ruang skrin.",
              },
              {
                label: "D",
                text: "24 x 24 px tanpa sebarang jarak",
                explanation:
                  "24 px tanpa jarak yang mencukupi meningkatkan risiko tersentuh elemen bersebelahan.",
              },
            ],
          },
        },
      },
      {
        id: "pd-s5",
        skillId: "javascript",
        correctLabel: "D",
        i18n: {
          en: {
            question:
              "Why do designers build low-fidelity wireframes before high-fidelity visual mockups?",
            options: [
              {
                label: "A",
                text: "Because color palettes cannot be chosen early",
                explanation:
                  "Colors can be explored early, but structure should be validated before polish.",
              },
              {
                label: "B",
                text: "To hide unfinished features from stakeholders",
                explanation:
                  "Wireframes encourage open feedback on flow rather than hiding features.",
              },
              {
                label: "C",
                text: "To avoid doing usability testing",
                explanation:
                  "Wireframes are actually great for early usability testing.",
              },
              {
                label: "D",
                text: "To test layout, flow, and hierarchy quickly without debating colors or polish",
                explanation:
                  "Correct! Low-fidelity wireframes keep feedback focused on structure and user flow before investing in visual detail.",
              },
            ],
          },
          ms: {
            question:
              "Mengapakah pereka membina rangka dawai (wireframe) fideliti rendah sebelum reka bentuk visual fideliti tinggi?",
            options: [
              {
                label: "A",
                text: "Kerana palet warna tidak boleh dipilih awal",
                explanation:
                  "Warna boleh diterokai awal, tetapi struktur perlu disahkan sebelum kemasan.",
              },
              {
                label: "B",
                text: "Untuk menyembunyikan ciri yang belum siap daripada pihak berkepentingan",
                explanation:
                  "Rangka dawai menggalakkan maklum balas terbuka tentang aliran, bukan menyembunyikan ciri.",
              },
              {
                label: "C",
                text: "Untuk mengelakkan ujian kebolehgunaan",
                explanation:
                  "Rangka dawai sebenarnya sangat sesuai untuk ujian kebolehgunaan awal.",
              },
              {
                label: "D",
                text: "Untuk menguji susun atur, aliran, dan hierarki dengan pantas tanpa membahaskan warna atau kemasan",
                explanation:
                  "Betul! Rangka dawai fideliti rendah menumpukan maklum balas pada struktur dan aliran pengguna terlebih dahulu.",
              },
            ],
          },
        },
      },
    ],
  },
];
