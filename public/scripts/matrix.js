function Matrix(matrix) {
  this.rows = matrix.length;
  this.cols = matrix[0].length;
  this.matrix = matrix;
}

Matrix.prototype.add = function (n) {

  let resultArray = [];

  for (let i = 0; i < this.rows; i++) {
    let row = [];
    for (let j = 0; j < this.cols; j++) {
      row[j] = 0;
    }
    resultArray[i] = row;
  }

  let result = new Matrix(resultArray);

  if (n instanceof Matrix) {
    // Element Wise
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        result.matrix[i][j] += this.matrix[i][j] + n.matrix[i][j];
      }
    }
  } else {
    // Scalar Addition
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        result.matrix[i][j] += this.matrix[i][j] + n;
      }
    }
  }

  return result;
}

Matrix.prototype.subtract = function (n) {

  let resultArray = [];

  for (let i = 0; i < this.rows; i++) {
    let row = [];
    for (let j = 0; j < this.cols; j++) {
      row[j] = 0;
    }
    resultArray[i] = row;
  }

  let result = new Matrix(resultArray);

  if (n instanceof Matrix) {
    // Element Wise
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        result.matrix[i][j] += this.matrix[i][j] - n.matrix[i][j];
      }
    }
  } else {
    // Scalar Subtraction
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        result.matrix[i][j] += this.matrix[i][j] - n;
      }
    }
  }

  return result;
}

Matrix.prototype.multiply = function (n) {

  let result = new Matrix(this.matrix);

  if (n instanceof Matrix) {
    // Matrix Product
    if (this.cols !== n.rows) {
      console.log('Columns of A must match rows of B')
      return undefined;
    }
    let a = this;
    let b = n;
    let resultArray = [];

    for (let i = 0; i < a.rows; i++) {
      let row = []
      for (let j = 0; j < b.cols; j++) {
        row[j] = 0;
      }
      resultArray[i] = row;
    }

    result = new Matrix(resultArray);

    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.matrix[i][k] * b.matrix[k][j];
        }
        result.matrix[i][j] = sum;
      }
    }
  } else {

    let resultArray = [];

    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row[j] = 0;
      }
      resultArray[i] = row;
    }

    result = new Matrix(resultArray);

    // Scalar Product
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        result.matrix[i][j] += this.matrix[i][j] * n;
      }
    }
  }
  return result;
}

Matrix.prototype.transpose = function () {

  let resultArray = [];

  for (let i = 0; i < this.cols; i++) {
    let row = []
    for (let j = 0; j < this.rows; j++) {
      row[j] = 0;
    }
    resultArray[i] = row;
  }

  let result = new Matrix(resultArray);

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      result.matrix[j][i] = this.matrix[i][j];
    }
  }
  return result;
}