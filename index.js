import chalk from "chalk"
var publicSessions = []
import Board from "./lib/Board.js"
var colors = [
  chalk.inverse.white,
  chalk.inverse.cyan,
  chalk.inverse.yellow,
  chalk.inverse.magenta,
  chalk.inverse.green,
  chalk.inverse.red,
  chalk.inverse.blue,
  chalk.hex("#FFA500").inverse,
  chalk.inverse.grey
]
Board.prototype.toString = function () {
  var ret = ""
  for (var row = 0; row < this.board.length; row++) {
    for (var col = 0; col < this.board[row].length; col++) {
      if (this.piece &&
        this.piece.x <= col && col < this.piece.x + this.piece.tetro.length &&
        (this.board.length - this.piece.y - 1) <= row && row < (this.board.length - this.piece.y - 1) + this.piece.tetro.length && 
         this.piece.tetro[row - (this.board.length - this.piece.y - 1)][col - this.piece.x] !== 0) {
        ret += colors[this.piece.tetro[row - (this.board.length - this.piece.y - 1)][col - this.piece.x]](" ")
        continue
      }
      ret += colors[this.board[row][col]](" ")
    }
    ret += (row == this.length - 1 ? "\n" + "-".repeat(this.width) : "") + "\n"
  }
  return ret
}
var board = new Board(20, 10)
board.nextPiece()
for(var i = 0; i < 10; i ++)board.piece.hardDrop()
console.log(board.piece)
console.log(board.toString())