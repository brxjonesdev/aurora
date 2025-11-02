export type Folder = {
  id: string
  type: "folder"
  name: string
  children: Array<Folder | File>
  hoverSynopsis?: string
}

export type File = {
  type: "file"
  name: string
  id: string
  slug: string
  hoverSynopsis?: string
}

export interface Manuscript {
    id: string;
    storyId: string;
    content: Array<Folder | File>;
    createdAt: string;
    updatedAt: string;
    totalWordCount?: number;
    totalCharacterCount?: number;
    // Add other relevant fields as needed
}