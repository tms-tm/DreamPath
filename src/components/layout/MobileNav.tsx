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
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-low/95 backdrop-blur-md border-t border-hairline flex items-center justify-around z-50 px-2"
    >
      {links.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] min-w-[44px] rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              isActive
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
