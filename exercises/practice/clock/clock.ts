export default class Clock {
  minutes: number = 0;
  constructor(private hrs: number, private mins?: number) {
    this.hrs = hrs % 24;
    const minsNum = mins || 0;
    this.minutes = minsNum % 60;

    this.hrs += Math.floor(minsNum / 60);
  }

  toString(): string {
    const hrs24 = this.hrs.toString().padStart(2, "0");
    const min60 = this.minutes.toString().padStart(2, "0");
    return `${hrs24}:${min60}`;
  }
}
