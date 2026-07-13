'use client';

import { motion } from 'framer-motion';
import { User } from '@/types';

interface CollaboratorCursorProps {
  user: User;
  position: { top: number; left: number };
}

const CURSOR_COLORS = ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c'];

export function CollaboratorCursor({ user, position }: CollaboratorCursorProps) {
  const color = CURSOR_COLORS[parseInt(user.id) % CURSOR_COLORS.length] || CURSOR_COLORS[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute pointer-events-none z-50"
      style={{ top: position.top, left: position.left }}
    >
      {/* Pointer, standard cursor-arrow shape rather than a rotated star sliver */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="drop-shadow-sm"
      >
        <path
          d="M4 2.5L4 16.5L8.2 12.8L10.6 17.8L13 16.6L10.6 11.6L16 11.2L4 2.5Z"
          fill={color}
          stroke="white"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>

      {/* Name label */}
      <div
        className="absolute top-4 left-4 px-2 py-0.5 rounded-full text-[11px] font-medium text-white whitespace-nowrap shadow-sm ring-1 ring-white/20"
        style={{ backgroundColor: color }}
      >
        {user.name}
      </div>
    </motion.div>
  );
}