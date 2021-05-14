type Found = {
  [key: string]: undefined;
};

type Grid = string[];

export default class WordSearch {
  constructor(private grid: Grid) {}
  public find(words: string[]) {
    const found: Found = {};
    for (const word in words) {
      found[word] = undefined;
    }
    return found;
  }
}
