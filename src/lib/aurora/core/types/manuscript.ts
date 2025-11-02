export type Label = {
  label: string
  value: string
  color: string
}

export type Status = {
  label: string
  value: string
  color: string
}




export type Folder = {
  id: string
  type: "folder"
  labels?: Label[]
  status?: Status
  slug: string
  name: string
  children: Array<Folder | File>
  hoverSynopsis?: string
}

export type File = {
  type: "file"
  name: string
  id: string
  slug: string
  labels?: Label[]
  status?: Status
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

