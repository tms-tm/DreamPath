'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NotificationItem {
  id: string;
  category: 'job' | 'fair' | 'uni';
  categoryLabel: string;
  categoryColor: { bg: string; text: string };
  time: string;
  title: string;
  description: string;
  meta: string[];
  unread: boolean;
  ctaText: string;
  ctaPrimary?: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    category: 'job',
    categoryLabel: 'Open Job',
    categoryColor: { bg: '#dcebfe', text: '#2563eb' },
    time: '20m ago',
    title: 'Junior Front-End Intern at Grab Malaysia — Applications open until 15 Dec',
    description:
      'Grab Malaysia is looking for secondary school graduates and pre-university interns interested in web design and front-end work in Petaling Jaya.',
    meta: ['Petaling Jaya', 'Allowance: RM 1,200/mo', 'Hybrid'],
    unread: true,
    ctaText: 'View Alert Details',
    ctaPrimary: true,
  },
  {
    id: '2',
    category: 'fair',
    categoryLabel: 'Career Fair',
    categoryColor: { bg: '#fef3c7', text: '#b45309' },
    time: '2h ago',
    title: 'KL STEM & Tech Career Fair 2026 — Meet 30+ employers at KLCC this Saturday',
    description:
      'Talk with tech mentors, try flight simulators, and learn about Malaysian university pathways in Halls 4 and 5.',
    meta: ['Hosted by Ministry of Higher Education & Malaysia Digital Economy Corporation'],
    unread: true,
    ctaText: 'View Fair Schedule →',
  },
  {
    id: '3',
    category: 'uni',
    categoryLabel: 'University Open Day',
    categoryColor: { bg: '#dcfce7', text: '#15803d' },
    time: '1d ago',
    title: 'Universiti Malaya Open Day — Explore Computer Science & Engineering faculties',
    description:
      'Join guided campus tours, software engineering degree briefings, and counsellor Q&A sessions at Pantai Valley.',
    meta: ['Free entry · Shuttle buses from KL Sentral & Universiti LRT'],
    unread: true,
    ctaText: 'Register for Tour →',
  },
  {
    id: '4',
    category: 'job',
    categoryLabel: 'Open Job',
    categoryColor: { bg: '#dcebfe', text: '#2563eb' },
    time: '3d ago · Read',
    title: 'Part-time Digital Design Assistant at Axiata Digital — Petaling Jaya',
    description:
      'Flexible hours for SPM and STPM students building a portfolio in UI layout and digital graphics.',
    meta: ['Petaling Jaya · Part-Time · Remote Friendly'],
    unread: false,
    ctaText: 'View Details →',
  },
];

export default function NotificationCenterPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'job' | 'fair' | 'uni'>('all');
  const [items, setItems] = useState<NotificationItem[]>(NOTIFICATIONS);

  const handleMarkAllAsRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false, time: item.time.replace(/ · Read/, '') + ' · Read' })));
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return item.unread;
    return item.category === filter;
  });

  const unreadCount = items.filter((i) => i.unread).length;
  const jobCount = items.filter((i) => i.category === 'job').length;
  const fairCount = items.filter((i) => i.category === 'fair').length;
  const uniCount = items.filter((i) => i.category === 'uni').length;

  return (
    <div className="max-w-6xl w-full mx-auto space-y-7 pb-24 animate-fade-in py-2">
      {/* Header Title & Action Controls */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#16212d]">
            Notification Center
          </h1>
          <p className="text-sm text-[#6c7787] mt-1 font-medium">
            Stay updated on job opportunities, fairs, and university open days.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm font-semibold text-[#5b6776] hover:text-[#182230] transition-colors cursor-pointer"
          >
            Mark all as read
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#ded9cd] text-xs font-bold text-[#1e2732] hover:bg-neutral-50 shadow-xs transition-all cursor-pointer">
            <span>In-Tab Preferences</span>
            <span className="material-symbols-outlined text-[16px] text-[#546274]">tune</span>
          </button>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 cursor-pointer ${
            filter === 'all'
              ? 'bg-[#c5dcfa] text-[#1e3a8a]'
              : 'bg-white/70 border border-[#e3dfc8] text-[#475569] hover:bg-white'
          }`}
        >
          All Alerts ({items.length})
        </button>

        <button
          onClick={() => setFilter('unread')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 cursor-pointer ${
            filter === 'unread'
              ? 'bg-[#c5dcfa] text-[#1e3a8a]'
              : 'bg-white/70 border border-[#e3dfc8] text-[#475569] hover:bg-white'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span>
          <span>Unread ( {unreadCount} )</span>
        </button>

        <button
          onClick={() => setFilter('job')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 cursor-pointer ${
            filter === 'job'
              ? 'bg-[#c5dcfa] text-[#1e3a8a]'
              : 'bg-white/70 border border-[#e3dfc8] text-[#475569] hover:bg-white'
          }`}
        >
          Open Jobs ({jobCount})
        </button>

        <button
          onClick={() => setFilter('fair')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 cursor-pointer ${
            filter === 'fair'
              ? 'bg-[#c5dcfa] text-[#1e3a8a]'
              : 'bg-white/70 border border-[#e3dfc8] text-[#475569] hover:bg-white'
          }`}
        >
          Career Fairs ({fairCount})
        </button>

        <button
          onClick={() => setFilter('uni')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 cursor-pointer ${
            filter === 'uni'
              ? 'bg-[#c5dcfa] text-[#1e3a8a]'
              : 'bg-white/70 border border-[#e3dfc8] text-[#475569] hover:bg-white'
          }`}
        >
          University Open Days ({uniCount})
        </button>
      </div>

      {/* Alert Notification Cards Feed */}
      <section className="space-y-4">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-[#e4dfd5] shadow-xs hover:border-[#d1c9bc] transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="space-y-2.5 max-w-3xl">
              {/* Badges line */}
              <div className="flex items-center gap-2.5">
                {item.unread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] shrink-0"></span>
                )}
                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: item.categoryColor.bg,
                    color: item.categoryColor.text,
                  }}
                >
                  {item.categoryLabel}
                </span>
                <span className="text-xs font-medium text-[#7d8898]">{item.time}</span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[#16212d] tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-[#5b6776] leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#526071] font-medium">
                {item.meta.map((m, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-[#a2acba]">·</span>}
                    <span className="flex items-center gap-1">{m}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0 self-start md:self-center">
              {item.ctaPrimary ? (
                <button className="px-5 py-2.5 bg-[#1b2531] text-white text-xs font-bold rounded-xl hover:bg-[#2b384a] transition-all shadow-xs cursor-pointer">
                  {item.ctaText}
                </button>
              ) : (
                <button className="px-4 py-2 border border-[#cbd5e1] text-[#1e293b] text-xs font-bold rounded-xl hover:bg-neutral-50 transition-all flex items-center gap-1.5 cursor-pointer">
                  <span>{item.ctaText}</span>
                </button>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Floating Ask Career Counsellor Widget */}
      <aside className="fixed bottom-6 right-8 z-50">
        <button className="bg-[#bfdbfe] hover:bg-[#a9cefc] text-[#1e3a8a] border border-[#93c5fd] shadow-lg rounded-full px-5 py-3 flex items-center gap-2.5 text-xs font-bold transition-transform hover:scale-105 duration-200 cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">forum</span>
          <span>Ask Career Counsellor</span>
        </button>
      </aside>
    </div>
  );
}
