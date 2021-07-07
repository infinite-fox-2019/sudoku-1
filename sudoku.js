"use strict"

class Sudoku {
  constructor(board_string) {
    this.str = board_string
    this.boards = []
    this.empties = []
    this.histories = []
    this.board(board_string)
  }

  

  //[[x, y], [x, y]]

  vertikal(posJ, value) {
    for (let i=0; i<9; i++) {
      if (this.boards[i][posJ] == String(value)) {
        return false 
      }
    }
    return true
  }

  horizontal(posI, value) {
    for (let i=0; i<9; i++) {
      if (this.boards[posI][i] == String(value)) {
        return false 
      }
    }
    return true
  }

  box (posI, posJ, value) {
    let rumusI = Math.floor(posI/3)*3
    let rumusJ = Math.floor(posJ/3)*3
    for (let i=rumusI; i<rumusI+3; i++) {
      for (let j=rumusJ; j<rumusJ+3; j++) {
        if (this.boards[posI][posJ] == String(value)) {
          return false
        }
      }
    }
    return true
  }
  
  all (posI, posJ, value) {
    if (this.vertikal(posJ, value) && this.horizontal(posI, value) && this.box(posI, posJ, value)) {
      return true
    } else {

      return false
    }
  }

  solve() {
    for (let i=0; i<this.empties.length; i++) {
      for (let k=1; k<10; k++) {
        if (this.all(this.empties[i][0], this.empties[i][1], k)) {
          this.histories.push({
            posI: this.empties[i][0],
            posJ: this.empties[i][1],
            value: k,  
            index: i
          })
          this.boards[this.empties[i][0]][this.empties[i][1]] = String(k)
          break
        }
        if (k===9) {
            k = this.histories[this.histories.length-1].value
            let posI = this.histories[this.histories.length-1].posI
            let posJ = this.histories[this.histories.length-1].posJ
            i = this.histories[this.histories.length-1].index
            this.boards[posI][posJ] = ' '
            this.histories.pop()
        }
      }
    }
    console.table(this.boards);
     
    // clearScreen()
    // console.table(this.boards)
    // sleep(500)
  } 

  // Returns a string representing the current state of the board
  board(board_string) {
    let idx = 0
    for (let i=0; i<9; i++) {
      this.boards.push([])
      for (let j=0; j<9; j++) {
        if (this.str[idx] === '0') {
          this.boards[i].push(' ')
          this.empties.push([i, j])
        } else {
          this.boards[i].push(this.str[idx])
        }
        idx++
      }
    }
    return this.boards
  }

}

function clearScreen() {
  console.clear()
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
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

// console.table(game.board())










