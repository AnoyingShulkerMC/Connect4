import clui from "./lib/clui.js"
import keypress from "keypress"
import startGame from "./startGame.js"
process.stdin.setRawMode(true)

var a = (new clui()).addButton("Marathon", async () => {
  a.frozenInput = true
  console.clear()
  await startGame({
    startingLevel: 10,
    headStart: true
  })
  process.stdin.setRawMode(true)
  a.frozenInput = false
  process.stdin.on("keypress", a.onKeyPress.bind(a))
  console.clear()
  a.render()
}).addButton("Blitz (2 mins)", async () => {
  a.frozenInput = true
  console.clear()
  function createProgressbar(width, prog, max) {
    var ret = "["
    for (var i = 0; i < width; i++) {
      if (Math.floor(width * prog / max) >= i) ret += "="
      else ret += " "
    }
    return ret += "]"
  }
  function millisecondsToTime(milli) {
    var milliseconds = milli % 1000;
    var seconds = Math.floor((milli / 1000) % 60);
    var minutes = Math.floor((milli / (60 * 1000)) % 60);

    return minutes + ":" + seconds + "." + milliseconds;
  }
  await startGame({
startingLevel: 10,
    addInfo(board) {
      return `Time Remaining (${millisecondsToTime(120000 - board.elapsed)}) ${createProgressbar(31, 120000 - board.elapsed, 120000)}`
    },
    customGameOver(board) {
      return board.elapsed >= 120000
    },
    inDanger(board) {
      return board.elapsed >= 110000
    },
    inImminentDanger(board) {
      return board.elapsed >= 115000 && Math.floor(board.elapsed/1000) % 2 == 1
    }
  })
}).addButton("Quit", process.exit)
a.render()
keypress(process.stdin)
process.stdin.on("keypress", a.onKeyPress.bind(a))
/*await startGame({
  startingLevel: 25,
  headStart: true
})
await startGame({
  startingLevel: 25,
  headStart: true
})
*/