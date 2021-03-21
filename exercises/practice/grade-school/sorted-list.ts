// exported for testing
export class Node<T extends Object> {
  private _elements: T[] = [];
  private _children: Node<T>[] = [];
  private _parent?: Node<T>;

  get maxLength() {
    return 2;
  }

  get length(): number {
    return (
      this._elements.length +
      this.children.reduce((x: number, y: Node<T>) => x + y.length, 0)
    );
  }

  get elements() {
    return this._elements;
  }

  get children(): Node<T>[] {
    return this._children;
  }

  private split() {
    this._children.push(new Node<T>());
    this._children.push(new Node<T>());
  }

  private isFull() {
    return this.elements.length === this.maxLength;
  }

  private addToLeaf(element: T) {
    if (element < this.elements[0]) {
      this._children[0].add(element);
    } else {
      this._children[1].add(element);
    }
  }

  private median(element: T, left: T, right: T) {
    return [element, left, right].sort()[1];
  }

  get root(): Node<T> {
    if (this._parent) {
      return this._parent.root;
    } else {
      return this;
    }
  }
  /**
   * Add an element.
   * If adding an element results in splitting the node, this
   * may result in a new parent node.
   */
  add(element: T, addingToParent: boolean = false) {
    const hasLeaf = this.children.length > 0;
    if (!addingToParent && hasLeaf) {
      // add to a leaf node
      // find the appropriate leaf node
      //search
      this.children[1].add(element);
    } else if (this.isFull()) {
      const toSplit = [...this._elements, element].sort();
      const median = Math.floor(toSplit.length / 2);
      const medianElement = toSplit[median];

      // split
      const siblingRight = new Node<T>();
      // this is the new left node
      this._elements = toSplit.slice(0, median);
      siblingRight._elements = toSplit.slice(median + 1);

      if (!this._parent) {
        // create a new parent
        this._parent = new Node<T>();
        this._parent._children.push(this);
      }

      // Add the median to the parent node
      this._parent.add(medianElement, true);

      // set the parent of the new sibling
      siblingRight._parent = this._parent;
      this._parent._children.push(siblingRight);
    } else {
      // add to this node
      this._elements.push(element);
      this._elements.sort();
    }
  }

  toString() {
    const elements: string = `element => [${this.elements.join(",")}]`;
    const fmtChildren: string = this.children
      .map((child) => child.toString())
      .map((child) => `() => ${child}`)
      .join(",");
    const children: string = `children => { ${fmtChildren} } `;

    return `${elements} : ${children}
    `;
  }

  toArray(): T[] {
    if (this.children.length > 0) {
      // does not cater for 3 children
      if (this.children.length === 2) {
        const left = this.children[0].toArray();
        const right = this.children[1].toArray();
        return [...left, ...this.elements, ...right];
      } else {
        // length should be 3 max
        const left = this.children[0].toArray();
        const centre = this.children[1].toArray();
        const right = this.children[2].toArray();
        // console.log("left,centre,right");
        return [
          ...left,
          this.elements[0],
          ...centre,
          this.elements[1],
          ...right
        ];
      }
    } else {
      return this.elements;
    }
  }
}

// B-Tree implementation
export class SortedList<T> {
  private root: Node<T>;
  private _length: number = 0;

  constructor() {
    this.root = new Node();
  }

  add(element: T) {
    this.root.add(element);
    this.root = this.root.root;
    this._length += 1;
  }

  get length() {
    return this._length;
  }

  toArray() {
    return this.root.toArray();
  }
}
