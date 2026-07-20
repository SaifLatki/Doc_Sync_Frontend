'use client';

import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import TopNavbar from '@/components/layout/TopNavbar';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export default function MainLayout() {
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar />
      <div className="flex pt-16">
        <Sidebar />
        {/*
          Sidebar is a fixed overlay drawer on mobile (slides on top of
          content, no layout shift needed) and a static push-panel rail on
          desktop. Margin only applies at md+ via Tailwind's responsive
          prefix — a real CSS media query, not a JS width check — so it
          stays correct across resizes and on first paint without a flash.
        */}
        <main
          className={cn(
            'flex-1 min-w-0 p-4 sm:p-6 overflow-auto',
            'md:transition-[margin-left] md:duration-300 md:ease-in-out',
            sidebarOpen ? 'md:ml-[280px]' : 'md:ml-[80px]'
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}