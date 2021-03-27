export default class Clock {
  minutes: number = 0;
  hrs: number = 0;
  constructor(hrs: number, mins?: number) {
    this.plus(mins || 0);
    this.plusHrs(hrs);
    // var minsNum = mins || 0;

    // this.minutes = minsNum % 60;
    // if (minsNum < 0) {
    //   this.minutes += 60;
    // }

    // hrs += Math.floor(minsNum / 60);

    // if (hrs < 0) {
    //   hrs = 24 + (hrs % 24);
    // }

    // this.hrs = hrs % 24;
  }

  plus(mins: number): Clock {
    if (mins < 0) {
      return this.minus(Math.abs(mins));
    }
    this.minutes += mins;

    if (this.minutes >= 60) {
      this.plusHrs(Math.floor(this.minutes / 60));
    }
    this.minutes = this.minutes % 60;

    return this;
  }

  minus(mins: number): Clock {
    this.minutes -= mins;
    if (this.minutes < 0) {
      this.minusHrs(Math.abs(Math.floor(this.minutes / 60)));
      this.minutes %= 60;
      this.minutes += 60;
    }
    return this;
  }

  private plusHrs(hrs: number) {
    if (hrs < 0) {
      return this.minusHrs(Math.abs(hrs));
    }
    this.hrs += hrs;
    this.hrs %= 24;
  }

  private minusHrs(hrs: number) {
    this.hrs -= hrs;
    this.hrs %= 24;
    if (this.hrs < 0) {
      this.hrs += 24;
    }
  }

  equals(other: Clock): boolean {
    const sameHr = this.hrs === other.hrs;
    const sameMins = this.minutes === other.minutes;
    return sameHr && sameMins;
  }

  toString(): string {
    const hrs24 = this.hrs.toString().padStart(2, "0");
    const min60 = this.minutes.toString().padStart(2, "0");
    return `${hrs24}:${min60}`;
  }
}
