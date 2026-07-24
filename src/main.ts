import "./styles/style.scss";
import "../scss/main.scss";

import type { PlayerColor } from "./models/game-types";
import {
  BOARD_SIZE_LARGE,
  BOARD_SIZE_MEDIUM,
  BOARD_SIZE_SMALL,
} from "./config/board-sizes";
import type { BoardSize } from "./config/board-sizes";
import { MEMORY_THEMES } from "./config/themes";
import type { ThemeId } from "./config/themes";
import {
  addMatchedPair,
  createGameStatus,
  increaseScore,
  isGameFinished,
  switchPlayer,
} from "./logics/score-logic";
import { renderHomePage } from "./views/home-page";
import { renderSettingsPage } from "./views/settings-page";
import { renderGamePage } from "./views/game-page";
import { renderResultPage, renderWinnerPage } from "./views/result-page";

type SettingsTheme = ThemeId;
type SettingsBoardSize = "16" | "24" | "36";
type SettingsSelectionName = "theme" | "player" | "board-size";

const MAIN_CONTAINER = document.getElementById("main-container") as HTMLElement;
const FLIP_BACK_DELAY = 900;
const RESULT_PAGE_DELAY = 2500;

const BOARD_SIZES: Record<SettingsBoardSize, BoardSize> = {
  16: BOARD_SIZE_SMALL,
  24: BOARD_SIZE_MEDIUM,
  36: BOARD_SIZE_LARGE,
};

let gameStatus = createGameStatus(BOARD_SIZE_SMALL.pairCount);
let currentMemoryTheme = MEMORY_THEMES.code;
let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let isBoardLocked = false;

/** Initializes the app and shows the home page first. */
function init(): void {
  showHomePage();
}

/** Renders the home page and connects the start button. */
function showHomePage(): void {
  MAIN_CONTAINER.innerHTML = renderHomePage();
  addStartGameEvent();
}

/** Adds the click event for navigating from home to settings. */
function addStartGameEvent(): void {
  const startButton = document.getElementById("start-game");

  if (!startButton) {
    return;
  }

  startButton.addEventListener("click", showSettingsPage);
}

/** Adds the click event for returning from result screens to home. */
function addBackToStartEvent(): void {
  const backToStartButton = document.getElementById("back-to-start");

  if (!backToStartButton) {
    return;
  }

  backToStartButton.addEventListener("click", showHomePage);
}

/** Renders the settings page and connects all settings events. */
function showSettingsPage(): void {
  MAIN_CONTAINER.innerHTML = renderSettingsPage();
  addSettingsStartEvent();
  addThemePreviewEvents();
  addSettingsSelectionEvents();
  updateSettingsStartButton();
}

const THEME_PREVIEW_IMAGES: Record<SettingsTheme, string> = {
  code: "./assets/themes/code_visual.png",
  food: "./assets/themes/food_visual.png",
};

const THEME_PREVIEW_ALTS: Record<SettingsTheme, string> = {
  code: "Code vibes theme preview",
  food: "Food theme preview",
};

const SETTINGS_LABELS: Record<SettingsSelectionName, Record<string, string>> = {
  theme: {
    code: "Code vibes theme",
    food: "Foods theme",
  },
  player: {
    blue: "Blue",
    orange: "Orange",
  },
  "board-size": {
    16: "16 cards",
    24: "24 cards",
    36: "36 cards",
  },
};

const SETTINGS_SUMMARY_IDS: Record<SettingsSelectionName, string> = {
  theme: "selected-theme",
  player: "selected-player",
  "board-size": "selected-board-size",
};

/** Adds change events to all theme radio buttons. */
function addThemePreviewEvents(): void {
  const themeInputs = document.querySelectorAll<HTMLInputElement>(
    "input[name='theme']"
  );

  themeInputs.forEach((input: HTMLInputElement): void => {
    input.addEventListener("change", updateThemePreview);
  });
}

/** Updates the preview image when the selected theme changes. */
function updateThemePreview(event: Event): void {
  const input = event.target;

  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  const selectedTheme = input.value as SettingsTheme;
  const previewImage = document.getElementById(
    "theme-preview-image"
  ) as HTMLImageElement | null;

  if (!previewImage) {
    return;
  }

  previewImage.src = THEME_PREVIEW_IMAGES[selectedTheme];
  previewImage.alt = THEME_PREVIEW_ALTS[selectedTheme];
}

/** Adds the click event for starting the game from the settings page. */
function addSettingsStartEvent(): void {
  const startButton = document.getElementById("start-game-from-settings");

  if (!startButton) {
    return;
  }

  startButton.addEventListener("click", startGame);
}

