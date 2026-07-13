'use client';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FileText,
  Save,
  Share2,
  Download,
  Printer,
  FolderOpen,
  FilePlus,
  Trash,
  Menu as MenuIcon,
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
  DropdownMenuLabel,
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

// Menu definitions shared between the desktop menu row and the mobile
// collapsed menu, so both stay in sync without duplicating markup twice.
const FILE_ITEMS = (
  <>
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
      <span className="ml-auto text-xs text-slate-400">Ctrl+S</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Download className="h-4 w-4 mr-2" />
      Export
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
    <DropdownMenuItem className="text-red-600 focus:text-red-600">
      <Trash className="h-4 w-4 mr-2" />
      Delete Document
    </DropdownMenuItem>
  </>
);

const EDIT_ITEMS = (
  <>
    <DropdownMenuItem>Undo <span className="ml-auto text-xs text-slate-400">Ctrl+Z</span></DropdownMenuItem>
    <DropdownMenuItem>Redo <span className="ml-auto text-xs text-slate-400">Ctrl+Y</span></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Cut <span className="ml-auto text-xs text-slate-400">Ctrl+X</span></DropdownMenuItem>
    <DropdownMenuItem>Copy <span className="ml-auto text-xs text-slate-400">Ctrl+C</span></DropdownMenuItem>
    <DropdownMenuItem>Paste <span className="ml-auto text-xs text-slate-400">Ctrl+V</span></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Select All <span className="ml-auto text-xs text-slate-400">Ctrl+A</span></DropdownMenuItem>
    <DropdownMenuItem>Find and Replace <span className="ml-auto text-xs text-slate-400">Ctrl+H</span></DropdownMenuItem>
  </>
);

const VIEW_ITEMS = (
  <>
    <DropdownMenuItem>Full Screen</DropdownMenuItem>
    <DropdownMenuItem>Compact Mode</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Show Ruler</DropdownMenuItem>
    <DropdownMenuItem>Show Line Numbers</DropdownMenuItem>
    <DropdownMenuItem>Show Word Count</DropdownMenuItem>
  </>
);

const INSERT_ITEMS = (
  <>
    <DropdownMenuItem>Image</DropdownMenuItem>
    <DropdownMenuItem>Table</DropdownMenuItem>
    <DropdownMenuItem>Link</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Horizontal Line</DropdownMenuItem>
    <DropdownMenuItem>Page Break</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Comment</DropdownMenuItem>
    <DropdownMenuItem>Footnote</DropdownMenuItem>
  </>
);

const FORMAT_ITEMS = (
  <>
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
  </>
);

const TOOLS_ITEMS = (
  <>
    <DropdownMenuItem>Spell Check</DropdownMenuItem>
    <DropdownMenuItem>Word Count</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Version History</DropdownMenuItem>
    <DropdownMenuItem>Activity</DropdownMenuItem>
  </>
);

function MenuButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors">
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function EditorMenuBar({ document }: EditorMenuBarProps) {
  const { user } = useApp();
  const [title, setTitle] = useState(document.title);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  return (
    <div className="bg-white border-b border-slate-200 px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
        </Link>

        {/* Full menu row — visible from md up */}
        <div className="hidden md:flex items-center gap-0.5">
          <MenuButton label="File">{FILE_ITEMS}</MenuButton>
          <MenuButton label="Edit">{EDIT_ITEMS}</MenuButton>
          <MenuButton label="View">{VIEW_ITEMS}</MenuButton>
          <MenuButton label="Insert">{INSERT_ITEMS}</MenuButton>
          <MenuButton label="Format">{FORMAT_ITEMS}</MenuButton>
          <MenuButton label="Tools">{TOOLS_ITEMS}</MenuButton>
        </div>

        {/* Collapsed menu — visible below md, all menus nested as submenus */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Open menu"
                className="p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>File</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>{FILE_ITEMS}</DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Edit</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>{EDIT_ITEMS}</DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>View</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>{VIEW_ITEMS}</DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Insert</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>{INSERT_ITEMS}</DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Format</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>{FORMAT_ITEMS}</DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Tools</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>{TOOLS_ITEMS}</DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Document Title */}
        <div className="flex items-center gap-2 ml-1 sm:ml-2 pl-2 sm:pl-3 border-l border-slate-200 min-w-0">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm font-medium text-slate-900 bg-transparent border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 px-2 py-1 rounded-md hover:bg-slate-100 w-32 sm:w-48 md:w-64 min-w-0 truncate"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Collaborators — hidden on very small screens to keep the bar from crowding */}
        {document.collaborators && document.collaborators.length > 0 && (
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex -space-x-2">
              {document.collaborators.slice(0, 3).map((collab) => (
                <Avatar key={collab.user.id} className="w-7 h-7 border-2 border-white ring-1 ring-slate-200">
                  <AvatarImage src={collab.user.avatar} />
                  <AvatarFallback className="text-xs bg-slate-200 text-slate-600">
                    {collab.user.name.charAt(0)}
                  </AvatarFallback>
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
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 sm:px-4">
              <Share2 className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Add</Button>
              </div>
              <div className="text-sm text-slate-500">People with access</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-slate-200 text-slate-600">
                        {user?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate">{user?.name} (you)</div>
                      <div className="text-xs text-slate-500 truncate">{user?.email}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0">Owner</Badge>
                </div>
                {document.collaborators?.map((collab) => (
                  <div key={collab.user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={collab.user.avatar} />
                        <AvatarFallback className="bg-slate-200 text-slate-600">
                          {collab.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 truncate">{collab.user.name}</div>
                        <div className="text-xs text-slate-500 truncate">{collab.user.email}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize shrink-0">{collab.role}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Current user */}
        <Avatar className="w-8 h-8 ring-1 ring-slate-200">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="bg-slate-200 text-slate-600">{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}