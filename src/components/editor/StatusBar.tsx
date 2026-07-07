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
    connected: { icon: Wifi, color: 'text-green-600', label: 'Connected' },
    disconnected: { icon: WifiOff, color: 'text-red-600', label: 'Disconnected' },
    reconnecting: { icon: RefreshCw, color: 'text-yellow-600', label: 'Reconnecting...' },
  };

  const { icon: ConnectionIcon, color, label } = connectionConfig[connectionStatus];

  return (
    <div className="bg-gray-100 border-t border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className="flex items-center gap-1.5">
          <ConnectionIcon className={cn('h-3.5 w-3.5', color)} />
          <span className={color}>{label}</span>
        </div>

        <Separator orientation="vertical" className="h-4" />

        {/* Save Status */}
        <div className="flex items-center gap-1.5">
          <Save className={cn('h-3.5 w-3.5', isSaved ? 'text-green-600' : 'text-gray-400')} />
          <span>{isSaved ? 'Saved' : 'Saving...'}</span>
        </div>

        <Separator orientation="vertical" className="h-4" />

        {/* Last Saved */}
        <span>
          Last saved: {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Word Count */}
        <div>
          {wordCount.toLocaleString()} words
        </div>

        <Separator orientation="vertical" className="h-4" />

        {/* Character Count */}
        <div>
          {characterCount.toLocaleString()} characters
        </div>

        <Separator orientation="vertical" className="h-4" />

        {/* Page Info */}
        <div className="flex items-center gap-1">
          Page 1 of 1
        </div>

        <Separator orientation="vertical" className="h-4" />

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onZoomChange(Math.max(50, zoom - 10))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Select
            value={zoom.toString()}
            onValueChange={(value) => onZoomChange(parseInt(value))}
          >
            <SelectTrigger className="w-16 h-6 text-xs">
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
            className="h-6 w-6 p-0"
            onClick={() => onZoomChange(Math.min(200, zoom + 10))}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
