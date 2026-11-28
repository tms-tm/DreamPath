import type { ScenarioContent } from "@/content/schemas";

export const MASTER_CHEF_SCENARIOS: ScenarioContent[] = [
  {
    id: "chef-case-1",
    careerId: "master-chef",
    startNodeId: "chef1-n1",
    i18n: {
      en: {
        title: "Keep the School Banquet Safe & Nutritious",
        categoryBadge: "Food Safety · Master Chef",
        description:
          "You are leading a kitchen team preparing 80 student lunch boxes. Spot the food-safety risk before serving.",
      },
      ms: {
        title: "Pastikan Jamuan Sekolah Selamat & Berkhasiat",
        categoryBadge: "Keselamatan Makanan · Cef Utama",
        description:
          "Anda mengetuai pasukan dapur menyediakan 80 kotak makan tengah hari pelajar. Kesan risiko keselamatan makanan sebelum dihidangkan.",
      },
    },
    nodes: [
      {
        nodeId: "chef1-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "A teammate is about to slice fresh fruit on the same board used for raw chicken. What do you do?",
            npcName: "Chef Razak",
            npcRole: "Executive Chef",
            npcDialogue: "Cross-contamination is one of the fastest ways to cause food poisoning.",
          },
          ms: {
            prompt: "Rakan sepasukan mahu memotong buah segar di atas papan pemotong ayam mentah. Apakah tindakan anda?",
            npcName: "Chef Razak",
            npcRole: "Cef Eksekutif",
            npcDialogue: "Pencemaran silang ialah punca utama keracunan makanan.",
          },
        },
        choices: [
          {
            choiceId: "chef1-c1",
            nextNodeId: "chef1-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "problem-solving", xp: 40, competencyDelta: 8 },
              { skillId: "communication", xp: 40, competencyDelta: 8 },
            ],
            i18n: {
              en: {
                label: "Stop politely and switch to a clean, color-coded produce cutting board",
                explanation: "Separate boards for raw meat and ready-to-eat fruit prevent bacterial transfer.",
              },
              ms: {
                label: "Tegur dengan sopan dan tukar kepada papan pemotong buah yang bersih dan berasingan",
                explanation: "Papan berasingan untuk daging mentah dan buah menghalang pemindahan bakteria.",
              },
            },
          },
          {
            choiceId: "chef1-c2",
            nextNodeId: "chef1-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "communication", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Wipe the board quickly with a dry towel to save time",
                explanation: "A dry towel spreads raw bacteria instead of sanitizing the surface.",
              },
              ms: {
                label: "Lap papan dengan tuala kering sahaja untuk menjimatkan masa",
                explanation: "Tuala kering hanya menyebarkan bakteria tanpa mensterilkan permukaan.",
              },
            },
          },
        ],
      },
      {
        nodeId: "chef1-win",
        type: "terminal",
        i18n: {
          en: { prompt: "All 80 meals served safely." },
          ms: { prompt: "Kesemua 80 hidangan disajikan dengan selamat." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Zero Contamination!",
              summary: "Color-coded prep boards and clear teamwork kept every student safe.",
            },
            ms: {
              title: "Sifar Pencemaran!",
              summary: "Papan berasingan dan komunikasi berpasukan yang jelas menjaga keselamatan semua pelajar.",
            },
          },
        },
      },
      {
        nodeId: "chef1-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Hygiene inspection failed." },
          ms: { prompt: "Pemeriksaan kebersihan gagal." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Food Safety Risk",
              summary: "Always separate raw meat tools from ready-to-eat produce.",
            },
            ms: {
              title: "Risiko Keselamatan Makanan",
              summary: "Sentiasa asingkan peralatan daging mentah daripada makanan sedia dimakan.",
            },
          },
        },
      },
    ],
  },
  {
    id: "chef-case-2",
    careerId: "master-chef",
    startNodeId: "chef2-n1",
    i18n: {
      en: {
        title: "Cut Kitchen Waste on a Budget",
        categoryBadge: "Sustainable Kitchen · Master Chef",
        description:
          "Your kitchen has leftover roasted vegetables and herbs after lunch service. Plan smartly without lowering quality.",
      },
      ms: {
        title: "Kurangkan Pembaziran Dapur Secara Berhemah",
        categoryBadge: "Dapur Mampan · Cef Utama",
        description:
          "Dapur anda mempunyai lebihan sayur panggang dan herba selepas waktu makan tengah hari. Rancang secara bijak tanpa menjejaskan kualiti.",
      },
    },
    nodes: [
      {
        nodeId: "chef2-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "How can you use fresh surplus ingredients responsibly?",
            npcName: "Chef Razak",
            npcRole: "Executive Chef",
            npcDialogue: "Great chefs respect every ingredient and track food costs.",
          },
          ms: {
            prompt: "Bagaimanakah anda boleh memanfaatkan lebihan bahan segar secara bertanggungjawab?",
            npcName: "Chef Razak",
            npcRole: "Cef Eksekutif",
            npcDialogue: "Cef hebat menghargai setiap bahan dan mengawal kos makanan.",
          },
        },
        choices: [
          {
            choiceId: "chef2-c1",
            nextNodeId: "chef2-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "problem-solving", xp: 45, competencyDelta: 9 },
              { skillId: "accessibility", xp: 35, competencyDelta: 6 },
            ],
            i18n: {
              en: {
                label: "Blend into a warm roasted-vegetable soup special and adjust tomorrow's prep list",
                explanation: "Repurposing safe surplus cuts waste and improves portion forecasting.",
              },
              ms: {
                label: "Kisar menjadi sup sayur panggang istimewa dan laraskan senarai belian esok",
                explanation: "Mengolah lebihan selamat mengurangkan pembaziran dan menambah baik anggaran hidangan.",
              },
            },
          },
          {
            choiceId: "chef2-c2",
            nextNodeId: "chef2-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "problem-solving", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Throw everything away and order double the amount tomorrow",
                explanation: "Throwing away safe food increases both waste and kitchen costs.",
              },
              ms: {
                label: "Buang semuanya dan tempah dua kali ganda bahan esok",
                explanation: "Membuang makanan selamat meningkatkan pembaziran dan kos dapur.",
              },
            },
          },
        ],
      },
      {
        nodeId: "chef2-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Waste reduced by 40%." },
          ms: { prompt: "Pembaziran dikurangkan sebanyak 40%." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Smart & Sustainable Kitchen!",
              summary: "Students loved the soup special and your prep budget stayed balanced.",
            },
            ms: {
              title: "Dapur Pintar & Mampan!",
              summary: "Pelajar menyukai sup istimewa itu dan bajet dapur kekal seimbang.",
            },
          },
        },
      },
      {
        nodeId: "chef2-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Food waste spiked." },
          ms: { prompt: "Pembaziran makanan meningkat." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Budget & Waste Overrun",
              summary: "Track portions carefully and repurpose safe surplus ingredients.",
            },
            ms: {
              title: "Bajet & Pembaziran Terlampau",
              summary: "Rekod saiz hidangan dengan teliti dan olah semula lebihan bahan yang selamat.",
            },
          },
        },
      },
    ],
  },
];
