"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.board = this.Generateboard()
  }

  solve(data) {
    
    this.clearScreen()
    console.table(data)
    this.sleep(1000)

    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if (data[i][j] == ' '){
          for(let z = 1; z <= 9; z++ ){
           if(this.cekAll(data,i,j,z)){
             data[i][j] = `${z}`
             if (this.solve(data)){
               return true
              } else {
               data[i][j] = ' '
              } 
            } 
          }
          return false          
        }
      }
    } 
    return true
}
  cekH (dataH, row, col, k){
    for (let i = 0; i < 9; i++){
      if ( dataH [row] [i] == k){
        return true
      }
    }
    return false
  }
  cekV (dataV, row, col, k){
    for (let i = 0; i < 9; i++){
      if ( dataV [i] [col] == k){
        return true
      }
    }
    return false
  }

  cekKotak (dataK, rowK, colK, k){
    for (let i = 0; i < 9; i++){
      const rowKotak3 = 3 * Math.floor(rowK / 3)
      const colKotak3 = 3 * Math.floor(colK / 3) 
      if ( dataK [rowKotak3] [colKotak3] == k){
        return true
      }
    }
    return false
  }

  cekAll (dataAll, rowAll, colAll, k ){
    if (this.cekH(dataAll, rowAll, colAll, k) ||
        this.cekV(dataAll, rowAll, colAll, k) || 
        this.cekKotak(dataAll, rowAll, colAll, k)){
          return false
      } else {
          return true
     }
  }

  // Returns a string representing the current state of the board
  Generateboard () { 
    let outBoard = []
    for (let i = 0; i<this.board_string.length; i+= 9){
      let tempBoard = []
        for (let j = 0; j<9;j++){
          if (this.board_string[i+j] == 0){
            tempBoard.push(' ')
          } else {  
            tempBoard.push(this.board_string[i+j])
          }
        }
        outBoard.push(tempBoard)
      }
      return outBoard
    }

  clearScreen() {
      // Un-comment this line if you have trouble with console.clear();
      // return process.stdout.write('\033c');
      console.clear();
  }
    
  sleep(milliseconds) {
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

let papan = game.Generateboard()
console.log(game.solve(papan))