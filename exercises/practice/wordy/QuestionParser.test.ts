import { QuestionParser, split } from "./QuestionParser";
import { DivideCommand } from "./commands";

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
      // expect(o.left).toEqual(33);
      expect(o.right).toEqual(-3);
      expect(o.operator).toEqual(DivideCommand);
    });
  });
  it("should parse a simple question", () => {
    const question = "What is 33 divided by -3?";
    expect(new QuestionParser(question).operations()).toHaveLength(1);
  });
  it("add twice", () => {
    const question = "What is 1 plus 1 plus 1?";
    expect(new QuestionParser(question).operations()).toHaveLength(2);
  });

  it("should calculate the result of multiple operations", () => {
    const question = "What is 1 plus 1 plus 1?";
    expect(new QuestionParser(question).result()).toEqual(3);
  });

  describe("#match should split the question into the constituent operations", () => {
    it("should split a single operation", () => {
      const question = "What is 33 divided by -3?";
      const expected: string[] = ["33", " divided by -3"];
      expect(split(question)).toEqual(expected);
    });

    it("should split multiple operations", () => {
      const question = "What is 1 plus 1 plus 1?";
      const expected: string[] = ["1", " plus 1", " plus 1"];
      expect(split(question)).toEqual(expected);
    });
  });
});
