"use strict"

class Sudoku {
  constructor(board_string) {
    this.boards = []
    this.kosong = []
    this.board(board_string)
    this.history = []
  }

  cekHorizontal(posisi, angka) {
    for(let i = 0 ; i<this.boards.length ; i++){
      if (this.boards[posisi[0]][i] == String(angka)){
        return false
      }
    }
    return true
  }

  cekVertikal(posisi, angka) {
    for(let i = 0 ; i<this.boards.length ; i++){
      if (this.boards[i][posisi[1]] == String(angka)){
        return false
      }
    }
    return true
  }

  cekKotak(posisi, angka) {
    let indexI =  Math.floor(posisi[0]/3)*3
    let indexJ =  Math.floor(posisi[1]/3)*3
    for(let i = indexI ; i<indexI+3 ; i++){
      for(let j = indexJ ; j<indexJ+3 ; j++){
        if (this.boards[i][j] == String(angka)){
          return false
        }
      }
    }
    return true
  }

  cetak(posisi, angka){
    this.boards[posisi[0]][posisi[1]] = String(angka)
  }

  hapus(posisi){
    this.boards[posisi[0]][posisi[1]] = " "
  }

  solve() {
    for(let i = 0 ; i<this.kosong.length ; i++){
      let num = 1
      while(num <= 10){
        if (num == 10){
          let now = this.history[this.history.length-1]
          while (now[2] == 9){
            this.hapus(now[0])
            this.history.pop()
            now = this.history[this.history.length-1]
        }
          num = now[2] + 1
          i = now[1]
          this.hapus(now[0])
          this.history.pop()
        }
        if (this.cekHorizontal(this.kosong[i], num) == false){
          num++
        }
        else if (this.cekVertikal(this.kosong[i], num) == false){
          num++
        }
        else if (this.cekKotak(this.kosong[i], num) == false){
          num++
        }
        else{
          this.cetak(this.kosong[i], num)
          this.history.push([this.kosong[i], i, num])
          break
        }
      }
      clearScreen()
      console.table(this.boards);
      sleep(300)
    }
  }

  // Returns a string representing the current state of the board
  board(board_string) {
    let count = 0
    for(let i = 0 ; i<9 ; i++){
      this.boards.push([])
      for(let j = 0 ; j<9 ; j++){
        if (board_string[count] == "0"){
          this.boards[i].push(" ")
          this.kosong.push([i, j])
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
