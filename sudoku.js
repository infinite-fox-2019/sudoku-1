"use strict"

class Sudoku {
  constructor(board_string) {
    this.str = board_string
    this.boardSudoku = []
    this.empty = []
    this.history =[]
    this.board(this.str)
  }

  // Returns a string representing the current state of the board
  board(str) {
    let count = 0
    for (let i=0; i<9; i++){
        this.boardSudoku.push([])
      for (let j=0; j<9; j++){
        if (this.str[count] == 0 ){
          this.boardSudoku[i].push(' ');
          this.empty.push([i,j])
        }
        else {
          this.boardSudoku[i].push(this.str[count])
        }
        count++
      }
    }
  }
  checkHorizontal(row,value){
    for (let j=0; j<this.boardSudoku.length; j++){
      if (this.boardSudoku[row][j] == value){
          return false
      }
    }
    return true;
  }
  checkVertical(col, value){
    for (let i=0; i<this.boardSudoku.length;  i++){
      if (this.boardSudoku[i][col] == value){
        return false
      }
    }
    return true
  }
  checkBox(row,col,value){
    let X = Math.floor(row/3)*3
    let Y = Math.floor(col/3)*3
    for (let i=X; i<X+3; i++) {
      for (let j=Y; j<Y+3; j++) {
        if (this.boardSudoku[i][j] == value){
          return false;
        }
      }
    }
    return true;
  }
  checkAll(col, row, value){
    if (this.checkVertical(row, value) && this.checkHorizontal(col, value) && this.checkBox(col, row, value)){
      return true;
    }
    else{
      return false;
    }
  }
  solve() {
    for (let i=0; i<this.empty.length; i++){
      for (let k=1; k<10 ; k++){
        if (this.checkAll(this.empty[i][0], this.empty[i][1], k)){
          this.history.push({
            row: this.empty[i][0],
            col: this.empty[i][1],
            val: k,
            index: i
          })
          this.boardSudoku[this.empty[i][0]][this.empty[i][1]] = String(k);
          break
        }
        while (k >= 9){
          k = this.history[this.history.length-1].val
          let row = this.history[this.history.length-1].row
          let col = this.history[this.history.length-1].col
          i = this.history[this.history.length-1].index
          this.boardSudoku[row][col] = ' '
          this.history.pop();
        }
      }
      console.clear()
      console.log(this.boardSudoku);
      this.sleep(250)
    }
  }
  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
        break;
        }
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
game.solve();

// console.log(game.board())
