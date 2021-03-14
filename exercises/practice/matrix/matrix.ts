function extractRows(matrix: string) {
  const matrixByRows: string[] = matrix.split("\n");
  const stringToNumber = (n: string) => Number.parseInt(n, 10);
  const rowToElements = (row: string) => row.split(" ");
  const elementsToNumbers = (elements: string[]) =>
    elements.map(stringToNumber);
  return matrixByRows.map(rowToElements).map(elementsToNumbers);
}

function extractColumn(rows: number[][], colIdx: number) {
  return rows.map((row) => row[colIdx]);
}

function extractColumns(rows: number[][]) {
  // matrices should have all rows the same length
  const totalColumns = rows.length;
  var columns: number[][] = [];
  for (var i: number = 0; i < totalColumns; i++) {
    const column = extractColumn(rows, i);
    columns.push(column);
  }
  return columns;
}

class Matrix {
  readonly rows: number[][] = [];
  readonly columns: number[][] = [[1]];
  constructor(matrix: string) {
    this.rows = extractRows(matrix);
    this.columns = extractColumns(this.rows);
  }
}

export default Matrix;
