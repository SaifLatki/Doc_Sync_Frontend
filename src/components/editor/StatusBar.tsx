'use client';

import { Wifi, WifiOff, RefreshCw, Save, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface StatusBarProps {
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
  isSaved: boolean;
  lastSaved: Date;
  wordCount: number;
  characterCount: number;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export function StatusBar({
  connectionStatus,
  isSaved,
  lastSaved,
  wordCount,
  characterCount,
  zoom,
  onZoomChange,
}: StatusBarProps) {
  const connectionConfig = {
    connected: { icon: Wifi, color: 'text-emerald-600', label: 'Connected' },
    disconnected: { icon: WifiOff, color: 'text-red-600', label: 'Disconnected' },
    reconnecting: { icon: RefreshCw, color: 'text-amber-600', label: 'Reconnecting...' },
  };

  const { icon: ConnectionIcon, color, label } = connectionConfig[connectionStatus];

  return (
    <div className="bg-white border-t border-slate-200 px-2 sm:px-4 py-2 flex items-center justify-between text-xs text-slate-500 gap-2 overflow-hidden">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        {/* Connection Status */}
        <div className="flex items-center gap-1.5 shrink-0">
          <ConnectionIcon
            className={cn('h-3.5 w-3.5', color, connectionStatus === 'reconnecting' && 'animate-spin')}
          />
          <span className={cn(color, 'hidden xs:inline')}>{label}</span>
        </div>

        <Separator orientation="vertical" className="h-4 shrink-0" />

        {/* Save Status */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Save className={cn('h-3.5 w-3.5', isSaved ? 'text-emerald-600' : 'text-slate-400')} />
          <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Saving...'}</span>
        </div>

        <Separator orientation="vertical" className="h-4 shrink-0 hidden md:block" />

        {/* Last Saved — hidden below md, least critical info when space is tight */}
        <span className="hidden md:inline whitespace-nowrap">
          Last saved: {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Word Count */}
        <div className="hidden sm:block whitespace-nowrap">
          {wordCount.toLocaleString()} words
        </div>

        <Separator orientation="vertical" className="h-4 hidden sm:block" />

        {/* Character Count — hidden below lg, word count is the more useful figure at a glance */}
        <div className="hidden lg:block whitespace-nowrap">
          {characterCount.toLocaleString()} characters
        </div>

        <Separator orientation="vertical" className="h-4 hidden lg:block" />

        {/* Page Info */}
        <div className="hidden md:flex items-center gap-1 whitespace-nowrap">
          Page 1 of 1
        </div>

        <Separator orientation="vertical" className="h-4 hidden sm:block" />

        {/* Zoom */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            onClick={() => onZoomChange(Math.max(50, zoom - 10))}
            aria-label="Zoom out"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Select
            value={zoom.toString()}
            onValueChange={(value) => onZoomChange(parseInt(value))}
          >
            <SelectTrigger className="w-14 sm:w-16 h-6 text-xs border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50">50%</SelectItem>
              <SelectItem value="75">75%</SelectItem>
              <SelectItem value="100">100%</SelectItem>
              <SelectItem value="125">125%</SelectItem>
              <SelectItem value="150">150%</SelectItem>
              <SelectItem value="200">200%</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            onClick={() => onZoomChange(Math.min(200, zoom + 10))}
            aria-label="Zoom in"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}