'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  History,
  Activity,
  X,
  Plus,
  Check,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Comment, Version, Activity as ActivityType } from '@/types';
import { cn } from '@/lib/utils';

interface RightSidebarProps {
  isOpen: boolean;
  activeTab: 'comments' | 'history' | 'activity';
  onTabChange: (tab: 'comments' | 'history' | 'activity') => void;
  onClose: () => void;
  comments: Comment[];
  versions: Version[];
  activities: ActivityType[];
}

export function RightSidebar({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
  comments,
  versions,
  activities,
}: RightSidebarProps) {
  const [newComment, setNewComment] = useState('');

  return (
    <>
      {/* Backdrop — mobile only. On md+ the panel pushes the layout instead of overlaying it. */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <motion.div
        animate={{ width: isOpen ? 320 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'bg-white border-l border-slate-200 flex flex-col overflow-hidden',
          'fixed inset-y-0 right-0 z-50 w-[85vw] max-w-xs transition-transform duration-200',
          'md:static md:z-auto md:max-w-none md:translate-x-0',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => onTabChange('comments')}
              className={cn(
                'px-2.5 sm:px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                activeTab === 'comments'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <MessageSquare className="h-4 w-4 inline-block sm:mr-1" />
              <span className="hidden sm:inline">Comments</span>
            </button>
            <button
              onClick={() => onTabChange('history')}
              className={cn(
                'px-2.5 sm:px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                activeTab === 'history'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <History className="h-4 w-4 inline-block sm:mr-1" />
              <span className="hidden sm:inline">History</span>
            </button>
            <button
              onClick={() => onTabChange('activity')}
              className={cn(
                'px-2.5 sm:px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                activeTab === 'activity'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <Activity className="h-4 w-4 inline-block sm:mr-1" />
              <span className="hidden sm:inline">Activity</span>
            </button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          {activeTab === 'comments' && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 border-slate-200 focus-visible:ring-indigo-500"
                />
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {comments.length === 0 ? (
                <div className="text-center py-10">
                  <MessageSquare className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">No comments yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={cn(
                        'p-4 rounded-lg border',
                        comment.resolved ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarImage src={comment.author.avatar} />
                          <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                            {comment.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium text-sm text-slate-900 truncate">
                              {comment.author.name}
                            </span>
                            {comment.resolved && (
                              <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 shrink-0">
                                <Check className="h-3 w-3 mr-1" />
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mt-1 break-words">{comment.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-slate-400">
                              {new Date(comment.createdAt).toLocaleTimeString()}
                            </span>
                            {!comment.resolved && (
                              <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                                Reply
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="p-4">
              {versions.length === 0 ? (
                <div className="text-center py-10">
                  <History className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">No earlier versions</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {versions.map((version) => (
                    <div
                      key={version.id}
                      className="p-4 rounded-lg border border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/40 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarImage src={version.author.avatar} />
                          <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                            {version.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium text-sm text-slate-900 truncate">
                              {version.author.name}
                            </span>
                            <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                          </div>
                          {version.description && (
                            <p className="text-sm text-slate-600 mt-1 break-words">{version.description}</p>
                          )}
                          <span className="text-xs text-slate-400 mt-2 block">
                            {new Date(version.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="p-4">
              {activities.length === 0 ? (
                <div className="text-center py-10">
                  <Activity className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">No activity yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                          {activity.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">
                          <span className="font-medium">{activity.user.name}</span>
                          {' '}
                          <span className="text-slate-600">
                            {activity.action === 'created' && 'created the document'}
                            {activity.action === 'edited' && 'made edits'}
                            {activity.action === 'shared' && 'shared the document'}
                            {activity.action === 'commented' && 'added a comment'}
                            {activity.action === 'renamed' && 'renamed the document'}
                          </span>
                        </p>
                        {activity.details && (
                          <p className="text-xs text-slate-500 mt-1 break-words">{activity.details}</p>
                        )}
                        <span className="text-xs text-slate-400 mt-2 block">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </motion.div>
    </>
  );
}