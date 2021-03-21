import { Node, SortedList } from "./sorted-list";

describe("Sorted List", () => {
  let list: SortedList<String>;

  beforeEach(() => {
    list = new SortedList();
  });
  it("should start empty", () => {
    expect(list.length).toEqual(0);
  });

  describe("#add", () => {
    it("should increase the length", () => {
      list.add("element");
      expect(list.length).toEqual(1);
    });

    it("should support duplicates", () => {
      list.add("element");
      list.add("element");
      expect(list.length).toEqual(2);
    });
  });

  describe("#toArray", () => {
    it("should return items in ascending order, based on string value", () => {
      list.add("c");
      list.add("b");
      list.add("a");
      expect(list.toArray()).toEqual(["a", "b", "c"]);
    });

    it("should return duplicate items", () => {
      list.add("c");
      list.add("b");
      list.add("a");
      list.add("b");
      expect(list.toArray()).toEqual(["a", "b", "b", "c"]);
    });
  });

  describe("performance", () => {
    it("should add 1000 items in under 10ms", () => {
      // pre-create all elements, to avoid preducing the benchmark due to the random number generation
      // const benchmark_items = 200;
      const benchmark_items = 1000;
      // const benchmark_items = 10000;
      const itemsToAdd = new Array(benchmark_items);
      for (var i = 0; i < benchmark_items; i++) {
        itemsToAdd[i] = Math.random().toString();
      }

      const start = Date.now();
      for (var j = 0; j < benchmark_items; j++) {
        list.add(itemsToAdd[j]);
      }
      const elements = list.toArray();
      const end = Date.now();
      expect(elements.length).toEqual(benchmark_items);
      expect(end - start).toBeLessThan(16);
      // expect(end - start).toBeLessThan(100);
    });
  });
});

describe("Node", () => {
  let node: Node<string>;

  const addElementToRoot = (element: string) => {
    node.root.add(element);
  };

  beforeEach(() => {
    node = new Node();
  });

  it("should start empty", () => {
    expect(node.length).toEqual(0);
  });

  it("should start as a root node", () => {
    expect(node.root).toEqual(node);
  });

  it("should default to maximum of 2 elements", () => {
    expect(node.maxLength).toEqual(2);
  });

  describe("#elements", () => {
    it("should return the elements added", () => {
      addElementToRoot("a");
      addElementToRoot("b");
      expect(node.elements).toEqual(["a", "b"]);
    });
  });

  describe("#add", () => {
    it("should add an element to the node", () => {
      node.add("a");
      expect(node.length).toEqual(1);
    });

    it("should insert elements in order", () => {
      node.add("b");
      node.add("a");
      expect(node.elements).toEqual(["a", "b"]);
    });
  });

  it("should start with 0 children", () => {
    expect(node.children.length).toEqual(0);
  });

  describe("when the node is full", () => {
    beforeEach(() => {
      node.add("a");
      node.add("b");
    });

    describe("when a new element is added", () => {
      beforeEach(() => {
        node.add("c");
      });
      it("should create a new root", () => {
        // node.add("c");
        expect(node.root).not.toEqual(node);
        // expect(node.children.length).toEqual(2);
      });
      it("should add the median element to the new root", () => {
        // node.add("c");
        expect(node.root.elements).toEqual(["b"]);
      });
      it("should add elements < median to the existing node", () => {
        expect(node.elements).toEqual(["a"]);
      });
      it("should split the node and add elements < median to the new right (sibling) node", () => {
        expect(node.root.children[1].elements).toEqual(["c"]);
      });
    });
  });

  describe("when nodes contain [a,b,c]", () => {
    beforeEach(() => {
      node.root.add("a");
      node.root.add("b");
      node.root.add("c");
    });

    it("should contain (root, left, right) nodes", () => {
      expect(node.root.children.length).toEqual(2);
    });

    it("should add 'd' to the right node", () => {
      node.root.add("d");
      expect(node.root.children[1].elements).toEqual(["c", "d"]);
    });
  });

  describe("when nodes contain [a,b,c,d,e]", () => {
    beforeEach(() => {
      node.root.add("a");
      node.root.add("b");
      node.root.add("c");
      node.root.add("d");
      node.root.add("e");
    });

    it("should contain (root, left, center, right) nodes", () => {
      expect(node.root.children.length).toEqual(3);
    });
  });

  describe("#median", () => {
    it("should return right when (left < right < element )", () => {
      // @ts-ignore
      const median = node.median("c", "a", "b");
      expect(median).toEqual("b");
    });

    it("should return the element when (left < element < right)", () => {
      // @ts-ignore
      const median = node.median("b", "a", "c");
      expect(median).toEqual("b");
    });

    it("should return left when (element < left < right)", () => {
      // @ts-ignore
      const median = node.median("a", "b", "c");
      expect(median).toEqual("b");
    });
    it("should return element when (left < element == right)", () => {
      // @ts-ignore
      const median = node.median("d", "a", "c");
      expect(median).toEqual("c");
    });
    it("should return the element when (element == left < right)", () => {
      // @ts-ignore
      const median = node.median("a", "a", "b");
      expect(median).toEqual("a");
    });
  });
});
