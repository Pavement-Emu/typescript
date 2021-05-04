import { commands, Operand, Command, UnknownCommand } from "./commands";
// import { ArgumentError } from "./wordy";

export class ArgumentError {}

export interface Operation {
  operator: Command;
  right: Operand;
}

const int = Number.parseInt;

const OPERATORS = commands.map((c) => c.operator).join("|");
const NUMBER = "-?\\d+";
const OPERATION = ` (?:${OPERATORS}) ${NUMBER}`;

export function split(question: string): string[] {
  const operandAndOperators = new RegExp(
    `What is (${NUMBER})((?:${OPERATION})+)\\?`
  );

  const operandAndAllOperations = question.match(operandAndOperators);
  if (!operandAndAllOperations) {
    throw new ArgumentError();
  }

  // ignore match[0] - which is the matched string
  operandAndAllOperations?.shift();
  const firstOperand = operandAndAllOperations[0];
  const operationsGroup = operandAndAllOperations[1] || "";
  const eachOperation = new RegExp(`(${OPERATION})`, "g");
  const operations = operationsGroup.match(eachOperation) || [];
  return [firstOperand, ...operations];
}

export class QuestionParser {
  _firstOperand: number;
  _operations: Operation[] = [];
  _result: number;
  constructor(question: string) {
    const operations = split(question);
    this._firstOperand = int(operations.shift() || "");

    this._operations = operations?.map((op: string) => {
      const OPERATION = ` (${OPERATORS}) (${NUMBER})`;

      const operation = new RegExp(OPERATION);

      // ignore the original string
      const tuple = op.match(operation)?.slice(1) || [];

      const operatorStr = tuple[0];
      const right = int(tuple[1]);

      const operator =
        commands.find((c) => c.operator === operatorStr) || UnknownCommand;

      const o: Operation = {
        operator,
        right
      };
      return o;
    });

    this._result = this._operations.reduce(
      (prev: number, current: Operation) => {
        const right = current.right;
        return current.operator.apply(prev, right);
      },
      this._firstOperand
    );
  }

  operations(): Operation[] {
    return this._operations;
  }

  result(): number {
    return this._result;
  }
}
