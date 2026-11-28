import type { ScenarioContent } from "@/content/schemas";

export const SCENARIOS: ScenarioContent[] = [
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
                  "Great choice! Parameterized queries keep user input separate from SQL commands so attackers cannot alter the query.",
              },
              ms: {
                label: "Gunakan pertanyaan berparameter (Prepared Statement)",
                explanation:
                  "Pilihan tepat! Pertanyaan berparameter memisahkan input pengguna daripada arahan SQL supaya penyerang tidak boleh mengubah pertanyaan.",
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
                explanation:
                  "Short passwords are much easier to guess and do not stop SQL injection.",
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
              "The SQL query is safe now. Before deploying, let's check how passwords are saved in the database.",
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
                explanation:
                  "Exactly right. Salted hashing protects passwords even if the database is leaked.",
              },
              ms: {
                label: "Cincang (hash) kata laluan dengan salt menggunakan bcrypt atau Argon2",
                explanation:
                  "Tepat sekali. Pencincangan dengan salt melindungi kata laluan walaupun pangkalan data bocor.",
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
                explanation:
                  "Hidden columns can still be read if someone accesses the database.",
              },
              ms: {
                label: "Simpan kata laluan sebagai teks biasa dalam lajur tersembunyi",
                explanation:
                  "Lajur tersembunyi masih boleh dibaca jika seseorang mengakses pangkalan data.",
              },
            },
          },
        ],
      },
      {
        nodeId: "node-win",
        type: "terminal",
        i18n: {
          en: {
            prompt: "Patch deployed and verified.",
          },
          ms: {
            prompt: "Tampalan berjaya dilancarkan dan disahkan.",
          },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 30,
          i18n: {
            en: {
              title: "Breach Prevented!",
              summary:
                "You secured the login query with prepared statements and protected passwords with salted hashing.",
            },
            ms: {
              title: "Pencerobohan Berjaya Dihalang!",
              summary:
                "Anda mengamankan log masuk dengan pernyataan berparameter dan melindungi kata laluan melalui pencincangan bersalt.",
            },
          },
        },
      },
      {
        nodeId: "node-partial",
        type: "terminal",
        i18n: {
          en: {
            prompt: "SQL patched, password storage needs work.",
          },
          ms: {
            prompt: "SQL dibaiki, simpanan kata laluan masih perlu dibetulkan.",
          },
        },
        terminalOutcome: {
          stars: 2,
          xpReward: 15,
          i18n: {
            en: {
              title: "Partial Fix Deployed",
              summary:
                "You stopped SQL injection, though passwords should always be hashed before saving.",
            },
            ms: {
              title: "Pembetulan Separa Dilancarkan",
              summary:
                "Anda menghentikan suntikan SQL, namun kata laluan mesti sentiasa dicincang sebelum disimpan.",
            },
          },
        },
      },
      {
        nodeId: "node-fail",
        type: "terminal",
        i18n: {
          en: {
            prompt: "Security review flagged an unsafe change.",
          },
          ms: {
            prompt: "Semakan keselamatan menandakan perubahan tidak selamat.",
          },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Vulnerability Remains",
              summary:
                "Shortening passwords weakens security. Try again and separate SQL code from user input.",
            },
            ms: {
              title: "Kerentanan Masih Wujud",
              summary:
                "Memendekkan kata laluan melemahkan keselamatan. Cuba lagi dan asingkan kod SQL daripada input pengguna.",
            },
          },
        },
      },
    ],
  },
];

export function getScenariosByCareer(careerId: string): ScenarioContent[] {
  return SCENARIOS.filter((scenario) => scenario.careerId === careerId);
}

export function getScenarioById(id: string): ScenarioContent | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id);
}
