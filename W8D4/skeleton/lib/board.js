let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () { 
  let grid = new Array(8);

  for(let i = 0; i < grid.length; i++) {
    grid[i] = new Array(8)
  }
  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
  this.grid[3][3] = new Piece("white");
  this.grid[3][4] = new Piece("black");
  this.grid[4][3] = new Piece("black");
  this.grid[4][4] = new Piece("white");

}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x = pos[0]
  let y = pos[1]
  return this.grid[x][y]
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {

};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {

  let piece = this.getPiece(pos)
    if (piece) {
      return piece.color === color;
    } else {
      return false
    }
  //return this.isOccupied(pos) ? piece.color === color : false
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  let piece = this.getPiece(pos)
  !!piece
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let validFlag = true
  pos.forEach(el => {
    if (el > 7 || el < 0) {
      validFlag = false
    }
  })
  return validFlag
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
// 3,2
  
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  
  let x = pos[0] + dir[0]
  let y = pos[1] + dir[1]
  let newPos = [x,y]
    
  if (
        !board.isValidPos(newPos) || 
        !board.isOccupied(newPos) || 
        (piecesToFlip.length === 0 && board.isMine(newPos, color))
      ) {
    return null
  }
  
  if (board.isMine(newPos, color)) { 
    return piecesToFlip
  }
  piecesToFlip.push(Board.getPiece(newPos))


  _positionsToFlip(board, newPos, color, dir, piecesToFlip )

}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false
  }
  let moves = [];
  const board = this;

  // console.log(board.DIRS);
  // console.log("break here");
  // console.log(this.DIRS);
  // console.log(Board.DIRS);
  // console.log(this);
  Board.DIRS.forEach((dir) => {
    console.log(this)
    moves.push(_positionsToFlip(board, pos, color, dir, []))
  });
  return !!moves
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {

};

module.exports = Board;


  // tempArr
  // Board.DIRS.forEach(el => )

let board = new Board();

// function _positionsToFlip(board, pos, color, dir, piecesToFlip) {

