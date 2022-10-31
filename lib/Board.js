

const tSpinScoring = [400, 800, 1200, 1600]
const normalLineClear = [0, 100, 300, 500, 800]
const mstScoring = [100, 200]
const kickJLSZT = [
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], // north facing
  [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]], // right
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], // south facing
  [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]] // left
]
const pieceI = {
  name: "I",
  x: 2,
  y: 22,
  tetro: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  kick: [
    [[0, 0], [-1, 0], [2, 0], [-1, 0], [2, 0]],
    [[-1, 0], [0, 0], [0, 0], [0, 1], [0, -2]],
    [[-1, 1], [1, 1], [-2, 1], [1, 0], [-2, 0]],
    [[0, 1], [0, 1], [0, 1], [0, -1], [0, 2]],
  ]
}

const pieceO = {
  name: "O",
  x: 3,
  y: 21,
  tetro: [
    [0, 2, 2],
    [0, 2, 2],
    [0, 0, 0]
  ],
  kick: [[[0, 0]], [[0, -1]], [[-1, -1]], [[-1, 0]]]
}
const pieceT = {
  name: "T",
  x: 3,
  y: 21,
  tetro: [
    [0, 3, 0],
    [3, 3, 3],
    [0, 0, 0]
  ],
  kick: kickJLSZT
}
const pieceS = {
  name: "S",
  x: 3,
  y: 21,
  tetro: [
    [0, 4, 4],
    [4, 4, 0],
    [0, 0, 0]
  ],
  kick: kickJLSZT
}
const pieceZ = {
  name: "Z",
  x: 3,
  y: 21,
  tetro: [
    [5, 5, 0],
    [0, 5, 5],
    [0, 0, 0]
  ],
  kick: kickJLSZT
}
const pieceJ = {
  name: "J",
  x: 3,
  y: 21,
  tetro: [
    [6, 0, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],
  kick: kickJLSZT
}
const pieceL = {
  name: "L",
  x: 3,
  y: 21,
  tetro: [
    [0, 0, 7],
    [7, 7, 7],
    [0, 0, 0]
  ],
  kick: kickJLSZT
}
const bag = [pieceI, pieceO, pieceT, pieceS, pieceZ, pieceJ, pieceL]
class Piece {
  /**
   * 
   * @param {object} param0
   * @param {number} x The spawn X coordinate
   * @param {number} y The spawn Y coordinate
   * @param {Array<Array<number>>} tetro The shape of the piece
   * @param {Array<Array<number>>} kick The kick data of the piece.
   * @param {Board} board
   */
  constructor({ x, y, tetro, kick, name }, board) {
    /** @type {boolean} */
    this.miniTSpin = false;
    /** @type {boolean} */
    this.tSpin = false;
    /** @type {string} */
    this.name = name;
    /** @type {Board} */
    this.board = board
    /** @type {number} */
    this.pos = 0
    /** @type {number} */
    this.x = x
    /** @type {number} */
    this.y = y
    /** @type {number} */
    this.origX = x
    /** @type {number} */
    this.origY = y
    /** @type {Array<Array<number>>} */
    this.tetro = tetro
    /** @type {Array<Array<Array<number>>>} */
    this.kick = kick
    /** @type {number} */
    this.lock = board.lockDelay // in ms
    /** @type {number} */
    this.moves = 15
    /** @type {boolean} */
    this.moved = false;
    /** @type {number} */
    this.lowestLine = y
  }
  /**
   * 
   * @param {boolean} CCW Whther to rotate the tetris piece counterclockwise
   */
  rotate(CCW) {
    const tSpinTable = [
      [[0, 0], [2, 0], [0, 2], [2, 2]],
      [[0, 2], [2, 2], [0, 0], [2, 0]],
      [[2, 2], [0, 2], [2, 0], [0, 0]],
      [[0, 2], [0, 0], [2, 2], [2, 0]]
    ]
    this.moved = true
    this.moves--
    var rotated = []
    if (CCW) {
      for (var row = 0; row < this.tetro.length; row++) {
        rotated[row] = []
        for (var col = 0; col < this.tetro[row].length; col++) {
          rotated[row][col] = this.tetro[col][this.tetro.length - row - 1]
        }
      }
    } else { // CW
      for (var row = 0; row < this.tetro.length; row++) {
        rotated[row] = []
        for (var col = 0; col < this.tetro[row].length; col++) {
          rotated[row][col] = this.tetro[this.tetro.length - col - 1][row]
        }
      }
    }
    var oldState = this.pos
    var newState = (this.pos + (CCW ? 3 : 1)) % 4
    for (var i = 0; i < this.kick[0].length; i++) {
      if (this.board.moveValid(
        this.x + this.kick[oldState][i][0] - this.kick[newState][i][0],
        this.y + this.kick[oldState][i][1] - this.kick[newState][i][1],
        rotated
      )) {
        this.x += this.kick[oldState][i][0] - this.kick[newState][i][0]
        this.y += this.kick[oldState][i][1] - this.kick[newState][i][1]
        this.tetro = rotated
        this.pos = newState
        if (this.name == "T") {
          this.tSpin = this.board.board[tSpinTable[this.pos][0][1] + (this.board.board.length - this.y - 1) > this.board.board.length ? this.board.length - 1 : tSpinTable[this.pos][0][1] + (this.board.board.length - this.y - 1)][tSpinTable[this.pos][0][0] + this.x] !== 0 &&
            this.board.board[tSpinTable[this.pos][1][1] + (this.board.board.length - this.y - 1) > this.board.board.length ? this.board.length - 1 : tSpinTable[this.pos][1][1] + (this.board.board.length - this.y - 1)][tSpinTable[this.pos][1][0] + this.x] !== 0 &&
            (this.board.board[tSpinTable[this.pos][2][1] + (this.board.board.length - this.y - 1) > this.board.board.length ? this.board.length - 1 : tSpinTable[this.pos][2][1] + (this.board.board.length - this.y - 1)][tSpinTable[this.pos][2][0] + this.x] !== 0 ||
            this.board.board[tSpinTable[this.pos][3][1] + (this.board.board.length - this.y - 1) > this.board.board.length ? this.board.length - 1 : tSpinTable[this.pos][3][1] + (this.board.board.length - this.y - 1)][tSpinTable[this.pos][3][0] + this.x] !== 0)
          this.miniTSpin = this.board.board[tSpinTable[this.pos][3][1] + (this.board.board.length - this.y - 1) > this.board.board.length ? this.board.length - 1 : tSpinTable[this.pos][3][1] + (this.board.board.length - this.y - 1)][tSpinTable[this.pos][3][0] + this.x] !== 0
            && this.board.board[tSpinTable[this.pos][2][1] + (this.board.board.length - this.y - 1) > this.board.board.length ? this.board.length - 1 : tSpinTable[this.pos][2][1] + (this.board.board.length - this.y - 1)][tSpinTable[this.pos][2][0] + this.x] !== 0
            && (this.board.board[tSpinTable[this.pos][1][1] + (this.board.board.length - this.y - 1) > this.board.board.length ? this.board.length - 1 : tSpinTable[this.pos][1][1] + (this.board.board.length - this.y - 1)][tSpinTable[this.pos][1][0] + this.x] !== 0
            || this.board.board[tSpinTable[this.pos][0][1] + (this.board.board.length - this.y - 1) > this.board.board.length ? this.board.length - 1 : tSpinTable[this.pos][0][1] + (this.board.board.length - this.y - 1)][tSpinTable[this.pos][0][0] + this.x] !== 0)
        }
        return true
      };
    }
    return false
  }
  getDrop(units = 0) {
    for (var i = 1; i <= units; i++) {
      if (!this.board.moveValid(
        this.x,
        this.y - i,
        this.tetro
      )) break;
    }
    return i - 1
  }
  stepDown(units = 1) {
    return this.y -= this.getDrop(units)
  }
  hardDrop() {
    this.y -= this.getDrop(20)
    this.board.addPiece(this)
  }
  shift(units = 0) {
    this.moved = true
    this.moves--
    if (this.board.moveValid(
      this.x + units,
      this.y,
      this.tetro
    )) {
      this.x += units
      return true
    }
    return false
  }
}
class PRNG {
  seed = 0;

  constructor(seed) {
    this.seed = seed;
  }

  Next() {
    this.seed++;
    let a = this.seed * 15485863;
    return (a * a * a % 2038074743) / 2038074743;
  }
}
/**
 * @typedef {number} TetrisBlock A tetris block
 * 0 - None
 * 1 - Cyan   (I)
 * 2 - Yellow (O)
 * 3 - Purple (T)
 * 4 - Red    (S)
 * 5 - Green  (Z)
 * 6 - Blue   (J)
 * 7 - Orange (L)
 * 8 - Grey   (Garbage)
 */
export default class Board {
  constructor(len, width, { seed = Date.now(), lock = 500 } = {}) {
    this.holded = false
    this.gameOver = false;
    this.lockDelay = lock
    this.lastStates = []
    /** @type {boolean} */
    this.b2b = false
    /** @type {number} */
    this.score = 0
    this.elapsed = 0
    this.dropRate = 1 // ms per cell
    this.secsRemaining = 1;
    this.board = Array(len * 2).fill().map(() => Array(width).fill(0));
    this.piece = null
    this.length = len;
    this.width = width
    this.rng = new PRNG(seed)
    this.hold = null
    this.level = 1
    this.linesCleared = 0

    var next1 = bag.slice()
    next1.sort(() => 0.5 - this.rng.Next())
    this.bag = next1
    this.next = []
    for (var i = 0; i < 5; i++) this.next.push(this.bag.shift())
  }
  newBag() {
    var next = bag.slice()
    next.sort(() => 0.5 - this.rng.Next())
    this.bag = next
  }
  update(delta, softDrop) { // delta in ms

    this.elapsed += delta
    this.secsRemaining -= softDrop ? delta * 20 : delta
    var dropDown = 0
    if (this.secsRemaining <= 0) {
      for (; this.secsRemaining <= 0; this.secsRemaining += this.dropRate) dropDown++
    }
    this.piece.stepDown(dropDown)
    if (this.piece.y < this.piece.lowestLine) this.piece.moves = 15
    this.piece.lowestLine = this.piece.y < this.piece.lowestLine ? this.piece.y : this.piece.lowestLine
    if (!this.moveValid(
      this.piece.x,
      this.piece.y - 1,
      this.piece.tetro
    )) {
      this.piece.lock -= delta
      if (this.piece.moves < 0) return this.addPiece(this.piece)
      if (this.piece.moved) {
        this.piece.moved = false;
        this.piece.lock = this.lockDelay
      }
      if (this.piece.lock <= 0) return this.addPiece(this.piece)
    }
    this.lastStates.push({
      lines: 0,
      flags: 0,
      scoreIncrease: 0
    })
    return {
      lines: 0,
      flags: 0,
      scoreIncrease: 0
    }
  }
  nextPiece() {
    var a = []
    for (var i = 0; i < 5; i++) a.push(this.next[i].tetro[1][1])
    var a = []
    for (var i = 0; i < this.bag.length; i++) a.push(this.bag[i].tetro[1][1])
    var piece = this.next.shift()
    this.piece = new Piece(piece, this)
    if (this.bag.length == 0) {
      this.newBag();
      //console.log("get new bag")
    }
    this.next.push(this.bag.shift())
  }
  hardDrop() {
    return this.piece.hardDrop()
  }
  rotCCW() {
    return this.piece.rotate(true)
  }
  rotCC() {
    return this.piece.rotate()
  }
  holdPiece() {
    if(this.holded) return
    if (this.hold == null) {
      this.piece.x = this.piece.origX
      this.piece.y = this.piece.origY
      while (this.piece.pos !== 0) this.piece.rotate()
      this.hold = this.piece
      this.nextPiece()
    } else {
      // Swap hold and current piece
      this.piece.x = this.piece.origX
      this.piece.y = this.piece.origY

      while (this.piece.pos !== 0) this.piece.rotate()
      var piece = new Piece(this.piece, this)
      var hold = new Piece(this.hold, this)
      this.piece = hold
      this.hold = piece
    }
  }

  setLevel(level = 1) {
    this.level = level
    this.secsRemaining = 1000 * ((0.8 - (level - 1) * 0.007) ** (level - 1))
    return this.dropRate = 1000 * ((0.8 - (level - 1) * 0.007) ** (level - 1))
  }
  /**
   * 
   * @param {Piece} piece
   */
  addPiece(piece) {
    this.holded = false
    for (var row = 0; row < piece.tetro.length; row++) {
      for (var col = 0; col < piece.tetro[row].length; col++) {
        //console.log(`Setting (${row}, ${col}) -> (${this.board.length - row - piece.y - 1}, ${col + piece.x}) to ${piece.tetro[row][col]}`)
        if (piece.tetro[row][col] !== 0) this.board[row + (this.board.length - piece.y - 1)][col + piece.x] = piece.tetro[row][col]
      }
    }
    var lines = 0
    for (var row = 0; row < this.board.length; row++) {
      if (this.board[row].every(a => a !== 0)) {
        this.board.splice(row, 1)
        this.board.unshift(Array(this.width).fill(0))
        lines++
        this.linesCleared++
        if (Math.floor(this.linesCleared / 10) > this.level - 1) this.setLevel(++this.level)
      }
    }
    var scoreIncrease = 0
    this.nextPiece()
    if (piece.tSpin) scoreIncrease += (tSpinScoring[lines] * (this.b2b && lines !== 0 ? 1.5 : 1)) * this.level
    else if (piece.miniTSpin) scoreIncrease += (mstScoring[lines] * (this.b2b && lines !== 0 ? 1.5 : 1)) * this.level 
    else if (lines !== 0) scoreIncrease += (normalLineClear[lines] * (this.b2b && lines == 4 ? 1.5 : 1)) * this.level
    this.score += scoreIncrease
    var wasb2b = this.b2b
    //console.log(lines)
    if ((piece.tSpin || piece.miniTSpin || lines == 4) && lines !== 0) this.b2b = true;
    else if (lines !== 0) this.b2b = wasb2b = false

    if (!this.moveValid(
      this.piece.x,
      this.piece.y,
      this.piece.tetro
    )) this.gameOver = true // Block out
    var row = piece.tetro.length - 1
    while (row == piece.tetro.length -1 || piece.tetro[row + 1].every(a => a == 0)) {

      for (var col = 0; col < piece.tetro.length; col++) {
        console.log(row + (this.board.length - piece.y - 1), piece.y)
        if (row + (this.board.length - piece.y - 1) < this.length && piece.tetro[row][col] !== 0) this.gameOver = true
      }
      row--
    } // Lock Out
    this.lastStates.push({
      lines,
      flags: piece.tSpin << 0 | piece.miniTSpin << 1 | wasb2b << 2 | this.gameOver << 3,
      scoreIncrease
    })
    return {
      lines,
      flags: piece.tSpin << 0 | piece.miniTSpin << 1 | wasb2b << 2 | this.gameOver << 3,
      scoreIncrease
    }
  }
  toString() {
    var ret = ""
    for (var row = 0; row < this.board.length; row++) {
      for (var col = 0; col < this.board[row].length; col++) {
        if (this.piece &&
          this.piece.x <= col && col < this.piece.x + this.piece.tetro.length &&
          (this.board.length - this.piece.y - 1) <= row && row < (this.board.length - this.piece.y - 1) + this.piece.tetro.length) {
          ret += this.piece.tetro[row - (this.board.length - this.piece.y - 1)][col - this.piece.x]
          continue
        }
        ret += this.board[row][col]
      }
      ret += (row == this.length - 1 ? "\n" + "-".repeat(this.width) : "") + "\n"
    }
    return ret
  }
  /**
   * 
   * @param {number} xParam
   * @param {number} yParam
   * @param {Array<Array<TetrisBlock>>} tetro
   */
  moveValid(xParam, yParam, tetro) {
    //console.log(xParam, yParam)
    for (var row = this.board.length - yParam - 1; row < tetro.length + this.board.length - yParam - 1; row++) {
      for (var col = xParam; col < tetro[0].length + xParam; col++) {
        if (tetro[row - this.board.length + yParam + 1][col - xParam] !== 0 && (row >= this.board.length || col >= this.width)) {
          return false
        } else if (row >= this.board.length || col >= this.width) {
          continue
        }
        //console.log(row, col, row - this.board.length + yParam + 1, col - xParam, this.board[row][col], tetro[row - this.board.length + yParam + 1][col - xParam])
        if (this.board[row][col] !== 0 && tetro[row - this.board.length + yParam + 1][col - xParam] !== 0) return false
      }
    }
    //console.log("yes")
    return true
  }
}