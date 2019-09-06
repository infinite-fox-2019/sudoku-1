"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    const board = []
    console.log(this.board_string)

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
    console.log(board)
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())
