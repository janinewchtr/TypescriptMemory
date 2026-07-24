import type { MemoryCard } from "../models/game-types";
import type { BoardSize } from "../config/board-sizes";
import type { MemoryTheme } from "../config/themes";
import { createDeck } from "../logics/deck-logic";

/** Renders the game page with the selected board size and memory theme. */
export function renderGamePage(
  boardSize: BoardSize,
  memoryTheme: MemoryTheme
): string {
  const selectedImages: string[] = memoryTheme.images.slice(
    0,
    boardSize.pairCount
  );
  const cards: MemoryCard[] = createDeck(selectedImages);

  return `
      <section class="game-page ${
        memoryTheme.className
      }" aria-label="Memory game">
        <div class="game-page__panel">
            ${renderScoreBoard(memoryTheme)}
  
          <section id="field" class="game-board ${
            boardSize.className
          }" aria-label="Memory cards">
            ${renderMemoryCards(cards, memoryTheme.cardBack)}
          </section>
        </div>
      </section>
    `;
}

/** Renders the score board for the selected memory theme. */
function renderScoreBoard(memoryTheme: MemoryTheme): string {
  return `
      <section class="score-board" aria-label="Score board">
        <div class="score-board__scores">
          <span id="blue-score" class="score-board__player score-board__player--blue">
            <img class="score-board__player-icon" src="${memoryTheme.bluePlayerIcon}" alt="">
            ${memoryTheme.blueScoreLabel} 0
          </span>
  
          <span id="orange-score" class="score-board__player score-board__player--orange">
            <img class="score-board__player-icon" src="${memoryTheme.orangePlayerIcon}" alt="">
            ${memoryTheme.orangeScoreLabel} 0
          </span>
        </div>
  
        <p class="score-board__current-player">
          Current player:
          <img
            id="current-player-icon"
            class="score-board__current-icon"
            src="${memoryTheme.blueCurrentPlayerIcon}"
            alt="Current player"
          >
        </p>
  
        <button class="score-board__exit-button" type="button" id="open-exit-popup">
          <img
            class="score-board__exit-icon"
            src="${memoryTheme.exitIcon}"
            alt=""
          >
          Exit game
        </button>
      </section>
    `;
}

/** Renders all memory cards for the game board. */
function renderMemoryCards(cards: MemoryCard[], cardBack: string): string {
  return cards
    .map((card: MemoryCard): string => {
      return renderMemoryCard(card, cardBack);
    })
    .join("");
}

/** Renders a single memory card with front and back faces. */
function renderMemoryCard(card: MemoryCard, cardBack: string): string {
  return `
      <button
        class="card"
        type="button"
        aria-label="${card.imageAlt}"
        data-card-id="${card.id}"
        data-pair-id="${card.pairId}"
      >
        <span class="card__inner">
          <span class="card__face card__face--front">
            <img class="card__image" src="${cardBack}" alt="Card back">
          </span>
  
          <span class="card__face card__face--back">
            <img class="card__image" src="${card.imagePath}" alt="${card.imageAlt}">
          </span>
        </span>
      </button>
    `;
}
