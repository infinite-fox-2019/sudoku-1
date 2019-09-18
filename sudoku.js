"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.board = this.board();
  }

  // For animation motion
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

  // Melakukan pengecekan ke kanan, 
  // dalam satu kolom
  cekKanan(array, posI, cekAngka) {
    for(let j = 0; j < array.length; j++){
      if(array[posI][j] == cekAngka){
        return false
      }
    }
    return true;
  }
  
  // Melakukan pengecekan ke bawah,
  // dalam satu baris
  cekBawah(array, posJ, cekAngka) {
    for(let i = 0; i < array.length; i++){
      if(array[i][posJ] == cekAngka){
        return false
      }
    }
    return true;
  }
  
  // Melakukan pengecekan didalam satu kotak 3x3
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

  // Melakukan pengecekan terhadap semua,
  // jika ketiga pengecekan sudah true,
  // maka fungsi ini akan mereturn true
  cek(posI,posJ,cekAngka){
    let array = this.board
    if(this.cekKanan(array,posI,cekAngka) && this.cekBawah(array,posJ,cekAngka) && this.cekKotak(array,posI,posJ,cekAngka)){
      return true
    }
    return false;
  }

  // Mencatat semua posisi kosong untuk melakukan trackback,
  // jika ditengah perjalanan menemukan angka yang tidak bisa masuk,
  // maka ia akan langsung kembali ke histori sebelumnya, 
  // dalam hal ini saya menggunakan lokasi kotak kosong sebelumnya yang jadi 
  // patokan dalam trackback algoritma
  posKosong(array){
    let output = []
    for(let i = 0; i < array.length; i++){
      for(let j = 0; j < array[i].length; j++){
        if(array[i][j] == 0)output.push([i,j])
      }
    }
    return output;
  }

  // Fungsi ini mempunyai tugas untuk mengecek,
  // apakah masih ada tempat yang kosong
  // pada board sudoku tersebut
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

  // Main fungsi dari class SUDOKU ini
  solve() {

    // Inisiasi board sudoku yang digunakan
    let array = this.board;
    // Menentukan tempat kosong yang ada didalam board sudoku tersebut,
    // semua kotak kosong yang ada, dicatat index arraynya 2D, 
    // dan dimasukkan kedalam array
    let kosong = this.posKosong(array)
    let urutanPosKosong = 0

    // Selama masih ada yang kotak kosong 
    // maka akan terus dilakukan pengecekan
    while(!this.cekClear(array)){
      
      this.clearScreen()
      console.log('\nSolving on progress ✧ ─=≡Σ((( つ•̀ω•́)つ\n');
      console.log(array);
      this.sleep(50)

      // Memulai pengecekan dari posKosong index 0
      let row = kosong[urutanPosKosong][0]
      let col = kosong[urutanPosKosong][1]
      let num = array[row][col]

      // Kotak kosong tersebut, dimasukkan angka 1-9 secara berurutan,
      // jika di cek dan sudah true, maka akan langsung dimasukkan
      for(let k = num; k <= 9; k++){        
        if(this.cek(row,col,k)){
          array[row][col] = k;
          urutanPosKosong++;
          break;
        }
        else if(k == 9){
          // Jika angka yang dicek sudah sampai 9, dan masih tidak cocok juga,
          // maka program akan melakukan proses trackback, kembali ke kotak kosong sebelumnya,
          // dan isi dari kotak sebelumnya, menjadi patokan looping untuk kotak kosong tersebut
          array[row][col] = 0
          urutanPosKosong--
        }
      }
    }
  }
  
  // Fungsi ini merupakan fungsi yang merubah kumpulan angka string,
  // menjadi papan sudoku array 2D
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

// Kode yang mengambil data untuk generate board SUDOKU
// yang belum terselesaikan
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[1]

var game = new Sudoku(board_string)


game.clearScreen()
console.log('\nSudoku ᕙ(＠°▽°＠)ᕗ\n');
game.printBoard()
game.sleep(5000)

game.solve()

game.clearScreen()
console.log('\nSudoku Solved, Yeay! ヾ(＠^∇^＠)ノ\n');
game.printBoard()
game.sleep(50)
console.log('\n');