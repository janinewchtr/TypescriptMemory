import type { MemoryCard } from "../models/game-types";
import { shuffleCards } from "../utilities/shuffle";

/** Creates a shuffled memory deck with two cards for each image path. */
export function createDeck(imagePaths: string[]): MemoryCard[] {
  const cards: MemoryCard[] = imagePaths.flatMap(
    (imagePath: string, index: number): MemoryCard[] => {
      return [
        createMemoryCard(index * 2, index, imagePath),
        createMemoryCard(index * 2 + 1, index, imagePath),
      ];
    }
  );

  return shuffleCards(cards);
}

/** Creates one memory card with its image, pair id and default state. */
function createMemoryCard(
  id: number,
  pairId: number,
  imagePath: string
): MemoryCard {
  return {
    id,
    pairId,
    imagePath,
    imageAlt: `Memory card ${pairId + 1}`,
    isFlipped: false,
    isMatched: false,
  };
}