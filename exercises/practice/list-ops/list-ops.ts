type Predicate<T> = (arg: T) => boolean;

class ListIterator<T> implements Iterator<T> {
  idx: number = 0;
  constructor(private obj: List<T>) {}
  next(): IteratorResult<T> {
    const lastIdx = this.obj.values.length;
    return {
      done: this.idx >= lastIdx,
      value: this.obj.values[this.idx++]
    };
  }
}

function append<T>(arr: T[], val: T) {
  // the same as Array.append
  arr[arr.length] = val;
  return arr;
}

export default class List<T> implements Iterable<T> {
  constructor(private _values: T[] = []) {}
  [Symbol.iterator](): Iterator<T> {
    return new ListIterator(this);
  }

  append(list: List<T>) {
    for (var entry of list._values) {
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

    for (const entry of this._values) {
      if (predicate(entry)) {
        append(filtered, entry);
      }
    }

    return new List(filtered);
  }

  length(): number {
    var length = 0;
    for (const _ of this._values) {
      length++;
    }
    return length;
  }

  map<R>(fn: (elem: T) => R): List<R> {
    const mapped: R[] = [];

    for (var elem of this) {
      // this is not efficient - compared to direct array access.
      mapped[mapped.length] = fn(elem);
      // mapped.append(new List([fn(elem)]));
    }

    return new List(mapped);
  }

  foldl<X>(fn: Accumulator<T, X>, start: X) {
    var acc = start;
    for (var elem of this._values) {
      acc = fn(acc, elem);
    }

    return acc;
  }

  foldr<X>(fn: Accumulator<T, X>, start: X) {
    var acc = start;
    for (var i = this._values.length - 1; i >= 0; i--) {
      const elem = this._values[i];
      acc = fn(acc, elem);
    }

    return acc;
  }

  reverse() {
    const reversed = [];

    for (var i = this._values.length - 1; i >= 0; i--) {
      reversed[reversed.length] = this._values[i];
    }

    return new List(reversed);
  }
}

type Accumulator<T, X> = (acc: X, elem: T) => X;
