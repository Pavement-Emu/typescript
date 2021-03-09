const resistorMappings = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white"
];

export class ResistorColor {
  private colors: string[];

  constructor(colors: string[]) {
    if (colors.length < 2) {
      throw new Error("At least two colours need to be present");
    }
    this.colors = colors;
  }
  value = (): number => {
    const resistorString = this.colors
      .slice(0, 2)
      .map((colour) => resistorMappings.indexOf(colour).toString())
      .join("");
    return Number.parseInt(resistorString, 10);
  };
}
