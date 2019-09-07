"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string
    this.history = []
    this.board = []
    this.newGame()
    this.empty = []
    this.findEmpty()
  }

  newGame(){
    let start = []
    let string = this.boardString
    for(let i=0 ; i<string.length ; i+=9){
    let penampung = []
      for(let j=i ; j<9+i ; j++){
      penampung.push(string[j])
      }
    this.board.push(penampung)
    }
  }

  findEmpty(){
    let sudokuArr = this.board
    let empty = []
    for(let i=0; i<sudokuArr.length ; i++){
      for(let j=0 ; j<sudokuArr.length ; j++){
        if(sudokuArr[i][j] === '0'){
          this.empty.push([i,j])
        }
      }
    }
  }

  horizontalCheck(posI, posJ, value, boards){
    for(let j=0 ; j<9 ; j++){
      if(boards[posI][j] == String(value)){
        return false
      }
    }
    return true
  }

  verticalCheck(posI, posJ, value, boards){
    for(let i=0 ; i<9 ; i++){
      if(boards[i][posJ] == String(value)){
        return false
      }
    }
    return true
  }

  gridCheck(posI, posJ, value, boards){
    let row = Math.floor(posI/3) * 3
    let column = Math.floor(posJ/3) *3
    for(let i = 0 ; i<3 ; i++){
      for(let j=0 ; j<3 ;  j++){
        if(boards[i][j]==String(value)){
          return false
        }
      }
    }
    return true
  }

  isOkay(posI, posJ, value, boards){
    if(this.horizontalCheck(posI, posJ, value, boards) == false || this.verticalCheck(posI, posJ, value, boards) == false || this.gridCheck(posI, posJ, value, boards) == false ){
      return false
    } else{
      return true
    }
  }

  insertNum(posI, posJ, value){
    this.board[posI][posJ] = String(value)
  }

  deleteNum(posI, posJ){
    this.board[posI][posJ] = '0'
  }

  solveNaive() {
    for(let i =0 ; i<this.empty.length; i++){
      let num = 1
      while(num <= 9){
        if(this.isOkay(this.empty[i][0], this.empty[i][1], num, this.board) == false){
          num ++
        } else {
          this.insertNum(this.empty[i][0], this.empty[i][1], num)
        }
      }
      clearScreen()
      console.log(this.board)
      sleep(400)
    }
  }


  solveBacktrack() {
    for(let i =0 ; i<this.empty.length; i++){
      let num = 1
      while(num <= 9){
        if(this.isOkay(this.empty[i][0], this.empty[i][1], num, this.board) == false){
          num ++
        } else {
          this.insertNum(this.empty[i][0], this.empty[i][1], num)
          this.history.push([this.empty[i], i, String(num)])
          break
        }
        if(num > 9 ){
          let finalArr = this.history[this.history.length-1]
          while(finalArr[2] == '9'){
            this.deleteNum(finalArr[0][0], finalArr[0][1])
            this.history.pop()
          }
          num = finalArr[2]+1
          i=finalArr[1]
          this.deleteNum(finalArr[0][0], finalArr[0][1])
          this.history.pop()
        }
      }
      clearScreen()
      console.log(this.board)
      sleep(400)
    }
  }

  // Returns a string representing the current state of the board

}

function clearScreen(){
  console.clear()
}

function sleep (milliseconds) {
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
console.log(game.solveBacktrack())

// Remember: this will just fill out what it can and not "guess"
// game.solve()

// console.log(game.board())


// 105802000090076405200400819019007306762083090000061050007600030430020501600308900
// put the numbers into arrays 9x9
// set number (1-9)
// horizontal check
// vertical check
// box check
// fill in the 0
// print the board
