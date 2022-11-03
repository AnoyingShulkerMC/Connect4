import clui from "./lib/clui.js"
import keypress from "keypress"
import startGame from "./startGame.js"
process.stdin.setRawMode(true)
Number.prototype.between = function (a, b) {
  var min = Math.min(a, b),
    max = Math.max(a, b);

  return this > min && this < max;
};
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
    var milliseconds = (milli % 1000).toString();
    var seconds = Math.floor((milli / 1000) % 60).toString();
    var minutes = Math.floor((milli / (60 * 1000)) % 60);

    return minutes + ":" + seconds.padStart(2, "0") + "." + milliseconds.padStart(3, "0");
  }
  await startGame({
    startingLevel: 1,
    addInfo(board) {
      return `Time Remaining (${millisecondsToTime(120000 - board.elapsed)}) ${createProgressbar(31, 120000 - board.elapsed, 120000)}`
    },
    customGameOver(board) {
      return board.elapsed >= 120000
    },
    inDanger(board) {
      return board.elapsed >= 110000 || board.elapsed.between(60000, 61000) || board.elapsed.between(90000, 91000)
    },
    inImminentDanger(board) {
      return board.elapsed >= 110000 && Math.floor(board.elapsed/1000) % 2 == 1
    }
  })
  a.frozenInput = false
  process.stdin.setRawMode(true)
  console.clear()
  a.render()
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