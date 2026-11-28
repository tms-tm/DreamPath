'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const pathname = usePathname();

  const links = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Careers', href: '/paths', icon: 'explore' },
    { label: 'Practice', href: '/modes', icon: 'school' },
    { label: 'Leaderboard', href: '/leaderboard', icon: 'leaderboard' },
    { label: 'Profile', href: '/profile', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-low/95 backdrop-blur-md border-t border-outline-variant/30 flex items-center justify-around z-50 px-2">
      {links.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-colors ${
              isActive
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
