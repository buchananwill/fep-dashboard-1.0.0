/**
 * Mutates passed array.
 * */
export function shuffle<T>(list: T[]): T[] {
  let currentIndex = list.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [list[currentIndex], list[randomIndex]] = [
      list[randomIndex],
      list[currentIndex]
    ];
  }
  return list;
}
