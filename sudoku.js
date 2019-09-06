"use strict"

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

class Sudoku {
  constructor(board_string) {
    this.listNumber = board_string;
    this.myBoard = this.makeBoard();
    this.listBlank = this.checkIndexInput(this.myBoard);
  }
  
  makeBoard() {
    let array = [];
    for (let i = 0; i < this.listNumber.length; i+=9) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        if (this.listNumber[i+j] == '0') {
          row.push(' ');
        } else {
          row.push(this.listNumber[i+j]);
        }
      }
      array.push(row);
    }
    return array;
  }

  checkIndexInput(board) {
    let blankIndex = []
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === ' ') {
          blankIndex.push([i, j])
        }
      }
    }
    return blankIndex;
  }

  checkHor(index, board, number) {
    for (let i = 0; i < 9; i++) {
      if (board[index[0]][i] == number) {
        return false;
      }
    }
    return true;
  }
  
  checkVer(index, board, number) {
    for (let i = 0; i < 9; i++) {
      if (board[i][index[1]] == number) {
        return false;
      }
    }
    return true;
  }

  checkBox(index, board, number) {
    for (let row = (Math.floor(index[0]/3))*3; row < ((Math.floor(index[0]/3))*3)+3; row++) {
      for (let col = (Math.floor(index[1]/3))*3; col < ((Math.floor(index[1]/3))*3)+3; col++) {
        if (board[row][col] == number) {
          return false;
        }
      }
    }
    return true;
  }

  check(index, board, number) {
    if (this.checkHor(index, board, number) && this.checkVer(index, board, number) && this.checkBox(index, board, number)) {
      return true;
    }
    return false;
  }

  solve() {
    for (let i = 0; i < this.listBlank.length; i++) {
      for (let j = 1; j <= 9; j++) {
        if (this.check(this.listBlank[i], this.myBoard, j)) {
          this.myBoard[this.listBlank[i][0]][this.listBlank[i][1]] = `${j}`;
          break;
        }
        if (j === 9) {
          i--;
          j = Number(this.myBoard[this.listBlank[i][0]][this.listBlank[i][1]]);
          this.myBoard[this.listBlank[i][0]][this.listBlank[i][1]] = ' ';
        }
        if (j === 10) {
          i--;
          j = Number(this.myBoard[this.listBlank[i][0]][this.listBlank[i][1]]);
          this.myBoard[this.listBlank[i][0]][this.listBlank[i][1]] = ' ';
        }
        if (j === 0) {
          i--;
          j = Number(this.myBoard[this.listBlank[i][0]][this.listBlank[i][1]]) + 1;
          this.myBoard[this.listBlank[i][0]][this.listBlank[i][1]] = ' ';
        }
      }      
      // clearScreen(); // uncomment untuk melihat animasi
      // this.board(); // uncomment untuk melihat animasi
      // sleep(500); // uncomment untuk melihat animasi
    }
  }
  
  // Returns a string representing the current state of the board
  board() {
    for (let i = 0; i < this.myBoard.length; i++) {
      console.log(this.myBoard[i].join('|'));
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

// clearScreen(); // uncomment untuk unimasi
game.board()