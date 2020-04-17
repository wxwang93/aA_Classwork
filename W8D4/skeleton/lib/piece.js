/**
 * Initializes the Piece with its color.
 */
function Piece (color) {
  this.color = color
}

/**
 * Returns the color opposite the current piece.
 */
Piece.prototype.oppColor = function () {
  if (this.color === 'white') {
    return 'black'
  } else {
    return 'white'
  }
};

/**
 * Changes the piece's color to the opposite color.
 */
Piece.prototype.flip = function () {
  // debugger;
  return this.color = this.oppColor();
};

/**
 * Returns a letter representation of the string
 * based on its color.
 */
Piece.prototype.toString = function () {
  // debugger;
  let arr = (this.color).split("");
  return arr[0].toUpperCase();
};

module.exports = Piece;
