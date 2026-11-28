import type { ScenarioContent } from "@/content/schemas";

export const FUTURE_DOCTOR_SCENARIOS: ScenarioContent[] = [
  {
    id: "doc-case-1",
    careerId: "future-doctor",
    startNodeId: "doc1-n1",
    i18n: {
      en: {
        title: "Sports Day Heat Exhaustion",
        categoryBadge: "First Aid & Triage · Future Doctor",
        description:
          "During a hot afternoon sports practice, a classmate feels dizzy, sweaty, and nauseous. Respond safely.",
      },
      ms: {
        title: "Kelesuan Haba Hari Sukan",
        categoryBadge: "Pertolongan Cemas · Doktor Masa Depan",
        description:
          "Semasa latihan sukan petang yang panas, rakan sekelas berasa pening, berpeluh banyak, dan loya. Bertindak dengan selamat.",
      },
    },
    nodes: [
      {
        nodeId: "doc1-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "What is the safest immediate care step?",
            npcName: "Dr. Aina",
            npcRole: "School Clinic Advisor",
            npcDialogue: "Look at the symptoms: dizziness, heavy sweating, and hot weather.",
          },
          ms: {
            prompt: "Apakah langkah rawatan segera yang paling selamat?",
            npcName: "Dr. Aina",
            npcRole: "Penasihat Klinik Sekolah",
            npcDialogue: "Lihat simptomnya: pening, berpeluh banyak, dan cuaca panas.",
          },
        },
        choices: [
          {
            choiceId: "doc1-c1",
            nextNodeId: "doc1-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "problem-solving", xp: 40, competencyDelta: 8 },
              { skillId: "communication", xp: 40, competencyDelta: 8 },
            ],
            i18n: {
              en: {
                label: "Move to shade, loosen tight gear, cool with damp cloths, and sip water",
                explanation: "Cooling and gradual hydration safely relieve heat exhaustion.",
              },
              ms: {
                label: "Pindah ke tempat teduh, longgarkan pakaian, sejuk dengan kain lembap, dan minum air",
                explanation: "Penyejukan dan penghidratan berperingkat melegakan kelesuan haba dengan selamat.",
              },
            },
          },
          {
            choiceId: "doc1-c2",
            nextNodeId: "doc1-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "problem-solving", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Ask them to finish one more lap to warm down",
                explanation: "Continuing exercise during heat exhaustion risks heat stroke.",
              },
              ms: {
                label: "Minta mereka habiskan satu pusingan lagi",
                explanation: "Meneruskan senaman semasa kelesuan haba berisiko menyebabkan strok haba.",
              },
            },
          },
        ],
      },
      {
        nodeId: "doc1-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Student stabilized and resting safely." },
          ms: { prompt: "Pelajar stabil dan berehat dengan selamat." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Safe Triage!",
              summary: "Moving to shade and cooling down prevented serious heat illness.",
            },
            ms: {
              title: "Tindakan Triage Selamat!",
              summary: "Berpindah ke tempat teduh dan menyejukkan badan mengelakkan masalah haba serius.",
            },
          },
        },
      },
      {
        nodeId: "doc1-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Condition worsened." },
          ms: { prompt: "Keadaan menjadi lebih teruk." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Stop Activity Immediately",
              summary: "Always rest in shade, cool down, and call an adult or medic.",
            },
            ms: {
              title: "Hentikan Aktiviti Serta-Merta",
              summary: "Sentiasa berehat di tempat teduh, sejukkan badan, dan panggil guru atau pegawai perubatan.",
            },
          },
        },
      },
    ],
  },
  {
    id: "doc-case-2",
    careerId: "future-doctor",
    startNodeId: "doc2-n1",
    i18n: {
      en: {
        title: "Antibiotics & Viral Coughs",
        categoryBadge: "Clinical Reasoning · Future Doctor",
        description:
          "A clinic patient with a mild 2-day viral cold asks for strong antibiotics right away. Communicate clearly.",
      },
      ms: {
        title: "Antibiotik & Batuk Virus",
        categoryBadge: "Pertimbangan Klinikal · Doktor Masa Depan",
        description:
          "Pesakit klinik dengan selesema virus ringan selama 2 hari meminta antibiotik kuat serta-merta. Berkomunikasi dengan jelas.",
      },
    },
    nodes: [
      {
        nodeId: "doc2-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "How should you respond as a responsible clinician?",
            npcName: "Dr. Aina",
            npcRole: "Medical Officer",
            npcDialogue: "Remember: antibiotics target bacteria, not viruses.",
          },
          ms: {
            prompt: "Bagaimanakah anda patut bertindak balas sebagai doktor yang bertanggungjawab?",
            npcName: "Dr. Aina",
            npcRole: "Pegawai Perubatan",
            npcDialogue: "Ingat: antibiotik melawan bakteria, bukan virus.",
          },
        },
        choices: [
          {
            choiceId: "doc2-c1",
            nextNodeId: "doc2-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "communication", xp: 45, competencyDelta: 9 },
              { skillId: "problem-solving", xp: 35, competencyDelta: 7 },
            ],
            i18n: {
              en: {
                label: "Explain kindly that antibiotics don't treat viruses, and advise rest + fluids",
                explanation: "Clear empathy prevents antibiotic resistance while helping the patient recover.",
              },
              ms: {
                label: "Terangkan dengan mesra antibiotik tidak merawat virus, dan syorkan rehat serta air",
                explanation: "Penjelasan berempati mengelakkan kerintangan antibiotik sambil membantu pesakit pulih.",
              },
            },
          },
          {
            choiceId: "doc2-c2",
            nextNodeId: "doc2-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "communication", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Prescribe antibiotics anyway so the patient leaves quickly",
                explanation: "Unnecessary antibiotics fuel dangerous antimicrobial resistance.",
              },
              ms: {
                label: "Beri antibiotik juga supaya pesakit cepat pulang",
                explanation: "Antibiotik yang tidak perlu meningkatkan kerintangan antimikrob yang berbahaya.",
              },
            },
          },
        ],
      },
      {
        nodeId: "doc2-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Patient understood and felt cared for." },
          ms: { prompt: "Pesakit faham dan berasa dijaga dengan baik." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Responsible Care!",
              summary: "Your clear explanation protected the patient from unnecessary medication.",
            },
            ms: {
              title: "Rawatan Bertanggungjawab!",
              summary: "Penerangan jelas anda melindungi pesakit daripada ubat yang tidak diperlukan.",
            },
          },
        },
      },
      {
        nodeId: "doc2-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Audit flagged unnecessary prescription." },
          ms: { prompt: "Audit mengesan preskripsi yang tidak perlu." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Antibiotic Misuse",
              summary: "Reserve antibiotics for bacterial infections and educate patients kindly.",
            },
            ms: {
              title: "Salah Guna Antibiotik",
              summary: "Simpan antibiotik untuk jangkitan bakteria dan didik pesakit dengan berhemah.",
            },
          },
        },
      },
    ],
  },
  {
    id: "doc-case-3",
    careerId: "future-doctor",
    startNodeId: "doc3-n1",
    i18n: {
      en: {
        title: "Checking Vital Signs Before Diagnosis",
        categoryBadge: "Patient Assessment · Future Doctor",
        description:
          "A student arrives at the clinic complaining of fatigue. Gather objective vital signs before jumping to conclusions.",
      },
      ms: {
        title: "Semak Tanda Vital Sebelum Diagnosis",
        categoryBadge: "Penilaian Pesakit · Doktor Masa Depan",
        description:
          "Seorang pelajar datang ke klinik mengadu keletihan. Kumpul tanda vital objektif sebelum membuat kesimpulan.",
      },
    },
    nodes: [
      {
        nodeId: "doc3-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "Which set of checks gives you an accurate baseline?",
            npcName: "Dr. Aina",
            npcRole: "Medical Officer",
            npcDialogue: "Good clinical practice combines listening with measurable vital signs.",
          },
          ms: {
            prompt: "Set pemeriksaan manakah memberi garis dasar yang tepat?",
            npcName: "Dr. Aina",
            npcRole: "Pegawai Perubatan",
            npcDialogue: "Amalan klinikal baik menggabungkan mendengar keluhan dengan tanda vital terukur.",
          },
        },
        choices: [
          {
            choiceId: "doc3-c1",
            nextNodeId: "doc3-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "problem-solving", xp: 45, competencyDelta: 9 },
              { skillId: "accessibility", xp: 35, competencyDelta: 6 },
            ],
            i18n: {
              en: {
                label: "Measure temperature, pulse, blood pressure, and ask about sleep/meals",
                explanation: "Vital signs plus patient history narrow down the real cause safely.",
              },
              ms: {
                label: "Ukur suhu, nadi, tekanan darah, dan tanya tentang tidur serta makan",
                explanation: "Tanda vital dan sejarah pesakit membantu mengenal pasti punca sebenar.",
              },
            },
          },
          {
            choiceId: "doc3-c2",
            nextNodeId: "doc3-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "problem-solving", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Guess they just stayed up gaming without taking any measurements",
                explanation: "Guessing without checking vital signs risks missing real medical issues.",
              },
              ms: {
                label: "Teka sahaja mereka berjaga main permainan tanpa memeriksa apa-apa",
                explanation: "Meneka tanpa memeriksa tanda vital berisiko terlepas masalah perubatan sebenar.",
              },
            },
          },
        ],
      },
      {
        nodeId: "doc3-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Assessment complete and accurate." },
          ms: { prompt: "Penilaian lengkap dan tepat." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Thorough Clinical Check!",
              summary: "Checking vital signs revealed mild dehydration and low iron intake.",
            },
            ms: {
              title: "Pemeriksaan Klinikal Teliti!",
              summary: "Semakan tanda vital mengesan dehidrasi ringan dan kekurangan zat besi.",
            },
          },
        },
      },
      {
        nodeId: "doc3-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Missed vital signs check." },
          ms: { prompt: "Pemeriksaan tanda vital tertinggal." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Never Guess Without Data",
              summary: "Always record vital signs and listen carefully to the patient.",
            },
            ms: {
              title: "Jangan Meneka Tanpa Data",
              summary: "Sentiasa rekod tanda vital dan dengar keluhan pesakit dengan teliti.",
            },
          },
        },
      },
    ],
  },
];
