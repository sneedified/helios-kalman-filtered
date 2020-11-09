function Matrix(matrix) {
  this.rows = matrix.length;
  this.cols = matrix[0].length;
  this.matrix = matrix;
}

Matrix.prototype.add = function (n) {

  if (n instanceof Matrix) {
    // Element Wise
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += n.matrix[i][j];
      }
    }
  } else {
    // Scalar Addition
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += n;
      }
    }
  }
}

Matrix.prototype.subtract = function (n) {

  if (n instanceof Matrix) {
    // Element Wise
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] -= n.matrix[i][j];
      }
    }
  } else {
    // Scalar Subtraction
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] -= n;
      }
    }
  }
}

Matrix.prototype.multiply = function (n) {

  if (n instanceof Matrix) {
    // Matrix Product
    if (this.cols !== n.rows) {
      console.log('Columns of A must match rows of B')
      return undefined;
    }
    let a = this;
    let b = n;
    var resultArray = [];

    for (let i = 0; i < a.rows; i++) {
      let row = []
      for (let j = 0; j < b.cols; j++) {
        row[j] = 0;
      }
      resultArray[i] = row;
    }

    let result = new Matrix(resultArray);

    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.matrix[i][k] * b.matrix[k][j];
        }
        result.matrix[i][j] = sum;
      }
    }
    return result;
  } else {
    // Scalar Product
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= n;
      }
    }
  }
}

Matrix.prototype.transpose = function () {

  var resultArray = [];

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