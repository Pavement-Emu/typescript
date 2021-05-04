import { QuestionParser } from "./QuestionParser";
export {ArgumentError} from './QuestionParser'
// export class ArgumentError {}

export class WordProblem {
  result: number;
  constructor(question: string) {
    this.result = new QuestionParser(question).result();
  }

  answer(): number {
    return this.result;
  }
}
