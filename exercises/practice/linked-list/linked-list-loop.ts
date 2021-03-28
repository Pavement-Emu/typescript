// export interface List<X> {
//   push: (val: X) => void;
//   unshift: (val: X) => void;
//   pop: () => X | undefined;
//   shift: () => X | undefined;
//   delete: (val: X) => void;
//   count: () => number;
// }
import { List } from "./List";

class Node<X> {
  constructor(private val: X, public next?: Node<X>) {}

  push(val: X) {
    if (this.next) {
      this.next.push(val);
    } else {
      this.next = new Node(val);
    }
  }

  pop(): X {
    if (this.next) {
      if (this.next.isLast) {
        const lastValue = this.next.val;
        delete this.next;
        return lastValue;
      } else {
        return this.next.pop();
      }
    } else {
      return this.val;
    }
  }

  deleteNext() {
    delete this.next;
  }

  get hasNext() {
    return this.next !== undefined;
  }

  get value() {
    return this.val;
  }

  get isLast(): boolean {
    return !this.next;
  }
}

export default class LinkedList<X> implements List<X> {
  head?: Node<X>;
  length: number = 0;

  push(val: X) {
    if (this.head) {
      this.head.push(val);
    } else {
      this.head = new Node(val);
    }
  }

  unshift(val: X) {
    this.head = new Node(val, this.head);
  }

  shift() {
    const val = this.head!.value;
    this.head = this.head?.next;
    return val;
  }

  pop() {
    if (this.head?.isLast) {
      const val = this.head.value;
      delete this.head;
      return val;
    } else {
      return this.head?.pop();
    }
  }

  delete(value: X) {
    var last: Node<X>, current;
    current = this.head;
    while (current && current?.value !== value) {
      last = current;
      current = current.next;
    }

    if (current === this.head) {
      this.shift();
    } else {
      last!.next = current?.next;
    }
  }

  count() {
    var len = 0;
    for (var next = this.head; next; next = next.next) {
      len++;
    }
    return len;
  }
}
