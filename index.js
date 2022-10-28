import chalk from "chalk"
var publicSessions = []
import Board from "./lib/Board.js"
import keypress from "keypress"
var softdrop = false
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
        ret += colors[this.piece.tetro[row - (this.board.length - this.piece.y - 1)][col - this.piece.x]]("  ")
        continue
      }
      ret += colors[this.board[row][col]]("  ")
    }
    ret += (row == this.length - 1 ? "\n" + "--".repeat(this.width) : "") + "\n"
  }
  return ret
}
var board = new Board(20, 10)
board.nextPiece()
board.board[39][3] = 8
board.setLevel(1)
keypress(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on("keypress", (_, key) => {

  switch (key.name) {
    case "left":
      board.piece.shift(-1)
      break;
    case "right":
      board.piece.shift(1)
      break;
    case "space":
      board.hardDrop()
      break;
    case "z":
      board.rotCCW()
      break;
    case "x":
      board.rotCC()
  }
  if (key.name == "c" && key.ctrl) process.exit()
})
setInterval(() => {
  board.update(500)
  console.clear()
  let a = []
  for (let i = 0; i < board.next.length; i++)a.push(board.next[i].name)
  console.log(board.toString() + "Next: " + a.join(","))
}, 500)
console.log(board.toString())