"use strict"

class Sudoku {
  constructor(board_string) {
    this.numbers = board_string;
    this.printedBoard = [];
    this.emptySpots = [];
    this.history = [];
    this.board(board_string);
  }

  // Returns a string representing the current state of the board
  board() {
    let count = 0;
    for(let i = 0; i < this.numbers.length; i+=9) {
      this.printedBoard.push([]);
      for(let j = 0; j < 9; j++) {
        if(this.numbers[i+j] === '0') {
          this.printedBoard[count].push(' ');
          this.emptySpots.push([count, j]);
        } else {
          this.printedBoard[count].push(this.numbers[i+j]);
        }
      }
      count++;
    }
    // console.table(this.printedBoard);
  }

  checkHorizontal(position, input) {
    for(let i = 0; i < this.printedBoard.length; i++) {
      if(this.printedBoard[position[0]][i] === String(input)) {
        return false;
      }
    }
    return true;
  }

  checkVertical(position, input) {
    for(let i = 0; i < this.printedBoard.length; i++) {
      if(this.printedBoard[i][position[1]] === String(input)) {
        return false;
      }
    }
    return true;
  }

  checkBox(position, input) {
    let indexI = Math.floor(position[0]/3)*3;
    let indexJ = Math.floor(position[1]/3)*3;
    for(let i = indexI; i < indexI+3; i++) {
      for(let j = indexJ; j < indexJ+3; j++) {
        if(this.printedBoard[i][j] === String(input)) {
          return false;
        }
      }
    }
    return true;
  }
  print(position, input) {
    this.printedBoard[position[0]][position[1]] = String(input);
  }

  erase(position) {
    this.printedBoard[position[0]][position[1]] = ' ';
  }

  solve() {
    for(let i = 0; i < this.emptySpots.length; i++) {
      let input = 1;
      while(input <= 10) {
        if(input == 10) {
          let lastHistory = this.history[this.history.length-1];
          while(lastHistory[2] === 9) {
            this.erase(lastHistory[0]);
            this.history.pop();
            lastHistory = this.history[this.history.length-1]
          }
          input = lastHistory[2] + 1;
          i = lastHistory[1];
          this.erase(lastHistory[0]);
          this.history.pop();
        }
        if(this.checkHorizontal(this.emptySpots[i], input) === false) {
          input++;
        } else if(this.checkVertical(this.emptySpots[i], input) === false) {
          input++;
        } else if(this.checkBox(this.emptySpots[i], input) === false) {
          input++;
        } else {
          this.print(this.emptySpots[i], input);
          this.history.push([this.emptySpots[i], i, input]);
          break;
        }
      }
      clearScreen();
      console.table(this.printedBoard);
      sleep(200);
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
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve();