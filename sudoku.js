"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.board = this.board();
  }

  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }

  cekKanan(array, posI, cekAngka) {
    for(let j = 0; j < array.length; j++){
      if(array[posI][j] == cekAngka){
        return false
      }
    }
    return true;
  }
  
  cekBawah(array, posJ, cekAngka) {
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

  cek(posI,posJ,cekAngka){
    let array = this.board
    if(this.cekKanan(array,posI,cekAngka) && this.cekBawah(array,posJ,cekAngka) && this.cekKotak(array,posI,posJ,cekAngka)){
      return true
    }
    return false;
  }

  posKosong(array){
    let output = []
    for(let i = 0; i < array.length; i++){
      for(let j = 0; j < array[i].length; j++){
        if(array[i][j] == 0)output.push([i,j])
      }
    }
    return output;
  }

  cekClear(array){
    for(let i = 0; i < array.length; i++){
      for(let j = 0; j < array[i].length; j++){
        if(array[i][j] == 0){
          return false;
        }
      }
    }
    return true;
  }

  solve() {

    let array = this.board;
    let kosong = this.posKosong(array)
    let urutanPosKosong = 0

    while(!this.cekClear(array)){
      
      let row = kosong[urutanPosKosong][0]
      let col = kosong[urutanPosKosong][1]
      let num = array[row][col]

      for(let k = num; k <= 9; k++){        
        if(this.cek(row,col,k)){
          array[row][col] = k;
          urutanPosKosong++;
          break;
        }
        else if(k == 9){
          array[row][col] = 0
          urutanPosKosong--
        }
      }
    }
  }
  
  board() {
    let board = [];
    let counter = 0;
    for(let i = 0; i < 9; i++){
      board.push([]);
      for(let j = 0; j < 9; j++){
        if(this.board_string[counter] == '0'){
          board[i].push(0);
        }
        else{
          board[i].push(Number(this.board_string[counter]));
        }
        counter++;
      }
    }
    return board;
  }

  printBoard() {
    console.log(this.board);
  }
}

var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

game.solve()
game.printBoard()