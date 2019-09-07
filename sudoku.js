"use strict"

class Sudoku {
  constructor(board_string) {
    this.papan = board_string
    this.result = this.board()
  }
  checkAll(board,row,column,angkSelanjutnya) {
    for(let i=0; i<9; i++){
      if(i!==row && board[i][column]===angkSelanjutnya){
        return false
      }
    }
    for(let j=0; j<9; j++){
      if(j!==column && board[row][j]===angkSelanjutnya){
        return false
      }
    }

    let baris = Math.floor(row/3) * 3
    let kolom = Math.floor(column/3) * 3

    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(i!==row && j!==column && board[baris+i][kolom+j]===angkSelanjutnya){
          return false
        }
      }
    }
    return true
  }
  solve(board) {
    for(let row=0; row<9; row++){
      for(let col=0; col<9; col++){
        if(board[row][col]!==0){
          continue
        }
        for(let angkaMasukkan=1; angkaMasukkan<=9; angkaMasukkan++){
          if(this.checkAll(board,row,col,angkaMasukkan)===true){
            board[row][col] = angkaMasukkan
            let check = this.solve(board)

            if(check===true){
              return true
            }
            board[row][col] = 0
          }
        }
        return false
      }
    }
    return true
  }
  // Returns a string representing the current state of the board
  board() {
    let result = []
    let count = 0
    for(let i=0; i<this.papan.length; i+=9){
      result.push([])
      for(let j=0; j<9; j++){
        result[count].push(Number(this.papan[i+j]))
      }
      count+=1
    }
    return result
  }
  solvedPuzzle(){
    this.solve(this.result)
  }
  final(){
    for(let i=0; i<9; i++){
      this.result[i].splice(3,0,'|')
      this.result[i].splice(7,0,'|')
      this.result[i] = this.result[i].join(' ')
    }
    this.result.splice(3,0,'_')
    this.result.splice(7,0,'_')
    console.log(this.result.join('\n'))
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
game.solvedPuzzle()
game.final()