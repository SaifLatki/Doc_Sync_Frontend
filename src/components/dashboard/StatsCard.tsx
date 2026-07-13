'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  yellow: 'bg-amber-50 text-amber-600 border-amber-100',
  purple: 'bg-violet-50 text-violet-600 border-violet-100',
};

export function StatsCard({ icon: Icon, label, value, color }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200
                 shadow-sm transition-all duration-200 ease-out
                 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300"
    >
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border flex items-center justify-center mb-3 sm:mb-4 ${colorClasses[color]}`}
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{value}</div>
      <div className="text-xs sm:text-sm text-slate-500 mt-1.5 sm:mt-2 font-medium">{label}</div>
    </motion.div>
  );
}