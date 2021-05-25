type Found = {
  [key: string]: {} | undefined;
};

type Grid = string[];

export default class WordSearch {
  constructor(private grid: Grid) {}
  public find(words: string[]): Found {
    const join = (a: any, b: any) => {
      return { ...a, ...b };
    };
    const matches = words.map(this.matches.bind(this)).reduce(join);
    return matches;
  }

  private matches(word: string) {
    return {
      [word]: this.leftToRight(word) || this.rightToLeft(word)
    };
  }

  private leftToRight(word: string) {
    var lineNum = 0;
    for (const line of this.grid) {
      lineNum++;
      for (var i = 0; i + word.length < line.length; i++) {
        if (line.substr(i).startsWith(word)) {
          return {
            start: [lineNum, i + 1],
            end: [lineNum, i + word.length]
          };
        }
      }
    }
  }

  private rightToLeft(word: string) {
    const reverse = (word: string) => word.split("").reverse().join("");
    const reversedWord = reverse(word);
    var lineNum = 0;
    for (const line of this.grid) {
      lineNum++;

      for (var i = 0; i + reversedWord.length < line.length; i++) {
        if (line.substr(i).startsWith(reversedWord)) {
          return {
            end: [lineNum, i + 1],
            start: [lineNum, i + word.length]
          };
        }
      }
    }
  }
}
