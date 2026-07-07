'use client';

import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Share2,
  Clock,
  Trash2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Star,
  Home,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const sidebarItems = [
  { icon: FileText, label: 'My Documents', path: '/dashboard', filter: 'owned' },
  { icon: Share2, label: 'Shared Documents', path: '/dashboard?filter=shared', filter: 'shared' },
  { icon: Star, label: 'Favorites', path: '/dashboard?filter=favorites', filter: 'favorites' },
  { icon: Clock, label: 'Recent', path: '/dashboard?filter=recent', filter: 'recent' },
  { icon: Trash2, label: 'Trash', path: '/dashboard?filter=trash', filter: 'trash' },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, documents, createDocument, setCurrentDocument } = useApp();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNewDocument = () => {
    const newDoc = createDocument();
    setCurrentDocument(newDoc);
    window.location.href = `/editor/${newDoc.id}`;
  };

  const isActive = (path: string) => location.pathname + location.search === path;

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-16 bottom-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 z-40 flex flex-col shadow-lg"
    >
      <div className="p-3">
        <Button
          onClick={handleNewDocument}
          className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full font-semibold transition-all duration-200 ${sidebarOpen ? 'justify-start gap-2' : 'justify-center'} shadow-md hover:shadow-lg`}
        >
          <Plus className="h-5 w-5" />
          {sidebarOpen && <span>New</span>}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <nav className="space-y-1.5 py-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group ${
                  active
                    ? 'bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                {sidebarOpen && (
                  <span className="font-medium text-sm tracking-wide">{item.label}</span>
                )}
                {!sidebarOpen && hoveredItem === item.path && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-full ml-3 px-3 py-2 bg-slate-700 text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-lg font-medium"
                    >
                      {item.label}
                    </motion.div>
                  </AnimatePresence>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-slate-700/50 p-2">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
            location.pathname === '/settings'
              ? 'bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Settings className={`h-5 w-5 transition-transform duration-200 ${location.pathname === '/settings' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
          {sidebarOpen && <span className="font-medium text-sm tracking-wide">Settings</span>}
        </Link>
      </div>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-600 shadow-md transition-all duration-200"
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
    </motion.aside>
  );
}
