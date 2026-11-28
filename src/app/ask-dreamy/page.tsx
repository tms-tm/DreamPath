'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { DreamyMascot } from '@/components/dreamy/DreamyMascot';
import { DreamyBackdrop } from '@/components/dreamy/DreamyBackdrop';
import { CareerMatchesCard } from '@/components/dreamy/cards/CareerMatchesCard';
import { CourseRouteCard } from '@/components/dreamy/cards/CourseRouteCard';
import { SalaryCard } from '@/components/dreamy/cards/SalaryCard';
import { CAREERS, ChatMessage } from '@/types/dreamy';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'dreamy',
    text: "Hi Alex! I'm Dreamy. I can match careers to your skills, show you the routes from SPM to university, and tell you what a job pays when you start. What would you like to explore first?",
  },
];

export default function AskDreamyPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState('thinking...');
  const [mascotMood, setMascotMood] = useState<
    'idle' | 'listening' | 'happy' | 'thinking' | 'surprised'
  >('idle');
  const [currentCareer, setCurrentCareer] = useState<string>('se');

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

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

    // Set mascot thinking
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
    <div className="relative min-h-[92vh] bg-[#FBF9F2] overflow-x-hidden flex flex-col justify-between rounded-3xl select-none animate-fade-in border border-[#E8E5DC]/60">
      {/* Background artwork & particles */}
      <DreamyBackdrop />

      {/* Left 3D Mascot (Dreamy) Floating above summit flag curve on desktop */}
      <div className="fixed left-4 xl:left-8 bottom-28 z-20 hidden lg:flex flex-col items-center pointer-events-auto">
        <DreamyMascot
          mood={mascotMood}
          onTap={() => {
            setMascotMood('happy');
            setTimeout(() => setMascotMood('idle'), 1800);
          }}
        />
      </div>

      {/* Central Chat Column (Exact 800px max width matching Stitch) */}
      <main className="relative z-10 mx-auto w-full max-w-[800px] px-4 pt-6 pb-6 flex-1 flex flex-col justify-between min-h-[85vh]">
        {/* Top Header Bar inside Chat Column */}
        <div>
          <header className="flex items-center justify-between pb-4 border-b border-[#E8E5DC]/80 bg-white/70 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full bg-[#CFE2FA] flex items-center justify-center p-0.5 shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApHTOEso7S_JubzZh0y8FbAV0RbvATwViv1SXSJ8CwfAv0XYEs54GWpXHRDjH84_U0chGcrNGyCM2qdPUpH1-6gWIdNeb1tJeI_1jzMqLJkWRmyLWav4QszZqNHcptOt_p_geJZsS0AsvbQjU9epb9Y2ncnCIUSB2EF3UYKT40h18Zwc5tdY479xjk_AX9Kcgu62-gsc2bMKnNTZkSZxT98T3quOTuq7jY2JAzpLb1GchvYqKgtSx"
                  alt="Dreamy"
                  className="w-8 h-8 object-contain"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h1 className="text-base font-bold text-[#1E3A8A] leading-tight">Dreamy</h1>
                <p className="text-xs text-[#64748B]">Career counsellor • online</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* '+' New chat button */}
              <button
                type="button"
                onClick={handleResetChat}
                className="w-10 h-10 rounded-full bg-white border border-[#E8E5DC] flex items-center justify-center text-[#1E3A8A] hover:bg-[#F8FAFC] transition shadow-sm cursor-pointer"
                title="New Chat"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              {/* 'X' Close button -> back to Home */}
              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-white border border-[#E8E5DC] flex items-center justify-center text-[#1E3A8A] hover:bg-[#F8FAFC] transition shadow-sm cursor-pointer"
                title="Close and return to Home"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </Link>
            </div>
          </header>

          {/* Message History Thread */}
          <div className="mt-6 space-y-6 pb-8">
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end animate-fade-in">
                    <div className="max-w-[85%] bg-[#CFE2FA] text-[#1E3A8A] font-medium px-4 py-3 rounded-2xl rounded-tr-[4px] text-base shadow-sm">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              // Dreamy message
              return (
                <div key={msg.id} className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#CFE2FA] flex items-center justify-center p-0.5 shadow-xs">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApHTOEso7S_JubzZh0y8FbAV0RbvATwViv1SXSJ8CwfAv0XYEs54GWpXHRDjH84_U0chGcrNGyCM2qdPUpH1-6gWIdNeb1tJeI_1jzMqLJkWRmyLWav4QszZqNHcptOt_p_geJZsS0AsvbQjU9epb9Y2ncnCIUSB2EF3UYKT40h18Zwc5tdY479xjk_AX9Kcgu62-gsc2bMKnNTZkSZxT98T3quOTuq7jY2JAzpLb1GchvYqKgtSx"
                        alt="Dreamy"
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <span className="text-sm font-bold text-[#1E3A8A]">Dreamy</span>
                  </div>

                  {msg.text && (
                    <div className="text-[#334155] text-base leading-relaxed pl-8">
                      {msg.text}
                    </div>
                  )}

                  {/* Render Structured Cards if attached */}
                  {msg.cardType === 'matches' && (
                    <div className="pl-0 sm:pl-8 pt-1">
                      <CareerMatchesCard
                        onSelectRoute={handleSelectRouteFromMatches}
                      />
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

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="space-y-1.5 animate-pulse pl-8 flex items-center gap-2 text-sm text-[#1E3A8A] font-semibold">
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Dreamy is {thinkingLabel}</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>
        </div>

        {/* Bottom Input Area and Quick Chips (Matching Stitch exactly) */}
        <div className="sticky bottom-0 pt-2 pb-1 bg-gradient-to-t from-[#FBF9F2] via-[#FBF9F2]/95 to-transparent z-20">
          {/* Quick-reply Suggestion Chips (3 equal columns on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            <button
              type="button"
              onClick={() => handleSendMessage('Which careers match my skills?')}
              className="w-full text-center py-2.5 px-3 bg-white border border-[#E8E5DC] text-[#1E3A8A] text-xs sm:text-sm font-semibold rounded-full hover:bg-[#CFE2FA]/30 hover:border-[#CFE2FA] transition shadow-xs cursor-pointer"
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
              className="w-full text-center py-2.5 px-3 bg-white border border-[#E8E5DC] text-[#1E3A8A] text-xs sm:text-sm font-semibold rounded-full hover:bg-[#CFE2FA]/30 hover:border-[#CFE2FA] transition shadow-xs cursor-pointer"
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
              className="w-full text-center py-2.5 px-3 bg-white border border-[#E8E5DC] text-[#1E3A8A] text-xs sm:text-sm font-semibold rounded-full hover:bg-[#CFE2FA]/30 hover:border-[#CFE2FA] transition shadow-xs cursor-pointer"
            >
              Starting salary
            </button>
          </div>

          {/* Input Box with 40px Navy Square Send Button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center bg-white border border-[#E8E5DC] rounded-2xl p-1.5 shadow-sm focus-within:border-[#1E3A8A] transition"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Dreamy a question..."
              className="w-full px-4 py-2 text-sm sm:text-base text-[#334155] placeholder-[#64748B] bg-transparent outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isThinking}
              className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center hover:bg-[#1E3A8A]/90 transition shrink-0 disabled:opacity-40 cursor-pointer"
              title="Send message"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
            </button>
          </form>

          {/* Disclaimer Note */}
          <p className="text-center text-[11px] text-[#64748B] mt-2.5 pb-1">
            Dreamy can make mistakes. Double-check big decisions with your teacher or school counsellor.
          </p>
        </div>
      </main>
    </div>
  );
}
