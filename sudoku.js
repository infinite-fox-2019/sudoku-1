"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
  }

  cekKanan(array, posI, posJ, cekAngka) {
    for(let j = 0; j < array.length; j++){
      if(array[posI][j] == cekAngka){
        return false
      }
    }
    return true;
  }
  
  cekBawah(array, posI, posJ, cekAngka) {
    for(let i = 0; i < array.length; i++){
      if(array[i][posJ] == cekAngka){
        return false
      }
    }
    return true;
  }
  
  cekKotak(array, posI, posJ, cekAngka){
    for(let i = Math.floor(posI/3)*3; i < (Math.floor(posI/3)*3)+3; i++){
      for(let j = Math.floor(posJ/3)*3; j < (Math.floor(posJ/3)*3)+3; j++){
        if(array[i][j] == cekAngka){
          return false;
        }
      }
    }
    return true;
  }

  solve() {

    // Generate board sudoku 
    let array = []
    let counter = 0;
    for(let i = 0; i < 9; i++){
      array.push([]);
      for(let j = 0; j < 9; j++){
        if(this.board_string[counter] == '0'){
          array[i].push(0);
        }
        else{
          array[i].push(Number(this.board_string[counter]));
        }
        counter++;
      }
    }
    console.log(array)

    let histori = []

    for(let i = 0; i < array.length; i++){
      for(let j = 0; j < array[i].length; j++){
        if(array[i][j] == 0){
          for(let k = 1; k <= 9; k++){
            if(
              this.cekKanan(array, i, j, k) &&
              this.cekBawah(array, i, j, k) &&
              this.cekKotak(array, i, j, k)
            ) {
              array[i][j] = k
              histori.push({
                posI: i,
                posJ: j,
                value: k
              })
              break;
            }
            // if(k===9) {
            //   console.log('K Masuk');
            //   histori.pop();
            //   console.log(histori[histori.length-1]);
            //   // i = histori[histori.length-1].posI,
            //   // j = histori[histori.length-1].posJ,
            //   // k = histori[histori.length-1].value
            //   array[i][j] = ' ';
            //   console.log({i, j, k})
            //   console.log(histori[histori.length-1]);
            //   // break
            // }

          }
          // array[i][j] = `${k}`

        }
      }
    }

    console.log(array);
    console.log(histori);
  }

  // Returns a string representing the current state of the board
  board() {
    let board = [];
    let counter = 0;
    for(let i = 0; i < 9; i++){
      board.push([]);
      for(let j = 0; j < 9; j++){
        if(this.board_string[counter] == '0'){
          board[i].push(' ');
        }
        else{
          board[i].push(this.board_string[counter]);
        }
        counter++;
      }
    }
    return board;
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

// console.log(game.board())
