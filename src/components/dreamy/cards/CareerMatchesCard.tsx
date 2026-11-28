'use client';

import React from 'react';
import { CAREERS, CareerData } from '@/types/dreamy';

interface CareerMatchesCardProps {
  onSelectRoute?: (careerId: string) => void;
}

export function CareerMatchesCard({ onSelectRoute }: CareerMatchesCardProps) {
  const matchKeys = ['se', 'da', 'ux'];

  return (
    <div className="bg-white border border-[#E8E5DC] rounded-2xl p-5 shadow-sm space-y-4 max-w-full">
      {/* Card Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#E8E5DC]">
        <h3 className="text-base font-bold text-[#1E3A8A]">Your top 3 matches</h3>
        <span className="bg-[#CFE2FA] text-[#1E3A8A] text-xs font-semibold px-3 py-1 rounded-full">
          Based on your Practice skills
        </span>
      </div>

      {/* 3 Match Rows */}
      <div className="divide-y divide-[#E8E5DC]">
        {matchKeys.map((key, i) => {
          const c: CareerData = CAREERS[key];
          const rank = i + 1;
          return (
            <div
              key={key}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-1 last:pb-1"
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                {/* Rank indicator */}
                <span
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    rank === 1
                      ? 'bg-[#1E3A8A] text-white'
                      : 'bg-[#CFE2FA] text-[#1E3A8A]'
                  }`}
                >
                  {rank}
                </span>

                {/* 36px sky-blue icon tile */}
                <div className="w-9 h-9 rounded-xl bg-[#CFE2FA] flex items-center justify-center text-[#1E3A8A] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-bold text-[#1E3A8A]">{c.name}</h4>
                  <p className="text-sm text-[#334155] mt-0.5 leading-relaxed">{c.reason}</p>
                </div>
              </div>

              {/* Meter & Link */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center flex-shrink-0 gap-2">
                <div className="flex items-center gap-1.5">
                  {/* 5 dots */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`w-2.5 h-2.5 rounded-full ${
                          dotIdx < c.matched ? 'bg-[#1E3A8A]' : 'bg-[#E8E5DC]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#1E3A8A] ml-1">
                    {c.matched} of 5 skills
                  </span>
                </div>

                {onSelectRoute && (
                  <button
                    type="button"
                    onClick={() => onSelectRoute(c.id)}
                    className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center gap-1 cursor-pointer pt-0.5"
                  >
                    <span>See route</span>
                    <span className="text-[14px]">→</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
