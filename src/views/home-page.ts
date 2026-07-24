/** Renders the home page with the animated controller and play button. */
export function renderHomePage(): string {
  return `
      <section class="home-page theme-code" aria-label="Memory home">
        <img
          class="home-page__controller"
          src="./assets/icons/stadia_controller_homepage.svg"
          alt=""
        >
  
        <div class="home-page__content">
          <p class="home-page__eyebrow">It’s play time.</p>
          <h1 class="home-page__title">Ready to play?</h1>
  
          <button class="button button--play" type="button" id="start-game">
            <img class="button__icon" src="./assets/icons/stadia_controller.svg" alt="">
            Play
            <span class="button__arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    `;
}
