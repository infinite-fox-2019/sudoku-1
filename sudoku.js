"use strict"
let history = []
let checker = 0;

class Sudoku {
  constructor(board_string) {
    this.string = board_string;
    this.obj = this.generateBoard(this.string);
    this.unsolvedBoard = this.generateBoard(this.string).board;
    this.empty = this.generateBoard(this.string).empty;
  }
  generateBoard(){
    let board = [];
    let arrIn = [];
    let str =this.string
    let empty = [];
    let counter = 0;
    for(let i = 0; i<str.length; i += 9){
      arrIn = []
      for(let j = 0; j<9;j++){
        if(str[j+i] == '0'){
          arrIn.push('X');
          empty.push([counter,j])
        }
        else{
          arrIn.push(str[j+i]);
        }
      }
      counter++
      board.push(arrIn)
    }
    return {board, empty}
  }

  horizontalChecker(angka,koordinat, board){
    for(let i = 0; i<board[koordinat[0]].length; i++){
      if(angka == board[koordinat[0]][i]){
        return false;
      }
    }
    return true;
  }

  verticalChecker(angka, koordinat, board){
    for(let i = 0; i<board.length; i++){
      if(angka == board[i][koordinat[1]]){
        return false;
      }
    }
    return true;
  }

  boxChecker(angka, koordinat, board){
    let batasV = 0;
    let batasH = 0;
    if(koordinat[0] < 3){
      batasV = 0
    }
    else if(koordinat[0] >5){
      batasV = 6
    }
    else{
      batasV = 3
    }

    if(koordinat[1] < 3){
      batasH = 0;
    }
    else if(koordinat[1] > 5){
      batasH = 6
    }
    else{
      batasH = 3
    }

    for(let i = batasV; i< batasV+3; i++){
      for(let j = batasH; j<batasH+3; j++){
        if(angka == board[i][j]){
          return false;
        }
      }
    }
    return true;
  }
  
  solve(obj) {
    let koordinat = obj.empty[0];
    for(let i = 1; i<10; i++){
        let angka = i+checker;
        if(angka>9){
            obj.empty.unshift(history[history.length-1].koordinat)
            checker = history[history.length-1].angka;
            obj.board[history[history.length-1].koordinat[0]][history[history.length-1].koordinat[1]] = 'X'
            history.pop();
            return this.solve(obj)
        }
        else{
            if(this.horizontalChecker(angka, koordinat, obj.board)){
                if(this.verticalChecker(angka, koordinat, obj.board)){
                    if(this.boxChecker(angka, koordinat, obj.board)){
                    obj.board[koordinat[0]][koordinat[1]] = angka.toString();
                    checker = 0;
                    history.push({
                        koordinat,
                        angka
                    });
                    obj.empty.shift();
                    return obj;
                    }
                }
            }   
        }
    }
    
    obj.empty.unshift(history[history.length-1].koordinat)
    obj.board[history[history.length-1].koordinat[0]][history[history.length-1].koordinat[1]] = 'X'
    checker = history[history.length-1].angka;
    history.pop();
    return this.solve(obj)
  }
  
  // Returns a string representing the current state of the board
  board() {
    console.log(this.obj.board);
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
.toString()
.split("\n")[0]

var game = new Sudoku(board_string)

check(game);

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}


function check(game){
  clearScreen()
  console.log(game.unsolvedBoard);
  sleep(500);
  while(game.obj.empty.length >0){
    clearScreen()
    game.solve(game.obj)
    game.board(game.obj.board)
    sleep(100);
  }
}
  
  // console.log(game);
  
  // Remember: this will just fill out what it can and not "guess"
  // game.solve()
  // console.log(game.unsolvedBoard)