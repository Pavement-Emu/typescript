import { List } from "./List";

class Node<X> {
  constructor(private val: X, public prev?: Node<X>, public next?: Node<X>) {}

  push(val: X) {
    this.next = new Node(val, this);
    return this.next;
  }

  pop(): X {
    const value = this.next!.value;
    delete this.next;
    return value;
  }

  get hasNext() {
    return this.next !== undefined;
  }

  get value() {
    return this.val;
  }
}

export default class LinkedList<X> implements List<X> {
  head?: Node<X>;
  tail?: Node<X>;

  private last() {
    return this.tail;
  }

  private penultimate() {
    return this.tail?.prev;
  }

  private isEmpty() {
    return this.count() === 0;
  }

  push(val: X) {
    if (this.isEmpty()) {
      this.head = new Node(val);
      this.tail = this.head;
    } else {
      this.tail = this.tail?.push(val);
    }
  }

  unshift(val: X) {
    const oldHead = this.head;
    this.head = new Node(val, undefined, oldHead);
    if (this.count() === 1) {
      this.tail = this.head;
    } else {
      oldHead!.prev = this.head;
    }
  }

  shift() {
    const val = this.head!.value;
    this.head = this.head?.next;
    return val;
  }

  popHead(): X {
    const val: X = this.head!.value;
    delete this.head;
    delete this.tail;
    return val;
  }

  pop() {
    if (this.count() === 1) {
      return this.popHead();
    }

    var penultimate = this.penultimate();
    this.tail = penultimate;
    return penultimate?.pop();
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
