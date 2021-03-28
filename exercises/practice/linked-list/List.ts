export interface List<X> {
  push: (val: X) => void;
  unshift: (val: X) => void;
  pop: () => X | undefined;
  shift: () => X | undefined;
  delete: (val: X) => void;
  count: () => number;
}