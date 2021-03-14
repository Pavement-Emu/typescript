// Mutates the passed in array - bad
function shuffle<X>(array: X[]): X[] {
  var shallowCopy = [...array];
  for (var i = shallowCopy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shallowCopy[i];
    shallowCopy[i] = shallowCopy[j];
    shallowCopy[j] = temp;
  }
  return shallowCopy;
}

class NamePool {
  private availableNames: string[] = [];

  constructor() {
    this.init();
  }

  assign(): string {
    // assign names from the front
    const name = this.availableNames.shift();
    if (!name) {
      throw new Error("No names left");
    }
    return name;
  }

  init() {
    this.availableNames = [];
    for (var x1: number = "A".charCodeAt(0); x1 <= "Z".charCodeAt(0); x1++) {
      for (var x2: number = "A".charCodeAt(0); x2 <= "Z".charCodeAt(0); x2++) {
        for (var n: number = 0; n <= 999; n++) {
          const paddedNumber = `${n}`.padStart(3, "0");
          const serial = `${String.fromCharCode(x1)}${String.fromCharCode(
            x2
          )}${paddedNumber}`;
          this.availableNames.push(serial);
        }
      }
    }

    // randomise
    this.availableNames = shuffle(this.availableNames);
  }

  replace(name: string): string {
    // append new names to the back
    const replacement = this.assign();
    this.availableNames.push(name);
    return replacement;
  }
}

const nameRegistry = new NamePool();

export default class Robot {
  private myName: string;
  constructor() {
    this.myName = nameRegistry.assign();
  }

  public get name(): string {
    return this.myName;
  }

  public resetName(): void {
    this.myName = nameRegistry.replace(this.myName);
  }

  public static releaseNames(): void {
    nameRegistry.init();
  }
}
