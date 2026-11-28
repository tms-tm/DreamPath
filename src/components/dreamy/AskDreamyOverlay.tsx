'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DreamyMascot } from '@/components/dreamy/DreamyMascot';
import { CareerMatchesCard } from '@/components/dreamy/cards/CareerMatchesCard';
import { CourseRouteCard } from '@/components/dreamy/cards/CourseRouteCard';
import { SalaryCard } from '@/components/dreamy/cards/SalaryCard';
import { CAREERS, ChatMessage } from '@/types/dreamy';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'dreamy',
    text: "Hi Alex! I'm Dreamy. I can match careers to your skills, show you the routes from SPM to university, and tell you what a job pays when you start. What would you like to explore?",
  },
];

const STORAGE_KEY = 'dreampath_dreamy_pos';

const AMBIENT_TIPS = [
  "Hi! I'm Dreamy.",
  'Want your top 3 matches?',
  'Ask me what a job pays.',
  'I can map your route from SPM.',
  'You can drag me anywhere.',
];

export function AskDreamyOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState('thinking...');
  const [mascotMood, setMascotMood] = useState<
    'idle' | 'listening' | 'happy' | 'thinking' | 'surprised'
  >('idle');
  const [currentCareer, setCurrentCareer] = useState<string>('se');

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

  // Drag physics refs (pure ref updates for 60fps zero-state-lag dragging)
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

  // Say an ambient speech bubble and wave
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

  // Periodic ambient teaser bubbles when idle and chat is closed
  useEffect(() => {
    if (isOpen) {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      return;
    }

    const scheduleNextTeaser = (initial = false) => {
      const delay = initial ? 3000 : 10000 + Math.random() * 5000;
      ambientIntervalRef.current = setTimeout(() => {
        if (!isOpen && !dragRef.current?.hasDragged) {
          const nextTip = AMBIENT_TIPS[tipIndexRef.current % AMBIENT_TIPS.length];
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
  }, [isOpen, say, hush]);

  // Clamps Dreamy within viewport bounds and applies 60fps translate3d directly
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
      // Ignore private browsing storage errors
    }
  }, []);

  // Initialize position and restore saved coordinates
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
      // fallback to bottom-right
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

  // Spring tilt inertia loop inside requestAnimationFrame
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

  // Pointer event handlers with pointer capture and drag threshold
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // synthetic pointer fallback
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

    // Clean drag threshold: ignore micro movements <= 6px
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
      // Tap / Click action! Pop animation and open chatbox
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
    // Trigger signature 360° spin entrance animation when chat closes
    setEntranceCount((prev) => prev + 1);
  };

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isThinking]);

  // Intent detector matching DreamPath-Ask-Dreamy.html
  const detectIntent = (text: string) => {
    const t = text.toLowerCase();
    if (
      /^\s*(hi+|hello+|hey+|hai|helo|hiya|yo|salam|assalamualaikum|good (morning|afternoon|evening))( dreamy| there)?[\s!.,?]*$/.test(
        t
      )
    ) {
      return { type: 'greet' };
    }

    const career = /data/.test(t)
      ? 'da'
      : /\bux\b|design/.test(t)
      ? 'ux'
      : /software|programm|coding|developer/.test(t)
      ? 'se'
      : currentCareer;

    const uni = /uitm/.test(t)
      ? 'uitm'
      : /sunway/.test(t)
      ? 'sunway'
      : /\bmmu\b|multimedia univ/.test(t)
      ? 'mmu'
      : /\bum\b|malaya/.test(t)
      ? 'um'
      : 'um';

    if (/salary|pay\b|paid|earn|gaji|income|money|\brm\b/.test(t)) {
      return { type: 'salary', career };
    }
    if (
      /route|course|spm|universit|study|degree|asasi|matri|stpm|diploma|foundation|requirement|become|get into/.test(
        t
      )
    ) {
      return { type: 'route', career, uni };
    }
    if (
      /match|suggest|fit|suit|top 3|top three|which career|what career|job for me|my skills/.test(
        t
      )
    ) {
      return { type: 'matches' };
    }

    return { type: 'help', career };
  };

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

    const intent = detectIntent(query);
    if (intent.career) {
      setCurrentCareer(intent.career);
    }

    setIsThinking(true);
    setMascotMood('thinking');
    if (intent.type === 'matches') setThinkingLabel('checking your Practice skills...');
    else if (intent.type === 'route') setThinkingLabel('looking up routes from SPM...');
    else if (intent.type === 'salary') setThinkingLabel('comparing pay in RM...');
    else if (intent.type === 'greet') setThinkingLabel('saying hello...');
    else setThinkingLabel('reading your question...');

    setTimeout(() => {
      setIsThinking(false);
      setMascotMood('happy');
      setTimeout(() => setMascotMood('idle'), 2000);

      const botMsgId = `dreamy-${Date.now()}`;
      if (intent.type === 'matches') {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: 'Here are the top careers that best match the skills you demonstrated in Practice Modes!',
            cardType: 'matches',
          },
        ]);
      } else if (intent.type === 'route') {
        const c = CAREERS[intent.career || currentCareer];
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: `There's more than one way to become a ${c.name}. Pick a university below to see the usual route after SPM.`,
            cardType: 'route',
            careerKey: intent.career || currentCareer,
            uniKey: intent.uni || 'um',
          },
        ]);
      } else if (intent.type === 'salary') {
        const c = CAREERS[intent.career || currentCareer];
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: `Here's what a ${c.name} usually earns in their first job, and how pay grows with experience.`,
            cardType: 'salary',
            careerKey: intent.career || currentCareer,
          },
        ]);
      } else if (intent.type === 'greet') {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: 'Hello there! What would you like to explore today? You can ask about career matches, courses after SPM, or starting salaries.',
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: 'dreamy',
            text: "I can help map your path after SPM, show starting salaries, or match careers to your skills. Try tapping one of the quick suggestions below or ask about Software Engineering, Data Analysis, or UX Design!",
          },
        ]);
      }
    }, 750);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setMascotMood('happy');
    setTimeout(() => setMascotMood('idle'), 1800);
  };

  const handleSelectRouteFromMatches = (careerId: string) => {
    setCurrentCareer(careerId);
    handleSendMessage(`How do I become a ${CAREERS[careerId].name} after SPM?`);
  };

  const handleCompareCareer = (careerId: string) => {
    setCurrentCareer(careerId);
    handleSendMessage(`What's the starting salary for a ${CAREERS[careerId].name}?`);
  };

  return (
    <>
      {/* 1. FLOATING 3D DREAMY MASCOT (60fps Native Three.js Engine) */}
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
          {/* Ambient Pop-Up Teaser Speech Bubble (Stitch Light Theme) */}
          {showAmbientBubble && !isDragging && (
            <div className="absolute right-[85%] -top-3 max-w-[220px] bg-white text-slate-800 border border-slate-200 shadow-lg rounded-2xl px-4 py-2 text-xs font-semibold select-none pointer-events-none animate-fade-in z-30 whitespace-nowrap flex items-center gap-1.5">
              <span>{bubbleText}</span>
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-slate-200 rotate-45"></div>
            </div>
          )}

          {/* Fallback Static Callout Pill when no ambient teaser is active */}
          {!showAmbientBubble && !isDragging && (
            <div className="mb-1 px-3.5 py-1.5 bg-white/95 text-[#1E3A8A] text-xs font-bold rounded-full shadow-lg border border-[#E8E5DC] flex items-center gap-1.5 pointer-events-none transition-opacity duration-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Ask Dreamy</span>
            </div>
          )}

          {/* Three.js Mascot Controller */}
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

      {/* 2. STITCH-STYLED "ASK DREAMY" POP-UP CHATBOX */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 md:right-8 z-[70] w-[94vw] sm:w-[480px] md:w-[540px] h-[640px] max-h-[85vh] bg-[#F8F7F4] border border-[#E8E5DC] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in select-none">
          {/* Header Bar */}
          <header className="flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md border-b border-[#E8E5DC]/80 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-[#CFE2FA] flex items-center justify-center p-0.5 shadow-xs">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApHTOEso7S_JubzZh0y8FbAV0RbvATwViv1SXSJ8CwfAv0XYEs54GWpXHRDjH84_U0chGcrNGyCM2qdPUpH1-6gWIdNeb1tJeI_1jzMqLJkWRmyLWav4QszZqNHcptOt_p_geJZsS0AsvbQjU9epb9Y2ncnCIUSB2EF3UYKT40h18Zwc5tdY479xjk_AX9Kcgu62-gsc2bMKnNTZkSZxT98T3quOTuq7jY2JAzpLb1GchvYqKgtSx"
                  alt="Dreamy"
                  className="w-7 h-7 object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E3A8A] leading-tight">Dreamy</h3>
                <p className="text-[11px] text-[#64748B]">Career counsellor • online</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Reset/New Chat */}
              <button
                type="button"
                onClick={handleResetChat}
                className="w-8 h-8 rounded-full bg-white border border-[#E8E5DC] flex items-center justify-center text-[#1E3A8A] hover:bg-[#F8FAFC] transition shadow-xs cursor-pointer"
                title="New Chat"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>

              {/* Close Button: Collapse back to floating mascot */}
              <button
                type="button"
                onClick={handleCloseChat}
                className="w-8 h-8 rounded-full bg-white border border-[#E8E5DC] flex items-center justify-center text-[#1E3A8A] hover:bg-[#F8FAFC] transition shadow-xs cursor-pointer"
                title="Close Dreamy"
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
                    <div className="max-w-[85%] bg-[#CFE2FA] text-[#1E3A8A] font-medium px-4 py-2.5 rounded-2xl rounded-tr-xs text-sm shadow-xs">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              // Dreamy message
              return (
                <div key={msg.id} className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#CFE2FA] flex items-center justify-center p-0.5 shadow-xs">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApHTOEso7S_JubzZh0y8FbAV0RbvATwViv1SXSJ8CwfAv0XYEs54GWpXHRDjH84_U0chGcrNGyCM2qdPUpH1-6gWIdNeb1tJeI_1jzMqLJkWRmyLWav4QszZqNHcptOt_p_geJZsS0AsvbQjU9epb9Y2ncnCIUSB2EF3UYKT40h18Zwc5tdY479xjk_AX9Kcgu62-gsc2bMKnNTZkSZxT98T3quOTuq7jY2JAzpLb1GchvYqKgtSx"
                        alt="Dreamy"
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#1E3A8A]">Dreamy</span>
                  </div>

                  {msg.text && (
                    <div className="text-[#334155] text-sm leading-relaxed pl-6">
                      {msg.text}
                    </div>
                  )}

                  {/* Structured Cards */}
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
              <div className="space-y-1.5 animate-pulse pl-6 flex items-center gap-2 text-xs text-[#1E3A8A] font-semibold">
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
                <span>Dreamy is {thinkingLabel}</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Chips & Input Footer */}
          <div className="p-3 bg-white/80 backdrop-blur-md border-t border-[#E8E5DC]/80 shrink-0">
            {/* Quick-reply Suggestion Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => handleSendMessage('Which careers match my skills?')}
                className="whitespace-nowrap px-3 py-1.5 bg-white border border-[#E8E5DC] text-[#1E3A8A] text-xs font-semibold rounded-full hover:bg-[#CFE2FA]/30 hover:border-[#CFE2FA] transition shadow-xs cursor-pointer shrink-0"
              >
                Career matches
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSendMessage(
                    `How do I become a ${CAREERS[currentCareer].name} after SPM?`
                  )
                }
                className="whitespace-nowrap px-3 py-1.5 bg-white border border-[#E8E5DC] text-[#1E3A8A] text-xs font-semibold rounded-full hover:bg-[#CFE2FA]/30 hover:border-[#CFE2FA] transition shadow-xs cursor-pointer shrink-0"
              >
                Course route
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSendMessage(
                    `What's the starting salary for a ${CAREERS[currentCareer].name}?`
                  )
                }
                className="whitespace-nowrap px-3 py-1.5 bg-white border border-[#E8E5DC] text-[#1E3A8A] text-xs font-semibold rounded-full hover:bg-[#CFE2FA]/30 hover:border-[#CFE2FA] transition shadow-xs cursor-pointer shrink-0"
              >
                Starting salary
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center bg-white border border-[#E8E5DC] rounded-2xl p-1 shadow-xs focus-within:border-[#1E3A8A] transition"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Dreamy a question..."
                className="w-full px-3 py-1.5 text-sm text-[#334155] placeholder-[#64748B] bg-transparent outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isThinking}
                className="w-8 h-8 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center hover:bg-[#1E3A8A]/90 transition shrink-0 disabled:opacity-40 cursor-pointer"
                title="Send message"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              </button>
            </form>

            <p className="text-center text-[10px] text-[#64748B] mt-1.5">
              Dreamy can make mistakes. Double-check with your teacher or counsellor.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
