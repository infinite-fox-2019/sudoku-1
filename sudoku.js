"use strict"
class Sudoku {
  constructor(board_string) {
    this.strBoard = board_string //Soal :)
    this.sudokuBoard = this.board() //boardSudoku
    this.emptyPosition = this.cekKosong() // cek Posisi kosong
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
  cekVertical(y, value){
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
    if (this.cekHorizontal(x, value) == true && this.cekVertical(y, value) == true && this.cekArea(x, y, value) == true) {
      return true
    } else {
      return false
    }
  }

  solve() {
    let temp = ''
    //CEK INPUT ANGKANYA, KETIKA ANGKANYA SUDAH TERPENUHI, DI KOORDINAT SELANJUTNYA AKAN AUTO RESET DARI 1
    //AMBIL INDEX PER INDEX DARI POSISI KOORDINAT YANG UDAH KITA CARI TADI, LOOP 1 PER 1
    for(let i = 0; i < this.emptyPosition.length; i++){
      let x = this.emptyPosition[i][0]
      let y = this.emptyPosition[i][1]
      if(this.sudokuBoard[x][y] == 0){
        for(let angkaSudoku = 1; angkaSudoku < 10; angkaSudoku++){
          this.clearScreen()
          console.log('---------- SUDOKU -----------');
          console.log(this.sudokuBoard); // ini untuk nampilin sudoku secara satu satu
          console.log(`\n${temp} koordinat ${x} dan ${y}`);
          console.log(` angka ${angkaSudoku} sudah ada belum?`);
          this.sleep(1000)
          
          if(this.cekValue(x, y, angkaSudoku) == true){
            // this.finalDisplay(this.sudokuBoard) // ini untuk nampilin hasil akhir
            this.clearScreen()
            this.sudokuBoard[x][y] = angkaSudoku // koordinat yang kosong di ubah jadi angka yang sudah dipilih
            console.log('---------- SUDOKU -----------');
            console.log(this.sudokuBoard); // ini untuk nampilin sudoku secara satu satu
            console.log(`\ninput angka ${angkaSudoku}`);
            this.sleep(1000)
            
            //Backtrack, animation process
            let track = this.solve() //TRUE? kalau iya jalanin koordinat selanjutnya : kalau engga 
            if(track == true){
              temp = ''
              return true
            } else {
              console.log(`\nangka ${angkaSudoku} salah!`);
              console.log(` kembali ke koordinat sebelumnya`); // angka sebelumnya di tambah 1 karna angka sudoku++
              this.sleep(6000)
              temp = 'kembali ke'
              this.sudokuBoard[x][y] = 0
              i-- // mundur ke history koordinat sebelumnya
            }
          }
        }
        return false
      }
    }
    return true
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
game.solve()
console.log(game.board)