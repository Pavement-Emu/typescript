export interface Command {
  operator: string;
  apply: (a: number, b: number) => number;
}

export const PlusCommand: Command = {
  operator: "plus",
  apply: (a: number, b: number) => a + b
};

const MinusCommand: Command = {
  operator: "minus",
  apply: (a: number, b: number) => a - b
};

const MultiplyCommand: Command = {
  operator: "multiplied by",
  apply: (a: number, b: number) => a * b
};

export const DivideCommand: Command = {
  operator: "divided by",
  apply: (a: number, b: number) => a / b
};

export const UnknownCommand: Command = {
  operator: "unknown",
  apply: (_: number, _2: number) => {
    throw new Error("unknown command");
  }
};

export const commands: Command[] = [
  PlusCommand,
  MinusCommand,
  MultiplyCommand,
  DivideCommand,
  UnknownCommand
];

export type Operand = number;
