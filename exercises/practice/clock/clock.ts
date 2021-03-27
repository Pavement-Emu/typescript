const DAY_IN_MINS: number = 60 * 24;

export default class Clock {
  timeInMinutes = 0;
  constructor(hrs: number, mins?: number) {
    this.plus(hrs * 60);
    this.plus(mins || 0);
  }

  plus(mins: number): Clock {
    this.timeInMinutes += mins;
    this.normaliseTo24Hrs();
    return this;
  }

  private normaliseTo24Hrs(): number {
    this.timeInMinutes %= DAY_IN_MINS;
    if (this.timeInMinutes < 0) {
      this.timeInMinutes += DAY_IN_MINS;
    }
    return this.timeInMinutes;
  }

  minus(mins: number): Clock {
    return this.plus(-mins);
  }

  equals(other: Clock): boolean {
    return this.timeInMinutes === other.timeInMinutes;
  }

  toString(): string {
    const pad = (num: number) => num.toString().padStart(2, "0");
    const hrs24: string = pad(this.toHrs());
    const min24: string = pad(this.toMins());
    return `${hrs24}:${min24}`;
  }

  private toHrs(): number {
    return Math.floor(this.timeInMinutes / 60);
  }

  private toMins(): number {
    return this.timeInMinutes % 60;
  }
}
