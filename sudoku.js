"use strict"

class Sudoku {
  constructor(board_string) {
    this.boards = []
    this.empty = []
    this.board = this.board(board_string)
    this.history = []
  }


  isHorizontalEmpty(position, number) {
    for(let i = 0 ; i < this.boards.length ; i++){
      if (this.boards[position[0]][i] === String(number)){
        return false
      }
    }
    return true
  }


  isVerticalEmpty(position, number) {
    for(let i = 0 ; i < this.boards.length ; i++){
      if (this.boards[i][position[1]] === String(number)){
        return false
      }
    }
    return true
  }


  isBoxEmpty(position, number) {
    let indexI =  Math.floor(position[0] / 3) * 3
    let indexJ =  Math.floor(position[1] / 3) * 3
    for(let i = indexI ; i < indexI + 3 ; i++){
      for(let j = indexJ ; j < indexJ + 3 ; j++){
        if (this.boards[i][j] == String(number)){
          return false
        }
      }
    }
    return true
  }


  copy(position, number){
    this.boards[position[0]][position[1]] = String(number)
  }


  remove(position){
    this.boards[position[0]][position[1]] = " "
  }


  solve() {
    for(let i = 0 ; i < this.empty.length ; i++){
      let num = 1
      while(num <= 10){
        if (num === 10){
          let current = this.history[this.history.length - 1]
          while (current[2] === 9){
            this.remove(current[0])
            this.history.pop()
            current = this.history[this.history.length - 1]
        }
          num = current[2] + 1
          i = current[1]
          this.remove(current[0])
          this.history.pop()
        }
        if (this.isHorizontalEmpty(this.empty[i], num) == false){
          num++
        }
        else if (this.isVerticalEmpty(this.empty[i], num) == false){
          num++
        }
        else if (this.isBoxEmpty(this.empty[i], num) == false){
          num++
        }
        else{
          this.copy(this.empty[i], num)
          this.history.push([this.empty[i], i, num])
          break
        }
      }
      clearScreen()
      console.table(this.boards)
      sleep(250)
    }
  }


  // Returns a string representing the current state of the board
  board(board_string) {
    let count = 0
    for(let i = 0 ; i < 9 ; i++){
      this.boards.push([])
      for(let j = 0 ; j<9 ; j++){
        if (board_string[count] == "0"){
          this.boards[i].push(" ")
          this.empty.push([i, j])
        }
        else{
          this.boards[i].push(board_string[count])
        }
        count++
      }
    }
  }
}



function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
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
  .split("\n")[1]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()