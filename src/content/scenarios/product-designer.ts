import type { ScenarioContent } from "@/content/schemas";

export const PRODUCT_DESIGNER_SCENARIOS: ScenarioContent[] = [
  {
    id: "ux-case-1",
    careerId: "product-designer",
    startNodeId: "ux1-n1",
    i18n: {
      en: {
        title: "Redesign the Confusing Canteen App",
        categoryBadge: "UX Research · Product Designer",
        description:
          "Students keep tapping the wrong order button because text contrast is faint and labels are unclear.",
      },
      ms: {
        title: "Reka Semula Aplikasi Kantin Yang Mengelirukan",
        categoryBadge: "Penyelidikan UX · Pereka Produk",
        description:
          "Pelajar kerap tersalah tekan butang tempahan kerana kontras teks pudar dan label tidak jelas.",
      },
    },
    nodes: [
      {
        nodeId: "ux1-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "What should you do first to improve the checkout screen?",
            npcName: "Siti",
            npcRole: "Lead Product Designer",
            npcDialogue: "5 out of 6 testers hesitated on the payment button. Let's fix the UX!",
          },
          ms: {
            prompt: "Apakah langkah pertama untuk menambah baik skrin bayaran?",
            npcName: "Siti",
            npcRole: "Ketua Pereka Produk",
            npcDialogue: "5 daripada 6 penguji teragak-agak pada butang bayaran. Mari baiki UX ini!",
          },
        },
        choices: [
          {
            choiceId: "ux1-c1",
            nextNodeId: "ux1-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "accessibility", xp: 45, competencyDelta: 10 },
              { skillId: "communication", xp: 35, competencyDelta: 7 },
            ],
            i18n: {
              en: {
                label: "Increase color contrast to WCAG AA and write clear action labels",
                explanation: "High contrast and explicit button labels remove guesswork for all users.",
              },
              ms: {
                label: "Tingkatkan kontras warna ke tahap WCAG AA dan tulis label tindakan yang jelas",
                explanation: "Kontras tinggi dan label jelas menghapuskan kekeliruan untuk semua pengguna.",
              },
            },
          },
          {
            choiceId: "ux1-c2",
            nextNodeId: "ux1-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "html-css", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Add flashing animations around the button without changing the text",
                explanation: "Flashing visuals distract users and do not fix poor contrast or unclear copy.",
              },
              ms: {
                label: "Tambah animasi berkelip tanpa mengubah teks",
                explanation: "Visual berkelip mengganggu pengguna dan tidak membaiki kontras yang lemah.",
              },
            },
          },
        ],
      },
      {
        nodeId: "ux1-win",
        type: "terminal",
        i18n: {
          en: { prompt: "Usability test passed 6/6." },
          ms: { prompt: "Ujian kebolehgunaan lulus 6/6." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Clear & Inclusive Design!",
              summary: "Readable contrast and clear labels cut order mistakes to zero.",
            },
            ms: {
              title: "Reka Bentuk Jelas & Inklusif!",
              summary: "Kontras mudah dibaca dan label jelas mengurangkan kesilapan tempahan kepada sifar.",
            },
          },
        },
      },
      {
        nodeId: "ux1-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Testers still confused." },
          ms: { prompt: "Penguji masih keliru." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Clarity Beats Decoration",
              summary: "Focus on accessible contrast, clear copy, and real user feedback.",
            },
            ms: {
              title: "Kejelasan Lebih Penting Daripada Hiasan",
              summary: "Utamakan kontras mesra aksesibiliti, teks jelas, dan maklum balas pengguna.",
            },
          },
        },
      },
    ],
  },
  {
    id: "ux-case-2",
    careerId: "product-designer",
    startNodeId: "ux2-n1",
    i18n: {
      en: {
        title: "Design a Mobile-First Study Planner",
        categoryBadge: "UI Layout · Product Designer",
        description:
          "Your desktop timetable layout overflows horizontally on 375px phones. Adapt it cleanly.",
      },
      ms: {
        title: "Reka Perancang Belajar Mesra Mudah Alih",
        categoryBadge: "Susun Atur UI · Pereka Produk",
        description:
          "Susun atur jadual desktop melimpah ke tepi pada telefon 375px. Sesuaikannya dengan kemas.",
      },
    },
    nodes: [
      {
        nodeId: "ux2-n1",
        type: "decision",
        i18n: {
          en: {
            prompt: "Which layout approach works best for small screens?",
            npcName: "Siti",
            npcRole: "Lead Product Designer",
            npcDialogue: "Most Malaysian students use phones first—make sure tap targets fit comfortably.",
          },
          ms: {
            prompt: "Pendekatan susun atur manakah paling sesuai untuk skrin kecil?",
            npcName: "Siti",
            npcRole: "Ketua Pereka Produk",
            npcDialogue: "Kebanyakan pelajar menggunakan telefon dahulu—pastikan sasaran sentuhan selesa.",
          },
        },
        choices: [
          {
            choiceId: "ux2-c1",
            nextNodeId: "ux2-win",
            isCorrect: true,
            skillImpacts: [
              { skillId: "html-css", xp: 45, competencyDelta: 9 },
              { skillId: "accessibility", xp: 35, competencyDelta: 8 },
            ],
            i18n: {
              en: {
                label: "Stack cards in a single responsive column with 44px touch targets",
                explanation: "Single-column stacking prevents horizontal scroll and supports easy tapping.",
              },
              ms: {
                label: "Susun kad dalam satu lajur responsif dengan sasaran sentuhan 44px",
                explanation: "Susunan satu lajur mengelakkan skrol mendatar dan memudahkan sentuhan.",
              },
            },
          },
          {
            choiceId: "ux2-c2",
            nextNodeId: "ux2-fail",
            isCorrect: false,
            skillImpacts: [{ skillId: "html-css", xp: 10, competencyDelta: 1 }],
            i18n: {
              en: {
                label: "Shrink the font to 8px so all 5 columns fit side by side",
                explanation: "Tiny 8px text is unreadable on phones and fails accessibility.",
              },
              ms: {
                label: "Kecilkan fon kepada 8px supaya 5 lajur muat bersebelahan",
                explanation: "Teks 8px sukar dibaca pada telefon dan gagal piawaian aksesibiliti.",
              },
            },
          },
        ],
      },
      {
        nodeId: "ux2-win",
        type: "terminal",
        i18n: {
          en: { prompt: "375px mobile layout verified." },
          ms: { prompt: "Susun atur mudah alih 375px disahkan." },
        },
        terminalOutcome: {
          stars: 3,
          xpReward: 35,
          i18n: {
            en: {
              title: "Responsive Perfection!",
              summary: "Cards stack cleanly on phones with comfortable spacing and tap targets.",
            },
            ms: {
              title: "Susun Atur Responsif Sempurna!",
              summary: "Kad tersusun kemas pada telefon dengan jarak dan butang sentuhan yang selesa.",
            },
          },
        },
      },
      {
        nodeId: "ux2-fail",
        type: "terminal",
        i18n: {
          en: { prompt: "Mobile readability check failed." },
          ms: { prompt: "Semakan kebolehbacaan mudah alih gagal." },
        },
        terminalOutcome: {
          stars: 1,
          xpReward: 10,
          i18n: {
            en: {
              title: "Too Small to Read",
              summary: "Stack content vertically on mobile instead of shrinking text.",
            },
            ms: {
              title: "Terlalu Kecil Untuk Dibaca",
              summary: "Susun kandungan secara menegak pada mudah alih dan elakkan mengecilkan teks.",
            },
          },
        },
      },
    ],
  },
];
