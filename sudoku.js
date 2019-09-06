"use strict"

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
      if(this.horizontalChecker(i, koordinat, obj.board)){
        if(this.verticalChecker(i, koordinat, obj.board)){
          if(this.boxChecker(i, koordinat, obj.board)){
            obj.board[koordinat[0]][koordinat[1]] = i.toString();
            obj.empty.shift();
            return obj;
          }
        }
      }
    }
    obj.board[koordinat[0]][koordinat[1]] = 'X';
    obj.empty.shift();
    return obj
  }
  
  // Returns a string representing the current state of the board
  board() {
    console.log(this.obj.empty);
    
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

// ecker(angka, koordinat, board){
  function check(game){
    while(game.obj.empty.length >0){
      game.solve(game.obj)
      game.board(game.obj.board)
    }
  }
  
  // console.log(game);
  
  // Remember: this will just fill out what it can and not "guess"
  // game.solve()
  // console.log(game.unsolvedBoard)
  
  // =====================================================================
  // checker box ribet
  // if(koordinat[0] < 3){
  //   if(koordinat[1] < 3){
  //     for(let i = 0; i<3; i++){
  //       for(let j = 0; j<3; j++){
  //         if(angka == board[i][j]){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   else if(koordinat[1] > 5){
  //     for(let i = 0; i<3; i++){
  //       for(let j = 6; j<9; j++){
  //         if(angka == board[i][j]){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   else{
  //     for(let i = 0; i<3; i++){
  //       for(let j = 3; j<6; j++){
  //         if(angka == board[i][j]){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  // }

  // else if(koordinat[0] > 5){
  //   if(koordinat[1] < 3){
  //     for(let i = 6; i<9; i++){
  //       for(let j = 0; j<3; j++){
  //         if(angka == board[i][j]){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   else if(koordinat[1] > 5){
  //     for(let i = 6; i<9; i++){
  //       for(let j = 6; j<9; j++){
  //         if(angka == board[i][j]){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   else{
  //     for(let i = 6; i<9; i++){
  //       for(let j = 3; j<6; j++){
  //         if(angka == board[i][j]){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  // }

  // else{
  //   if(koordinat[1] < 3){
  //     for(let i = 3; i<6; i++){
  //       for(let j = 0; j<3; j++){
  //         if(angka == board[i][j]){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   else if(koordinat[1] > 5){
  //     for(let i = 3; i<6; i++){
  //       for(let j = 6; j<9; j++){
  //         if(angka == board[i][j]){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   else{
  //     for(let i = 3; i<6; i++){
  //       for(let j = 3; j<6; j++){
  //         if(angka == board[i][j]){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  // }