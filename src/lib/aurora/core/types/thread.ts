// Thread represent things like journeys, mysteries, relationships, etc. that run through a story
export type ThreadType =
  | 'main'                // central story arc
  | 'subplot'             // supporting or side plot
  | 'character-arc'       // personal growth/change
  | 'romance'             // relationship or emotional journey
  | 'mystery'             // investigative, secret-based thread
  | 'worldbuilding'       // lore, history, politics, etc.
  | 'conflict'            // rivalry, war, internal or external struggle
  | 'theme'               // conceptual or moral throughline
  | 'quest'               // goal- or journey-driven thread
  | 'relationship'        // non-romantic bonds: friends, family, mentor, etc.
  | 'comedic'             // humor or light-hearted relief arc
  | 'tragedy'             // downfall or loss arc
  | 'redemption'          // recovery or moral turnaround

export interface Thread {
    id: string;
    storyId: string;
    title: string;
    description: string;
    color: string;
    type: ThreadType;
    order: number;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ThreadCreate {
    storyId: string;
    title: string;
    description?: string;
    color: string;
    type: ThreadType;
}

export interface ThreadUpdate {
    title?: string;
    description?: string;
    color?: string;
    type?: ThreadType;
    order?: number;
    isVisible?: boolean;
}

export type MoveThreadRef = {
  refThreadId: string;
  position: "before" | "after";
};
