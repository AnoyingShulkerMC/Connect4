export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, () => {
    var t = 16 * Math.random() | 0;
    return ("x" == e ? t : 3 & t | 8).toString(16)
  })
}