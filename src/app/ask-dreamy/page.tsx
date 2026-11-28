'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { DreamyMascot } from '@/components/dreamy/DreamyMascot';
import { DreamyBackdrop } from '@/components/dreamy/DreamyBackdrop';
import { CareerMatchesCard } from '@/components/dreamy/cards/CareerMatchesCard';
import { CourseRouteCard } from '@/components/dreamy/cards/CourseRouteCard';
import { SalaryCard } from '@/components/dreamy/cards/SalaryCard';
import { CAREERS, getCareerById } from '@/content/careers';
import { detectIntent } from '@/features/dreamy/intentMatcher';
import { useProfileStore } from '@/features/profile/useProfileStore';
import { useSettingsStore } from '@/features/settings/useSettingsStore';

interface ChatMessage {
  id: string;
  sender: 'user' | 'dreamy';
  text?: string;
  cardType?: 'matches' | 'route' | 'salary';
  careerKey?: string;
  uniKey?: string;
}

export default function AskDreamyPage() {
  const { nickname, activeCareerId } = useProfileStore();
  const { locale } = useSettingsStore();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'dreamy',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState('thinking...');
  const [mascotMood, setMascotMood] = useState<
    'idle' | 'listening' | 'happy' | 'thinking' | 'surprised'
  >('idle');
  const [currentCareer, setCurrentCareer] = useState<string>(activeCareerId || 'software-engineer');

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = {
    en: {
      initialGreeting: `Hi ${nickname}! I'm Dreamy. I can match careers to your skills, show you the routes from SPM to university, and tell you what a job pays when you start. What would you like to explore first?`,
      chipMatches: 'Career matches',
      chipRoute: 'Course pathway',
      chipSalary: 'Starting salary',
      placeholder: 'Ask Dreamy a question...',
      status: 'Career counsellor • online',
      matchesText: 'Here are the top careers that best match the skills you demonstrated in Practice Modes!',
      routeText: (name: string) =>
        `There's more than one way to become a ${name}. Pick a university below to see the usual route after SPM.`,
      salaryText: (name: string) =>
        `Here's what a ${name} usually earns in their first job, and how pay grows with experience.`,
      greetText: `Hello ${nickname}! What would you like to explore today? You can ask about career matches, courses after SPM, or starting salaries.`,
      helpText:
        'I can help map your path after SPM, show starting salaries, or match careers to your skills. Try tapping one of the quick suggestions below or ask about Software Engineering, Junior Lawyer, Future Doctor, Product Designer, or Master Chef!',
      disclaimer: 'Dreamy can make mistakes. Double-check with your teacher or counsellor.',
      newChat: 'New Chat',
      backHome: 'Back to Dashboard',
    },
    ms: {
      initialGreeting: `Hai ${nickname}! Saya Dreamy. Saya boleh padankan kerjaya dengan kemahiran anda, tunjukkan laluan dari SPM ke universiti, dan beritahu anggaran gaji permulaan. Apa yang anda ingin terokai dahulu?`,
      chipMatches: 'Padanan kerjaya',
      chipRoute: 'Laluan kursus',
      chipSalary: 'Gaji permulaan',
      placeholder: 'Tanya Dreamy sebarang soalan...',
      status: 'Kaunselor kerjaya • dalam talian',
      matchesText: 'Berikut ialah kerjaya terbaik yang sepadan dengan kemahiran yang anda tunjukkan dalam Mod Latihan!',
      routeText: (name: string) =>
        `Terdapat pelbagai laluan untuk menjadi seorang ${name}. Pilih universiti di bawah untuk melihat laluan lazim selepas SPM.`,
      salaryText: (name: string) =>
        `Berikut ialah anggaran pendapatan seorang ${name} pada pekerjaan pertama mereka dan perkembangannya.`,
      greetText: `Hai ${nickname}! Apa yang anda ingin terokai hari ini? Anda boleh tanya tentang padanan kerjaya, kursus selepas SPM, atau gaji permulaan.`,
      helpText:
        'Saya boleh bantu petakan laluan anda selepas SPM, tunjukkan gaji permulaan, atau padankan kerjaya. Cuba ketik cadangan di bawah atau tanya tentang Jurutera Perisian, Peguam Muda, Doktor Masa Depan, Pereka Produk, atau Cef Utama!',
      disclaimer: 'Dreamy boleh melakukan kesilapan. Sahkan maklumat dengan guru atau kaunselor anda.',
      newChat: 'Perbualan Baharu',
      backHome: 'Kembali ke Papan Pemuka',
    },
  }[locale];

  const scrollToBottom = () => {
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isThinking) return;

    setInputText('');
    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: 'user',
        text: query,
      },
    ]);

    const intent = detectIntent(query, currentCareer);
    if (intent.careerId) {
      setCurrentCareer(intent.careerId);
    }

    setIsThinking(true);
    setMascotMood('thinking');
    if (intent.type === 'matches') {
      setThinkingLabel(locale === 'ms' ? 'menyemak kemahiran anda...' : 'checking your Practice skills...');
    } else if (intent.type === 'route') {
      setThinkingLabel(locale === 'ms' ? 'mencari laluan dari SPM...' : 'looking up routes from SPM...');
    } else if (intent.type === 'salary') {
      setThinkingLabel(locale === 'ms' ? 'membandingkan gaji dalam RM...' : 'comparing pay in RM...');
    } else if (intent.type === 'greet') {
      setThinkingLabel(locale === 'ms' ? 'menyapa anda...' : 'saying hello...');
    } else {
      setThinkingLabel(locale === 'ms' ? 'membaca soalan anda...' : 'reading your question...');
    }

    setTimeout(() => {
      setIsThinking(false);
      setMascotMood('happy');
      setTimeout(() => setMascotMood('idle'), 2000);

      const botMsgId = `dreamy-${Date.now()}`;
      const career = getCareerById(intent.careerId || currentCareer) ?? CAREERS[0];
      const careerTitle = career.i18n[locale].title;

      if (intent.type === 'matches') {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: t.matchesText,
            cardType: 'matches',
          },
        ]);
      } else if (intent.type === 'route') {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: t.routeText(careerTitle),
            cardType: 'route',
            careerKey: intent.careerId || currentCareer,
            uniKey: intent.uniKey || 'um',
          },
        ]);
      } else if (intent.type === 'salary') {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: t.salaryText(careerTitle),
            cardType: 'salary',
            careerKey: intent.careerId || currentCareer,
          },
        ]);
      } else if (intent.type === 'greet') {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: t.greetText,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: t.helpText,
          },
        ]);
      }
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-0',
        sender: 'dreamy',
        text: t.initialGreeting,
      },
    ]);
    setMascotMood('happy');
    setTimeout(() => setMascotMood('idle'), 1800);
  };

  const handleSelectRouteFromMatches = (careerId: string) => {
    setCurrentCareer(careerId);
    const career = getCareerById(careerId) ?? CAREERS[0];
    const name = career.i18n[locale].title;
    const prompt =
      locale === 'ms'
        ? `Bagaimanakah laluan menjadi seorang ${name} selepas SPM?`
        : `How do I become a ${name} after SPM?`;
    handleSendMessage(prompt);
  };

  const handleCompareCareer = (careerId: string) => {
    setCurrentCareer(careerId);
    const career = getCareerById(careerId) ?? CAREERS[0];
    const name = career.i18n[locale].title;
    const prompt =
      locale === 'ms'
        ? `Berapakah anggaran gaji permulaan seorang ${name}?`
        : `What's the starting salary for a ${name}?`;
    handleSendMessage(prompt);
  };

  const currentCareerObj = getCareerById(currentCareer) ?? CAREERS[0];

  return (
    <div className="relative min-h-[92vh] bg-surface overflow-x-hidden flex flex-col justify-between rounded-3xl select-none animate-fade-in border border-hairline">
      {/* Background artwork */}
      <DreamyBackdrop />

      {/* Left 3D Mascot Floating on large screens */}
      <div className="fixed left-4 xl:left-8 bottom-28 z-20 hidden lg:flex flex-col items-center pointer-events-auto">
        <DreamyMascot
          mood={mascotMood}
          onTap={() => {
            setMascotMood('happy');
            setTimeout(() => setMascotMood('idle'), 1800);
          }}
        />
      </div>

      {/* Central Chat Column */}
      <main className="relative z-10 mx-auto w-full max-w-[800px] px-3 sm:px-4 pt-6 pb-6 flex-1 flex flex-col justify-between min-h-[85vh]">
        <div>
          {/* Top Header Bar */}
          <header className="flex items-center justify-between pb-3 sm:pb-4 border-b border-hairline bg-surface-container-lowest/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-soft">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-primary-container flex items-center justify-center p-0.5 shadow-soft">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApHTOEso7S_JubzZh0y8FbAV0RbvATwViv1SXSJ8CwfAv0XYEs54GWpXHRDjH84_U0chGcrNGyCM2qdPUpH1-6gWIdNeb1tJeI_1jzMqLJkWRmyLWav4QszZqNHcptOt_p_geJZsS0AsvbQjU9epb9Y2ncnCIUSB2EF3UYKT40h18Zwc5tdY479xjk_AX9Kcgu62-gsc2bMKnNTZkSZxT98T3quOTuq7jY2JAzpLb1GchvYqKgtSx"
                  alt="Dreamy"
                  className="w-7 h-7 object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary border-2 border-surface-container-lowest rounded-full" />
              </div>
              <div>
                <h1 className="text-base font-bold text-on-surface leading-tight">Dreamy</h1>
                <p className="text-xs text-on-surface-variant">{t.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetChat}
                className="w-10 h-10 rounded-full bg-surface-container-lowest border border-hairline flex items-center justify-center text-on-surface hover:bg-surface-container transition shadow-soft cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                title={t.newChat}
                aria-label={t.newChat}
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-surface-container-lowest border border-hairline flex items-center justify-center text-on-surface hover:bg-surface-container transition shadow-soft cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                title={t.backHome}
                aria-label={t.backHome}
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </header>

          {/* Message Thread */}
          <div className="mt-6 space-y-6 pb-8">
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end animate-fade-in">
                    <div className="max-w-[85%] bg-primary-container text-on-primary-fixed font-medium px-4 py-3 rounded-2xl rounded-tr-xs text-sm sm:text-base shadow-soft">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center p-0.5 shadow-soft">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApHTOEso7S_JubzZh0y8FbAV0RbvATwViv1SXSJ8CwfAv0XYEs54GWpXHRDjH84_U0chGcrNGyCM2qdPUpH1-6gWIdNeb1tJeI_1jzMqLJkWRmyLWav4QszZqNHcptOt_p_geJZsS0AsvbQjU9epb9Y2ncnCIUSB2EF3UYKT40h18Zwc5tdY479xjk_AX9Kcgu62-gsc2bMKnNTZkSZxT98T3quOTuq7jY2JAzpLb1GchvYqKgtSx"
                        alt="Dreamy"
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <span className="text-sm font-bold text-on-surface">Dreamy</span>
                  </div>

                  {(msg.text || (msg.id === 'msg-0' ? t.initialGreeting : '')) && (
                    <div className="text-on-surface text-sm sm:text-base leading-relaxed pl-8">
                      {msg.text || t.initialGreeting}
                    </div>
                  )}

                  {msg.cardType === 'matches' && (
                    <div className="pl-0 sm:pl-8 pt-1">
                      <CareerMatchesCard onSelectRoute={handleSelectRouteFromMatches} />
                    </div>
                  )}

                  {msg.cardType === 'route' && (
                    <div className="pl-0 sm:pl-8 pt-1">
                      <CourseRouteCard
                        careerKey={msg.careerKey || currentCareer}
                        initialUni={msg.uniKey || 'um'}
                      />
                    </div>
                  )}

                  {msg.cardType === 'salary' && (
                    <div className="pl-0 sm:pl-8 pt-1">
                      <SalaryCard
                        careerKey={msg.careerKey || currentCareer}
                        onCompareCareer={handleCompareCareer}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {isThinking && (
              <div className="space-y-1.5 animate-pulse pl-8 flex items-center gap-2 text-xs sm:text-sm text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Dreamy is {thinkingLabel}</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>
        </div>

        {/* Footer Chips & Input */}
        <div className="sticky bottom-0 pt-3 pb-2 bg-surface/90 backdrop-blur-md border-t border-hairline">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() =>
                handleSendMessage(
                  locale === 'ms'
                    ? 'Kerjaya manakah yang sepadan dengan kemahiran saya?'
                    : 'Which careers match my skills?'
                )
              }
              className="whitespace-nowrap px-3.5 py-1.5 bg-surface-container-lowest border border-hairline text-on-surface text-xs font-semibold rounded-full hover:bg-primary-container hover:text-on-primary-fixed transition shadow-soft cursor-pointer shrink-0 min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {t.chipMatches}
            </button>
            <button
              type="button"
              onClick={() =>
                handleSendMessage(
                  locale === 'ms'
                    ? `Bagaimanakah laluan menjadi ${currentCareerObj.i18n.ms.title} selepas SPM?`
                    : `How do I become a ${currentCareerObj.i18n.en.title} after SPM?`
                )
              }
              className="whitespace-nowrap px-3.5 py-1.5 bg-surface-container-lowest border border-hairline text-on-surface text-xs font-semibold rounded-full hover:bg-primary-container hover:text-on-primary-fixed transition shadow-soft cursor-pointer shrink-0 min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {t.chipRoute}
            </button>
            <button
              type="button"
              onClick={() =>
                handleSendMessage(
                  locale === 'ms'
                    ? `Berapakah anggaran gaji permulaan untuk ${currentCareerObj.i18n.ms.title}?`
                    : `What is the starting salary for a ${currentCareerObj.i18n.en.title}?`
                )
              }
              className="whitespace-nowrap px-3.5 py-1.5 bg-surface-container-lowest border border-hairline text-on-surface text-xs font-semibold rounded-full hover:bg-primary-container hover:text-on-primary-fixed transition shadow-soft cursor-pointer shrink-0 min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {t.chipSalary}
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center bg-surface-container-lowest border border-hairline rounded-2xl p-1 shadow-soft focus-within:border-primary transition"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.placeholder}
              className="w-full px-3 py-2 text-sm text-on-surface placeholder:text-outline bg-transparent outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isThinking}
              className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition shrink-0 disabled:opacity-40 cursor-pointer min-w-[40px] min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              title="Send message"
              aria-label="Send message"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            </button>
          </form>

          <p className="text-center text-[10px] text-on-surface-variant mt-1.5">
            {t.disclaimer}
          </p>
        </div>
      </main>
    </div>
  );
}
