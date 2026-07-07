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
  blue: 'bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600',
  green: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-emerald-600',
  yellow: 'bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-600',
  purple: 'bg-gradient-to-br from-violet-50 to-violet-100/50 text-violet-600',
};

export function StatsCard({ icon: Icon, label, value, color }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:border-slate-300"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500 mt-2 font-medium">{label}</div>
    </motion.div>
  );
}
