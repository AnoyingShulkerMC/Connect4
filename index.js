import clui from "./lib/clui.js"
import keypress from "keypress"
import startGame from "./startGame.js"
process.stdin.setRawMode(true)

var a = (new clui()).addButton("Start", async () => {
  a.frozenInput = true
  console.clear()
  await startGame({
    startingLevel: 25,
    headStart: true
  })
  process.stdin.setRawMode(true)
  a.frozenInput = false
  process.stdin.on("keypress", a.onKeyPress.bind(a))
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