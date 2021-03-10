function round(val: number): number {
  return Math.round(val * 100) / 100;
}
export default class SpaceAge {
  seconds: number;
  private yearsOnEarth: number;
  constructor(seconds: number) {
    this.seconds = seconds;
    this.yearsOnEarth = this.seconds / 31557600;
  }

  onEarth(): number {
    return round(this.yearsOnEarth);
  }

  onMercury(): number {
    return round(this.yearsOnEarth / 0.2408467);
  }

  onVenus(): number {
    return round(this.yearsOnEarth / 0.61519726);
  }

  onMars(): number {
    return round(this.yearsOnEarth / 1.8808158);
  }

  onJupiter(): number {
    return round(this.yearsOnEarth / 11.862615);
  }
  onSaturn(): number {
    return round(this.yearsOnEarth / 29.447498);
  }
  onUranus(): number {
    return round(this.yearsOnEarth / 84.016846);
  }
  onNeptune(): number {
    return round(this.yearsOnEarth / 164.79132);
  }
}
