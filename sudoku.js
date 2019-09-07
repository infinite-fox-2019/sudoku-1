"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.board = this.initiateBoard();
    this.histories = [];
  }

  initiateBoard() {
    let result = [];
    let row = 0;
    for(let i = 0; i < this.board_string.length; i += 9) {
      result[row] = [];
      for(let j = 0; j < 9; j++) {
        if(this.board_string[i + j] === '0') {
          result[row].push(' ');
        } else {
          result[row].push(this.board_string[i + j]);
        }
      }
      row++;
    }

    return result;
  }

  solve() {
    let isSolvable = true;
    loopI:
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        if(this.board[i][j] === ' ') {
          for(let k = 1; k <= 9; k++) {
            if(this.isValidSolution(i, j, k)) {
              this.board[i][j] = k + '';
              this.histories.push({
                x: i,
                y: j,
                num: k
              })
              break;
            }

            if(k === 9) {
              let prevFilledCell = this.histories.pop();
              this.board[i][j] = ' ';
              if(prevFilledCell === undefined) {
                isSolvable = false;
                break loopI;
              }
              i = prevFilledCell.x;
              j = prevFilledCell.y;
              k = prevFilledCell.num;
            }
          }
          // uncomment the lines below to animate process
          // this.clearScreen();
          // console.log(this.showBoard());
          // this.sleep(40);
        }
      } 
    }
    // uncomment the line below to animate process
    // this.clearScreen();
    if(!isSolvable) {
      console.log('No solution!');
    }
  }

  isValidSolution(x, y, num) {
    let isValidHorizontal = this.isValidHorizontal(x, num);
    let isValidVertical = this.isValidVertical(y, num);
    let isValidBlock = this.isValidBlock(x, y, num);
    return isValidHorizontal && isValidVertical && isValidBlock;
  }

  isValidHorizontal(x, num) {
    for(let i = 0; i < this.board[0].length; i++) {
      if(this.board[x][i] === String(num)) {
        return false;
      }
    }
    return true;
  }

  isValidVertical(y, num) {
    for(let i = 0; i < this.board.length; i++) {
      if(this.board[i][y] === String(num)) {
        return false;
      }
    }
    return true;
  }

  isValidBlock(x, y, num) {
    let firstXInBlock = Math.floor(x / 3) * 3;
    let firstYInBlock = Math.floor(y / 3) * 3;
    for(let i = firstXInBlock; i < firstXInBlock + 3; i++) {
      for(let j = firstYInBlock; j < firstYInBlock + 3; j++) {
        if(this.board[i][j] === String(num)) {
          return false;
        }
      }
    }
    return true;
  }

  // Returns a string representing the current state of the board
  showBoard() {
    return this.board;
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

console.log(game.showBoard())
