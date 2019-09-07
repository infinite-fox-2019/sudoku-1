'use strict'

class Sudoku {
  constructor (boardString) {
    this.string = boardString;
    this.awal= this.boardAwal();
    this.selesai = this.boardAwal();
  }


  boardAwal() {
    const arrayAwal= [];
 
    for (let i = 0; i < this.string.length; i += 9) {
      const temp = [];
      for (let j = i; j < i + 9; j++) {
        temp.push(+this.string[j])
      }
      arrayAwal.push(temp);
    }
    return arrayAwal;
  }

  solve () {
    const board = this.selesai;

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) {
          for (let number = 1; number <= 9; number++) {
            if (this.allChecked(row, col, number)) {
              board[row][col] = number;
              if (this.solve()) {
                return true;
              } else {
                board[row][col] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  getEmptyPosition (board) {
    const result = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          result.push([i, j, 0]);
        }
      }
    }
    return result;
  }

  checkRow (row, num) {
    for (let i = 0; i < 9; i++) {
      if (this.selesai[row][i] === num) {
        return true;
      }
    }
    return false;
  }

  checkCol (col, num) {
    for (let i = 0; i < 9; i++) {
      if (this.selesai[i][col] === num) {
        return true;
      }
    }
    return false;
  }

  checkBox (row, col, num) {
    const r = row - row % 3;
    const c = col - col % 3;
    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        if (this.selesai[i][j] === num) {
          return true;
        }
      }
    }
    return false;
  }

  allChecked (row, col, num) {
    return !this.checkRow(row, num) && !this.checkCol(col, num) && !this.checkBox(row, col, num);
  }
  board () {
    console.log(`Problem : ${this.string}\n`)
    for (let i = 0; i < 9; i++) {
      this.selesai[i] = this.selesai[i]
      this.awal[i] = this.awal[i]
    }
    for (let k = 3; k < 8; k += 4) {
      this.selesai.splice(k, 0)
      this.awal.splice(k, 0)
    }
    console.log(`Unsolved Sudoku :`)
    console.log(this.awal)
    console.log(`Solved Sudoku : `)
    console.log(this.selesai)
  }
}


var fs = require('fs')
var board_String = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split('\n')[0]

const game = new Sudoku(board_String)

// Remember: this will just fill out what it can and not "guess"
game.solve()

game.board()