import { List } from "./List";

class Node<X> {
  next?: Node<X>;
  prev?: Node<X>;
  val: X;
  constructor(props: NodeProps<X>) {
    this.next = props.next;
    this.prev = props.prev;
    this.val = props.val;
  }

  push(val: X): Node<X> {
    this.next = new Node<X>({
      val,
      prev: this
    });
    return this.next;
  }

  unshift(val: X): Node<X> {
    this.prev = new Node<X>({
      val,
      next: this
    });
    return this.prev;
  }

  pop(): Node<X> | undefined {
    if (this.prev) {
      delete this.prev.next;
    }
    return this.prev;
  }

  shift(): Node<X> | undefined {
    if (this.next) {
      delete this.next.prev;
    }
    return this.next;
  }

  delete() {
    if (this.prev) {
      this.prev.next = this.next;
    }

    if (this.next) {
      this.next.prev = this.prev;
    }
  }
}

export default class LinkedListV3<X> implements List<X> {
  head?: Node<X>;
  tail?: Node<X>;

  private isLengthOne() {
    return this.head === this.tail;
  }
  private isEmpty(): boolean {
    return this.head === undefined;
  }
  initialEntry(val: X) {
    this.head = new Node<X>({
      val
    });
    this.tail = this.head;
  }

  push(val: X) {
    if (this.isEmpty()) {
      this.initialEntry(val);
    } else {
      this.tail = this.tail!.push(val);
    }
  }

  unshift(val: X): void {
    if (this.isEmpty()) {
      this.initialEntry(val);
    } else {
      this.head = this.head?.unshift(val);
    }
  }
  pop(): X | undefined {
    const val = this.tail?.val;
    if (this.isLengthOne()) {
      delete this.tail;
      delete this.head;
    } else {
      this.tail = this.tail?.pop();
    }
    return val;
  }

  shift(): X | undefined {
    const val = this.head?.val;
    if (this.isLengthOne()) {
      delete this.tail;
      delete this.head;
    } else {
      this.head = this.head?.shift();
    }
    return val;
  }

  delete(val: X): void {
    var next = this.head;

    while (next && val !== next.val) {
      next = next.next;
    }

    if (next && val === next.val) {
      next.delete();

      if (this.head === next) {
        this.head = next.next;
      }

      if (this.tail === next) {
        this.tail = next.prev;
      }
    }
  }

  count(): number {
    var count = 0;
    for (var next = this.head; next; next = next.next) {
      count++;
    }
    return count;
  }
}

interface NodeProps<X> {
  val: X;
  next?: Node<X>;
  prev?: Node<X>;
}
