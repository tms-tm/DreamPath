'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DreamyMascot } from '@/components/dreamy/DreamyMascot';
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

const STORAGE_KEY = 'dreampath_dreamy_pos';

export function AskDreamyOverlay() {
  const { nickname, activeCareerId } = useProfileStore();
  const { locale } = useSettingsStore();

  const [isOpen, setIsOpen] = useState(false);
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

  // Interactive Mascot State
  const [isReady, setIsReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [isHopping, setIsHopping] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [tiltDeg, setTiltDeg] = useState(0);
  const [entranceCount, setEntranceCount] = useState(1);

  // Ambient speech bubble state
  const [bubbleText, setBubbleText] = useState('');
  const [showAmbientBubble, setShowAmbientBubble] = useState(false);
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const ambientIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const tipIndexRef = useRef(0);

  // Drag physics refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const tiltRef = useRef(0);
  const tiltTargetRef = useRef(0);
  const dragRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    ox: number;
    oy: number;
    lastX: number;
    hasDragged: boolean;
  } | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = {
    en: {
      initialGreeting: `Hi ${nickname}! I'm Dreamy. I can match careers to your skills, show you the routes from SPM to university, and tell you what a job pays when you start. What would you like to explore?`,
      ambientTips: [
        `Hi ${nickname}! I'm Dreamy.`,
        'Want your top 3 matches?',
        'Ask me what a job pays.',
        'I can map your route from SPM.',
        'You can drag me anywhere.',
      ],
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
        'I can help map your path after SPM, show starting salaries, or match careers to your skills. Try asking about Software Engineering, Junior Lawyer, Future Doctor, Product Designer, or Master Chef!',
      disclaimer: 'Dreamy can make mistakes. Double-check with your teacher or counsellor.',
      newChat: 'New Chat',
      close: 'Close Dreamy',
    },
    ms: {
      initialGreeting: `Hai ${nickname}! Saya Dreamy. Saya boleh padankan kerjaya dengan kemahiran anda, tunjukkan laluan dari SPM ke universiti, dan beritahu anggaran gaji permulaan. Apa yang anda ingin terokai?`,
      ambientTips: [
        `Hai ${nickname}! Saya Dreamy.`,
        'Ingin tahu 3 padanan anda?',
        'Tanya anggaran gaji kerjaya.',
        'Saya boleh petakan laluan SPM.',
        'Anda boleh seret saya ke mana-mana.',
      ],
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
        'Saya boleh bantu petakan laluan selepas SPM, tunjukkan gaji permulaan, atau padankan kerjaya. Cuba tanya tentang Jurutera Perisian, Peguam Muda, Doktor Masa Depan, Pereka Produk, atau Cef Utama!',
      disclaimer: 'Dreamy boleh melakukan kesilapan. Sahkan maklumat dengan guru atau kaunselor anda.',
      newChat: 'Perbualan Baharu',
      close: 'Tutup Dreamy',
    },
  }[locale];

  // Ambient speech bubble
  const say = useCallback((text: string, ms = 3200) => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    setBubbleText(text);
    setShowAmbientBubble(true);
    setIsWaving(true);
    setMascotMood('happy');
    setTimeout(() => {
      setIsWaving(false);
      setMascotMood('idle');
    }, 1600);

    bubbleTimerRef.current = setTimeout(() => {
      setShowAmbientBubble(false);
    }, ms);
  }, []);

  const hush = useCallback(() => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    setShowAmbientBubble(false);
  }, []);

  // Periodic ambient teaser bubbles
  useEffect(() => {
    if (isOpen) {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      return;
    }

    const scheduleNextTeaser = (initial = false) => {
      const delay = initial ? 3000 : 12000 + Math.random() * 6000;
      ambientIntervalRef.current = setTimeout(() => {
        if (!isOpen && !dragRef.current?.hasDragged) {
          const tips = t.ambientTips;
          const nextTip = tips[tipIndexRef.current % tips.length];
          tipIndexRef.current += 1;
          say(nextTip);
        }
        scheduleNextTeaser(false);
      }, delay);
    };

    scheduleNextTeaser(true);

    return () => {
      if (ambientIntervalRef.current) clearTimeout(ambientIntervalRef.current);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, [isOpen, say, hush, t.ambientTips]);

  const place = useCallback((x: number, y: number) => {
    if (typeof window === 'undefined') return;
    const w = wrapperRef.current?.offsetWidth || 140;
    const h = wrapperRef.current?.offsetHeight || 180;
    const isPhone = window.innerWidth < 768;
    const m = isPhone
      ? { l: 12, r: 16, t: 48, b: 84 }
      : { l: 24, r: 36, t: 36, b: 24 };

    const clampedX = Math.max(m.l, Math.min(window.innerWidth - w - m.r, x));
    const clampedY = Math.max(m.t, Math.min(window.innerHeight - h - m.b, y));
    posRef.current = { x: clampedX, y: clampedY };

    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px, 0)`;
    }
  }, []);

  const savePosition = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          rx: window.innerWidth - posRef.current.x,
          by: window.innerHeight - posRef.current.y,
        })
      );
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    const isPhone = window.innerWidth < 768;
    let initialX = window.innerWidth - 160 - (isPhone ? 16 : 32);
    let initialY = window.innerHeight - 200 - (isPhone ? 80 : 28);

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '');
      if (saved && isFinite(saved.rx) && isFinite(saved.by)) {
        initialX = window.innerWidth - saved.rx;
        initialY = window.innerHeight - saved.by;
      }
    } catch {
      // fallback
    }

    place(initialX, initialY);
    const readyFrame = requestAnimationFrame(() => setIsReady(true));

    const handleResize = () => {
      place(posRef.current.x, posRef.current.y);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(readyFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [place]);

  useEffect(() => {
    let animId: number;
    const tick = () => {
      tiltRef.current += (tiltTargetRef.current - tiltRef.current) * 0.16;
      tiltTargetRef.current *= 0.86;
      setTiltDeg(tiltRef.current);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      ox: posRef.current.x,
      oy: posRef.current.y,
      lastX: e.clientX,
      hasDragged: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.hasDragged && Math.hypot(dx, dy) <= 6) return;

    if (!drag.hasDragged) {
      drag.hasDragged = true;
      setIsDragging(true);
      hush();
      setMascotMood('surprised');
    }

    tiltTargetRef.current = Math.max(-22, Math.min(22, (e.clientX - drag.lastX) * 1.6));
    drag.lastX = e.clientX;
    place(drag.ox + dx, drag.oy + dy);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.id) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const hasDragged = drag.hasDragged;
    dragRef.current = null;
    tiltTargetRef.current = 0;
    setIsDragging(false);

    if (hasDragged) {
      savePosition();
      setIsHopping(true);
      setTimeout(() => setIsHopping(false), 520);
      setMascotMood('idle');
    } else {
      hush();
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 300);
      setMascotMood('happy');
      setIsOpen(true);
      setTimeout(() => setMascotMood('idle'), 2000);
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setEntranceCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isThinking]);

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
    <>
      {/* 1. FLOATING 3D DREAMY MASCOT */}
      {!isOpen && (
        <div
          ref={wrapperRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="fixed top-0 left-0 z-50 pointer-events-auto cursor-grab active:cursor-grabbing select-none touch-none will-change-transform flex flex-col items-center"
          style={{
            visibility: isReady ? 'visible' : 'hidden',
          }}
          title="Drag Dreamy or click to chat!"
        >
          {showAmbientBubble && !isDragging && (
            <div className="absolute right-[85%] -top-3 max-w-[240px] bg-surface-container-lowest text-on-surface border border-hairline shadow-card rounded-2xl px-4 py-2 text-xs font-semibold select-none pointer-events-none animate-fade-in z-30 whitespace-nowrap flex items-center gap-1.5">
              <span>{bubbleText}</span>
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-surface-container-lowest border-t border-r border-hairline rotate-45" />
            </div>
          )}

          {!showAmbientBubble && !isDragging && (
            <div className="mb-1 px-3.5 py-1.5 bg-surface-container-lowest/95 text-on-surface text-xs font-bold rounded-full shadow-soft border border-hairline flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Ask Dreamy</span>
            </div>
          )}

          <div
            className={`transition-transform duration-75 ${
              isHopping ? 'animate-dreamy-hop' : ''
            } ${isPopping ? 'animate-dreamy-pop' : ''}`}
          >
            <DreamyMascot
              size="sm"
              mood={mascotMood}
              isDragging={isDragging}
              isWaving={isWaving}
              tiltDeg={tiltDeg}
              triggerEntrance={entranceCount}
              className="pointer-events-none"
            />
          </div>
        </div>
      )}

      {/* 2. ASK DREAMY POP-UP CHATBOX */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 md:right-8 z-[70] w-[94vw] sm:w-[480px] md:w-[540px] h-[640px] max-h-[85vh] bg-surface-container-low border border-hairline rounded-3xl shadow-float flex flex-col overflow-hidden animate-fade-in select-none">
          {/* Header Bar */}
          <header className="flex items-center justify-between px-4 py-3 bg-surface-container-lowest/90 backdrop-blur-md border-b border-hairline shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-primary-container flex items-center justify-center p-0.5 shadow-soft">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApHTOEso7S_JubzZh0y8FbAV0RbvATwViv1SXSJ8CwfAv0XYEs54GWpXHRDjH84_U0chGcrNGyCM2qdPUpH1-6gWIdNeb1tJeI_1jzMqLJkWRmyLWav4QszZqNHcptOt_p_geJZsS0AsvbQjU9epb9Y2ncnCIUSB2EF3UYKT40h18Zwc5tdY479xjk_AX9Kcgu62-gsc2bMKnNTZkSZxT98T3quOTuq7jY2JAzpLb1GchvYqKgtSx"
                  alt="Dreamy"
                  className="w-7 h-7 object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary border-2 border-surface-container-lowest rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface leading-tight">Dreamy</h3>
                <p className="text-[11px] text-on-surface-variant">{t.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* New Chat */}
              <button
                type="button"
                onClick={handleResetChat}
                className="w-8 h-8 rounded-full bg-surface-container-lowest border border-hairline flex items-center justify-center text-on-surface hover:bg-surface-container transition shadow-soft cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                title={t.newChat}
                aria-label={t.newChat}
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseChat}
                className="w-8 h-8 rounded-full bg-surface-container-lowest border border-hairline flex items-center justify-center text-on-surface hover:bg-surface-container transition shadow-soft cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                title={t.close}
                aria-label={t.close}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </header>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end animate-fade-in">
                    <div className="max-w-[85%] bg-primary-container text-on-primary-fixed font-medium px-4 py-2.5 rounded-2xl rounded-tr-xs text-sm shadow-soft">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              // Dreamy message
              return (
                <div key={msg.id} className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-primary-container flex items-center justify-center p-0.5 shadow-soft">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApHTOEso7S_JubzZh0y8FbAV0RbvATwViv1SXSJ8CwfAv0XYEs54GWpXHRDjH84_U0chGcrNGyCM2qdPUpH1-6gWIdNeb1tJeI_1jzMqLJkWRmyLWav4QszZqNHcptOt_p_geJZsS0AsvbQjU9epb9Y2ncnCIUSB2EF3UYKT40h18Zwc5tdY479xjk_AX9Kcgu62-gsc2bMKnNTZkSZxT98T3quOTuq7jY2JAzpLb1GchvYqKgtSx"
                        alt="Dreamy"
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-on-surface">Dreamy</span>
                  </div>

                  {(msg.text || (msg.id === 'msg-0' ? t.initialGreeting : '')) && (
                    <div className="text-on-surface text-sm leading-relaxed pl-6">
                      {msg.text || t.initialGreeting}
                    </div>
                  )}

                  {/* Cards */}
                  {msg.cardType === 'matches' && (
                    <div className="pt-1">
                      <CareerMatchesCard onSelectRoute={handleSelectRouteFromMatches} />
                    </div>
                  )}

                  {msg.cardType === 'route' && (
                    <div className="pt-1">
                      <CourseRouteCard
                        careerKey={msg.careerKey || currentCareer}
                        initialUni={msg.uniKey || 'um'}
                      />
                    </div>
                  )}

                  {msg.cardType === 'salary' && (
                    <div className="pt-1">
                      <SalaryCard
                        careerKey={msg.careerKey || currentCareer}
                        onCompareCareer={handleCompareCareer}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="space-y-1.5 animate-pulse pl-6 flex items-center gap-2 text-xs text-primary font-semibold">
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
                <span>Dreamy is {thinkingLabel}</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Chips & Input Footer */}
          <div className="p-3 bg-surface-container-lowest/80 backdrop-blur-md border-t border-hairline shrink-0">
            {/* Quick-reply Suggestion Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() =>
                  handleSendMessage(
                    locale === 'ms'
                      ? 'Kerjaya manakah yang sepadan dengan kemahiran saya?'
                      : 'Which careers match my skills?'
                  )
                }
                className="whitespace-nowrap px-3 py-1.5 bg-surface-container-lowest border border-hairline text-on-surface text-xs font-semibold rounded-full hover:bg-primary-container hover:text-on-primary-fixed transition shadow-soft cursor-pointer shrink-0 min-h-[36px]"
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
                className="whitespace-nowrap px-3 py-1.5 bg-surface-container-lowest border border-hairline text-on-surface text-xs font-semibold rounded-full hover:bg-primary-container hover:text-on-primary-fixed transition shadow-soft cursor-pointer shrink-0 min-h-[36px]"
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
                className="whitespace-nowrap px-3 py-1.5 bg-surface-container-lowest border border-hairline text-on-surface text-xs font-semibold rounded-full hover:bg-primary-container hover:text-on-primary-fixed transition shadow-soft cursor-pointer shrink-0 min-h-[36px]"
              >
                {t.chipSalary}
              </button>
            </div>

            {/* Input Bar */}
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
                className="w-full px-3 py-1.5 text-sm text-on-surface placeholder:text-outline bg-transparent outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isThinking}
                className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition shrink-0 disabled:opacity-40 cursor-pointer min-w-[36px] min-h-[36px]"
                title="Send message"
                aria-label="Send message"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              </button>
            </form>

            <p className="text-center text-[10px] text-on-surface-variant mt-1.5">
              {t.disclaimer}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
