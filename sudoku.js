'use strict'

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
  }

  checkAll(safeNumber) {
    const { board, row, col, input } = safeNumber
    for (let i = 0; i < 9; i++) {
      const j = 3 * Math.floor(col / 3) + i % 3
      const k = 3 * Math.floor(row / 3) + Math.floor(i / 3)
      if (board[row][i] == input || board[i][col] == input || board[k][j] == input) return false
    }
    return true
  }

  solve(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] == ' ') {
          for (let k = 1; k <= 9; k++) {
            const safeNumber = { board, row: i, col: j, input: k }
            if (this.checkAll(safeNumber)) {
              board[i][j] = `${safeNumber.input}`
              if (!this.solve(board)) {
                board[i][j] = ' '
              }             
            }
          }
          return
        }
      }
    }
    console.log(board)
  }

  // Returns a string representing the current state of the board
  board() {
    const board = []

    for (let i = 0; i < this.board_string.length; i += 9) {
      const temp = []
      for (let j = 0; j < 9; j++) {
        if (this.board_string[i + j] == 0) {
          temp.push(' ')
        } else {
          temp.push(this.board_string[i + j])
        }
      }
      board.push(temp)
    }

    return board
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs
  .readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split('\n')[1]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
const board = game.board()
console.log(game.solve(board))

