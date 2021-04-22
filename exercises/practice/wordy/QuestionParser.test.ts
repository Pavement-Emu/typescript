import { DivideCommand, QuestionParser } from "./wordy";
describe("QuestionParser", () => {
  describe("#commands", () => {
    it("should return an array", () => {
      const question = "What is 33 divided by -3?";
      expect(new QuestionParser(question).operations()).toBeInstanceOf(Array);
    });
    it("should return an array of Operation", () => {
      const question = "What is 33 divided by -3?";
      const operations = new QuestionParser(question).operations();
      expect(operations).toBeInstanceOf(Array);
      expect(operations).toHaveLength(1);

      const o = operations[0];
      expect(o.left).toEqual(33);
      expect(o.right).toEqual(-3);
      expect(o.operator).toEqual(DivideCommand);
    });
  });
  it("should parse a simple question", () => {
    const question = "What is 33 divided by -3?";
    expect(new QuestionParser(question).operations()).toHaveLength(1);
  });
});
