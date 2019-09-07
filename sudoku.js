"use strict"

class Sudoku {
  constructor(board_string) {
    this.field = this.board(board_string);
    this.array_zero = this.save_index_zero()
  }

  solve() {

    for (var i = 0; i < this.array_zero.length; i++) {
      while(true) {
        let confirm_horizontal = this.check_horizontal(this.array_zero[i].num, this.array_zero[i].col)
        let confirm_vertical = this.check_vertical(this.array_zero[i].num, this.array_zero[i].row)
        let confirm_3x3 = this.check_3x3(this.array_zero[i].num, this.array_zero[i].col, this.array_zero[i].row)
        
        if (confirm_horizontal === true && confirm_vertical === true && confirm_3x3 === true) {
          this.field[this.array_zero[i].col][this.array_zero[i].row] = this.array_zero[i].num
          break;
        } else {
          this.array_zero[i].num++
        }
      }

    //   if(this.array_zero[i].num > 9) {
    //     this.field[this.array_zero[i].col][this.array_zero[i].row] = 0

    //     backtrack_loop: for (var k = i - 1; k >= 0; k--) {
    //       var difference = 9 - this.field[this.array_zero[k].col][this.array_zero[k].row]

    //       for (var m = 0; m < difference; m++) {
    //         this.array_zero[i].num++


    //       }
    //     }
    //   }
    // }
    return this.field

  }

  // Returns a string representing the current state of the board
  board(str) {
    let start_board = []
    let index_array = 0

    for (let i = 0; i < str.length; i+=9) {
      start_board.push([])
      for (let j = 0; j < 9; j++) {
        start_board[index_array].push(Number(str[i+j]))
      }
      index_array++
    }
    return start_board
  }

  save_index_zero() {
    let index_zero = []
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        if (this.field[i][j] === 0) {
          let obj = {
            col:i,
            row:j,
            num:1
          }
          index_zero.push(obj)
        } 
      }
    }
    return index_zero
  }

  check_horizontal(num, row) {
    for (let i = 0; i < this.field.length; i++) {
      if (this.field[row][i] === num) {
        return false
      }
    }
    return true
  }

  check_vertical(num, col){
    for (let i = 0; i < this.field.length; i++) {
      if (this.field[i][col] === num) {
        return false
      }
    }
    return true
  }

  check_3x3(num, start, limit_line) {
    let start_y = Math.floor(start/3) * 3
    let end_y = start_y + 2
    let start_x = Math.floor(limit_line/3) * 3
    let end_x = start_x + 2
    for (let i = start_y; i <= end_y; i++) {
      for (let j = start_x; j <= end_x; j++) {
        if (this.field[i][j] === num) {
          return false
        }
      }
    }
    return true
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
// game.solve() 
console.log();
console.log('Start = ');
console.log(game.field);
console.log();
console.log('Solved (no backtrack) = ');
console.log(game.solve());



