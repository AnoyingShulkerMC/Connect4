import chalk from "chalk"
var publicSessions = []
import Board from "./lib/Board.js"
import keypress from "keypress"
//import {createInterface } from "node:readline/promises"
var softdrop = false
//var rlInt = createInterface({ input: process.stdin, output: process.stdout })
const startingLevel = 1 //await rlInt.question("Select Starting Level: ")
var colors = [
  chalk.inverse.white,
  chalk.inverse.cyan,
  chalk.inverse.yellowBright,
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
    if(row < board.length - 1) continue
    for (var col = 0; col < this.board[row].length; col++) {
      if (this.piece &&
        this.piece.x <= col && col < this.piece.x + this.piece.tetro.length &&
        (this.board.length - this.piece.y - 1) <= row && row < (this.board.length - this.piece.y - 1) + this.piece.tetro.length && 
         this.piece.tetro[row - (this.board.length - this.piece.y - 1)][col - this.piece.x] !== 0) {
        if(this.elapsed < 125 || (375 < this.elapsed && this.elapsed < 500)) {
          ret += "  "
          continue
        }
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
board.setLevel(startingLevel)
keypress(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on("keypress", (_, key) => {
  if(!key) return
  switch (key.name) {
    case "a":
    case "left":
      board.piece.shift(-1)
      break;
    case "d":
    case "right":
      board.piece.shift(1)
      break;
    case "s":
    case "down":
      softdrop = true
      break
    case "space":
      board.hardDrop()
      break;
    case "z":
      board.rotCCW()
      break;
    case "w":
    case "up":
    case "x":
      board.rotCC()
      break;
    case "c":
      board.holdPiece()
      break;
    case "r":
      board = new Board(20, 10)
      board.nextPiece()
      board.setLevel(startingLevel)
  }
  if (key.name == "c" && key.ctrl) process.exit()
})
setInterval(() => {
  board.update(100, softdrop)
  softdrop = false
  console.clear()
  let a = []
  for (let i = 0; i < board.next.length; i++)a.push(board.next[i].name)
  console.log(board.toString() + "Next: " + a.join(",") + "\nHold: " + (board.hold == null ? "N/A" : board.hold.name) + "\nMoves Left: " + board.piece.moves + "\nLevel: " + board.level + ` (${board.dropRate} ms/cell)`)
},100)
