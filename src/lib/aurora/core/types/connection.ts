// Connections represent relationships or dependencies between events or threads.
// They describe how narrative elements influence, reflect, or depend on one another.
export type ConnectionType =
  // Core narrative causality
  | 'cause-effect'
  | 'setup-payoff'
  | 'conflict-resolution'
  | 'prerequisite'
  | 'dependency'
  | 'motivation'

  // Structural or relational
  | 'intersection'       // when threads cross or meet
  | 'divergence'         // when one event splits into multiple outcomes
  | 'parallelism'        // when events occur side-by-side or mirror each other
  | 'contrast'           // when events oppose each other
  | 'reinforcement'      // strengthens or supports another element

  // Thematic or symbolic
  | 'symbolism'
  | 'echoes'
  | 'reveal'
  | 'foreshadowing'
  | 'flashback'
  | 'transformation'     // causes significant change in character/world
  | 'complication'       // adds difficulty or tension to another thread
  | 'reconciliation'     // resolves separation or conflict between threads
  | 'thematic-link'      // abstract or emotional resonance between events


  export interface EventThreadConnection {
      id: string;
      storyId: string;
      fromEventId: string;
      toThreadId: string;
      type: ConnectionType;
      createdAt: string;
      updatedAt: string;
  }
  
  export interface EventEventConnection {
      id: string;
      storyId: string;
      fromEventId: string;
      toEventId: string;
      type: ConnectionType;
      createdAt: string;
      updatedAt: string;
  }