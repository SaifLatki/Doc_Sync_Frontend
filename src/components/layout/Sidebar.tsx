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
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

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

  const navLinkClasses = (active: boolean) =>
    cn(
      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 relative group',
      active
        ? 'bg-indigo-50 text-indigo-700'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    );

  const navIconClasses = (active: boolean) =>
    cn('h-5 w-5 shrink-0', active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600');

  return (
    <>
      {/* Backdrop — mobile drawer only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* MOBILE: slide-over drawer, full nav always expanded */}
      <motion.aside
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="fixed left-0 top-16 bottom-0 w-72 bg-white border-r border-slate-200 z-40 flex flex-col shadow-lg md:hidden"
      >
        <SidebarContent
          sidebarOpen
          items={sidebarItems}
          isActive={isActive}
          location={location}
          navLinkClasses={navLinkClasses}
          navIconClasses={navIconClasses}
          onNewDocument={handleNewDocument}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
      </motion.aside>

      {/* DESKTOP: static collapsible icon-rail */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex fixed left-0 top-16 bottom-0 bg-white border-r border-slate-200 z-20 flex-col shadow-sm"
      >
        <SidebarContent
          sidebarOpen={sidebarOpen}
          items={sidebarItems}
          isActive={isActive}
          location={location}
          navLinkClasses={navLinkClasses}
          navIconClasses={navIconClasses}
          onNewDocument={handleNewDocument}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="absolute -right-3 top-6 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </motion.aside>
    </>
  );
}

// Shared nav body rendered by both the mobile drawer and desktop rail, so
// the two never drift out of sync as items are added or changed.
function SidebarContent({
  sidebarOpen,
  items,
  isActive,
  location,
  navLinkClasses,
  navIconClasses,
  onNewDocument,
  hoveredItem,
  setHoveredItem,
}: {
  sidebarOpen: boolean;
  items: typeof sidebarItems;
  isActive: (path: string) => boolean;
  location: ReturnType<typeof useLocation>;
  navLinkClasses: (active: boolean) => string;
  navIconClasses: (active: boolean) => string;
  onNewDocument: () => void;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
}) {
  return (
    <>
      <div className="p-3">
        <Button
          onClick={onNewDocument}
          className={cn(
            'bg-indigo-600 hover:bg-indigo-700 text-white w-full font-semibold transition-colors',
            sidebarOpen ? 'justify-start gap-2' : 'justify-center'
          )}
        >
          <Plus className="h-5 w-5" />
          {sidebarOpen && <span>New</span>}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <nav className="space-y-1 py-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={navLinkClasses(active)}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Icon className={navIconClasses(active)} />
                {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                {!sidebarOpen && hoveredItem === item.path && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-lg font-medium"
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

      <div className="border-t border-slate-200 p-2">
        <Link to="/settings" className={navLinkClasses(location.pathname === '/settings')}>
          <Settings className={navIconClasses(location.pathname === '/settings')} />
          {sidebarOpen && <span className="font-medium text-sm">Settings</span>}
        </Link>
      </div>
    </>
  );
}