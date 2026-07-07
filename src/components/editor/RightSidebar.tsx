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
  MoreHorizontal,
  Clock,
  User,
  Reply,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: isOpen ? 320 : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white border-l border-gray-200 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onTabChange('comments')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
              activeTab === 'comments'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <MessageSquare className="h-4 w-4 inline-block mr-1" />
            Comments
          </button>
          <button
            onClick={() => onTabChange('history')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
              activeTab === 'history'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <History className="h-4 w-4 inline-block mr-1" />
            History
          </button>
          <button
            onClick={() => onTabChange('activity')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
              activeTab === 'activity'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <Activity className="h-4 w-4 inline-block mr-1" />
            Activity
          </button>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
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
                className="flex-1"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={cn(
                    'p-4 rounded-lg border',
                    comment.resolved ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-gray-900">
                          {comment.author.name}
                        </span>
                        {comment.resolved && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            <Check className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleTimeString()}
                        </span>
                        {!comment.resolved && (
                          <button className="text-xs text-blue-600 hover:text-blue-700">
                            Reply
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-4">
            <div className="space-y-2">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="p-4 rounded-lg border border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={version.author.avatar} />
                      <AvatarFallback>{version.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-gray-900">
                          {version.author.name}
                        </span>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      {version.description && (
                        <p className="text-sm text-gray-600 mt-1">{version.description}</p>
                      )}
                      <span className="text-xs text-gray-400 mt-2 block">
                        {new Date(version.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="p-4">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user.name}</span>
                      {' '}<span className="text-gray-600">
                        {activity.action === 'created' && 'created the document'}
                        {activity.action === 'edited' && 'made edits'}
                        {activity.action === 'shared' && 'shared the document'}
                        {activity.action === 'commented' && 'added a comment'}
                        {activity.action === 'renamed' && 'renamed the document'}
                      </span>
                    </p>
                    {activity.details && (
                      <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                    )}
                    <span className="text-xs text-gray-400 mt-2 block">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
}
