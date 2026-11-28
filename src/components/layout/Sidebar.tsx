'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Home, Layers, Settings, Sparkles, Trophy, User } from 'lucide-react';
import { Card } from '@/components/ui';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS } from '@/types/career';

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useProgressionStore();
  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.nebula;

  const navLinks = [
    { label: 'Home', href: '/', Icon: Home },
    { label: 'Explore Careers', href: '/paths', Icon: Compass },
    { label: 'Practice', href: '/modes', Icon: Layers },
    { label: 'Leaderboard', href: '/leaderboard', Icon: Trophy },
    { label: 'Profile', href: '/profile', Icon: User },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-surface-container-low border-r border-hairline z-50 flex flex-col justify-between p-4 select-none">
      <div className="flex flex-col">
        <Link href="/" className="flex items-center gap-2 px-2 py-2 group">
          <Sparkles className="w-5 h-5 text-on-surface shrink-0" aria-hidden="true" />
          <div className="flex items-center text-xl font-bold tracking-tight text-on-surface">
            <span>DreamPath</span>
          </div>
        </Link>

        <Card padding="sm" className="my-4 p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-sm shrink-0">
              {profile.avatarChar || 'D'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-on-surface truncate">{profile.name}</p>
              <p className="text-[11px] text-on-surface-variant truncate">
                {tier.name} Tier · Lv. {profile.currentLevel}
              </p>
            </div>
          </div>
        </Card>

        <nav className="flex flex-col gap-1" aria-label="Main navigation">
          {navLinks.map(({ label, href, Icon }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-fixed text-on-primary-fixed font-bold shadow-soft'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-hairline">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
            pathname === '/settings'
              ? 'bg-primary-fixed text-on-primary-fixed font-bold shadow-soft'
              : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
          }`}
        >
          <Settings className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
