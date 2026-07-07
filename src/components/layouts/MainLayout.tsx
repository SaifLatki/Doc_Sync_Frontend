'use client';

import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import TopNavbar from '@/components/layout/TopNavbar';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';

export default function MainLayout() {
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <TopNavbar />
      <div className="flex pt-16">
        <Sidebar />
        <motion.main
          initial={false}
          animate={{ marginLeft: sidebarOpen ? 280 : 80 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-1 p-6 overflow-auto"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
