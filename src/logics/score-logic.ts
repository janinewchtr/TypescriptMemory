import type { GameState, PlayerColor } from "../models/game-types";

/** Creates the initial game status with scores, active player and pair progress. */
export function createGameStatus(
  totalPairs: number,
  currentPlayer: PlayerColor = "blue"
): GameState {
  return {
    currentPlayer,
    blueScore: 0,
    orangeScore: 0,
    matchedPairs: 0,
    totalPairs,
  };
}

/** Increases the score of the currently active player by one point. */
export function increaseScore(gameStatus: GameState): void {
  if (gameStatus.currentPlayer === "blue") {
    gameStatus.blueScore += 1;
    return;
  }

  gameStatus.orangeScore += 1;
}

/** Switches the active player between blue and orange. */
export function switchPlayer(gameStatus: GameState): void {
  gameStatus.currentPlayer =
    gameStatus.currentPlayer === "blue" ? "orange" : "blue";
}

/** Adds one found pair to the current game progress. */
export function addMatchedPair(gameStatus: GameState): void {
  gameStatus.matchedPairs += 1;
}

/** Checks whether all pairs in the current game have been matched. */
export function isGameFinished(gameStatus: GameState): boolean {
  return gameStatus.matchedPairs === gameStatus.totalPairs;
}

/** Returns the winning player or draw when both scores are equal. */
export function getWinner(gameStatus: GameState): PlayerColor | "draw" {
  if (gameStatus.blueScore === gameStatus.orangeScore) {
    return "draw";
  }

  return gameStatus.blueScore > gameStatus.orangeScore ? "blue" : "orange";
}