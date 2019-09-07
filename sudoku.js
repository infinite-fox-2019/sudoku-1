"use strict"

class Sudoku {
  constructor(board_string) {
    this.fill = board_string
    this.field = this.generateBoard()
  }

  generateBoard() {
    const el = this.fill
    const board = []
    let count = 0

    for (let i = 0; i < 9; i++) {
      const row = []
      for (let j = 0; j < 9; j++) {
        row.push(Number(el[count]))
        count++
      }
      board.push(row)
    }

    return board
  }

  getEmptyPosition(arr) {
    const emptyPos = []
    for (let i = 0; i < arr.length; i++) {
      let row = arr[i]
      for (let j = 0; j < row.length; j++) {
        let empty = row[j]
        if (empty === 0) emptyPos.push([i, j])
      }
    }
    return emptyPos
  }

  solve(currentBoard) {
    const emptyPos = this.getEmptyPosition(this.field)
    let x = 0
    let y = 0

    for (let i = 0; i < emptyPos.length; i++) {
      x = emptyPos[i][0]
      y = emptyPos[i][1]
      let placeFound = false
      let putNumber = currentBoard[x][y] + 1

      while (!placeFound && putNumber <= 9) {
        if (this.checkAll(currentBoard, x, y, putNumber)) {
          currentBoard[x][y] = putNumber
          placeFound = true
        } else {
          putNumber++
        }
      }

      if (!placeFound) {
        currentBoard[x][y] = 0
        i -= 2
      }
    }

    return currentBoard
  }

  checkAll(board, row, col, num) {
    if (this.checkBlock(board, row, col, num) && this.checkVertical(board, col, num) && this.checkHorizontal(board, row, num)) {
      return true
    } else {
      return false
    }
  }

  checkBlock(board, x, y, num) {
    let row = x - x % 3
    let col = y - y % 3

    for (let i = row; i < row + 3; i++) {
      for (let j = col; j < col + 3; j++) {
        if (board[i][j] === num) return false
      }
    }
    return true
  }

  checkVertical(board, y, num) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][y] === num) return false
    }
    return true
  }

  checkHorizontal(board, x, num) {
    for (let i = 0; i < board.length; i++) {
      if (board[x][i] === num) return false
    }
    return true
  }
  // Returns a string representing the current state of the board
  board(arr) {
    console.log('')
    arr.forEach((el, i) => {
      if (i !== 0 && i % 3 === 0) console.log('|-----------|-----------|-----------|')
      console.log('| ' + el.join(' | ') + ' |')
    })
    console.log('')
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[12]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

const solved = game.solve(game.field)
// console.log(game.field)
game.board(solved)
