export default class Pangram {
  private sentence: string;
  constructor(sentence: string) {
    this.sentence = sentence.toLowerCase();
  }

  isPangram() {
    const alphabet: string = "abcdefghijklmnopqrstuvwxyz";

    const unusedLetters = this.sentence.split("").reduce((prev, curr) => {
      return prev.replaceAll(curr, "");
    }, alphabet);

    return unusedLetters.length === 0;
  }
}
