/** Defines all available memory theme ids. */
export type ThemeId = "code" | "food";

/** Describes all assets and labels that belong to one memory theme. */
export interface MemoryTheme {
  id: ThemeId;
  className: string;
  cardBack: string;
  images: string[];
  bluePlayerIcon: string;
  orangePlayerIcon: string;
  blueCurrentPlayerIcon: string;
  orangeCurrentPlayerIcon: string;
  exitIcon: string;
  blueScoreLabel: string;
  orangeScoreLabel: string;
}

/** Stores the card back image path for the code vibes theme. */
export const CODE_THEME_CARD_BACK: string = "./assets/themes/Theme1back.png";

/** Stores all front image paths for the code vibes theme. */
export const CODE_THEME_IMAGES: string[] = [
  "./assets/themes/Theme1-1.png",
  "./assets/themes/Theme1-2.png",
  "./assets/themes/Theme1-3.png",
  "./assets/themes/Theme1-4.png",
  "./assets/themes/Theme1-5.png",
  "./assets/themes/Theme1-6.png",
  "./assets/themes/Theme1-7.png",
  "./assets/themes/Theme1-8.png",
  "./assets/themes/Theme1-9.png",
  "./assets/themes/Theme1-10.png",
  "./assets/themes/Theme1-11.png",
  "./assets/themes/Theme1-12.png",
  "./assets/themes/Theme1-13.png",
  "./assets/themes/Theme1-14.png",
  "./assets/themes/Theme1-15.png",
  "./assets/themes/Theme1-16.png",
  "./assets/themes/Theme1-17.png",
  "./assets/themes/Theme1-18.png",
];

/** Stores the card back image path for the food theme. */
export const FOOD_THEME_CARD_BACK: string = "./assets/themes/Theme2Back.png";

/** Stores all front image paths for the food theme. */
export const FOOD_THEME_IMAGES: string[] = [
  "./assets/themes/Theme2-1.png",
  "./assets/themes/Theme2-2.png",
  "./assets/themes/Theme2-3.png",
  "./assets/themes/Theme2-4.png",
  "./assets/themes/Theme2-5.png",
  "./assets/themes/Theme2-6.png",
  "./assets/themes/Theme2-7.png",
  "./assets/themes/Theme2-8.png",
  "./assets/themes/Theme2-9.png",
  "./assets/themes/Theme2-10.png",
  "./assets/themes/Theme2-12.png",
  "./assets/themes/Theme2-13.png",
  "./assets/themes/Theme2-14.png",
  "./assets/themes/Theme2-15.png",
  "./assets/themes/Theme2-16.png",
  "./assets/themes/Theme2-17.png",
  "./assets/themes/Theme2-18.png",
  "./assets/themes/Theme2-19.png",
];

/** Stores all available memory themes with their assets, labels and CSS classes. */
export const MEMORY_THEMES: Record<ThemeId, MemoryTheme> = {
  code: {
    id: "code",
    className: "theme-code",
    cardBack: CODE_THEME_CARD_BACK,
    images: CODE_THEME_IMAGES,
    bluePlayerIcon: "./assets/icons/blue_player_theme1.svg",
    orangePlayerIcon: "./assets/icons/orange_player_theme1.svg",
    blueCurrentPlayerIcon: "./assets/icons/blue_player_theme1.svg",
    orangeCurrentPlayerIcon: "./assets/icons/orange_player_theme1.svg",
    exitIcon: "./assets/icons/exit_item.svg",
    blueScoreLabel: "Blue",
    orangeScoreLabel: "Orange",
  },
  food: {
    id: "food",
    className: "theme-food",
    cardBack: FOOD_THEME_CARD_BACK,
    images: FOOD_THEME_IMAGES,
    bluePlayerIcon: "./assets/icons/chess_blue.svg",
    orangePlayerIcon: "./assets/icons/chess_orange.svg",
    blueCurrentPlayerIcon: "./assets/icons/chess_pawn_currentplayer_theme2.svg",
    orangeCurrentPlayerIcon:
      "./assets/icons/chess_pawn_currentplayer_theme2.svg",
    exitIcon: "./assets/icons/exit_item_2.svg",
    blueScoreLabel: "",
    orangeScoreLabel: "",
  },
};