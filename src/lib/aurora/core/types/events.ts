
export type EventType =
  // --- Character Events ---
  | 'character_introduction'
  | 'character_exit'
  | 'character_death'
  | 'character_reveal'
  | 'character_decision'
  | 'character_transformation'
  | 'character_relationship_change'

  // --- Plot / Structural Events ---
  | 'inciting_incident'
  | 'rising_action'
  | 'climax'
  | 'falling_action'
  | 'resolution'
  | 'plot_twist'
  | 'reversal'
  | 'flashback'
  | 'foreshadowing'

  // --- Emotional / Thematic Events ---
  | 'moment_of_doubt'
  | 'moment_of_courage'
  | 'internal_conflict'
  | 'realization'
  | 'moral_choice'
  | 'emotional_breakdown'
  | 'emotional_connection'

  // --- World Events ---
  | 'discovery'
  | 'revelation'
  | 'catastrophe'
  | 'war_begins'
  | 'peace_achieved'
  | 'disaster'
  | 'ritual'
  | 'prophecy_fulfilled'

  // --- Relational / Social Events ---
  | 'meeting'
  | 'separation'
  | 'betrayal'
  | 'confession'
  | 'agreement'
  | 'argument'
  | 'alliance_formed'
  | 'relationship_begins'
  | 'relationship_ends'

  // --- Action Events ---
  | 'battle'
  | 'fight'
  | 'escape'
  | 'chase'
  | 'infiltration'
  | 'rescue'
  | 'mission_success'
  | 'mission_failure'

  // --- Story / Meta ---
  | 'chapter_start'
  | 'chapter_end'
  | 'act_start'
  | 'act_end'
  | 'story_start'
  | 'story_end'
  | 'scene'
  | 'note'
  | 'timeline_marker';



export const eventTypeCategories = {
  "eventTypes": [
    { "category": "Character", "types": [
      "character_introduction",
      "character_exit",
      "character_death",
      "character_reveal",
      "character_decision",
      "character_transformation",
      "character_relationship_change"
    ]},
    { "category": "Plot", "types": [
      "inciting_incident",
      "rising_action",
      "climax",
      "falling_action",
      "resolution",
      "plot_twist",
      "reversal",
      "flashback",
      "foreshadowing"
    ]},
    { "category": "Emotional", "types": [
      "moment_of_doubt",
      "moment_of_courage",
      "internal_conflict",
      "realization",
      "moral_choice",
      "emotional_breakdown",
      "emotional_connection"
    ]},
    { "category": "World", "types": [
      "discovery",
      "revelation",
      "catastrophe",
      "war_begins",
      "peace_achieved",
      "disaster",
      "ritual",
      "prophecy_fulfilled"
    ]},
    { "category": "Relational", "types": [
      "meeting",
      "separation",
      "betrayal",
      "confession",
      "agreement",
      "argument",
      "alliance_formed",
      "relationship_begins",
      "relationship_ends"
    ]},
    { "category": "Action", "types": [
      "battle",
      "fight",
      "escape",
      "chase",
      "infiltration",
      "rescue",
      "mission_success",
      "mission_failure"
    ]},
    { "category": "Story Structure", "types": [
      "chapter_start",
      "chapter_end",
      "act_start",
      "act_end",
      "story_start",
      "story_end",
      "scene",
      "note",
      "timeline_marker"
    ]}
  ]
}

export type StoryEvent = {
    id: string;
    storyId: string;
    title: string;
    type: EventType;

    summary: string;
    description?: string;
    timestamp: string; // ISO date string
    order: number; // Position in the timeline
    actId?: string;
    chapterId?: string;
    sceneId?: string;
    // characterIds?: string[]; // Associated characters
    // locationIds?: string[]; // Associated locations
    tags?: Record<string, string>; // Custom tags/metadata
    importance?: number; // Importance level (1-10)
    associatedPlotPointIDs?: string[]; // Related plot points

    createdAt: string;
    updatedAt: string;

}