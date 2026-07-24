/** Returns a shuffled copy of the given items without changing the original array. */
export function shuffleCards<T>(items: T[]): T[] {
  return [...items].sort((): number => Math.random() - 0.5);
}