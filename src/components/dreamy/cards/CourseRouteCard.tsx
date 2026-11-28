'use client';

import React, { useState } from 'react';
import { CAREERS, UNIS, SPM_REQUIREMENTS } from '@/types/dreamy';

interface CourseRouteCardProps {
  careerKey?: string;
  initialUni?: string;
}

export function CourseRouteCard({
  careerKey = 'se',
  initialUni = 'um',
}: CourseRouteCardProps) {
  const [selectedUni, setSelectedUni] = useState(initialUni);
  const career = CAREERS[careerKey] || CAREERS.se;
  const uni = UNIS[selectedUni] || UNIS.um;
  const route = career.routes[selectedUni] || career.routes.um;
  const requirements = SPM_REQUIREMENTS[route.spm] || SPM_REQUIREMENTS.sciPublic;

  return (
    <div className="bg-white border border-[#E8E5DC] rounded-2xl p-5 shadow-sm space-y-4 max-w-full">
      {/* Card Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#E8E5DC]">
        <h3 className="text-base font-bold text-[#1E3A8A]">
          How to become a {career.name}
        </h3>
        <span className="bg-[#CFE2FA] text-[#1E3A8A] text-xs font-semibold px-3 py-1 rounded-full">
          {uni.type}
        </span>
      </div>

      {/* 4 Equal Tabs: UM, UiTM, Sunway, MMU */}
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(UNIS).map(([key, u]) => {
          const isSelected = selectedUni === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedUni(key)}
              className={`py-2 text-center text-xs sm:text-sm rounded-xl transition-all cursor-pointer font-bold ${
                isSelected
                  ? 'bg-[#CFE2FA] text-[#1E3A8A] border border-[#CFE2FA] shadow-xs'
                  : 'bg-white text-[#334155] border border-[#E8E5DC] hover:bg-[#F8FAFC]'
              }`}
            >
              {u.short}
            </button>
          );
        })}
      </div>

      {/* University Note Line */}
      <p className="text-xs sm:text-sm text-[#1E3A8A] font-semibold bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E8E5DC]/60 flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px] text-[#1E3A8A]">school</span>
        <span>
          {uni.name} — {uni.apply}
        </span>
      </p>

      {/* Requirements Section in ONE column with navy ticks */}
      <div className="space-y-2 pt-1">
        <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
          From SPM, you&apos;ll usually need
        </h4>
        <div className="space-y-1.5 text-xs sm:text-sm text-[#334155]">
          {requirements.map((req, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[16px] text-[#1E3A8A] font-bold shrink-0">
                check
              </span>
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pathway Steps (Pre-U and Degree) */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
          Study Pathway
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Step 1: Pre-U */}
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E8E5DC] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wide">
                Step 1: Pre-U / Foundation
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#1E3A8A] mt-1">
                {route.preU[0]}
              </p>
            </div>
            <span className="text-xs text-[#64748B] mt-2 font-medium">
              Duration: {route.preU[1]}
            </span>
          </div>

          {/* Step 2: Degree */}
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E8E5DC] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wide">
                Step 2: Degree
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#1E3A8A] mt-1">
                {route.degree[0]}
              </p>
            </div>
            <span className="text-xs text-[#64748B] mt-2 font-medium">
              Duration: {route.degree[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Total Time Line */}
      <div className="flex items-center justify-between text-xs sm:text-sm p-3 rounded-xl bg-[#CFE2FA]/50 border border-[#CFE2FA] text-[#1E3A8A]">
        <span className="font-semibold">Total time to qualification</span>
        <strong className="font-extrabold">{route.total}</strong>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-[#64748B] pt-1 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[15px]">info</span>
        <span>Requirements change every intake. Check the university&apos;s website before you apply.</span>
      </p>
    </div>
  );
}
