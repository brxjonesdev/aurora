// Events represent scenes, beats or significant occurrences within a story.
export type EventType =
  | 'scene'               // a complete moment in time or location
  | 'beat'                // a small emotional or plot shift within a scene
  | 'turning-point'       // major shift in direction (plot twist, revelation)
  | 'climax'              // emotional or narrative peak
  | 'resolution'          // wraps up a thread or storyline
  | 'introduction'        // establishes a new thread, character, or setting
  | 'conflict'            // moment of tension, confrontation, or choice
  | 'discovery'           // reveal, realization, or uncovering information
  | 'decision'            // character makes a choice driving the plot
  | 'setup'               // plants something for future payoff
  | 'payoff'              // resolves something previously set up
  | 'transition'          // bridges between scenes or threads
  | 'flashback'           // event from the past relevant to current story
  | 'foreshadowing'       // hint toward future events
  | 'subplot-crossover'   // where multiple threads intersect
  | 'character-development' // significant growth or change in a character
  | 'reveal';             // unveiling of a secret or important info

export interface Event {
    id: string;
    storyId: string;
    title: string;
    description: string;
    chapter?: number;
    scene?: number;
    act?: number;
    customTime?: string;
    position: number; // Order within same time unit
    threadIds: string[];
    type: EventType;
    tensionLevel?: number; // 1-10 for analytics
    createdAt: string;
    updatedAt: string;
}

export interface EventCreate {
    storyId: string;
    title: string;
    description: string;
    color?: string;
    chapter?: number;
    scene?: number;
    act?: number;
    customTime?: string;
    threadIds: string[];
    type: EventType;
    tensionLevel?: number;
    visibility?: boolean;
}

export interface EventUpdate {
    title?: string;
    description?: string;
    chapter?: number;
    scene?: number;
    act?: number;
    customTime?: string;
    position?: number;
    threadIds?: string[];
    type?: EventType;
    tensionLevel?: number;
}
