"use strict";

class Sudoku {
  constructor(board_string) {}

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    let board = []
    let counter = 0
    let temp = []
    for (let i = 0; i < board_string.length; i++) {
      if (counter < 8){
        temp.push(board_string[i])
        counter++
      } else {
        temp.push(board_string[i])
        board.push(temp)
        temp = []
        counter = 0
      }
    }
    for (let i = 0; i< board.length; i++){
      for (let j = 0; j< board[i].length; j++){
        if (board[i][j]==="0"){
          board[i][j] = " "
        }
      }
    }
    console.log(board)
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

console.log(game.board());
