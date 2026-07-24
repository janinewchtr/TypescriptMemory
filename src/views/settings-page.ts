/** Renders the settings page with theme, player and board size options. */
export function renderSettingsPage(): string {
  return `
      <section class="settings-page" aria-label="Game settings">
        <div class="settings-page__content">
          <header class="settings-page__header">
            <h1 class="settings-page__title">Settings</h1>
            <img class="settings-page__title-line" src="./assets/icons/settings_line.svg" alt="">
          </header>
  
          <form class="settings-form" id="settings-form">
            ${renderThemeOptions()}
            ${renderPlayerOptions()}
            ${renderBoardSizeOptions()}
          </form>
        </div>
  
        <aside class="settings-page__preview" aria-label="Theme preview">
        <img
        id="theme-preview-image"
        class="settings-page__preview-image"
        src="./assets/themes/code_visual.png"
        alt="Code vibes theme preview"
      >
  
      <nav class="settings-page__steps" aria-label="Settings steps">
      <span id="selected-theme">Code vibes theme</span>
      <img src="./assets/icons/Line 4.svg" alt="">
    
      <span id="selected-player">Player</span>
      <img src="./assets/icons/Line 4.svg" alt="">
    
      <span id="selected-board-size">Board size</span>
    
      <button class="button button--settings-start" type="button" id="start-game-from-settings" disabled>
        <img class="button__icon" src="./assets/icons/smart_display.svg" alt="">
        Start
      </button>
    </nav>
        </aside>
      </section>
    `;
}

/** Renders the radio options for choosing the memory theme. */
function renderThemeOptions(): string {
  return `
      <fieldset class="settings-form__group">
        <legend class="settings-form__legend">
          <img class="settings-form__icon" src="./assets/icons/palette.svg" alt="">
          Game themes
        </legend>
  
        <label class="settings-form__option">
          <input
            class="settings-form__radio"
            type="radio"
            name="theme"
            value="code"
            checked
          >
          <span class="settings-form__option-text">Code vibes theme</span>
          <img
            class="settings-form__selected-line"
            src="./assets/icons/Line_horizontal.svg"
            alt=""
          >
        </label>
  
        <label class="settings-form__option">
          <input
            class="settings-form__radio"
            type="radio"
            name="theme"
            value="food"
          >
          <span class="settings-form__option-text">Foods theme</span>
          <img
            class="settings-form__selected-line"
            src="./assets/icons/Line_horizontal.svg"
            alt=""
          >
        </label>
      </fieldset>
    `;
}

/** Renders the radio options for choosing the starting player. */
function renderPlayerOptions(): string {
  return `
      <fieldset class="settings-form__group">
        <legend class="settings-form__legend">
          <img class="settings-form__icon" src="./assets/icons/chess_usersettings.svg" alt="">
          Choose player
        </legend>
  
        <label class="settings-form__option">
          <input
            class="settings-form__radio"
            type="radio"
            name="player"
            value="blue"
          >
          <span class="settings-form__option-text">Blue</span>
          <img
            class="settings-form__selected-line"
            src="./assets/icons/Line_horizontal.svg"
            alt=""
          >
        </label>
  
        <label class="settings-form__option">
          <input
            class="settings-form__radio"
            type="radio"
            name="player"
            value="orange"
          >
          <span class="settings-form__option-text">Orange</span>
          <img
            class="settings-form__selected-line"
            src="./assets/icons/Line_horizontal.svg"
            alt=""
          >
        </label>
      </fieldset>
    `;
}

/** Renders the radio options for choosing the memory board size. */
function renderBoardSizeOptions(): string {
  return `
      <fieldset class="settings-form__group">
        <legend class="settings-form__legend">
          <img class="settings-form__icon" src="./assets/icons/board_size_icon.svg" alt="">
          Board size
        </legend>
  
        <label class="settings-form__option">
          <input
            class="settings-form__radio"
            type="radio"
            name="board-size"
            value="16"
          >
          <span class="settings-form__option-text">16 cards</span>
          <img
            class="settings-form__selected-line"
            src="./assets/icons/Line_horizontal.svg"
            alt=""
          >
        </label>
  
        <label class="settings-form__option">
          <input
            class="settings-form__radio"
            type="radio"
            name="board-size"
            value="24"
          >
          <span class="settings-form__option-text">24 cards</span>
          <img
            class="settings-form__selected-line"
            src="./assets/icons/Line_horizontal.svg"
            alt=""
          >
        </label>
  
        <label class="settings-form__option">
          <input
            class="settings-form__radio"
            type="radio"
            name="board-size"
            value="36"
          >
          <span class="settings-form__option-text">36 cards</span>
          <img
            class="settings-form__selected-line"
            src="./assets/icons/Line_horizontal.svg"
            alt=""
          >
        </label>
      </fieldset>
    `;
}
