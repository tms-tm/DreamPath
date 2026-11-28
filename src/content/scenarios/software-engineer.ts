import type { ScenarioContent } from "@/content/schemas";

export const SOFTWARE_ENGINEER_SCENARIOS: ScenarioContent[] = [
  {
    id: "se-incident-1",
    careerId: "software-engineer",
    startNodeId: "node-1",
    i18n: {
      en: {
        title: "Stop the Silent Login Breach",
        categoryBadge: "Cyber Incident · Software Engineering",
        description:
          "The school club portal recorded 42 failed login attempts from an unknown device. Patch the vulnerable query before student records are exposed.",
      },
      ms: {
        title: "Hentikan Pencerobohan Log Masuk",
        categoryBadge: "Insiden Siber · Kejuruteraan Perisian",
        description:
          "Portal kelab sekolah merekodkan 42 cubaan log masuk yang gagal daripada peranti tidak dikenali. Baiki pertanyaan pangkalan data sebelum data pelajar terdedah.",
      },
    },
    nodes: [
      {
        nodeId: "node-1",
        type: "decision",
        codeSnippet: {
          filename: "login-check.ts",
          badge: "LIVE",
          code: `const user = request.body.user;
const sql = "SELECT * FROM users WHERE name = '" + user + "'";
return db.query(sql);`,
        },
        i18n: {
          en: {
            prompt: "Which fix stops SQL injection at its root cause?",
            npcName: "Maya Chen",
            npcRole: "Senior Security Engineer",
            npcDialogue:
              "Line 2 joins raw user input straight into SQL text. What is your first move?",
          },
          ms: {
            prompt: "Pembetulan manakah yang menghentikan suntikan SQL dari puncanya?",
            npcName: "Maya Chen",
            npcRole: "Jurutera Keselamatan Kanan",
            npcDialogue:
              "Baris 2 menggabungkan input pengguna terus ke dalam teks SQL. Apakah langkah pertama anda?",
          },
        },
        choices: [
          {
            choiceId: "choice-param",
            nextNodeId: "node-2",
            isCorrect: true,
            skillImpacts: [
              { skillId: "problem-solving", xp: 30, competencyDelta: 8 },
              { skillId: "javascript", xp: 20, competencyDelta: 6 },
            ],
            i18n: {
              en: {
                label: "Use a parameterized query (Prepared Statement)",
                explanation:
                  "Great choice! Parameterized queries keep user input separate from SQL commands.",
              },
              ms: {
                label: "Gunakan pertanyaan berparameter (Prepared Statement)",
                explanation:
                  "Pilihan tepat! Pertanyaan berparameter memisahkan input pengguna daripada arahan SQL.",
              },
            },
          },
          {
            choiceId: "choice-short",
            nextNodeId: "node-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "problem-solving", xp: 5, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Limit passwords to 4 characters so queries run faster",
                explanation: "Short passwords are easier to guess and do not stop SQL injection.",
              },
              ms: {
                label: "Hadkan kata laluan kepada 4 aksara supaya lebih pantas",
                explanation:
                  "Kata laluan pendek lebih mudah diteka dan tidak menghalang suntikan SQL.",
              },
            },
          },
        ],
      },
      {
        nodeId: "node-2",
        type: "mentor",
        i18n: {
          en: {
            prompt: "Next, how should the app store student passwords safely?",
            npcName: "Maya Chen",
            npcRole: "Senior Security Engineer",
            npcDialogue:
              "The SQL query is safe now. Before deploying, let's check how passwords are saved.",
          },
          ms: {
            prompt: "Seterusnya, bagaimanakah aplikasi patut menyimpan kata laluan dengan selamat?",
            npcName: "Maya Chen",
            npcRole: "Jurutera Keselamatan Kanan",
            npcDialogue:
              "Pertanyaan SQL sudah selamat. Sebelum dilancarkan, mari semak cara kata laluan disimpan.",
          },
        },
        choices: [
          {
            choiceId: "choice-hash",
            nextNodeId: "node-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "problem-solving", xp: 30, competencyDelta: 7 },
              { skillId: "accessibility", xp: 10, competencyDelta: 3 },
            ],
            i18n: {
              en: {
                label: "Hash passwords with a salt using bcrypt or Argon2",
                explanation: "Salted hashing protects passwords even if the database leaks.",
              },
              ms: {
                label: "Cincang (hash) kata laluan dengan salt menggunakan bcrypt atau Argon2",
                explanation: "Pencincangan dengan salt melindungi kata laluan walaupun pangkalan data bocor.",
              },
            },
          },
          {
            choiceId: "choice-plain",
            nextNodeId: "node-partial",
            isCorrect: false,
            skillImpacts: [{ skillId: "problem-solving", xp: 10, competencyDelta: 2 }],
            i18n: {
              en: {
                label: "Save passwords in plain text in a hidden column",
                explanation: "Hidden columns can still be read if someone accesses the database.",
              },
              ms: {
                label: "Simpan kata laluan sebagai teks biasa dalam lajur tersembunyi",
                explanation: "Lajur tersembunyi masih boleh dibaca jika pangkalan data diakses.",
              },
            },
          },
        ],
      },
      {
        nodeId: "node-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Patch deployed and verified." },
          ms: { prompt: "Tampalan berjaya dilancarkan dan disahkan." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 30,
          i18n: {
            en: {
              title: "Breach Prevented!",
              summary: "You secured the login query with prepared statements and salted hashing.",
            },
            ms: {
              title: "Pencerobohan Berjaya Dihalang!",
              summary: "Anda mengamankan log masuk dengan pernyataan berparameter dan pencincangan bersalt.",
            },
          },
        },
      },
      {
        nodeId: "node-partial",
        type: "terminal",
        i18n: {
          en: { prompt: "SQL patched, password storage needs work." },
          ms: { prompt: "SQL dibaiki, simpanan kata laluan masih perlu dibetulkan." },
        },
        terminalOutcome: {
          stars: 2,
          xpReward: 15,
          i18n: {
            en: {
              title: "Partial Fix Deployed",
              summary: "You stopped SQL injection, though passwords must always be hashed.",
            },
            ms: {
              title: "Pembetulan Separa Dilancarkan",
              summary: "Anda menghentikan suntikan SQL, namun kata laluan mesti sentiasa dicincang.",
            },
          },
        },
      },
      {
        nodeId: "node-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Security review flagged an unsafe change." },
          ms: { prompt: "Semakan keselamatan menandakan perubahan tidak selamat." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Vulnerability Remains",
              summary: "Shortening passwords weakens security. Separate SQL code from user input.",
            },
            ms: {
              title: "Kerentanan Masih Wujud",
              summary: "Memendekkan kata laluan melemahkan keselamatan. Asingkan kod SQL daripada input.",
            },
          },
        },
      },
    ],
  },
  {
    id: "se-incident-2",
    careerId: "software-engineer",
    startNodeId: "se2-n1",
    i18n: {
      en: {
        title: "Fix the Missing Accessible Checkout Button",
        categoryBadge: "Frontend Bug · Software Engineering",
        description:
          "Students using keyboard navigation cannot reach the book-fair checkout button on mobile screens.",
      },
      ms: {
        title: "Baiki Butang Bayaran Mesra Aksesibiliti",
        categoryBadge: "Pepijat Antara Muka · Kejuruteraan Perisian",
        description:
          "Pelajar yang menggunakan papan kekunci tidak dapat mencapai butang bayaran pesta buku pada skrin mudah alih.",
      },
    },
    nodes: [
      {
        nodeId: "se2-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "The button is currently a `<div onClick={pay}>`. What should you replace it with?",
            npcName: "Farid",
            npcRole: "Frontend Lead",
            npcDialogue: "Keyboard Tab skips right over this control. How do we make it accessible?",
          },
          ms: {
            prompt: "Butang itu kini menggunakan `<div onClick={pay}>`. Apakah pengganti terbaik?",
            npcName: "Farid",
            npcRole: "Ketua Antara Muka",
            npcDialogue: "Kekunci Tab melangkau kawalan ini. Bagaimanakah menjadikannya mesra aksesibiliti?",
          },
        },
        choices: [
          {
            choiceId: "se2-c1",
            nextNodeId: "se2-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "accessibility", xp: 40, competencyDelta: 10 },
              { skillId: "html-css", xp: 30, competencyDelta: 6 },
            ],
            i18n: {
              en: {
                label: "Use a semantic `<button type=\"button\">` with visible focus ring",
                explanation: "Native buttons support Tab, Enter, Space, and screen readers out of the box.",
              },
              ms: {
                label: "Gunakan `<button type=\"button\">` semantik dengan garis fokus jelas",
                explanation: "Butang asli menyokong Tab, Enter, Space, dan pembaca skrin secara automatik.",
              },
            },
          },
          {
            choiceId: "se2-c2",
            nextNodeId: "se2-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "html-css", xp: 10, competencyDelta: 2 }],
            i18n: {
              en: {
                label: "Keep the `<div>` and remove the outline on focus",
                explanation: "Removing focus outlines hides keyboard location and hurts accessibility.",
              },
              ms: {
                label: "Kekalkan `<div>` dan buang garis fokus",
                explanation: "Membuang garis fokus menyembunyikan kedudukan papan kekunci.",
              },
            },
          },
        ],
      },
      {
        nodeId: "se2-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Checkout button verified with keyboard & screen reader." },
          ms: { prompt: "Butang bayaran disahkan dengan papan kekunci & pembaca skrin." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 40,
          i18n: {
            en: {
              title: "Accessible Fix Shipped!",
              summary: "Every student can now complete checkout using touch, mouse, or keyboard.",
            },
            ms: {
              title: "Pembetulan Mesra Aksesibiliti Berjaya!",
              summary: "Semua pelajar kini boleh melengkapkan bayaran menggunakan sentuhan, tetikus, atau papan kekunci.",
            },
          },
        },
      },
      {
        nodeId: "se2-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Accessibility audit failed." },
          ms: { prompt: "Audit aksesibiliti gagal." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 15,
          i18n: {
            en: {
              title: "Keyboard Users Still Blocked",
              summary: "Always use native `<button>` elements and keep focus rings visible.",
            },
            ms: {
              title: "Pengguna Papan Kekunci Masih Terhalang",
              summary: "Sentiasa gunakan elemen `<button>` asli dan kekalkan garis fokus yang jelas.",
            },
          },
        },
      },
    ],
  },
  {
    id: "se-incident-3",
    careerId: "software-engineer",
    startNodeId: "se3-n1",
    i18n: {
      en: {
        title: "Speed Up the Slow School Library Search",
        categoryBadge: "Performance · Software Engineering",
        description:
          "Students wait 6 seconds for book search results because the app fetches 5,000 rows on every keystroke.",
      },
      ms: {
        title: "Lajukan Carian Perpustakaan Sekolah",
        categoryBadge: "Prestasi · Kejuruteraan Perisian",
        description:
          "Pelajar menunggu 6 saat untuk keputusan carian buku kerana aplikasi memuat turun 5,000 rekod pada setiap tekanan kekunci.",
      },
    },
    nodes: [
      {
        nodeId: "se3-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "Which combination makes the search fast and smooth?",
            npcName: "Maya Chen",
            npcRole: "Senior Engineer",
            npcDialogue: "Typing 'biology' currently triggers 7 heavy database queries in 1 second!",
          },
          ms: {
            prompt: "Gabungan manakah yang menjadikan carian pantas dan lancar?",
            npcName: "Maya Chen",
            npcRole: "Jurutera Kanan",
            npcDialogue: "Menaip 'biologi' kini mencetuskan 7 pertanyaan berat dalam 1 saat!",
          },
        },
        choices: [
          {
            choiceId: "se3-c1",
            nextNodeId: "se3-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "javascript", xp: 40, competencyDelta: 9 },
              { skillId: "problem-solving", xp: 40, competencyDelta: 8 },
            ],
            i18n: {
              en: {
                label: "Debounce input by 250ms and paginate results on the server",
                explanation: "Debouncing cuts unnecessary requests and pagination limits payload size.",
              },
              ms: {
                label: "Lengah input (debounce) 250ms dan hadkan halaman keputusan di pelayan",
                explanation: "Debounce mengurangkan permintaan tidak perlu dan penomboran mengehadkan saiz data.",
              },
            },
          },
          {
            choiceId: "se3-c2",
            nextNodeId: "se3-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "javascript", xp: 10, competencyDelta: 2 }],
            i18n: {
              en: {
                label: "Disable the search bar so users browse manually",
                explanation: "Removing search hurts usability instead of fixing the bottleneck.",
              },
              ms: {
                label: "Nyahaktifkan bar carian supaya pengguna menyemak secara manual",
                explanation: "Membuang carian menjejaskan kebolehgunaan tanpa menyelesaikan punca.",
              },
            },
          },
        ],
      },
      {
        nodeId: "se3-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Search response dropped from 6s to 120ms." },
          ms: { prompt: "Masa tindak balas carian turun daripada 6s kepada 120ms." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Search Optimized!",
              summary: "Debouncing and server pagination cut server load and made search instant.",
            },
            ms: {
              title: "Carian Dioptimumkan!",
              summary: "Debounce dan penomboran pelayan mengurangkan beban pelayan dan mempercepatkan carian.",
            },
          },
        },
      },
      {
        nodeId: "se3-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Students cannot search for books." },
          ms: { prompt: "Pelajar tidak dapat mencari buku." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Feature Removed Instead of Fixed",
              summary: "Try debouncing user input and returning smaller pages of results.",
            },
            ms: {
              title: "Ciri Dibuang dan Bukannya Dibaiki",
              summary: "Cuba gunakan debounce pada input dan pulangkan halaman keputusan yang lebih kecil.",
            },
          },
        },
      },
    ],
  },
];
