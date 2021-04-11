function greatestCommonDivisor(n1: number, n2: number): number {
  const maxFactor = Math.max(n1, n2);
  const isFactor = (n: number, factor: number) => n % factor === 0;
  for (var factor = maxFactor; factor > 0; factor--) {
    const isCommonFactor = (factor: number) =>
      isFactor(n1, factor) && isFactor(n2, factor);
    if (isCommonFactor(factor)) {
      return factor;
    }
  }

  // should never happen - 1 is a factor of everything
  return 1;
}

/**
 * Perform a binary search to calculate the square root of a value.
 * Iterations limited to 1000
 * @param n The number to calculate the square root of
 */
function sqrt(n: number) {
  // The maximum number of decimals is 17
  //https://www.w3schools.com/js/js_numbers.asp

  var min = 0;
  var max = 10;
  const mid = (min: number, max: number) => (min + max) / 2;
  const sq = (n: number) => n * n;
  var guess = mid(min, max);
  const maxIter = 1000;
  var iter = 0;
  for (; sq(guess) !== n; guess = mid(min, max)) {
    iter++;
    if (iter >= maxIter) {
      console.log("Too many iterations!");
      console.log(`sqrt(${n}) ~ ${mid} ??`);
      break;
    }
    if (sq(max) < n) {
      // TODO - Possible boundary case if srqt(max) is requested?

      // is max to small?
      min = max;
      max *= 2;
      // go round the loop
    }

    const midSq = sq(guess);
    if (midSq < n) {
      // console.log(`${mid} < sqrt(${n}) < ${max}`);
      min = guess;
    } else {
      // console.log(`${min} < sqrt(${n}) < ${mid}`);
      // min < sqrt(n) < mid
      max = guess;
    }
  }
  // console.log(`DEBUG: sqrt(${n}) iterations: ${iter}`);
  return guess;
}

export default class Rational {
  constructor(private numerator: number, private denominator: number) {
    this.reduceFactors();
    this.ensurePositiveDenominator();
  }

  private reduceFactors() {
    const gcd = greatestCommonDivisor(this.numerator, this.denominator);
    this.numerator /= gcd;
    this.denominator /= gcd;
  }

  private ensurePositiveDenominator() {
    if (this.denominator < 0) {
      this.numerator *= -1;
      this.denominator *= -1;
    }
  }

  add(other: Rational): Rational {
    const n1 = this.numerator * other.denominator;
    const n2 = other.numerator * this.denominator;
    return new Rational(n1 + n2, this.denominator * other.denominator);
  }

  sub(other: Rational) {
    // subtracting is equivalent to addition of other * -1
    const negated = new Rational(other.numerator * -1, other.denominator);
    return this.add(negated);
  }

  mul(other: Rational) {
    const newNumerator = this.numerator * other.numerator;
    const newDenominator = this.denominator * other.denominator;
    return new Rational(newNumerator, newDenominator);
  }

  div(other: Rational) {
    // division by x is equivalent to multiplication of 1/x
    return this.mul(new Rational(other.denominator, other.numerator));
  }

  abs() {
    // denominator will never be negative
    return new Rational(Math.abs(this.numerator), this.denominator);
  }

  exprational(exponent: number) {
    return new Rational(
      Math.pow(this.numerator, exponent),
      Math.pow(this.denominator, exponent)
    );
  }

  expreal(n: number): number {
    const a = Math.pow(n, this.numerator);
    // use language optimisation to avoid rounding where possible.
    if (this.denominator === 2) {
      // return Math.sqrt(a);
      return sqrt(a);
    }
    if (this.denominator === 3) {
      return Math.cbrt(a);
    }
    return Math.pow(a, 1 / this.denominator);

    // const expRational = this.exprational(exponent);
    // return expRational.numerator / expRational.denominator;
  }
}
