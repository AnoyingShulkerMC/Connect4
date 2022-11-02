export default class clui {
  constructor() {
    this.components = []
  }
  addText(text) {
    this.components.push(["text", text])
    return this
  }
  addButton(text, callback) {

  } 
}