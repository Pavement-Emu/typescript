const outOfOrderItem = <x>(val: x, idx: number, obj: x[]) => {
  if (idx === 0) {
    return false;
  }
  // is this number smaller than the one previously
  return val < obj[idx - 1];
};

function recursiveSearch(n: number, arr: number[]): number {
  const middleIdx = Math.floor(arr.length / 2);

  if (n === arr[middleIdx]) {
    return middleIdx;
  }

  // anchor
  const notFound = -1;
  if (middleIdx === 0) {
    return notFound;
  }

  if (n < arr[middleIdx]) {
    const left = arr.slice(0, middleIdx);
    return recursiveSearch(n, left);
  } else {
    const right = arr.slice(middleIdx);
    const foundIdx = recursiveSearch(n, right);
    return foundIdx === notFound ? notFound : middleIdx + foundIdx;
  }
}

export default class BinarySearch {
  isOutOfOrder: any;

  constructor(private arr: number[]) {
    this.isOutOfOrder = arr.find(outOfOrderItem);
  }

  get array() {
    return this.isOutOfOrder ? undefined : this.arr;
  }

  indexOf(n: number) {
    return recursiveSearch(n, this.arr);
  }
}
