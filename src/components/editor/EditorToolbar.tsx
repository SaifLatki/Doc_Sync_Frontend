'use client';

import { useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Link,
  Image,
  Highlighter,
  ChevronDown,
  Minus,
  Table,
  Palette,
  MoreHorizontal,
  Subscript,
  Superscript,
} from 'lucide-react';
import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { fontFamilies, fontSizes } from '@/lib/data';

interface EditorToolbarProps {
  editor: Editor | null;
}

const highlightColors = [
  { name: 'Yellow', value: '#fef08a' },
  { name: 'Green', value: '#bbf7d0' },
  { name: 'Blue', value: '#bfdbfe' },
  { name: 'Pink', value: '#fbcfe8' },
  { name: 'Orange', value: '#fed7aa' },
  { name: 'None', value: 'transparent' },
];

const textColors = [
  { name: 'Default', value: 'inherit' },
  { name: 'Gray', value: '#6b7280' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Purple', value: '#9333ea' },
];

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setimageUrl] = useState('');

  if (!editor) {
    return <div className="h-12 bg-gray-50 border-b border-gray-200" />;
  }

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setLinkUrl('');
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-1 flex-wrap sticky top-0 z-10">
        {/* Undo/Redo */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="h-8 w-8 p-0"
            >
              <Undo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="h-8 w-8 p-0"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Font Family - placeholder for now */}
        <Select
          value="Inter"
          onValueChange={() => {}}
        >
          <SelectTrigger className="w-32 h-8 text-xs">
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Font Size - placeholder for now */}
        <Select
          value="16px"
          onValueChange={() => {}}
        >
          <SelectTrigger className="w-16 h-8 text-xs">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Headings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <span className="text-xs font-medium text-gray-600 mr-1">
                {editor.isActive('heading', { level: 1 }) ? 'H1' :
                 editor.isActive('heading', { level: 2 }) ? 'H2' :
                 editor.isActive('heading', { level: 3 }) ? 'H3' : 'Normal'}
              </span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
              Normal Text
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              <Heading1 className="h-4 w-4 mr-2" /> Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              <Heading2 className="h-4 w-4 mr-2" /> Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              <Heading3 className="h-4 w-4 mr-2" /> Heading 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Text Formatting */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive('bold') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
            >
              <Bold className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bold (Ctrl+B)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive('italic') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
            >
              <Italic className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Italic (Ctrl+I)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive('underline') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`h-8 w-8 p-0 ${editor.isActive('underline') ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
            >
              <Underline className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Underline (Ctrl+U)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive('strike') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`h-8 w-8 p-0 ${editor.isActive('strike') ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Strikethrough</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Text Color */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <div className="relative">
                <Palette className="h-4 w-4" />
                <div
                  className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-3 h-1 rounded"
                  style={{ backgroundColor: editor.getAttributes('textStyle').color || 'currentColor' }}
                />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="grid grid-cols-6 gap-1">
              {textColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    if (color.value === 'inherit') {
                      editor.chain().focus().unsetColor().run();
                    } else {
                      editor.chain().focus().setColor(color.value).run();
                    }
                  }}
                  className="w-6 h-6 rounded-md hover:scale-110 transition-transform border border-gray-200"
                  style={{ backgroundColor: color.value === 'inherit' ? '#1f2937' : color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Highlight Color */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <div className="relative">
                <Highlighter className="h-4 w-4" />
                <div
                  className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-3 h-1 rounded"
                  style={{ backgroundColor: editor.getAttributes('highlight').color || '#fef08a' }}
                />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="grid grid-cols-6 gap-1">
              {highlightColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    if (color.value === 'transparent') {
                      editor.chain().focus().unsetHighlight().run();
                    } else {
                      editor.chain().focus().toggleHighlight({ color: color.value }).run();
                    }
                  }}
                  className="w-6 h-6 rounded-md hover:scale-110 transition-transform border border-gray-200"
                  style={{ backgroundColor: color.value === 'transparent' ? '#fff' : color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Alignment */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : ''}`}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Left</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : ''}`}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Center</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : ''}`}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Right</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-600 text-white' : ''}`}
            >
              <AlignJustify className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Justify</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : ''}`}
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bullet List</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : ''}`}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Numbered List</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-blue-600 text-white' : ''}`}
            >
              <Quote className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Quote</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`h-8 w-8 p-0 ${editor.isActive('codeBlock') ? 'bg-blue-600 text-white' : ''}`}
            >
              <Code className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Code Block</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Link */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={editor.isActive('link') ? 'default' : 'ghost'}
              size="sm"
              className={`h-8 w-8 p-0 ${editor.isActive('link') ? 'bg-blue-600 text-white' : ''}`}
            >
              <Link className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-2">
              <input
                type="url"
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <Button size="sm" onClick={setLink} className="w-full">Add Link</Button>
              {editor.isActive('link') && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  className="w-full"
                >
                  Remove Link
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Image */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Image className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-2">
              <input
                type="url"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setimageUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <Button size="sm" onClick={addImage} className="w-full">Add Image</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Horizontal Rule */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Horizontal Rule</TooltipContent>
        </Tooltip>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-400">Auto-saved</span>
        </div>
      </div>
    </TooltipProvider>
  );
}
