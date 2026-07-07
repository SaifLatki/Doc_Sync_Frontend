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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/editor/${document.id}`}>
        <Card className="group cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden border-slate-200/60">
          <div className="h-32 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 relative flex items-center justify-center shadow-inner">
            <FileText className="h-14 w-14 text-blue-100 opacity-80" />
            {document.isFavorite && (
              <Star className="absolute top-3 right-3 h-5 w-5 text-yellow-300 fill-current shadow-sm" />
            )}
            {document.isShared && (
              <Badge className="absolute top-3 left-3 bg-white/95 text-blue-600 font-semibold shadow-md">
                <Share2 className="h-3 w-3 mr-1" />
                Shared
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-900 truncate text-base">{document.title}</h3>
                <p className="text-sm text-slate-500 mt-1">
                  {new Date(document.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 p-1 h-auto hover:bg-slate-100"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreVertical className="h-4 w-4 text-slate-400" />
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
                    <Star className={`h-4 w-4 mr-2 ${document.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
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
                    className="text-red-600 cursor-pointer"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {document.collaborators && document.collaborators.length > 0 && (
              <div className="flex items-center mt-4 pt-3 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {document.collaborators.slice(0, 3).map((collab) => (
                    <Avatar key={collab.user.id} className="w-6 h-6 border-2 border-white ring-2 ring-slate-200">
                      <AvatarImage src={collab.user.avatar} />
                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-blue-600 text-white">{collab.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {document.collaborators.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 border-2 border-white ring-2 ring-slate-200">
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
