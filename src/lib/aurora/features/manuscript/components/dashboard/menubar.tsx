'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/shared/components/ui/dialog';
import { Button } from '@/lib/shared/components/ui/button';
import { Input } from '@/lib/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/shared/components/ui/select';
import { LayoutGrid, LayoutList, Search, ExternalLink, Download } from 'lucide-react';

export default function ManuscriptMenubar({ fileName }: { fileName?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = (searchParams.get('view') as 'editor' | 'cards') ?? 'editor';

  const [searchScope, setSearchScope] = useState('document');
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const handleViewToggle = () => {
    const newView = view === 'cards' ? 'editor' : 'cards';
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', newView);
    router.push(`?${params.toString()}`);
  };

  const handleQuickRef = () => {
    window.open('https://docs.example.com/quick-reference', '_blank', 'width=800,height=600');
  };

  const formattedFileName = fileName
    ? fileName[0].replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : 'Untitled Document';

  return (
    <div className="mb-2 flex items-center gap-4 border-b pb-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleViewToggle}
        className="gap-2 bg-transparent"
      >
        {view === 'cards' ? (
          <>
            <LayoutList className="h-4 w-4" />
            Editor
          </>
        ) : (
          <>
            <LayoutGrid className="h-4 w-4" />
            Cards
          </>
        )}
      </Button>

      {/* Filename Display */}
      <div className="flex h-full flex-1 items-center justify-center truncate rounded-lg bg-blue-300/10 text-sm font-medium text-blue-300/70">
        {formattedFileName}
      </div>

      {/* Search with Scope */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input type="text" placeholder="Search..." className="w-48 pl-8" />
        </div>
        <Select value={searchScope} onValueChange={setSearchScope}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="document">This Document</SelectItem>
            <SelectItem value="folder">This Folder</SelectItem>
            <SelectItem value="project">Whole Project</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Document</DialogTitle>
            <DialogDescription>Choose your export format and options</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="docx">Word Document</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Download</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Reference */}
      <Button variant="outline" size="sm" onClick={handleQuickRef} className="gap-2 bg-transparent">
        <ExternalLink className="h-4 w-4" />
        Quick Ref
      </Button>
    </div>
  );
}
