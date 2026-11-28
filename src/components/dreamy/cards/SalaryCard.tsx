'use client';

import React from 'react';
import { CAREERS, CareerData } from '@/types/dreamy';

interface SalaryCardProps {
  careerKey?: string;
  onCompareCareer?: (careerKey: string) => void;
}

export function SalaryCard({
  careerKey = 'se',
  onCompareCareer,
}: SalaryCardProps) {
  const career = CAREERS[careerKey] || CAREERS.se;
  const s = career.salary;
  const MAX = 15000;

  const rm = ([a, b]: [number, number]) =>
    `RM ${a.toLocaleString('en-MY')} - ${b.toLocaleString('en-MY')}`;
  const rmShort = ([a, b]: [number, number]) =>
    `RM ${a / 1000}k - ${b / 1000}k`;

  const ranges: Array<{
    label: string;
    years: string;
    range: [number, number];
    barColor: string;
    widthPct: number;
  }> = [
    {
      label: 'Entry',
      years: '0–2 years',
      range: s.entry,
      barColor: '#9DB4D6',
      widthPct: (s.entry[1] / MAX) * 100,
    },
    {
      label: 'Mid-level',
      years: '3–5 years',
      range: s.mid,
      barColor: '#5B7FB8',
      widthPct: (s.mid[1] / MAX) * 100,
    },
    {
      label: 'Senior',
      years: '6+ years',
      range: s.senior,
      barColor: '#1E3A8A',
      widthPct: (s.senior[1] / MAX) * 100,
    },
  ];

  const otherCareers = Object.keys(CAREERS).filter((k) => k !== careerKey);

  return (
    <div className="bg-white border border-[#E8E5DC] rounded-2xl p-5 shadow-sm space-y-5 max-w-full">
      {/* Card Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#E8E5DC]">
        <h3 className="text-base font-bold text-[#1E3A8A]">
          Starting pay: {career.name}
        </h3>
        <span className="bg-[#CFE2FA] text-[#1E3A8A] text-xs font-semibold px-3 py-1 rounded-full">
          Fresh graduate
        </span>
      </div>

      {/* Big Bold Navy Salary Showcase */}
      <div>
        <div className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] tracking-tight">
          {rm(s.entry)}
        </div>
        <p className="text-sm text-[#64748B] mt-0.5">per month, base salary</p>
      </div>

      {/* Three Range Rows on Shared RM 0 - RM 15k Scale */}
      <div className="space-y-4 pt-1">
        {ranges.map((row) => (
          <div key={row.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-[#1E3A8A]">
                {row.label}{' '}
                <span className="font-normal text-[#64748B] text-xs ml-1">
                  ({row.years})
                </span>
              </span>
              <span className="font-bold text-[#1E3A8A]">{rmShort(row.range)}</span>
            </div>
            <div className="w-full h-3 bg-[#EEF2F7] rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  backgroundColor: row.barColor,
                  width: `${row.widthPct}%`,
                }}
              />
            </div>
          </div>
        ))}

        {/* Axis Scale */}
        <div className="flex justify-between text-[11px] text-[#64748B] font-medium pt-1 px-0.5">
          <span>RM 0</span>
          <span>RM 5k</span>
          <span>RM 10k</span>
          <span>RM 15k</span>
        </div>
      </div>

      {/* Compare with Other Careers */}
      <div className="pt-2 border-t border-[#E8E5DC]">
        <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
          Compare with other roles
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {otherCareers.map((k) => {
            const oc: CareerData = CAREERS[k];
            return (
              <button
                key={k}
                type="button"
                onClick={() => onCompareCareer && onCompareCareer(k)}
                className="text-left p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E8E5DC] hover:bg-[#CFE2FA]/30 hover:border-[#CFE2FA] transition cursor-pointer flex items-center justify-between"
              >
                <div>
                  <p className="text-xs text-[#64748B]">{oc.name}, starting</p>
                  <p className="text-xs sm:text-sm font-bold text-[#1E3A8A]">
                    {rm(oc.salary.entry)}
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#1E3A8A] text-[16px]">
                  arrow_forward
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Disclaimer Note */}
      <p className="text-xs text-[#64748B] flex items-center gap-1.5 pt-1">
        <span className="material-symbols-outlined text-[15px]">info</span>
        <span>Estimates for the Klang Valley. Pay varies by company, city and your skills.</span>
      </p>
    </div>
  );
}
