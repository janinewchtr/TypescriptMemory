import type { GameState, PlayerColor } from "../models/game-types";
import { getWinner } from "../logics/score-logic";
import type { MemoryTheme } from "../config/themes";

/** Renders the game over page with the final score for both players. */
export function renderResultPage(
  gameStatus: GameState,
  memoryTheme: MemoryTheme
): string {
  return `
      <section class="result-page ${memoryTheme.className}" aria-label="Game over">
        <h1 class="result-page__title">Game over</h1>
  
        <p class="result-page__label">Final score</p>
  
        <div class="result-page__score-board" aria-label="Final score">
          <span class="result-page__score result-page__score--blue">
            <img class="result-page__player-icon" src="${memoryTheme.bluePlayerIcon}" alt="">
            ${memoryTheme.blueScoreLabel} ${gameStatus.blueScore}
          </span>
  
          <span class="result-page__score result-page__score--orange">
            <img class="result-page__player-icon" src="${memoryTheme.orangePlayerIcon}" alt="">
            ${memoryTheme.orangeScoreLabel} ${gameStatus.orangeScore}
          </span>
        </div>
      </section>
    `;
}

/** Renders the winner page or draw page based on the final game status. */
export function renderWinnerPage(
  gameStatus: GameState,
  memoryTheme: MemoryTheme
): string {
  const winner: PlayerColor | "draw" = getWinner(gameStatus);

  if (winner === "draw") {
    return renderDrawPage(memoryTheme);
  }

  return renderPlayerWinnerPage(winner, memoryTheme);
}

/** Renders the winner page for the player with the highest score. */
function renderPlayerWinnerPage(
  winner: PlayerColor,
  memoryTheme: MemoryTheme
): string {
  const winnerName: string = getWinnerName(winner, memoryTheme);
  const winnerIcon: string = getWinnerIcon(winner, memoryTheme);
  const winnerClass: string =
    winner === "blue"
      ? "result-page__winner--blue"
      : "result-page__winner--orange";
  const confettiImage: string =
    memoryTheme.id === "food"
      ? ""
      : `
        <img class="result-page__confetti result-page__confetti--default" src="./assets/icons/Confetti.svg" alt="">
        <img class="result-page__confetti result-page__confetti--wide" src="./assets/icons/Confetti_long.svg" alt="">
      `;
  const buttonText: string =
    memoryTheme.id === "food" ? "Home" : "Back to start";

  return `
      <section class="result-page result-page--winner ${memoryTheme.className}" aria-label="Winner">
        ${confettiImage}
  
        <p class="result-page__text">The winner is</p>
        <h1 class="result-page__winner ${winnerClass}">${winnerName}</h1>
  
        <div class="result-page__icon-frame">
          <img class="result-page__winner-icon" src="${winnerIcon}" alt="${winnerName}">
        </div>
  
        <button class="result-page__button" type="button" id="back-to-start">
          ${buttonText}
        </button>
      </section>
    `;
}

/** Returns the winner label for the selected theme. */
function getWinnerName(winner: PlayerColor, memoryTheme: MemoryTheme): string {
  if (memoryTheme.id === "code") {
    return winner === "blue" ? "BLUE PLAYER" : "ORANGE PLAYER";
  }

  return winner === "blue" ? "Blue Player" : "Orange Player";
}

/** Returns the winner icon path for the selected theme. */
function getWinnerIcon(winner: PlayerColor, memoryTheme: MemoryTheme): string {
  if (memoryTheme.id === "code") {
    return winner === "blue"
      ? "./assets/icons/chess_blue.svg"
      : "./assets/icons/chess_orange.svg";
  }

  return winner === "blue"
    ? memoryTheme.bluePlayerIcon
    : memoryTheme.orangePlayerIcon;
}

/** Renders the draw page when both players have the same score. */
function renderDrawPage(memoryTheme: MemoryTheme): string {
  const drawIcon: string =
    memoryTheme.id === "food"
      ? "./assets/icons/Scale_icon_theme2.svg"
      : "./assets/icons/Scale_Icon.svg";

  return `
      <section class="result-page result-page--draw ${memoryTheme.className}" aria-label="Draw">
        <p class="result-page__draw-text">It's a</p>
        <h1 class="result-page__draw-title">DRAW</h1>
  
        <div class="result-page__icon-frame">
          <img class="result-page__draw-icon" src="${drawIcon}" alt="Scale icon">
        </div>
  
        <button class="result-page__button" type="button" id="back-to-start">
          Home
        </button>
      </section>
    `;
}