'use client';

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Star,
  MoreVertical,
  Trash,
  Edit3,
  Share2,
  Download,
} from 'lucide-react';
import { Document } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DocumentCardProps {
  document: Document;
  index: number;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

export function DocumentCard({ document, index, onToggleFavorite, onDelete }: DocumentCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25, ease: 'easeOut' }}
    >
      <Link to={`/editor/${document.id}`} className="block focus:outline-none">
        <Card
          className="group relative cursor-pointer border border-slate-200 bg-white
                     shadow-sm transition-all duration-200 ease-out
                     hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300
                     focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                     overflow-hidden"
        >
          <CardContent className="p-4 sm:p-5">
            {/* Top row: icon + title + menu */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500" />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate text-sm sm:text-base tracking-tight">
                      {document.title}
                    </h3>
                    {document.isFavorite && (
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                    Edited {new Date(document.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Document actions"
                    className="p-1.5 h-auto text-slate-400 hover:text-slate-700 hover:bg-slate-100
                               opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleFavorite();
                    }}
                    className="cursor-pointer"
                  >
                    <Star className={`h-4 w-4 mr-2 ${document.isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                    {document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => e.preventDefault()} className="cursor-pointer">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => e.preventDefault()} className="cursor-pointer">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete();
                    }}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Shared badge, now inline instead of overlaying a colored block */}
            {document.isShared && (
              <Badge
                variant="outline"
                className="mt-3 border-slate-200 bg-slate-50 text-slate-600 font-medium text-xs gap-1 px-2 py-0.5"
              >
                <Share2 className="h-3 w-3" />
                Shared
              </Badge>
            )}

            {/* Collaborators */}
            {document.collaborators && document.collaborators.length > 0 && (
              <div className="flex items-center mt-4 pt-3 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {document.collaborators.slice(0, 3).map((collab) => (
                    <Avatar
                      key={collab.user.id}
                      className="w-6 h-6 border-2 border-white ring-1 ring-slate-200"
                    >
                      <AvatarImage src={collab.user.avatar} />
                      <AvatarFallback className="text-[10px] bg-slate-200 text-slate-600 font-semibold">
                        {collab.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {document.collaborators.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-semibold text-slate-600 border-2 border-white ring-1 ring-slate-200">
                      +{document.collaborators.length - 3}
                    </div>
                  )}
                </div>
                <span className="text-xs text-slate-500 ml-2 font-medium">
                  {document.collaborators.length} collaborator{document.collaborators.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}