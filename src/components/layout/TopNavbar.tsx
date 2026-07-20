'use client';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Plus,
  FileText,
  LogOut,
  User,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export default function TopNavbar() {
  const { user, notifications, setSidebarOpen, sidebarOpen, createDocument, setCurrentDocument } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNewDocument = () => {
    const newDoc = createDocument();
    setCurrentDocument(newDoc);
    navigate(`/editor/${newDoc.id}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-3 sm:px-4 shadow-sm">
      <div className="flex items-center justify-between h-full gap-2">
        {/* Mobile search takes over the bar when active */}
        {mobileSearchOpen ? (
          <div className="flex items-center gap-2 flex-1 md:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                autoFocus
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200 text-slate-700 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Close search"
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
              >
                <Menu className="h-5 w-5 text-slate-600" />
              </button>

              <Link to="/dashboard" className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg hidden sm:inline text-slate-900 truncate">
                  DocSync
                </span>
              </Link>
            </div>

            {/* Desktop search */}
            <motion.div
              initial={false}
              animate={{ width: searchOpen ? '400px' : '300px' }}
              className="hidden md:block relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                className="pl-10 bg-white border-slate-200 text-slate-700 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-200"
              />
              {searchQuery && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-slate-200 p-2"
                  >
                    <div className="text-sm text-slate-500 p-2">
                      Search results for "{searchQuery}"
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>

            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Mobile search trigger */}
              <button
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Open search"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
              >
                <Search className="h-5 w-5 text-slate-600" />
              </button>

              <Button
                onClick={handleNewDocument}
                className="bg-indigo-600 hover:bg-indigo-700 text-white hidden sm:flex font-semibold shadow-sm transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>

              {/* New doc, icon-only on very small screens */}
              <button
                onClick={handleNewDocument}
                aria-label="New document"
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors sm:hidden"
              >
                <Plus className="h-5 w-5" />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors group">
                    <Bell className="h-5 w-5 text-slate-600 group-hover:text-slate-900" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs font-bold">
                        {unreadCount}
                      </Badge>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 sm:w-80">
                  <DropdownMenuLabel className="font-semibold text-slate-900">
                    Notifications
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-500">No notifications</div>
                  ) : (
                    notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                        <div
                          className={`text-sm ${
                            notification.read ? 'text-slate-500' : 'text-slate-900 font-semibold'
                          }`}
                        >
                          {notification.message}
                        </div>
                        <div className="text-xs text-slate-400">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:bg-slate-100 rounded-lg p-1.5 transition-colors">
                    <Avatar className="h-8 w-8 ring-1 ring-slate-200">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-slate-500 hidden sm:inline" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate">{user?.name}</div>
                      <div className="text-xs text-slate-500 font-normal truncate">{user?.email}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/login')} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}