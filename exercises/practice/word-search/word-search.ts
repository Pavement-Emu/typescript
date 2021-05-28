type Found = {
  [key: string]: {} | undefined;
};

type Grid = string[];

export default class WordSearch {
  private verticalGrid: Grid;
  constructor(private grid: Grid) {
    this.verticalGrid = this.transposeGridToColumns();
  }
  public find(words: string[]): Found {
    const join = (a: any, b: any) => {
      return { ...a, ...b };
    };
    const matches = words.map(this.matches.bind(this)).reduce(join);
    return matches;
  }

  private matches(word: string) {
    return {
      [word]:
        this.leftToRight(word) ||
        this.rightToLeft(word) ||
        this.topToBottom(word)
    };
  }

  private transposeGridToColumns(): Grid {
    const totalColumns = this.grid[0].length;
    const transposedGrid: Grid = [];
    for (var i = 0; i < totalColumns; i++) {
      var column: string[] = [];
      for (const row of this.grid) {
        column.push(row.charAt(i));
      }
      transposedGrid.push(column.join(""));
    }
    return transposedGrid;
  }

  private topToBottom(word: string) {
    const columns = this.verticalGrid;
    var colNum = 0;
    for (const line of columns) {
      colNum++;
      for (var lineNum = 0; lineNum + word.length <= line.length; lineNum++) {
        if (line.substr(lineNum).startsWith(word)) {
          return {
            start: [lineNum + 1, colNum],
            end: [lineNum + word.length, colNum]
          };
        }
      }
    }
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
