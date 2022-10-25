const lockDelay = 500
const kickJLSZT = [
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], // north facing
  [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]], // right
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] // south facing
  [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]] // left
]
const pieceI = {
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
  x: 4,
  y: 21,
  tetro: [
    [0, 2, 2],
    [0, 2, 2],
    [0, 0, 0]
  ],
  kick: []
}
const pieceT = {
  x: 4,
  y: 21,
  tetro: [
    [0, 3, 0],
    [3, 3, 3],
    [0, 0, 0]
  ],
  kick: kickJLSZT
}
const pieceS = {
  x: 4,
  y: 21,
  tetro: [
    [0, 4, 4],
    [4, 4, 0],
    [0, 0, 0]
  ],
  kick: kickJLSZT
}
const pieceZ = {
  x: 4,
  y: 21,
  tetro: [
    [5, 5, 0],
    [0, 5, 5],
    [0, 0, 0]
  ],
  kick: kickJLSZT
}
const pieceJ = {
  x: 4,
  y: 21,
  tetro: [
    [6, 0, 0],
    [6, 6, 6],
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
  constructor({ x, y, tetro, kick }, board) {
    /** @type {Board} */
    this.board = board
    /** @type {number} */
    this.pos = 0
    /** @type {number} */
    this.x = x
    /** @type {number} */
    this.y = y
    /** @type {Array<Array<number>>} */
    this.tetro = tetro
    /** @type {Array<Array<Array<number>>>} */
    this.kick = kick
    /** @type {number} */
    this.lock = 0 // in ms
  }
  /**
   * 
   * @param {boolean} CCW Whther to rotate the tetris piece counterclockwise
   */
  rotate(CCW) {
    var rotated = []
    if (CCW) {
      for (var row = 0; row < this.tetro.length; row++) {
        rotated[row] = []
        for (var col = 0; col < this.tetro[row].length; col++) {
          rotated[row][col] = this.tetro[this.tetro.length - col - 1][row]
        }
      }
    } else { // CW
      for (var row = 0; row < this.tetro.length; row++) {
        rotated[row] = []
        for (var col = 0; col < this.tetro[row].length; col++) {
          rotated[row][col] = this.tetro[col][this.tetro.length - row - 1]
        }
      }
    }
    var oldState = this.pos
    var newState = (this.pos + (CCW ? -1 : 1)) % 4
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
        return true
      }
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
    return i
  }
  stepDown(units = 1) {
    return this.y -= this.getDrop(units)
  }
  hardDrop() {
    this.y -= this.getDrop(20)
    this.board.addPiece(this)
  }
  shift(units = 0) {
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
 * 4 - Green  (S)
 * 5 - Red    (Z)
 * 6 - Blue   (J)
 * 7 - Orange (L)
 * 8 - Grey   (Garbage)
 */
export default class Board {
  constructor(len, width, seed = Date.now()) {
    this.dropRate = 1 // ms per cell
    this.secsRemaining = 1;
    this.board = Array(len * 2).fill().map(() => Array(width).fill(0));
    this.piece = null
    this.length = len;
    this.width = width
    this.rng = new PRNG(seed)
    this.next = []
  }
  getNext() {
    var next = []
  }
  hardDrop() { }
  rotCCW() {
    return this.piece
  }
  rotCC() { }

  setLevel(level = 1) {
    return this.dropRate = 1000*((0.8 - (level - 1) * 0.007)**(level - 1))
  }
  /**
   * 
   * @param {Piece} piece
   */
  addPiece(piece) {
    for (var row = 0; row < piece.tetro.length; row++) {
      for (var col = 0; col < piece.tetro[row].length; col++) {
        console.log(`Setting (${row}, ${ col }) -> (${this.board.length - row - piece.y - 1}, ${col + piece.x}) to ${piece.tetro[row][col]}`)
        if(piece.tetro[row][col] !== 0)this.board[row + (this.board.length - piece.y-1)][col + piece.x] = piece.tetro[row][col]
      }
    }
  }
  toString() {
    var ret = ""
    for (var row = 0; row < this.board.length; row++) {
      for (var col = 0; col < this.board[row].length; col++) {
        ret += this.board[row][col]
      }
      ret += (row == this.length - 1 ? "\n" + "-".repeat(this.width) : "") +"\n"
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
    if (xParam < 0 || yParam < 0) return false;
    for (var row = yParam; row < this.tetro.length; row++) {
      for (var col = xParam; col < this.tetro[row].length; col++) {
        if (row > this.len || col > this.width)
        if(this.board[row][col] !== 0 && tetro[row][col] !== 0) return false
      }
    }
    return true
  }
}