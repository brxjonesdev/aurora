export type Label = {
  label: string;
  value: string;
  color: string;
};

export type Status = {
  label: string;
  value: string;
  color: string;
};

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
  labels: Label[];
  status: Status | null;
  hover_synopsis?: string;
}

export interface ManuscriptDBNode extends ManuscriptNodeBase {
  type: 'folder' | 'file';
}

export interface ManuscriptTreeNode extends ManuscriptNodeBase {
  type: 'folder' | 'file';
  children: ManuscriptTreeNode[];
}

export interface ManuscriptFolder extends ManuscriptTreeNode {
  type: 'folder';
}

export interface ManuscriptFile extends ManuscriptTreeNode {
  type: 'file';
}

export type ManuscriptWithTree = {
  manuscript: Manuscript;
  tree: ManuscriptTreeNode;
}

export type ManuscriptCreate = {
  story_id: string;
  title: string;
  root_folder_id: string | null;

}
