import chalk from "chalk"
export default class clui {
  constructor() {
    console.clear()
    this.components = []
    this.selectedOp = 0
    this.bgColor = chalk.inverse.cyan
    this.selectColor = chalk.cyan
    this.frozenInput = false
  }
  addText(text) {
    this.components.push({
      type: "text",
      text
    })
    this.render()
    return this
  }
  addButton(text, callback) {
    this.components.push({
      type: "button",
      text,
      callback
    })
    this.render()
    return this
  } 
  onKeyPress(_, key) {
    if (!key) return;
    if (this.frozenInput) return;
    switch (key.name) {
      case "up":
        this.selectedOp = Math.max(this.selectedOp - 1, 0)
        if (this.components[this.selectedOp].type == "text") this.selectedOp += (this.selectedOp == 0 ? 1 : -1)
        break;
      case "down":
        this.selectedOp = Math.min(this.selectedOp + 1, this.components.length - 1)
        if(this.components[this.selectedOp].type == "text") this.selectedOp += (this.selectedOp == this.components.length -1? -1 : 1)
        break;
      case "enter":
      case "return":
        switch (this.components[this.selectedOp].type) {
          case "button":
            this.components[this.selectedOp].callback()
            break;
        }
    }
    this.render()
  }
  render() {
    process.stdout.cursorTo(0, 0)
    for (var i = 0; i < this.components.length; i++) {
      var ret = "";
      ret += " ".repeat(findCenter(process.stdout.columns, this.components[i].text.length))
      ret += this.components[i].text
      ret += " ".repeat(process.stdout.columns - ret.length)

      process.stdout.clearLine(0)
      process.stdout.write(i == this.selectedOp ? this.selectColor(ret) : this.bgColor(ret))
      process.stdout.cursorTo(0)
      process.stdout.moveCursor(0, 1)
    }
  }
}
function findCenter(len, smallerLen) {
  return Math.floor((len - smallerLen)/2)
}