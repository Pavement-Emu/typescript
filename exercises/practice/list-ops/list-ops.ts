type Predicate<T> = (arg: T) => boolean;

function append<T>(arr: T[], val: T) {
  // the same as Array.append
  arr[arr.length] = val;
  return arr;
}

export default class List<T> implements Iterable<T> {
  constructor(private _values: T[] = []) {}
  [Symbol.iterator](): Iterator<T> {
    return this.iterate();
  }

  append(list: List<T>) {
    for (var entry of list) {
      append(this._values, entry);
    }
    return this;
  }

  concat(list: List<List<T>>) {
    for (var subList of list) {
      this.append(subList);
    }
    return this;
  }

  get values() {
    return this._values;
  }

  filter(predicate: Predicate<T>) {
    const filtered: T[] = [];

    for (const entry of this) {
      if (predicate(entry)) {
        append(filtered, entry);
      }
    }

    return new List(filtered);
  }

  length(): number {
    var length = 0;
    for (const _ of this) {
      length++;
    }
    return length;
  }

  map<R>(fn: (elem: T) => R): List<R> {
    const mapped: R[] = [];

    for (var elem of this) {
      append(mapped, fn(elem));
    }

    return new List(mapped);
  }

  foldl<X>(fn: Accumulator<T, X>, start: X) {
    var acc = start;

    for (const elem of this) {
      acc = fn(acc, elem);
    }

    return acc;
  }

  foldr<X>(fn: Accumulator<T, X>, start: X) {
    var acc = start;

    for (const elem of this.iterateReverse()) {
      acc = fn(acc, elem);
    }

    return acc;
  }

  reverse() {
    const reversed: T[] = [];

    for (const elem of this.iterateReverse()) {
      append(reversed, elem);
    }

    return new List(reversed);
  }

  private iterate() {
    const that = this;
    const iterator = function* (idx: number) {
      while (idx < that._values.length) {
        yield that._values[idx++];
      }
    };
    return iterator(0);
  }

  private iterateReverse() {
    const that = this;
    const iterator = function* (idx: number) {
      while (idx >= 0) {
        yield that._values[idx--];
      }
    };
    return iterator(this._values.length - 1);
  }
}

type Accumulator<T, X> = (acc: X, elem: T) => X;