/** Returns the selected memory theme or the default code theme. */
function getSelectedTheme(): ThemeId {
  const selectedThemeInput = document.querySelector<HTMLInputElement>(
    "input[name='theme']:checked"
  );

  if (!selectedThemeInput) {
    return "code";
  }

  return selectedThemeInput.value as ThemeId;
}

/** Returns the selected starting player or blue as fallback. */
function getSelectedPlayer(): PlayerColor {
  const selectedPlayerInput = document.querySelector<HTMLInputElement>(
    "input[name='player']:checked"
  );

  if (!selectedPlayerInput) {
    return "blue";
  }

  return selectedPlayerInput.value as PlayerColor;
}

/** Returns the selected board size or the small board as fallback. */
function getSelectedBoardSize(): BoardSize {
  const selectedBoardSizeInput = document.querySelector<HTMLInputElement>(
    "input[name='board-size']:checked"
  );

  if (!selectedBoardSizeInput) {
    return BOARD_SIZE_SMALL;
  }

  return BOARD_SIZES[selectedBoardSizeInput.value as SettingsBoardSize];
}

/** Starts a new game with the selected theme, player and board size. */
function startGame(): void {
  const selectedPlayer = getSelectedPlayer();
  const selectedBoardSize = getSelectedBoardSize();
  const selectedTheme = getSelectedTheme();

  currentMemoryTheme = MEMORY_THEMES[selectedTheme];
  gameStatus = createGameStatus(selectedBoardSize.pairCount, selectedPlayer);
  firstCard = null;
  secondCard = null;
  isBoardLocked = false;

  MAIN_CONTAINER.innerHTML = renderGamePage(
    selectedBoardSize,
    currentMemoryTheme
  );
  updateScoreBoard();
  addCardClickEvents();
  addExitGameEvent();
}

/** Adds the click event for opening the exit game popup. */
function addExitGameEvent(): void {
  const exitButton = document.getElementById("open-exit-popup");

  if (!exitButton) {
    return;
  }

  exitButton.addEventListener("click", showExitPopup);
}

/** Shows the exit game popup above the current game page. */
function showExitPopup(): void {
  MAIN_CONTAINER.insertAdjacentHTML("beforeend", renderExitPopup());
  addExitPopupEvents();
}

/** Renders the exit game popup for the current theme. */
function renderExitPopup(): string {
  const backButtonText: string =
    currentMemoryTheme.id === "food" ? "No, back to game" : "Back to game";

  return `
    <section class="exit-popup ${currentMemoryTheme.className}" aria-label="Exit game popup">
      <div class="exit-popup__box" role="dialog" aria-modal="true">
        <h2 class="exit-popup__title">Are you sure you want to quit the game?</h2>

        <div class="exit-popup__actions">
          <button class="exit-popup__button exit-popup__button--back" type="button" id="close-exit-popup">
            ${backButtonText}
          </button>

          <button class="exit-popup__button exit-popup__button--exit" type="button" id="confirm-exit-game">
            Exit game
          </button>
        </div>
      </div>
    </section>
  `;
}

/** Adds click events for closing or confirming the exit popup. */
function addExitPopupEvents(): void {
  const closeButton = document.getElementById("close-exit-popup");
  const confirmExitButton = document.getElementById("confirm-exit-game");

  closeButton?.addEventListener("click", closeExitPopup);
  confirmExitButton?.addEventListener("click", showHomePage);
}

/** Closes the exit game popup without leaving the current game. */
function closeExitPopup(): void {
  const exitPopup = document.querySelector(".exit-popup");

  exitPopup?.remove();
}

/** Adds the click event listener to the memory card field. */
function addCardClickEvents(): void {
  const fieldRef = document.getElementById("field");

  if (!fieldRef) {
    return;
  }

  fieldRef.addEventListener("click", handleCardClick);
}

/** Handles a card click and starts the selection flow. */
function handleCardClick(event: MouseEvent): void {
  const card = getClickedCard(event);

  if (!card || isCardBlocked(card)) {
    return;
  }

  flipCard(card);
  selectCard(card);
}

/** Returns the clicked card element or null if no card was clicked. */
function getClickedCard(event: MouseEvent): HTMLElement | null {
  const target = event.target;

  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest(".card");
}

/** Checks whether a card is currently blocked from interaction. */
function isCardBlocked(card: HTMLElement): boolean {
  return (
    isBoardLocked || card === firstCard || card.classList.contains("is-matched")
  );
}

/** Flips a card by adding the flipped class. */
function flipCard(card: HTMLElement): void {
  card.classList.add("is-flipped");
}

/** Stores the selected card and checks two selected cards. */
function selectCard(card: HTMLElement): void {
  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkSelectedCards();
}

/** Checks whether the two selected cards are a matching pair. */
function checkSelectedCards(): void {
  if (!firstCard || !secondCard) {
    return;
  }

  const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

  if (isMatch) {
    keepCardsOpen();
    return;
  }

  flipCardsBack();
}

