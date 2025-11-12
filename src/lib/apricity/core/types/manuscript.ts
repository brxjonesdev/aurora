/* eslint-disable @typescript-eslint/no-explicit-any */
export type ManuscriptLabel = {
  id: string;
  label: string;
  value: string;
  color: string;
};

export type ManuscriptStatus = {
  id: string;
  label: string;
  value: string;
  color: string;
};
// Same as in Supabase
export interface ManuscriptMetadata {
  id: string;
  storyId: string;
  title: string;
  rootFolderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ManuscriptNodeBase {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  hover_synopsis?: string;
}

export type JSONContent = {
  type: string;
  attrs?: Record<string, any>;
  content?: JSONContent[];
  marks?: { type: string; attrs?: Record<string, any> }[];
};

export interface ManuscriptDBNode extends ManuscriptNodeBase {
  type: 'folder' | 'file';
}

export interface ManuscriptTreeNode extends ManuscriptNodeBase {
  type: 'folder' | 'file';
  children: ManuscriptTreeNode[];
}

export interface ManuscriptFolder extends ManuscriptTreeNode {
  type: 'folder';
  content: null;
}

export interface ManuscriptFile extends ManuscriptTreeNode {
  type: 'file';
  content: JSONContent | null;
}
