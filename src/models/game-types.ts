/** Defines the available player colors in the memory game. */
export type PlayerColor = "blue" | "orange";

/** Describes one memory card and its current game state. */
export interface MemoryCard {
  id: number;
  pairId: number;
  imagePath: string;
  imageAlt: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/** Stores the current score, active player and match progress of a game. */
export interface GameState {
  currentPlayer: PlayerColor;
  blueScore: number;
  orangeScore: number;
  matchedPairs: number;
  totalPairs: number;
}