export interface LeaderboardEntry {
  username: string;
  avatarChar: string;
  totalXp: number;
  simulatedSalary: number;
  activeCareerId: string;
  isCurrentUser?: boolean;
}

export const LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    username: "@pixel_aiman",
    avatarChar: "A",
    totalXp: 1420,
    simulatedSalary: 3250,
    activeCareerId: "software-engineer",
  },
  {
    username: "@nurul_lex",
    avatarChar: "N",
    totalXp: 1310,
    simulatedSalary: 2980,
    activeCareerId: "junior-lawyer",
  },
  {
    username: "@dr_farah",
    avatarChar: "F",
    totalXp: 1240,
    simulatedSalary: 3420,
    activeCareerId: "future-doctor",
  },
  {
    username: "@ux_mei",
    avatarChar: "M",
    totalXp: 1080,
    simulatedSalary: 2680,
    activeCareerId: "product-designer",
  },
  {
    username: "@chef_danial",
    avatarChar: "D",
    totalXp: 960,
    simulatedSalary: 2410,
    activeCareerId: "master-chef",
  },
  {
    username: "@coder_syafiq",
    avatarChar: "S",
    totalXp: 840,
    simulatedSalary: 2390,
    activeCareerId: "software-engineer",
  },
  {
    username: "@lex_kavita",
    avatarChar: "K",
    totalXp: 760,
    simulatedSalary: 2210,
    activeCareerId: "junior-lawyer",
  },
  {
    username: "@med_hariz",
    avatarChar: "H",
    totalXp: 680,
    simulatedSalary: 2540,
    activeCareerId: "future-doctor",
  },
];