/** Keeps matching cards open and updates score and game progress. */
function keepCardsOpen(): void {
  firstCard?.classList.add("is-matched");
  secondCard?.classList.add("is-matched");

  increaseScore(gameStatus);
  addMatchedPair(gameStatus);
  updateScoreBoard();

  if (isGameFinished(gameStatus)) {
    showResultPage();
  }

  resetSelectedCards();
}

/** Flips non-matching cards back after a short delay. */
function flipCardsBack(): void {
  isBoardLocked = true;

  window.setTimeout((): void => {
    firstCard?.classList.remove("is-flipped");
    secondCard?.classList.remove("is-flipped");

    switchPlayer(gameStatus);
    updateScoreBoard();
    resetSelectedCards();

    isBoardLocked = false;
  }, FLIP_BACK_DELAY);
}

/** Clears the currently selected cards. */
function resetSelectedCards(): void {
  firstCard = null;
  secondCard = null;
}

/** Updates score texts and the current player icon. */
function updateScoreBoard(): void {
  updateScoreText(
    "blue-score",
    `${currentMemoryTheme.blueScoreLabel} ${gameStatus.blueScore}`
  );

  updateScoreText(
    "orange-score",
    `${currentMemoryTheme.orangeScoreLabel} ${gameStatus.orangeScore}`
  );

  updateCurrentPlayerIcon();
}

/** Updates one score element with the given score text. */
function updateScoreText(elementId: string, scoreText: string): void {
  const scoreElement = document.getElementById(elementId);

  if (!scoreElement) {
    return;
  }

  scoreElement.lastChild!.textContent = ` ${scoreText.trim()}`;
}

/** Updates the current player icon according to the active player. */
function updateCurrentPlayerIcon(): void {
  const icon = document.getElementById(
    "current-player-icon"
  ) as HTMLImageElement | null;

  if (!icon) {
    return;
  }

  icon.src = getCurrentPlayerIcon();
  icon.alt = `${gameStatus.currentPlayer} player`;

  icon.classList.remove(
    "score-board__current-icon--blue",
    "score-board__current-icon--orange"
  );

  icon.classList.add(`score-board__current-icon--${gameStatus.currentPlayer}`);
}

/** Returns the icon path for the current player and theme. */
function getCurrentPlayerIcon(): string {
  return gameStatus.currentPlayer === "blue"
    ? currentMemoryTheme.blueCurrentPlayerIcon
    : currentMemoryTheme.orangeCurrentPlayerIcon;
}

/** Shows the game over page before the final winner page. */
function showResultPage(): void {
  window.setTimeout((): void => {
    MAIN_CONTAINER.innerHTML = renderResultPage(gameStatus, currentMemoryTheme);
    showWinnerPage();
  }, FLIP_BACK_DELAY);
}

/** Shows the winner or draw page after the game over page. */
function showWinnerPage(): void {
  window.setTimeout((): void => {
    MAIN_CONTAINER.innerHTML = renderWinnerPage(gameStatus, currentMemoryTheme);
    addBackToStartEvent();
  }, RESULT_PAGE_DELAY);
}

/** Adds change events to all settings radio inputs. */
function addSettingsSelectionEvents(): void {
  const settingInputs = document.querySelectorAll<HTMLInputElement>(
    "input[name='theme'], input[name='player'], input[name='board-size']"
  );

  settingInputs.forEach((input: HTMLInputElement): void => {
    input.addEventListener("change", updateSettingsSummary);
  });
}

/** Updates the settings summary after a setting has changed. */
function updateSettingsSummary(event: Event): void {
  const input = event.target;

  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  const settingName = input.name as SettingsSelectionName;
  const summaryElement = document.getElementById(
    SETTINGS_SUMMARY_IDS[settingName]
  );

  if (!summaryElement) {
    return;
  }

  summaryElement.textContent = SETTINGS_LABELS[settingName][input.value];
  updateSettingsStartButton();
}

/** Enables the settings start button only when all settings are selected. */
function updateSettingsStartButton(): void {
  const startButton = document.getElementById(
    "start-game-from-settings"
  ) as HTMLButtonElement | null;

  if (!startButton) {
    return;
  }

  startButton.disabled = !areRequiredSettingsSelected();
}

/** Checks whether theme, player and board size are selected. */
function areRequiredSettingsSelected(): boolean {
  return Boolean(
    document.querySelector<HTMLInputElement>("input[name='theme']:checked") &&
      document.querySelector<HTMLInputElement>(
        "input[name='player']:checked"
      ) &&
      document.querySelector<HTMLInputElement>(
        "input[name='board-size']:checked"
      )
  );
}

init();
