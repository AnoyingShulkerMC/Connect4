import chalk from "chalk"
var publicSessions = []
import Board from "./lib/Board.js"
import keypress from "keypress"
import { uIOhook, UiohookKey } from 'uiohook-napi'
var softdrop = false
var messages = []
var elapsed = 0
const refreshRate = 10
//var rlInt = createInterface({ input: process.stdin, output: process.stdout })
const startingLevel = 10 //await rlInt.question("Select Starting Level: ")
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
var ghostPieceColors = [
  chalk.inverse.whiteBright,
  chalk.inverse.cyanBright,
  chalk.inverse.yellowBright,
  chalk.inverse.magentaBright,
  chalk.inverse.greenBright,
  chalk.inverse.redBright,
  chalk.inverse.blueBright,
  chalk.hex("#FFD380").inverse,
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
        if(this.elapsed == 1 && (this.piece.tSpin || this.piece.miniTSpin)) {
          ret += "  "
          continue
        } // T-Spin animation
        ret += colors[this.piece.tetro[row - (this.board.length - this.piece.y - 1)][col - this.piece.x]]("  ")
        continue
      } // draw falling piece

      if (this.piece &&
        this.piece.x <= col && col < this.piece.x + this.piece.tetro.length &&
        (this.board.length - this.piece.y + this.piece.getDrop(20) - 1) <= row && row < (this.board.length - this.piece.y + this.piece.getDrop(20) - 1) + this.piece.tetro.length &&
        this.piece.tetro[row - (this.board.length - this.piece.y + this.piece.getDrop(20) - 1)][col - this.piece.x] !== 0 &&
        this.piece.getDrop(20) !== 0) {
        ret += ghostPieceColors[this.piece.tetro[row - (this.board.length - this.piece.y + this.piece.getDrop(20) - 1)][col - this.piece.x]]("  ")
        continue
      } // draw ghost piece
      
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
uIOhook.on("keydown", (key) => {
  if (!key) return
  switch (key.keycode) {
    case UiohookKey.A:
    case UiohookKey.ArrowLeft:
      board.piece.shift(-1)
      break;
    case UiohookKey.D:
    case UiohookKey.ArrowRight:
      board.piece.shift(1)
      break;
    case UiohookKey.S:
    case UiohookKey.ArrowDown:
      softdrop = true
      break
    case UiohookKey.Space:
      board.hardDrop()
      break;
    case UiohookKey.Z:
      board.rotCCW()
      break;
    case UiohookKey.W:
    case UiohookKey.ArrowUp:
    case UiohookKey.X:
      board.rotCC()
      break;
    case UiohookKey.C:
      board.holdPiece()
      break;
    case UiohookKey.R:
      board = new Board(20, 10)
      board.nextPiece()
      board.setLevel(startingLevel)
  }
  if (key.keycode == UiohookKey.C && key.ctrlKey) process.exit(1)
})
uIOhook.on("keyup", (key) => {
  if (!key) return
  switch (key.keycode) {
    case UiohookKey.S:
    case UiohookKey.ArrowDown:
      softdrop = false
      break
  }
})
uIOhook.start()
setInterval(() => {
  elapsed += refreshRate
  messages = messages.filter(a => a[1] + refreshRate > elapsed)
  console.clear()
  var state = board.update(refreshRate, softdrop)
  var msg = ""
  if (state.flags & 1) msg += "T-spin " // Tspin
  else if (state.flags & 2) msg += "Mini T-Spin "
  msg += ["", "Single", "Double", "Triple", "Tetris"][state.lines]
  if(msg !== "") messages.push([msg, elapsed])
  let a = []
  for (let i = 0; i < board.next.length; i++)a.push(board.next[i].name)
  console.log(board.toString() + "Next: " + a.join(",") + "\nHold: " + (board.hold == null ? "N/A" : board.hold.name) + "\nMoves Left: " + board.piece.moves + "\nLevel: " + board.level + ` (${board.dropRate} ms/cell)` + "\nScore: " + board.score.toString() + `\n${messages.reduce((p, c) => p + c[0], "" )}`)
},refreshRate)
