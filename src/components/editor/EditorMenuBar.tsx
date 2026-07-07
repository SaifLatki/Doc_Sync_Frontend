'use client';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FileText,
  ChevronDown,
  Save,
  Share2,
  Download,
  Printer,
  Settings,
  Users,
  FolderOpen,
  FilePlus,
  Clock,
  Trash,
  X,
} from 'lucide-react';
import { Document } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useApp } from '@/context/AppContext';

interface EditorMenuBarProps {
  document: Document;
}

export function EditorMenuBar({ document }: EditorMenuBarProps) {
  const { user } = useApp();
  const [title, setTitle] = useState(document.title);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {/* File Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors">
                File
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>
                <FilePlus className="h-4 w-4 mr-2" />
                New Document
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderOpen className="h-4 w-4 mr-2" />
                Open
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Save className="h-4 w-4 mr-2" />
                Save
                <span className="ml-auto text-xs text-gray-400">Ctrl+S</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash className="h-4 w-4 mr-2" />
                Delete Document
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Edit Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors">
                Edit
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>Undo <span className="ml-auto text-xs text-gray-400">Ctrl+Z</span></DropdownMenuItem>
              <DropdownMenuItem>Redo <span className="ml-auto text-xs text-gray-400">Ctrl+Y</span></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cut <span className="ml-auto text-xs text-gray-400">Ctrl+X</span></DropdownMenuItem>
              <DropdownMenuItem>Copy <span className="ml-auto text-xs text-gray-400">Ctrl+C</span></DropdownMenuItem>
              <DropdownMenuItem>Paste <span className="ml-auto text-xs text-gray-400">Ctrl+V</span></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Select All <span className="ml-auto text-xs text-gray-400">Ctrl+A</span></DropdownMenuItem>
              <DropdownMenuItem>Find and Replace <span className="ml-auto text-xs text-gray-400">Ctrl+H</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors">
                View
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>Full Screen</DropdownMenuItem>
              <DropdownMenuItem>Compact Mode</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Show Ruler</DropdownMenuItem>
              <DropdownMenuItem>Show Line Numbers</DropdownMenuItem>
              <DropdownMenuItem>Show Word Count</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Insert Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors">
                Insert
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>Image</DropdownMenuItem>
              <DropdownMenuItem>Table</DropdownMenuItem>
              <DropdownMenuItem>Link</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Horizontal Line</DropdownMenuItem>
              <DropdownMenuItem>Page Break</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Comment</DropdownMenuItem>
              <DropdownMenuItem>Footnote</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Format Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors">
                Format
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>Text Style</DropdownMenuItem>
              <DropdownMenuItem>Paragraph Style</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Align Left</DropdownMenuItem>
              <DropdownMenuItem>Align Center</DropdownMenuItem>
              <DropdownMenuItem>Align Right</DropdownMenuItem>
              <DropdownMenuItem>Justify</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Bullets & Numbering</DropdownMenuItem>
              <DropdownMenuItem>Clear Formatting</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tools Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors">
                Tools
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>Spell Check</DropdownMenuItem>
              <DropdownMenuItem>Word Count</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Version History</DropdownMenuItem>
              <DropdownMenuItem>Activity</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Document Title */}
        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 px-2 py-1 rounded hover:bg-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Collaborators */}
        {document.collaborators && document.collaborators.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {document.collaborators.slice(0, 3).map((collab) => (
                <Avatar key={collab.user.id} className="w-7 h-7 border-2 border-white">
                  <AvatarImage src={collab.user.avatar} />
                  <AvatarFallback className="text-xs">{collab.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            {document.collaborators.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{document.collaborators.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Share Button */}
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1"
                />
                <Button>Add</Button>
              </div>
              <div className="text-sm text-gray-500">
                People with access
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{user?.name} (you)</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                  <Badge variant="outline">Owner</Badge>
                </div>
                {document.collaborators?.map((collab) => (
                  <div key={collab.user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={collab.user.avatar} />
                        <AvatarFallback>{collab.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{collab.user.name}</div>
                        <div className="text-xs text-gray-500">{collab.user.email}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">{collab.role}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* User Avatar */}
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
