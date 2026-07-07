'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';

interface CollaboratorCursorProps {
  user: User;
  position: { top: number; left: number };
}

export function CollaboratorCursor({ user, position }: CollaboratorCursorProps) {
  const colors = ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c'];
  const color = colors[parseInt(user.id) % colors.length] || '#2563eb';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute pointer-events-none"
      style={{ top: position.top, left: position.left }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="transform -rotate-90"
      >
        <path
          d="M5.65376 12.4563L10.6875 16.6873L8.53127 3.51042L5.65376 12.4563Z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
      <div
        className="absolute top-5 left-5 px-2 py-0.5 rounded text-xs font-medium text-white whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {user.name}
      </div>
    </motion.div>
  );
}
