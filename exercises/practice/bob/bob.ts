const silence = (message: string) => message === "";
const containsCapitalLetters = (message: string) =>
  message.toLowerCase() !== message;
const allUppercase = (message: string) => message.toUpperCase() === message;
const shouting = (message: string) =>
  containsCapitalLetters(message) && allUppercase(message);
const askingQuestion = (message: string) => message.endsWith("?");

class Bob {
  hey(message: string) {
    message = message.trim();
    if (shouting(message)) {
      if (askingQuestion(message)) {
        return "Calm down, I know what I'm doing!";
      } else {
        return "Whoa, chill out!";
      }
    } else if (askingQuestion(message)) {
      return "Sure.";
    } else if (silence(message)) {
      return "Fine. Be that way!";
    } else {
      return "Whatever.";
    }
  }
}

export default Bob;
