"use strict"
class Sudoku {
  constructor(board_string) {
    this.strBoard = board_string //Soal :)
    this.sudokuBoard = this.board() //boardSudoku
    this.emptyPosition = this.cekKosong() // cek Posisi kosong
    // this.display = '' //FAILED animation
  }

  //Buat Bordnya dulu biar ga pusing
  board() {
    let tables = []
    let counter = 0
    for(let i = 0; i < 9; i++){
      tables.push([])
      for(let j = 0; j < 9; j++){
        tables[i].push(Number(this.strBoard[counter]))
        counter++
      }
    }
    // console.log(tables);
    return tables
  }

  // Cekposisi yang value 0 di koordinat mana
  // hitung dari kanan kekiri, kalau udh dapet simpen dalem array koordinat ke X , Y atau i , j
  cekKosong(){
    let ZeroArr=[]
    for(let i = 0; i < this.sudokuBoard.length; i++){
      for(let j = 0; j < this.sudokuBoard.length; j++){
        if(this.sudokuBoard[i][j] === 0){
          ZeroArr.push([i,j])
        }
      }
    }
    // console.log(ZeroArr);
    return ZeroArr
  }

// CEK_HORIZONTAL
  cekHorizontal(x, value){
    for(let y = 0; y < this.sudokuBoard.length; y++){
      if(this.sudokuBoard[x][y] === value){
        return false
      }
    }
    return true
  }

  // CEK_VERTICAL
  cekCol(y, value){
    // console.log(this.sudokuBoard[0]);
    for(let x = 0; x < this.sudokuBoard.length; x++){
      if(this.sudokuBoard[x][y] === value){
        return false
      }
    }
    return true
  }

  // CEK_SQUARE-3X3
  cekArea(x, y, value){
    let row = 0
    let column = 0
    let squareCek = this.sudokuBoard[(Math.floor(x/3)*3)+row][(Math.floor(y/3)*3)+column]
    for(let i = 0; i<3; i++){
      for(let j = 0; j<3; j++){
        row = i
        column = j
        if(squareCek == value){
          return false
        }
      }
    }
    return true
  }

  cekValue(x, y, value){
    // console.log(value);
    return this.cekHorizontal(x, value) && this.cekCol(y, value) && this.cekArea(x, y, value)
  }

  solve() {
    //CEK INPUT ANGKANYA, KETIKA ANGKANYA SUDAH TERPENUHI, DI KOORDINAT SELANJUTNYA AKAN AUTO RESET DARI 1
    //AMBIL INDEX PER INDEX DARI POSISI KOORDINAT YANG UDAH KITA CARI TADI, LOOP 1 PER 1
    for(let i = 0; i < this.emptyPosition.length; i++){
      let x = this.emptyPosition[i][0]
      let y = this.emptyPosition[i][1]
      if(this.sudokuBoard[x][y] == 0){
        for(let angkaSudoku = 1; angkaSudoku < 10; angkaSudoku++){ 
          if(this.cekValue(x, y, angkaSudoku)){
            this.sudokuBoard[x][y] = angkaSudoku
            // this.finalDisplay(this.sudokuBoard)
            let track = this.solve()
            if(track == true){
                // console.log('masuk');
                return true
              }else{
                this.sudokuBoard[x][y] = 0
              }
          }
        }
        return false
      }
    }
    return true
  }

  // finalDisplay(bluePrint){
  //   this.display = bluePrint
  // }
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
console.log(game.sudokuBoard)