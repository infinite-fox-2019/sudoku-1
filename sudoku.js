"use strict";

class Sudoku {
  constructor(board_string) {}


  solve() {
    let board = this.board();
    
    let tracking = {
      i : '',
      j : '',
      value : ''
    } 


    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === " ") {
          for (let k = 1; k < 10; k++) {
            if (this.checkHorizontal(k, i, j, board)) {
              board[i][j] = String(k);
            }
          }
        }
      }
    }
    // break; 
    console.log(board);
  }

  checkHorizontal(input, row, col, board) {
    for (let i = 0; i < 9; i++) {
      let ver = Math.floor(row/3)*3 + Math.floor(i/3);
      let hor = Math.floor(col/3)*3 + i%3;

      if (board[row][i] == input || board[i][col] == input || board[ver][hor] == input) {
        return false;
      }
    }
    return true;
  }

  // Returns a string representing the current state of the board
  board() {
    let board = [];
    let counter = 0;
    let temp = [];
    for (let i = 0; i < board_string.length; i++) {
      if (counter < 8) {
        temp.push(board_string[i]);
        counter++;
      } else {
        temp.push(board_string[i]);
        board.push(temp);
        temp = [];
        counter = 0;
      }
    }
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "0") {
          board[i][j] = " ";
        }
      }
    }
    return board;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require("fs");
var board_string = fs
  .readFileSync("set-01_sample.unsolved.txt")
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
game.solve();
// game.numberGenerator();
// console.log(game.board());
