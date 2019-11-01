"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.board = this.makeBoard()
    this.printBoard = this.printBoard()
  }

  makeBoard() {
    let output = []
    let count = 0
    for (let i = 0; i < 9; i++) {
      let row = []
      for (let j = 0; j < 9; j++) {
        row.push(Number(this.board_string[count]))
        count++
      }
      output.push(row)
    }

    return output
  }

  solve() {

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 0) {


          for (let num = 0; num < 10; num++) {
            if (this.checkAll(num, i, j)) {
              this.board[i][j] = num
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

  checkRow(num, coorI) {

    for (let j = 0; j < this.board.length; j++) {
      if (this.board[coorI][j] === num) {
        return false
      }
    }

    return true
  }

  checkCol(num, coorJ) {

    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][coorJ] === num) {
        return false
      }
    }
    return true
  }

  checkBox(num, coorI, coorJ) {

    for (let i = Math.floor(coorI / 3) * 3; i < Math.floor(coorI / 3) * 3 + 3; i++) {
      for (let j = Math.floor(coorJ / 3) * 3; j < Math.floor(coorJ / 3) * 3 + 3; j++) {
        if (this.board[i][j] == num) {
          return false
        }
      }
    }
    return true
  }

  checkAll(num, coorI, coorJ) {
    if (this.checkRow(num, coorI) && this.checkCol(num, coorJ) && this.checkBox(num, coorI, coorJ)) {
      return true
    }
    return false
  }


  printBoard() {
    this.solve()
    let output = '=================================\n'
    output += '=======_______SUDOKU_______======\n'
    output += '=================================\n'


    this.board.forEach((el, i) => {
      output += el.join(' | ')
      output += '\n'
      if ((i + 1) % 3 === 0) {
        for (let j = 0; j < 33; j++) {
          output += '-'
        }
        output += '\n'
      }
    })

    return output
  }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')

for (let i = 0; i < 14; i++) {
  var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
    .toString()
    .split("\n")[i]

  var game = new Sudoku(board_string)
  console.log(`--------------(${i + 1})----------------`)
  console.log(game.printBoard);
  console.log('\n');
}


// Remember: this will just fill out what it can and not "guess"