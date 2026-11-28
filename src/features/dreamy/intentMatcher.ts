export type DreamyIntentType = 'greet' | 'salary' | 'route' | 'matches' | 'help';

export interface DetectedIntent {
  type: DreamyIntentType;
  careerId: string;
  uniKey?: string;
}

const CAREER_KEYS = [
  'software-engineer',
  'junior-lawyer',
  'future-doctor',
  'product-designer',
  'master-chef',
] as const;

export function detectCareerInText(text: string, fallbackCareerId = 'software-engineer'): string {
  const t = text.toLowerCase();

  if (/software|programm|cod(ing|e)|developer|perisian|pengaturcara|web app/.test(t)) {
    return 'software-engineer';
  }
  if (/law|lawyer|legal|court|peguam|undang|mahkamah|guam/.test(t)) {
    return 'junior-lawyer';
  }
  if (/doctor|medic|hospital|clinic|doktor|perubatan|pesakit|kesihatan|mbbs/.test(t)) {
    return 'future-doctor';
  }
  if (/product design|designer|ui|ux|figma|pereka|reka bentuk|antaramuka/.test(t)) {
    return 'product-designer';
  }
  if (/chef|cook|culinary|kitchen|food|restaurant|masak|cef|dapur|makanan|kulinari/.test(t)) {
    return 'master-chef';
  }

  return CAREER_KEYS.includes(fallbackCareerId as (typeof CAREER_KEYS)[number])
    ? fallbackCareerId
    : 'software-engineer';
}

export function detectUniInText(text: string): string | undefined {
  const t = text.toLowerCase();
  if (/uitm/.test(t)) return 'uitm';
  if (/sunway/.test(t)) return 'sunway';
  if (/mmu|multimedia/.test(t)) return 'mmu';
  if (/taylor/.test(t)) return 'taylors';
  if (/ukm/.test(t)) return 'ukm';
  if (/um|malaya/.test(t)) return 'um';
  return undefined;
}

export function detectIntent(text: string, currentCareerId = 'software-engineer'): DetectedIntent {
  const t = text.toLowerCase().trim();

  // Greetings
  if (
    /^(hi+|hello+|hey+|hai|helo|hiya|yo|salam|assalamualaikum|selamat (pagi|petang|malam|sejahtera)|apa khabar)( dreamy| there)?[\s!.,?]*$/.test(
      t
    )
  ) {
    return { type: 'greet', careerId: currentCareerId };
  }

  const careerId = detectCareerInText(t, currentCareerId);
  const uniKey = detectUniInText(t);

  // Salary query
  if (/salary|pay\b|paid|earn|gaji|pendapatan|elaun|bayaran|\brm\b|money|duit/.test(t)) {
    return { type: 'salary', careerId };
  }

  // Education / Route query
  if (
    /route|laluan|course|kursus|spm|universit|study|belajar|degree|ijazah|asasi|matri|stpm|diploma|foundation|syarat|kelayakan|requirement|become|masuk|jadi/.test(
      t
    )
  ) {
    return { type: 'route', careerId, uniKey };
  }

  // Matches query
  if (
    /match|padanan|cadangan|suggest|fit|suit|top 3|top three|which career|what career|job for me|kerjaya sesuai|my skills|kemahiran|aptitude/.test(
      t
    )
  ) {
    return { type: 'matches', careerId };
  }

  return { type: 'help', careerId };
}
