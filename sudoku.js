"use strict"

class Sudoku {
  constructor(board_string) {
    this.boards = board_string 
    
  }

  
  solve() {
    let display = this.board()
    
  } 

  horizontal() {
    let display = this.board()
    let lib = '123456789'
    let libRemain = ''
    for (let i=0; i<display.length; i++) {
      for (let j=0; j<lib.length; j++) {
        if (display[i].indexOf(lib[j]) === -1) {
          libRemain += lib[j]
        }
      }
    }
    // console.log(libRemain);
    return libRemain
  }
  

  // Returns a string representing the current state of the board
  board() {
    let papan = []
    let idx = 0
    for (let i=0; i<9; i++) {
      papan.push([])
      for (let j=0; j<9; j++) {
        if (this.boards[idx] === '0') {
          papan[i].push(' ')
        } else {
          papan[i].push(this.boards[idx])
        }
        idx++
      }
    }
    return papan;
  }
}
// board()

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log(game.board())
console.table(game.horizontal())

