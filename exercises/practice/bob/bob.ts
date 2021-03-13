class Bob {
  hey(message: string) {
    message = message.trim();
    const silence = message === "";
    const containsCapitalLetters = message.toLowerCase() !== message;
    const allUppercase = message.toUpperCase() === message;
    const shouting = containsCapitalLetters && allUppercase;
    const askingQuestion = message.endsWith("?");
    if (shouting) {
      if (askingQuestion) {
        return "Calm down, I know what I'm doing!";
      } else {
        return "Whoa, chill out!";
      }
    } else if (askingQuestion) {
      return "Sure.";
    } else if (silence) {
      return "Fine. Be that way!";
    } else {
      return "Whatever.";
    }
  }
}

export default Bob;
