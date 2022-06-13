let mat = [
  [112, 42, 83, 119],
  [56, 125, 56, 49],
  [15, 78, 101, 43],
  [62, 98, 114, 108],
];

function flippingMatrix(matrix) {
  // Write your code here

  // primeiro somar todas as linhas
  let max_row = [];
  let max_col = [];
  for (let i = 0; i < 2; i++) {
    let row_total = 0;
    let col_total = 0;
    for (let k = 0; k < 2; k++) {
      // total de cada linha
      row_total += matrix[i][k];
      // total de cada coluna
      col_total += matrix[k][i];
    }
    // adicionada a array
    max_row.push(row_total);
    max_col.push(col_total);
  }
}

flippingMatrix(mat);
