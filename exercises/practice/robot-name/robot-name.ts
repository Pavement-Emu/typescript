function random(max: number) {
  return Math.floor(Math.random() * max);
}

class NamePool {
  private canonicalPool: string[] = [];

  private availableNames: string[] = [];

  constructor() {
    this.init();
  }

  /**
   * Assign a new name.
   * Position chosen at random (lazily)
   */
  assign(): string {
    const totalNames = this.availableNames.length;
    const nextName = random(totalNames);
    const name = this.availableNames[nextName];
    this.availableNames[nextName] = this.availableNames[totalNames - 1];
    this.availableNames.pop();

    if (!name) {
      throw new Error("No names left");
    }
    return name;
  }

  /**
   * Creates a canonical pool of names
   * and assigns the initial pool available.
   * Performance optimisation (6x) so generation
   * of serial numbers (and expensive operation)
   * is only performed once.
   */
  init() {
    this.canonicalPool = [];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (const x1 of alphabet) {
      for (const x2 of alphabet) {
        for (var n: number = 0; n <= 999; n++) {
          const paddedNumber = n.toString().padStart(3, "0");
          const serial = `${x1}${x2}${paddedNumber}`;
          this.canonicalPool.push(serial);
        }
      }
    }

    this.reset();
  }

  /**
   * resets the available pool of names.
   */
  reset() {
    // randomise
    this.availableNames = [...this.canonicalPool];
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
    this.myName = nameRegistry.assign();
  }

  public static releaseNames(): void {
    nameRegistry.reset();
  }
}
