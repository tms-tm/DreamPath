import type { ScenarioContent } from "@/content/schemas";

export const JUNIOR_LAWYER_SCENARIOS: ScenarioContent[] = [
  {
    id: "law-case-1",
    careerId: "junior-lawyer",
    startNodeId: "law1-n1",
    i18n: {
      en: {
        title: "The Unfair Canteen Contract",
        categoryBadge: "Contract Law · Junior Lawyer",
        description:
          "A school club signed a jersey printing order, but the vendor added a hidden RM 400 fee in tiny print. Advise the club fairly.",
      },
      ms: {
        title: "Kontrak Cetakan Jersi Tidak Adil",
        categoryBadge: "Undang-Undang Kontrak · Peguam Muda",
        description:
          "Kelab sekolah menandatangani tempahan jersi, namun pembekal menambah caj tersembunyi RM 400 dalam tulisan halus. Beri nasihat yang adil.",
      },
    },
    nodes: [
      {
        nodeId: "law1-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "What is your first step before advising the club?",
            npcName: "Puanhana",
            npcRole: "Senior Advocate",
            npcDialogue: "Never guess from rumours. Always check the written evidence first.",
          },
          ms: {
            prompt: "Apakah langkah pertama anda sebelum menasihati kelab?",
            npcName: "Puan Hana",
            npcRole: "Peguam Kanan",
            npcDialogue: "Jangan meneka daripada khabar angin. Sentiasa semak bukti bertulis dahulu.",
          },
        },
        choices: [
          {
            choiceId: "law1-c1",
            nextNodeId: "law1-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "problem-solving", xp: 40, competencyDelta: 8 },
              { skillId: "communication", xp: 40, competencyDelta: 8 },
            ],
            i18n: {
              en: {
                label: "Review the signed quotation, receipts, and written WhatsApp terms",
                explanation: "Written records establish what both parties actually agreed to.",
              },
              ms: {
                label: "Semak sebut harga bertandatangan, resit, dan terma WhatsApp bertulis",
                explanation: "Rekod bertulis membuktikan apa yang sebenarnya dipersetujui kedua-dua pihak.",
              },
            },
          },
          {
            choiceId: "law1-c2",
            nextNodeId: "law1-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "communication", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Post an angry review online before reading the contract",
                explanation: "Public accusations without checking facts can cause defamation risk.",
              },
              ms: {
                label: "Muat naik ulasan marah dalam talian sebelum membaca kontrak",
                explanation: "Tuduhan awam tanpa semakan fakta boleh mengundang risiko fitnah.",
              },
            },
          },
        ],
      },
      {
        nodeId: "law1-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Evidence reviewed and calm settlement drafted." },
          ms: { prompt: "Bukti disemak dan penyelesaian tenang dirangka." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Fair Resolution Reached!",
              summary: "Showing the original written quote led the vendor to waive the surprise fee.",
            },
            ms: {
              title: "Penyelesaian Adil Dicapai!",
              summary: "Menunjukkan sebut harga bertulis asal menyebabkan pembekal menggugurkan caj tersembunyi.",
            },
          },
        },
      },
      {
        nodeId: "law1-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Dispute escalated unnecessarily." },
          ms: { prompt: "Pertikaian menjadi semakin tegang." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Check Evidence First",
              summary: "Good lawyers always inspect written agreements before taking action.",
            },
            ms: {
              title: "Semak Bukti Terlebih Dahulu",
              summary: "Peguam yang baik sentiasa meneliti perjanjian bertulis sebelum bertindak.",
            },
          },
        },
      },
    ],
  },
  {
    id: "law-case-2",
    careerId: "junior-lawyer",
    startNodeId: "law2-n1",
    i18n: {
      en: {
        title: "The Missing Library Tablet",
        categoryBadge: "Evidence & Fairness · Junior Lawyer",
        description:
          "A student was accused of taking a school tablet without eyewitness proof. Ensure due process is followed.",
      },
      ms: {
        title: "Tablet Perpustakaan Yang Hilang",
        categoryBadge: "Bukti & Keadilan · Peguam Muda",
        description:
          "Seorang pelajar dituduh mengambil tablet sekolah tanpa bukti saksi. Pastikan proses yang adil dipatuhi.",
      },
    },
    nodes: [
      {
        nodeId: "law2-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "Which principle protects the accused student while facts are checked?",
            npcName: "Puan Hana",
            npcRole: "Senior Advocate",
            npcDialogue: "Everyone has the right to be heard fairly before any penalty is given.",
          },
          ms: {
            prompt: "Prinsip manakah melindungi pelajar yang dituduh sementara fakta disemak?",
            npcName: "Puan Hana",
            npcRole: "Peguam Kanan",
            npcDialogue: "Setiap orang berhak didengari secara adil sebelum sebarang hukuman dijatuhkan.",
          },
        },
        choices: [
          {
            choiceId: "law2-c1",
            nextNodeId: "law2-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "communication", xp: 40, competencyDelta: 9 },
              { skillId: "problem-solving", xp: 40, competencyDelta: 7 },
            ],
            i18n: {
              en: {
                label: "Presumption of innocence and checking sign-out logs first",
                explanation: "Objective logs and a fair hearing prevent wrongful blame.",
              },
              ms: {
                label: "Anggapan tidak bersalah dan menyemak rekod pinjaman dahulu",
                explanation: "Rekod objektif dan pendengaran adil mengelakkan tuduhan salah.",
              },
            },
          },
          {
            choiceId: "law2-c2",
            nextNodeId: "law2-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "communication", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Suspend the student immediately to set an example",
                explanation: "Punishing without proof violates due process.",
              },
              ms: {
                label: "Gantung pelajar serta-merta sebagai pengajaran",
                explanation: "Menghukum tanpa bukti melanggar keadilan asasi.",
              },
            },
          },
        ],
      },
      {
        nodeId: "law2-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Sign-out log cleared the student." },
          ms: { prompt: "Rekod pinjaman membuktikan pelajar tidak bersalah." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Justice Upheld!",
              summary: "The library log showed the tablet was returned to the wrong shelf.",
            },
            ms: {
              title: "Keadilan Ditegakkan!",
              summary: "Rekod perpustakaan menunjukkan tablet itu dipulangkan ke rak yang salah.",
            },
          },
        },
      },
      {
        nodeId: "law2-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Due process was skipped." },
          ms: { prompt: "Proses keadilan telah diabaikan." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Unfair Outcome",
              summary: "Always verify objective evidence and hear both sides before deciding.",
            },
            ms: {
              title: "Keputusan Tidak Adil",
              summary: "Sentiasa sahkan bukti objektif dan dengar kedua-dua pihak dahulu.",
            },
          },
        },
      },
    ],
  },
  {
    id: "law-case-3",
    careerId: "junior-lawyer",
    startNodeId: "law3-n1",
    i18n: {
      en: {
        title: "Protect Student Privacy Under PDPA",
        categoryBadge: "Data Privacy · Junior Lawyer",
        description:
          "A school event team wants to publish students' full names and home phone numbers on a public poster.",
      },
      ms: {
        title: "Lindungi Privasi Pelajar di Bawah PDPA",
        categoryBadge: "Privasi Data · Peguam Muda",
        description:
          "Pasukan acara sekolah mahu memaparkan nama penuh dan nombor telefon pelajar pada poster awam.",
      },
    },
    nodes: [
      {
        nodeId: "law3-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "What legal advice should you give the event team?",
            npcName: "Puan Hana",
            npcRole: "Senior Advocate",
            npcDialogue: "Personal data of minors requires extra care under Malaysian PDPA principles.",
          },
          ms: {
            prompt: "Apakah nasihat undang-undang kepada pasukan acara tersebut?",
            npcName: "Puan Hana",
            npcRole: "Peguam Kanan",
            npcDialogue: "Data peribadi pelajar bawah umur memerlukan perlindungan rapi mengikut prinsip PDPA.",
          },
        },
        choices: [
          {
            choiceId: "law3-c1",
            nextNodeId: "law3-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "accessibility", xp: 35, competencyDelta: 8 },
              { skillId: "communication", xp: 45, competencyDelta: 8 },
            ],
            i18n: {
              en: {
                label: "Remove personal phone numbers and get parent/guardian consent first",
                explanation: "Minimizing personal data and obtaining consent protects student safety.",
              },
              ms: {
                label: "Buang nombor telefon peribadi dan dapatkan kebenaran penjaga dahulu",
                explanation: "Meminimumkan data peribadi dan mendapat kebenaran melindungi keselamatan pelajar.",
              },
            },
          },
          {
            choiceId: "law3-c2",
            nextNodeId: "law3-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "communication", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Publish everything so students can contact each other easily",
                explanation: "Exposing minors' personal numbers publicly creates privacy and safety risks.",
              },
              ms: {
                label: "Siarkan semuanya supaya pelajar mudah berhubung",
                explanation: "Mendedahkan nombor peribadi pelajar secara terbuka mengundang risiko keselamatan.",
              },
            },
          },
        ],
      },
      {
        nodeId: "law3-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Privacy-safe poster approved." },
          ms: { prompt: "Poster mesra privasi diluluskan." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Student Privacy Protected!",
              summary: "The team used a general club email and secured parental consent.",
            },
            ms: {
              title: "Privasi Pelajar Terpelihara!",
              summary: "Pasukan menggunakan e-mel kelab rasmi dan mendapatkan kebenaran ibu bapa.",
            },
          },
        },
      },
      {
        nodeId: "law3-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Privacy risk flagged by school." },
          ms: { prompt: "Risiko privasi dikesan oleh pihak sekolah." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Data Minimisation Missed",
              summary: "Never publish minors' personal phone numbers or home details publicly.",
            },
            ms: {
              title: "Pengurangan Data Diabaikan",
              summary: "Jangan sesekali menyiarkan nombor telefon peribadi pelajar secara terbuka.",
            },
          },
        },
      },
    ],
  },
];
