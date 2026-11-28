'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS } from '@/types/career';

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useProgressionStore();
  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.aurora;

  const navLinks = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Explore Careers', href: '/paths', icon: 'explore' },
    { label: 'Practice', href: '/modes', icon: 'style' },
    { label: 'Leaderboard', href: '/leaderboard', icon: 'leaderboard' },
    { label: 'Profile', href: '/profile', icon: 'person' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-surface-container-low border-r border-outline-variant/30 z-50 flex flex-col justify-between p-4 select-none">
      <div className="flex flex-col">
        {/* Brand Logo & Icon matching Practice Modes & Profile from Stitch */}
        <Link href="/" className="flex items-center gap-2 px-2 py-2 group">
          <span className="material-symbols-outlined text-on-surface text-[24px]">auto_awesome</span>
          <div className="flex items-center text-xl font-bold tracking-tight text-on-surface">
            <span>DreamPath</span>
          </div>
        </Link>

        {/* User Mini Profile Box */}
        <div className="bg-surface-container-lowest rounded-2xl p-3 my-4 flex flex-col gap-2 border border-outline-variant/30 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-sm shrink-0">
              {profile.avatarChar || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-on-surface truncate">{profile.name}</p>
              <p className="text-[11px] text-on-surface-variant truncate">
                {tier.name} Tier · Lv. {profile.currentLevel}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-fixed text-on-primary-fixed font-bold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Settings at bottom */}
      <div className="pt-4 border-t border-outline-variant/20">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
            pathname === '/settings'
              ? 'bg-primary-fixed text-on-primary-fixed font-bold'
              : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
