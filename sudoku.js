"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.board = this.board();
  }

  solve() {
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        if(this.board[i][j] === ' ') {
          this.fillCell(i, j);
        }
      } 
    }
  }

  fillCell(x, y) {
    let solution = 0;
    for(let i = 1; i <= 9; i++) {
      if(this.validSolution(i, x, y)) {
        solution = i;
        break;
      }
      solution = ' ';
    }
    this.board[x][y] = solution + '';
  }

  validSolution(i, x, y) {
    let validHorizontal = this.validHorizontal(i, x);
    let validVertical = this.validVertical(i, y);
    let validBlock = this.validBlock(i, x, y);
    return validHorizontal && validVertical && validBlock;
  }

  validHorizontal(num, x) {
    for(let i = 0; i < this.board[0].length; i++) {
      if(this.board[x][i] === String(num)) {
        return false;
      }
    }
    return true;
  }

  validVertical(num, y) {
    for(let i = 0; i < this.board.length; i++) {
      if(this.board[i][y] === String(num)) {
        return false;
      }
    }
    return true;
  }

  validBlock(num, x, y) {
    let firstXInBlock = Math.floor(x / 3) * 3;
    let firstYInBlock = Math.floor(y / 3) * 3;
    for(let i = firstXInBlock; i < firstXInBlock + 3; i++) {
      for(let j = firstYInBlock; j < firstYInBlock + 3; j++) {
        if(this.board[i][j] === String(num)) {
          return false;
        }
      }
    }
    return true;
  }

  // Returns a string representing the current state of the board
  board() {
    let result = [];
    let row = 0;
    for(let i = 0; i < board_string.length; i += 9) {
      result[row] = [];
      for(let j = 0; j < 9; j++) {
        if(board_string[i + j] === '0') {
          result[row].push(' ');
        } else {
          result[row].push(board_string[i + j]);
        }
      }
      row++;
    } 
    return result;
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

console.log(game.board)