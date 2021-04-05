import LinkedList from "./linked-list";
import LinkedListLoop from "./linked-list-loop";
import LinkedListV3 from "./linked-list-v3";
import LinkedListExample from "./linked-list.example.ts";
import { List } from "./List";

type ListConstructor<X> = () => List<X>;

const suite = (type: string, ctor: ListConstructor<number>) => {
  describe(type, () => {
    it("add/extract elements to the end of the list with push/pop", () => {
      const list = ctor();
      list.push(10);
      list.push(20);
      expect(list.pop()).toBe(20);
      expect(list.pop()).toBe(10);
    });

    it("extract elements from the beginning of the list with shift", () => {
      const list = ctor();
      list.push(10);
      list.push(20);
      expect(list.shift()).toBe(10);
      expect(list.shift()).toBe(20);
    });

    it("add/extract elements from the beginning of the list with unshift/shift", () => {
      const list = ctor();
      list.unshift(10);
      list.unshift(20);
      expect(list.shift()).toBe(20);
      expect(list.shift()).toBe(10);
    });

    it("unshift/pop", () => {
      const list = ctor();
      list.unshift(10);
      list.unshift(20);
      expect(list.pop()).toBe(10);
      expect(list.pop()).toBe(20);
    });

    it("example", () => {
      const list = ctor();
      list.push(10);
      list.push(20);
      expect(list.pop()).toBe(20);
      list.push(30);
      expect(list.shift()).toBe(10);
      list.unshift(40);
      list.push(50);
      expect(list.shift()).toBe(40);
      expect(list.pop()).toBe(50);
      expect(list.shift()).toBe(30);
    });

    it("can count its elements", () => {
      const list = ctor();
      expect(list.count()).toBe(0);
      list.push(10);
      expect(list.count()).toBe(1);
      list.push(20);
      expect(list.count()).toBe(2);
    });

    it("sets head/tail after popping last element", () => {
      const list = ctor();
      list.push(10);
      list.pop();
      list.unshift(20);
      expect(list.count()).toBe(1);
      expect(list.pop()).toBe(20);
    });

    it("sets head/tail after shifting last element", () => {
      const list = ctor();
      list.unshift(10);
      list.shift();
      list.push(20);
      expect(list.count()).toBe(1);
      expect(list.shift()).toBe(20);
    });

    it("deletes the element with the specified value from the list", () => {
      const list = ctor();
      list.push(10);
      list.push(20);
      list.push(30);
      list.delete(20);
      expect(list.count()).toBe(2);
      expect(list.pop()).toBe(30);
      expect(list.shift()).toBe(10);
    });

    it("deletes the only element", () => {
      const list = ctor();
      list.push(10);
      list.delete(10);
      expect(list.count()).toBe(0);
    });

    it("delete does not modify the list if the element is not found", () => {
      const list = ctor();
      list.push(10);
      list.delete(20);
      expect(list.count()).toBe(1);
    });
  });
};

suite("LinkedList", () => new LinkedList<number>());
suite("LinkedList-Loop", () => new LinkedListLoop<number>());
suite("LinkedListV3", () => new LinkedListV3<number>());
suite("LinkedListExample", () => new LinkedListExample<number>());
