"use strict"

class Sudoku {
  constructor(board_string) {
    this.quiz = board_string
    this.board = this.generateBoard()

  }

  generateBoard() {

    let board = []
    let counter = 0
    for (let i = 0; i < 9; i++) {
      let row = []
      for (let j = 0; j < 9; j++) {
        row[j] = Number(this.quiz[counter])
        counter++
      }
      board.push(row)
    }
    return board
  }

  solve() {

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 0) {
          for (let k = 1; k <= 9; k++) {
            if (this.checkAll(i, j, k)) {
              this.board[i][j] = k
              if (this.solve()) {
                return true
              } else {
                this.board[i][j] = 0
              }
            }
          }
          return false
        }
      }
    }
    return true
  }


  checkAll(row, col, val) {

    if (this.checkHorizontal(row, val) &&
      this.checkVertical(col, val) &&
      this.checkBlock(row, col, val)) {
      return true
    }

    return false
  }

  checkHorizontal(row, val) {

    for (let j = 0; j < this.board.length; j++) {
      if (this.board[row][j] === val) {
        return false
      }
    }
    return true
  }

  checkVertical(col, val) {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][col] === val) {
        return false
      }
    }
    return true
  }

  checkBlock(row, col, val) {

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        let currVal = this.board[i][j]
        if (Math.floor(i / 3) === Math.floor(row / 3) && Math.floor(j / 3) === Math.floor(col / 3) && val === currVal) {
          return false
        }
      }
    }
    return true
  }

  // Returns a string representing the current state of the board
  printBoard() {

    console.log('SUDOKU BOARD');

    let result = ''
    result += `-------------------------------\n`

    for (let i = 0; i < this.board.length; i++) {
      let row = '|'
      for (let j = 0; j < this.board[i].length; j++) {
        if ((j - 2) % 3 === 0) {
          row += ` ${this.board[i][j]} |`
        } else {
          row += ` ${this.board[i][j]} `
        }
      }
      if ((i - 2) % 3 === 0) {
        result += `${row}\n`
        result += `-------------------------------\n`
      } else {
        result += `${row}\n`

      }
    }
    return result
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')

for (let i = 0; i < 12; i++) {

  var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[i]

  var game = new Sudoku(board_string)

  game.solve()
  console.log('SOLVED ', i + 1);
  console.log(game.printBoard())
}


// Remember: this will just fill out what it can and not "guess"





