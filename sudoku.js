 
"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudoBoard = []
    this.empties = []
    this.history = []
    this.board(board_string)
  }

  solve() {
    for(let i = 0 ; i < this.empties.length ; i++){
      let num = 1
      while(num <= 9){
        if (this.horizontalCheck(this.empties[i], num) == false){
          num++
        }
        else if (this.verticalCheck(this.empties[i], num) == false){
          num++
        }
        else if (this.boxCheck(this.empties[i], num) == false){
          num++
        }
        else{
          this.print(this.empties[i], num)
          this.history.push([this.empties[i], i, num])
          break
        }
        if (num == 10){
          let now = this.history[this.history.length-1]
          while (now[2] == 9){
            this.delete(now[0])
            this.history.pop()
            now = this.history[this.history.length-1]
          }
          num = now[2] + 1
          i = now[1]
          this.delete(now[0])
          this.history.pop()
        }
      }
      clearScreen()
      console.table(this.sudoBoard);
      sleep(300)
    }
  }

  horizontalCheck(pos, num) {
    for (let i = 0; i < this.sudoBoard.length; i++) {
      if (this.sudoBoard[pos[0][i]] == String(num)) {
        return false
      }
    }
    return true
  }

  verticalCheck(pos, num) {
    for(let i = 0 ; i < this.sudoBoard.length ; i++){
      if (this.sudoBoard[i][pos[1]] == String(num)){
        return false
      }
    }
    return true
  }

  boxCheck(pos, num) {
    let indexI =  Math.floor(pos[0]/3)*3
    let indexJ =  Math.floor(pos[1]/3)*3
    for(let i = indexI; i < indexI + 3; i++){
      for(let j = indexJ; j < indexJ + 3; j++){
        if (this.sudoBoard[i][j] == String(num)){
          return false
        }
      }
    }
    return true
  }

  print(pos, num) {
    this.sudoBoard[pos[0]][pos[1]] = String(num)
  }

  delete(pos) {
    this.sudoBoard[pos[0]][pos[1]] = " "
  }

  // Returns a string representing the current state of the board
  board(board_string) {
    // generate board and get the empty locations
    let count = 0
    for(let i = 0 ; i < 9 ; i++){
      this.sudoBoard.push([])
      for(let j = 0 ; j < 9 ; j++){
        if (board_string[count] == "0"){
          this.sudoBoard[i].push(" ")
          this.empties.push([i, j])
        }
        else{
          this.sudoBoard[i].push(board_string[count])
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
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()
