'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { AskDreamyOverlay } from '@/components/dreamy/AskDreamyOverlay';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAskDreamy = pathname === '/ask-dreamy';

  return (
    <div className="min-h-screen flex bg-surface text-on-surface">
      {/* Fixed Left Sidebar on Desktop (240px) */}
      <div className="hidden md:block w-[240px] shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-0 pb-20 md:pb-8">
        {!isAskDreamy && <Header />}
        <main className={`flex-1 w-full mx-auto ${isAskDreamy ? 'p-2 sm:p-4' : 'max-w-7xl p-4 sm:p-6 lg:p-8'}`}>
          {children}
        </main>
      </div>

      {/* Global Floating Mascot & Pop-Up Chatbox */}
      {!isAskDreamy && <AskDreamyOverlay />}

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}

