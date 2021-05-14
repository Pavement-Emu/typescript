export default class Words {
  count(str: string) {
    const words = str.trim().split(/\s+/);
    const result = new Map();

    for (const word of words) {
      const lcWord = word.toLowerCase();
      const wordCount = result.get(lcWord) || 0;

      result.set(lcWord, wordCount + 1);
    }

    return result;
  }
}
