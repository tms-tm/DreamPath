import type { StudyLessonContent } from "@/content/schemas";

export const FUTURE_DOCTOR_STUDIES: StudyLessonContent[] = [
  {
    id: "study-doc-1",
    careerId: "future-doctor",
    readMinutes: 5,
    xpReward: 30,
    skillId: "problem-solving",
    i18n: {
      en: {
        title: "Human Physiology & Medical Triage",
        sections: [
          {
            heading: "1. How Organ Systems Cooperate",
            body: [
              "The circulatory system delivers oxygen and nutrients through blood vessels, while the nervous system coordinates fast responses.",
              "In emergencies, doctors use triage to treat the most urgent symptoms first.",
            ],
            keyTerms: [
              { term: "Homeostasis", definition: "The body's steady internal balance of temperature, fluids, and energy." },
              { term: "Triage", definition: "Prioritizing patients based on the urgency of their medical need." },
            ],
          },
        ],
      },
      ms: {
        title: "Fisiologi Manusia & Triage Perubatan",
        sections: [
          {
            heading: "1. Kerjasama Sistem Organ",
            body: [
              "Sistem peredaran darah menghantar oksigen dan nutrien melalui salur darah, manakala sistem saraf menyelaras tindak balas pantas.",
              "Dalam kecemasan, doktor menggunakan triage untuk merawat simptom paling mendesak dahulu.",
            ],
            keyTerms: [
              { term: "Homeostasis", definition: "Keseimbangan dalaman badan yang stabil bagi suhu, cecair, dan tenaga." },
              { term: "Triage", definition: "Menentukan keutamaan pesakit berdasarkan tahap kecemasan." },
            ],
          },
        ],
      },
    },
  },
  {
    id: "study-doc-2",
    careerId: "future-doctor",
    readMinutes: 4,
    xpReward: 30,
    skillId: "communication",
    i18n: {
      en: {
        title: "Preventing Heat Illness & Listening With Empathy",
        sections: [
          {
            heading: "1. Early Signs of Heat Exhaustion",
            body: [
              "Heavy sweating, dizziness, and nausea during hot outdoor sports signal heat exhaustion. Rest in shade, cool down, and hydrate.",
              "Clear, calm communication helps anxious patients feel safe and share accurate symptoms.",
            ],
            keyTerms: [
              { term: "Heat Exhaustion", definition: "Overheating with heavy sweat and dizziness that needs shade and cooling." },
              { term: "Empathy", definition: "Listening attentively to understand how a patient feels." },
            ],
          },
        ],
      },
      ms: {
        title: "Mencegah Kelesuan Haba & Mendengar Dengan Empati",
        sections: [
          {
            heading: "1. Tanda Awal Kelesuan Haba",
            body: [
              "Berpeluh banyak, pening, dan loya semasa bersukan dalam cuaca panas menandakan kelesuan haba. Rehat di tempat teduh, sejukkan badan, dan minum air.",
              "Komunikasi yang tenang membantu pesakit berasa selamat dan berkongsi simptom dengan tepat.",
            ],
            keyTerms: [
              { term: "Kelesuan Haba", definition: "Keadaan badan terlalu panas dengan peluh banyak dan pening." },
              { term: "Empati", definition: "Mendengar dengan teliti untuk memahami perasaan pesakit." },
            ],
          },
        ],
      },
    },
  },
  {
    id: "study-doc-3",
    careerId: "future-doctor",
    readMinutes: 4,
    xpReward: 30,
    skillId: "accessibility",
    i18n: {
      en: {
        title: "Vital Signs & Responsible Antibiotic Use",
        sections: [
          {
            heading: "1. Bacteria vs. Viruses",
            body: [
              "Doctors check temperature, pulse, and blood pressure before making a diagnosis.",
              "Antibiotics treat bacterial infections—never viral colds—so using them responsibly prevents antibiotic resistance.",
            ],
            keyTerms: [
              { term: "Vital Signs", definition: "Core measurements: temperature, heart rate, breathing rate, and blood pressure." },
              { term: "Antibiotic Resistance", definition: "When bacteria adapt and stop responding to antibiotics due to overuse." },
            ],
          },
        ],
      },
      ms: {
        title: "Tanda Vital & Penggunaan Antibiotik Bertanggungjawab",
        sections: [
          {
            heading: "1. Bakteria vs. Virus",
            body: [
              "Doktor memeriksa suhu, nadi, dan tekanan darah sebelum membuat diagnosis.",
              "Antibiotik merawat jangkitan bakteria—bukan selesema virus—jadi penggunaan berhemah mencegah kerintangan antibiotik.",
            ],
            keyTerms: [
              { term: "Tanda Vital", definition: "Ukuran asas: suhu, kadar nadi, pernafasan, dan tekanan darah." },
              { term: "Kerintangan Antibiotik", definition: "Apabila bakteria tidak lagi bertindak balas terhadap antibiotik akibat penggunaan berlebihan." },
            ],
          },
        ],
      },
    },
  },
];
