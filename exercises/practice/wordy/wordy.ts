export class ArgumentError {}

interface Command {
  operand: string;
  apply: (a: number, b: number) => number;
}

const PlusCommand: Command = {
  operand: "plus",
  apply: (a: number, b: number) => a + b
};

const MinusCommand: Command = {
  operand: "minus",
  apply: (a: number, b: number) => a - b
};

const MultiplyCommand: Command = {
  operand: "multiplied by",
  apply: (a: number, b: number) => a * b
};

export const DivideCommand: Command = {
  operand: "divided by",
  apply: (a: number, b: number) => a / b
};

const commands: Command[] = [
  PlusCommand,
  MinusCommand,
  MultiplyCommand,
  DivideCommand
];

type Operand = number;

export interface Operation {
  left: Operand;
  operator: Command;

  // TODO - remove
  // replace by reduce right operation
  right: Operand;
}

export class QuestionParser {
  _operations: Operation[] = [];
  constructor(question: string) {
    const match = (command: Command) => {
      const matcher = new RegExp(
        `What is (-?\\d+) ${command.operand} (-?\\d+)\\?`
      );
      return question.match(matcher);
    };
    const idx = commands.findIndex(match);
    const command = commands[idx];

    const int = Number.parseInt;
    const results = match(command);

    this._operations.push({
      left: int(results![1]),
      right: int(results![2]),
      operator: command
    });
  }

  operations(): Operation[] {
    return this._operations;
  }
}

export class WordProblem {
  operations: Operation[];
  constructor(question: string) {
    this.operations = new QuestionParser(question).operations();
  }

  answer(): number {
    const apply = (o: Operation): number =>
      o.operator.apply(o.left as number, o.right as number);
    return apply(this.operations[0]);
  }
}
