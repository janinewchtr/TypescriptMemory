/** Describes one selectable memory board size. */
export interface BoardSize {
  id: string;
  label: string;
  rows: number;
  columns: number;
  cardCount: number;
  pairCount: number;
  className: string;
}

/** Defines the small 4x4 board with 16 cards. */
export const BOARD_SIZE_SMALL: BoardSize = {
  id: "small",
  label: "4x4",
  rows: 4,
  columns: 4,
  cardCount: 16,
  pairCount: 8,
  className: "game-board--small",
};

/** Defines the medium 4x6 board with 24 cards. */
export const BOARD_SIZE_MEDIUM: BoardSize = {
  id: "medium",
  label: "4x6",
  rows: 4,
  columns: 6,
  cardCount: 24,
  pairCount: 12,
  className: "game-board--medium",
};

/** Defines the large 6x6 board with 36 cards. */
export const BOARD_SIZE_LARGE: BoardSize = {
  id: "large",
  label: "6x6",
  rows: 6,
  columns: 6,
  cardCount: 36,
  pairCount: 18,
  className: "game-board--large",
};