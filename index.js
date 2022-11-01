import chalk from "chalk"
var uIOhook;
var UiohookKey;
var uIoHookInitialized = false
import Board from "./lib/Board.js"
import keypress from "keypress"
import { EventEmitter } from "node:events";
try {
  ({ uIOhook, UiohookKey } = await import('uiohook-napi'))
  uIoHookInitialized = true
} catch {
  uIOhook = new EventEmitter() // placeholder
  uIOhook.start = () => { }
}
var softdrop = false
var messages = []
var elapsed = 0
const refreshRate = 50
//var rlInt = createInterface({ input: process.stdin, output: process.stdout })
const startingLevel = 10 //await rlInt.question("Select Starting Level: ")
var gameOver = false
var menuItem = 0
const boardOptions = {
  lock: 500
}
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
var board = new Board(20, 10, boardOptions)
board.nextPiece()
board.setLevel(startingLevel)
process.stdin.setRawMode(true)
keypress(process.stdin)
process.stdin.on("keypress", (_, key) => {
  if (!key) return
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
      if (board.gameOver) menuItem = Math.min(menuItem + 1, 1)
      softdrop = true
      break
    case "space":

      if (board.gameOver) {
        if (menuItem == 0) {// Restart

          board = new Board(20, 10, boardOptions)
          board.nextPiece()
          return board.setLevel(startingLevel)
        } else {
          process.exit(0)
        }
      }
      board.hardDrop()
      break;
    case "z":
      board.rotCCW()
      break;
    case "w":
    case "up":
    case "x":
      if (board.gameOver) menuItem = Math.max(menuItem - 1, 0)
      board.rotCC()
      break;
    case "c":
      board.holdPiece()
      break;
    case "r":
      board = new Board(20, 10, boardOptions)
      board.nextPiece()
      board.setLevel(startingLevel)
      break
  }
  if (key.name == "c" && key.ctrl) {
    //process.stdout.write('\x1bc')
    process.exit(0)
  }
})
process.on("exit", _ => {

  process.stdout.write("\x1b[?25h")
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
function createProgressbar(width, prog, max) {
  var ret = "["
  for (var i = 0; i < width; i++) {
    if (Math.floor(width * prog / max) >= i) ret += "="
    else ret += " "
  }
  return ret += "]"
}
function sleep(a) {
  return new Promise(r => setTimeout(r, a))
}
async function addGameState() {
  
  let a = []
  for (let i = 0; i < board.next.length; i++)a.push(board.next[i].name)
  process.stdout.cursorTo(0, 0)
  for (var row = 0; row < board.board.length; row++) {
    //await sleep(1000)
    var ret = ""
    if (row < board.length - 1) continue
    for (var col = 0; col < board.board[row].length; col++) {
      if (board.piece &&
        board.piece.x <= col && col < board.piece.x + board.piece.tetro.length &&
        (board.board.length - board.piece.y - 1) <= row && row < (board.board.length - board.piece.y - 1) + board.piece.tetro.length &&
        board.piece.tetro[row - (board.board.length - board.piece.y - 1)][col - board.piece.x] !== 0) {
        if (Math.floor(board.elapsed / 100) % 2 == 0 && (board.piece.tSpin || board.piece.miniTSpin)) {
          ret += "  "
          continue
        } // T-Spin animation
        ret += colors[board.piece.tetro[row - (board.board.length - board.piece.y - 1)][col - board.piece.x]]("  ")
        continue
      } // draw falling piece

      if (board.piece &&
        board.piece.x <= col && col < board.piece.x + board.piece.tetro.length &&
        (board.board.length - board.piece.y + board.piece.getDrop(20) - 1) <= row && row < (board.board.length - board.piece.y + board.piece.getDrop(20) - 1) + board.piece.tetro.length &&
        board.piece.tetro[row - (board.board.length - board.piece.y + board.piece.getDrop(20) - 1)][col - board.piece.x] !== 0 &&
        board.piece.getDrop(20) !== 0) {
        ret += ghostPieceColors[board.piece.tetro[row - (board.board.length - board.piece.y + board.piece.getDrop(20) - 1)][col - board.piece.x]]("  ")
        continue
      } // draw ghost piece
      if (row < board.length && board.board[row][col] == 0) {
        colors[board.board[row][col]]("  ")
          continue
      }
      ret += colors[board.board[row][col]]("  ")
    }
    //ret += (row == board.length - 1 ? "\n" + "-".repeat(board.width) : "") + "\n"
    
    process.stdout.clearLine(0)
    process.stdout.write(ret)
    process.stdout.cursorTo(0)
    process.stdout.moveCursor(0, 1)
  }
  process.stdout.clearScreenDown()
  process.stdout.write("Next: " + a.join(",") +
    "\nHold: " + (board.hold == null ? "N/A" : board.hold.name) +
    "\nLevel: " + board.level + ` (${board.dropRate} ms/cell)` +
    "\nLines Cleared: " + board.linesCleared +
    "\nScore: " + board.score.toString() +
    `\n${" " + " *".repeat(board.piece.moves > 0 ? board.piece.moves : 0)}` +
    `\n${createProgressbar(31, board.piece.lock, board.lockDelay)} ${board.lockDelay}ms` +
    `\n${messages.reduce((p, c) => p + "\n" + c[0], "")}`)
}
process.stdout.write("\x1b[?25l")
setInterval(async () => {
  process.stdout.cursorTo(0, 0)
  elapsed += refreshRate
  messages = messages.filter(a => a[1] + 1000 > elapsed)
  if (board.gameOver) {
    return console.log(`Game Over 
Score: ${board.score}
Lines Cleared: ${board.linesCleared}
Level Reached: ${board.level}
Press [SPACE] to select

${menuItem == 0 ? chalk.inverse.whiteBright("Restart") : "Restart"}
${menuItem == 1 ? chalk.inverse.whiteBright("Quit") : "Quit"}`)
  }
  board.update(refreshRate, softdrop)
  if (!uIoHookInitialized) softdrop = false
  for (var i = 0; i < board.lastStates.length; i++) {
    var state = board.lastStates.shift()
    var msg = ""
    if (state.flags & 1) msg += "T-spin " // Tspin
    else if (state.flags & 2) msg += "Mini T-Spin "
    msg += ["", "Single ", "Double ", "Triple ", "Tetris "][state.lines] + (state.scoreIncrease !== 0 ? `(+${((state.flags & 4) && state.lines !== 0) ? state.scoreIncrease * (2 / 3) : state.scoreIncrease})` : "")
    if (msg !== "") messages.push([msg, elapsed])
    if ((state.flags & 4) && state.lines !== 0) messages.push([`Back to Back (+${state.scoreIncrease * (1 / 3)})`, elapsed])

  }
  addGameState()
}, refreshRate)