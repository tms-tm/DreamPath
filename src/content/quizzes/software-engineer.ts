import type { QuizContent } from "@/content/schemas";

export const SOFTWARE_ENGINEER_QUIZZES: QuizContent[] = [
  {
    id: "quiz-se-1",
    careerId: "software-engineer",
    i18n: {
      en: {
        title: "Web Fundamentals & Digital Safety",
        description: "Test semantic HTML, CSS styling, JavaScript arrays, and password safety.",
      },
      ms: {
        title: "Asas Web & Keselamatan Digital",
        description: "Uji HTML semantik, penggayaan CSS, tatasusunan JavaScript, dan keselamatan kata laluan.",
      },
    },
    questions: [
      {
        id: "se1-q1",
        skillId: "accessibility",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Which HTML element should be used for an interactive clickable button?",
            options: [
              { label: "A", text: '<button type="button">', explanation: "Native buttons support keyboard and screen readers." },
              { label: "B", text: '<div onclick="...">', explanation: "Divs lack native keyboard focus and ARIA roles." },
              { label: "C", text: '<span class="btn">', explanation: "Spans are inline containers without button semantics." },
              { label: "D", text: '<p style="cursor:pointer">', explanation: "Paragraphs represent text, not action controls." },
            ],
          },
          ms: {
            question: "Elemen HTML manakah patut digunakan untuk butang interaktif?",
            options: [
              { label: "A", text: '<button type="button">', explanation: "Butang asli menyokong papan kekunci dan pembaca skrin." },
              { label: "B", text: '<div onclick="...">', explanation: "Div tiada fokus papan kekunci dan peranan ARIA terbina." },
              { label: "C", text: '<span class="btn">', explanation: "Span ialah bekas sebaris tanpa semantik butang." },
              { label: "D", text: '<p style="cursor:pointer">', explanation: "Perenggan mewakili teks, bukan kawalan tindakan." },
            ],
          },
        },
      },
      {
        id: "se1-q2",
        skillId: "html-css",
        correctLabel: "B",
        i18n: {
          en: {
            question: "What is the primary role of CSS in a web application?",
            options: [
              { label: "A", text: "Store user passwords in a database", explanation: "CSS handles presentation, not databases." },
              { label: "B", text: "Define visual layout, spacing, typography, and colors", explanation: "CSS controls styling and responsive layouts." },
              { label: "C", text: "Compile JavaScript into machine code", explanation: "JS engines handle script execution." },
              { label: "D", text: "Send network requests to remote APIs", explanation: "JavaScript APIs such as fetch() handle requests." },
            ],
          },
          ms: {
            question: "Apakah peranan utama CSS dalam aplikasi web?",
            options: [
              { label: "A", text: "Menyimpan kata laluan pengguna dalam pangkalan data", explanation: "CSS mengurus paparan visual, bukan pangkalan data." },
              { label: "B", text: "Menentukan susun atur, jarak, tipografi, dan warna", explanation: "CSS mengawal gaya dan susun atur responsif." },
              { label: "C", text: "Menyusun JavaScript kepada kod mesin", explanation: "Enjin JS mengendalikan pelaksanaan skrip." },
              { label: "D", text: "Menghantar permintaan rangkaian ke API jauh", explanation: "Permintaan rangkaian dibuat melalui API JavaScript." },
            ],
          },
        },
      },
      {
        id: "se1-q3",
        skillId: "problem-solving",
        correctLabel: "B",
        i18n: {
          en: {
            question: "Why do developers hash passwords instead of saving plain text?",
            options: [
              { label: "A", text: "Plain text uses too much mobile data", explanation: "Short strings use negligible bandwidth." },
              { label: "B", text: "Salted hashes prevent attackers from reading leaked passwords", explanation: "One-way hashing protects credentials." },
              { label: "C", text: "Databases only store numbers", explanation: "Databases store standard UTF-8 text." },
              { label: "D", text: "Browsers cannot read plain text", explanation: "Browsers render plain text directly." },
            ],
          },
          ms: {
            question: "Mengapakah pembangun mencincang kata laluan dan tidak menyimpannya sebagai teks biasa?",
            options: [
              { label: "A", text: "Teks biasa menggunakan terlalu banyak data", explanation: "Rentetan pendek menggunakan data sangat sedikit." },
              { label: "B", text: "Cincangan bersalt menghalang penyerang membaca kata laluan yang bocor", explanation: "Pencincangan sehala melindungi kelayakan." },
              { label: "C", text: "Pangkalan data hanya menyimpan nombor", explanation: "Pangkalan data menyimpan teks UTF-8." },
              { label: "D", text: "Pelayar tidak boleh membaca teks biasa", explanation: "Pelayar memaparkan teks biasa secara terus." },
            ],
          },
        },
      },
      {
        id: "se1-q4",
        skillId: "javascript",
        correctLabel: "C",
        i18n: {
          en: {
            question: "Which JavaScript method creates a new array by transforming each element?",
            options: [
              { label: "A", text: "array.push()", explanation: "push() appends to an existing array." },
              { label: "B", text: "array.pop()", explanation: "pop() removes the last element." },
              { label: "C", text: "array.map()", explanation: "map() returns a new array of transformed items." },
              { label: "D", text: "array.join()", explanation: "join() combines items into a string." },
            ],
          },
          ms: {
            question: "Kaedah JavaScript manakah menghasilkan tatasusunan baharu dengan menukar setiap elemen?",
            options: [
              { label: "A", text: "array.push()", explanation: "push() menambah item pada hujung tatasusunan." },
              { label: "B", text: "array.pop()", explanation: "pop() membuang elemen terakhir." },
              { label: "C", text: "array.map()", explanation: "map() memulangkan tatasusunan baharu hasil transformasi." },
              { label: "D", text: "array.join()", explanation: "join() menggabungkan item menjadi rentetan." },
            ],
          },
        },
      },
      {
        id: "se1-q5",
        skillId: "communication",
        correctLabel: "A",
        i18n: {
          en: {
            question: "What makes a bug report most helpful to teammates?",
            options: [
              { label: "A", text: "Steps to reproduce, expected result, and actual result", explanation: "Clear steps let teammates locate the bug fast." },
              { label: "B", text: "Writing only 'it broke'", explanation: "Vague reports slow down debugging." },
              { label: "C", text: "Deleting the file before review", explanation: "Deleting files hides useful context." },
              { label: "D", text: "Waiting until launch day", explanation: "Early reporting reduces risk." },
            ],
          },
          ms: {
            question: "Apakah yang menjadikan laporan pepijat paling membantu untuk rakan sepasukan?",
            options: [
              { label: "A", text: "Langkah ulang semula, hasil dijangka, dan hasil sebenar", explanation: "Langkah jelas memudahkan pasukan mencari punca." },
              { label: "B", text: "Menulis 'ia rosak' sahaja", explanation: "Laporan kabur melambatkan pembaikan." },
              { label: "C", text: "Memadam fail sebelum semakan", explanation: "Memadam fail menghilangkan konteks penting." },
              { label: "D", text: "Menunggu sehingga hari pelancaran", explanation: "Laporan awal mengurangkan risiko." },
            ],
          },
        },
      },
    ],
  },
  {
    id: "quiz-se-2",
    careerId: "software-engineer",
    i18n: {
      en: {
        title: "Algorithms, Functions & Debugging",
        description: "Check your grasp of pure functions, loops, and debugging habits.",
      },
      ms: {
        title: "Algoritma, Fungsi & Penyahpepijatan",
        description: "Semak kefahaman fungsi tulen, gelung, dan tabiat penyahpepijatan.",
      },
    },
    questions: [
      {
        id: "se2-q1",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question: "What defines a pure function in TypeScript?",
            options: [
              { label: "A", text: "Same inputs always return the same output with no side effects", explanation: "Pure functions are predictable and easy to unit test." },
              { label: "B", text: "It mutates global variables on every call", explanation: "Mutating globals is a side effect." },
              { label: "C", text: "It reads random numbers without parameters", explanation: "Randomness makes outputs non-deterministic." },
              { label: "D", text: "It only runs inside CSS files", explanation: "Functions live in TypeScript/JavaScript." },
            ],
          },
          ms: {
            question: "Apakah ciri fungsi tulen dalam TypeScript?",
            options: [
              { label: "A", text: "Input sama sentiasa beri output sama tanpa kesan sampingan", explanation: "Fungsi tulen mudah diramal dan diuji." },
              { label: "B", text: "Ia mengubah pemboleh ubah global setiap kali dipanggil", explanation: "Mengubah global ialah kesan sampingan." },
              { label: "C", text: "Ia membaca nombor rawak tanpa parameter", explanation: "Rawak menjadikan output tidak menentu." },
              { label: "D", text: "Ia hanya berjalan dalam fail CSS", explanation: "Fungsi ditulis dalam TypeScript/JavaScript." },
            ],
          },
        },
      },
      {
        id: "se2-q2",
        skillId: "javascript",
        correctLabel: "C",
        i18n: {
          en: {
            question: "Why do developers debounce a search input?",
            options: [
              { label: "A", text: "To make the font larger", explanation: "Debouncing controls event timing, not font size." },
              { label: "B", text: "To delete all user history", explanation: "Debouncing does not delete history." },
              { label: "C", text: "To wait briefly until the user pauses typing before querying", explanation: "Waiting 250ms avoids flooding the server on every keystroke." },
              { label: "D", text: "To disable keyboard input", explanation: "Typing still works normally." },
            ],
          },
          ms: {
            question: "Mengapakah pembangun menggunakan debounce pada kotak carian?",
            options: [
              { label: "A", text: "Untuk membesarkan saiz fon", explanation: "Debounce mengawal masa acara, bukan saiz fon." },
              { label: "B", text: "Untuk memadam semua sejarah pengguna", explanation: "Debounce tidak memadam sejarah." },
              { label: "C", text: "Untuk menunggu seketika sehingga pengguna berhenti menaip sebelum membuat pertanyaan", explanation: "Menunggu 250ms mengelakkan beban pelayan." },
              { label: "D", text: "Untuk menyahaktifkan papan kekunci", explanation: "Pengguna masih boleh menaip seperti biasa." },
            ],
          },
        },
      },
      {
        id: "se2-q3",
        skillId: "problem-solving",
        correctLabel: "B",
        i18n: {
          en: {
            question: "What does `npm test` (Vitest) help confirm before merging code?",
            options: [
              { label: "A", text: "That your monitor brightness is 100%", explanation: "Tests verify code logic, not hardware." },
              { label: "B", text: "That math and business logic still pass without regressions", explanation: "Automated tests catch broken assumptions early." },
              { label: "C", text: "That Wi-Fi passwords are public", explanation: "Tests never expose passwords." },
              { label: "D", text: "That CSS colors are all neon", explanation: "Tests check logic and schemas." },
            ],
          },
          ms: {
            question: "Apakah yang disahkan oleh `npm test` (Vitest) sebelum kod digabungkan?",
            options: [
              { label: "A", text: "Kecerahan skrin anda ialah 100%", explanation: "Ujian menyemak logik kod, bukan perkakasan." },
              { label: "B", text: "Logik matematik dan perniagaan masih lulus tanpa regresi", explanation: "Ujian automatik mengesan ralat lebih awal." },
              { label: "C", text: "Kata laluan Wi-Fi adalah umum", explanation: "Ujian tidak mendedahkan kata laluan." },
              { label: "D", text: "Semua warna CSS ialah neon", explanation: "Ujian menyemak logik dan skema." },
            ],
          },
        },
      },
      {
        id: "se2-q4",
        skillId: "html-css",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Which CSS layout tool arranges cards cleanly in rows and columns?",
            options: [
              { label: "A", text: "CSS Grid (`grid-cols-*`)", explanation: "CSS Grid excels at responsive two-dimensional card layouts." },
              { label: "B", text: "`<blink>` tag", explanation: "Deprecated and inaccessible." },
              { label: "C", text: "Hardcoded 2000px margins", explanation: "Fixed pixel margins break on phones." },
              { label: "D", text: "`alert()` popup", explanation: "Alert is a JS dialog, not layout." },
            ],
          },
          ms: {
            question: "Alat susun atur CSS manakah menyusun kad dengan kemas dalam baris dan lajur?",
            options: [
              { label: "A", text: "CSS Grid (`grid-cols-*`)", explanation: "CSS Grid sesuai untuk susun atur kad responsif." },
              { label: "B", text: "Tag `<blink>`", explanation: "Usang dan tidak mesra aksesibiliti." },
              { label: "C", text: "Margin tetap 2000px", explanation: "Margin tetap rosak pada telefon." },
              { label: "D", text: "Tetingkap `alert()`", explanation: "Alert ialah dialog JS, bukan susun atur." },
            ],
          },
        },
      },
      {
        id: "se2-q5",
        skillId: "communication",
        correctLabel: "D",
        i18n: {
          en: {
            question: "Why do teams write clear commit messages like `T-13: Write pure game-math unit tests`?",
            options: [
              { label: "A", text: "To make files larger", explanation: "Messages document intent, not file size." },
              { label: "B", text: "To hide what changed", explanation: "Good messages clarify what changed." },
              { label: "C", text: "To slow down builds", explanation: "Commit messages do not affect build speed." },
              { label: "D", text: "So teammates can trace why a change was made later", explanation: "Clear history speeds up code review and debugging." },
            ],
          },
          ms: {
            question: "Mengapakah pasukan menulis mesej komit yang jelas seperti `T-13: Write pure game-math unit tests`?",
            options: [
              { label: "A", text: "Untuk membesarkan saiz fail", explanation: "Mesej mendokumenkan tujuan, bukan saiz fail." },
              { label: "B", text: "Untuk menyembunyikan perubahan", explanation: "Mesej baik menjelaskan perubahan." },
              { label: "C", text: "Untuk melambatkan binaan", explanation: "Mesej komit tidak memperlahankan binaan." },
              { label: "D", text: "Supaya rakan sepasukan boleh menjejak sebab perubahan dibuat", explanation: "Sejarah yang jelas memudahkan semakan kod." },
            ],
          },
        },
      },
    ],
  },
  {
    id: "quiz-se-3",
    careerId: "software-engineer",
    i18n: {
      en: {
        title: "Security, APIs & Client-Server Boundaries",
        description: "Verify how environment secrets, SQL queries, and API validation work.",
      },
      ms: {
        title: "Keselamatan, API & Sempadan Pelanggan-Pelayan",
        description: "Sahkan cara rahsia persekitaran, pertanyaan SQL, dan pengesahan API berfungsi.",
      },
    },
    questions: [
      {
        id: "se3-q1",
        skillId: "problem-solving",
        correctLabel: "B",
        i18n: {
          en: {
            question: "Where must `SUPABASE_SERVICE_ROLE_KEY` live in a Next.js app?",
            options: [
              { label: "A", text: "Inside a `'use client'` React component", explanation: "Client bundles are visible to anyone in the browser!" },
              { label: "B", text: "In server-only environment variables and API routes", explanation: "Server-only secrets stay hidden from browsers." },
              { label: "C", text: "Committed into `README.md`", explanation: "Never commit real secrets to git." },
              { label: "D", text: "In a URL query string", explanation: "URLs are logged and visible." },
            ],
          },
          ms: {
            question: "Di manakah `SUPABASE_SERVICE_ROLE_KEY` mesti diletakkan dalam aplikasi Next.js?",
            options: [
              { label: "A", text: "Di dalam komponen React `'use client'`", explanation: "Kod pelanggan boleh dilihat oleh sesiapa sahaja dalam pelayar!" },
              { label: "B", text: "Dalam pemboleh ubah persekitaran pelayan dan laluan API sahaja", explanation: "Rahsia pelayan kekal tersembunyi daripada pelayar." },
              { label: "C", text: "Dikomit ke dalam `README.md`", explanation: "Jangan komit rahsia sebenar ke dalam git." },
              { label: "D", text: "Dalam rentetan pertanyaan URL", explanation: "URL boleh dilihat dan direkod." },
            ],
          },
        },
      },
      {
        id: "se3-q2",
        skillId: "javascript",
        correctLabel: "A",
        i18n: {
          en: {
            question: "How do prepared SQL statements stop SQL injection?",
            options: [
              { label: "A", text: "They treat user input strictly as data, never executable SQL code", explanation: "Separating code from data prevents attackers from altering query logic." },
              { label: "B", text: "They convert all text to uppercase", explanation: "Case changes do not stop injection." },
              { label: "C", text: "They disable HTTPS", explanation: "HTTPS encrypts transport, unrelated to SQL." },
              { label: "D", text: "They delete the database table", explanation: "Prepared statements protect tables." },
            ],
          },
          ms: {
            question: "Bagaimanakah pernyataan SQL berparameter menghalang suntikan SQL?",
            options: [
              { label: "A", text: "Ia menganggap input pengguna sebagai data semata-mata, bukan kod SQL boleh laku", explanation: "Pemisahan kod dan data menghalang pengubahan logik pertanyaan." },
              { label: "B", text: "Ia menukar semua teks kepada huruf besar", explanation: "Penukaran huruf tidak menghalang suntikan." },
              { label: "C", text: "Ia mematikan HTTPS", explanation: "HTTPS menyulitkan penghantaran, bukan SQL." },
              { label: "D", text: "Ia memadam jadual pangkalan data", explanation: "Pernyataan berparameter melindungi jadual." },
            ],
          },
        },
      },
      {
        id: "se3-q3",
        skillId: "problem-solving",
        correctLabel: "C",
        i18n: {
          en: {
            question: "What does Zod schema validation check before data enters your app?",
            options: [
              { label: "A", text: "Whether the user's keyboard is mechanical", explanation: "Zod validates data structures." },
              { label: "B", text: "Whether the screen brightness is high", explanation: "Zod checks types and constraints." },
              { label: "C", text: "That fields have the exact expected types, lengths, and required keys", explanation: "Zod catches malformed payloads early at runtime." },
              { label: "D", text: "That CSS animations run at 120fps", explanation: "Zod is for schema validation." },
            ],
          },
          ms: {
            question: "Apakah yang disemak oleh pengesahan skema Zod sebelum data masuk ke aplikasi?",
            options: [
              { label: "A", text: "Sama ada papan kekunci pengguna ialah mekanikal", explanation: "Zod mengesahkan struktur data." },
              { label: "B", text: "Sama ada kecerahan skrin tinggi", explanation: "Zod menyemak jenis dan kekangan." },
              { label: "C", text: "Medan mempunyai jenis, panjang, dan kunci wajib yang tepat", explanation: "Zod mengesan data rosak lebih awal." },
              { label: "D", text: "Animasi CSS berjalan pada 120fps", explanation: "Zod adalah untuk pengesahan skema." },
            ],
          },
        },
      },
      {
        id: "se3-q4",
        skillId: "accessibility",
        correctLabel: "B",
        i18n: {
          en: {
            question: "Why should a `<Modal>` close when the user presses `Escape`?",
            options: [
              { label: "A", text: "To restart the browser", explanation: "Escape only closes the active dialog." },
              { label: "B", text: "So keyboard-only users can exit dialogs without a mouse", explanation: "Escape support is a core WCAG keyboard pattern." },
              { label: "C", text: "To clear localStorage", explanation: "Closing a modal should not wipe data." },
              { label: "D", text: "To zoom in the page", explanation: "Escape dismisses modals." },
            ],
          },
          ms: {
            question: "Mengapakah `<Modal>` patut ditutup apabila pengguna menekan kekunci `Escape`?",
            options: [
              { label: "A", text: "Untuk memulakan semula pelayar", explanation: "Escape hanya menutup dialog aktif." },
              { label: "B", text: "Supaya pengguna papan kekunci dapat keluar dari dialog tanpa tetikus", explanation: "Sokongan Escape ialah corak papan kekunci WCAG." },
              { label: "C", text: "Untuk memadam localStorage", explanation: "Menutup modal tidak memadam data." },
              { label: "D", text: "Untuk membesarkan halaman", explanation: "Escape menutup modal." },
            ],
          },
        },
      },
      {
        id: "se3-q5",
        skillId: "communication",
        correctLabel: "A",
        i18n: {
          en: {
            question: "What does `idempotent` XP rewarding mean in DreamPath?",
            options: [
              { label: "A", text: "Replaying an already completed lesson or quiz awards 0 duplicate XP", explanation: "Idempotency keeps progression fair even if a user replays." },
              { label: "B", text: "XP doubles every second", explanation: "XP only awards once per activityId." },
              { label: "C", text: "XP resets to 0 on refresh", explanation: "Progress persists across reloads." },
              { label: "D", text: "Only admins can earn XP", explanation: "All students earn XP on first completion." },
            ],
          },
          ms: {
            question: "Apakah maksud ganjaran XP secara `idempotent` dalam DreamPath?",
            options: [
              { label: "A", text: "Mengulang pelajaran atau kuiz yang sudah selesai memberi 0 XP berganda", explanation: "Idempotensi memastikan kemajuan kekal adil." },
              { label: "B", text: "XP berganda setiap saat", explanation: "XP hanya diberi sekali bagi setiap activityId." },
              { label: "C", text: "XP ditetapkan semula ke 0 apabila dimuat semula", explanation: "Kemajuan disimpan merentas muat semula." },
              { label: "D", text: "Hanya pentadbir boleh mendapat XP", explanation: "Semua pelajar mendapat XP pada kali pertama selesai." },
            ],
          },
        },
      },
    ],
  },
];
