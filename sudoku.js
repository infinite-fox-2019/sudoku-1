
class Sudoku {
  constructor(board_string) {
    this.list = board_string;
    this.games = [];
    this.histories = [];
    this.index = [];
    this.board(this.games)
  }
  clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }
  
  solve() {
    this.clearScreen();
    console.log(this.games);
    this.sleep();
    for(let i=0; i<this.index.length; i++){
        for(let val = 1; val<10; val++){
          if(this.checkAll1(this.index[i][0], this.index[i][1], val)){
            this.histories.push({
              row: this.index[i][0],
              col: this.index[i][1],
              value: val,
              index:i
            })
            this.games[this.index[i][0]][this.index[i][1]] = String(val);
            break;
          }
          while ( val >= 9 ){
            val = this.histories[this.histories.length-1].value;
            let row = this.histories[this.histories.length-1].row;
            let col = this.histories[this.histories.length-1].col;
            i = this.histories[this.histories.length-1].index;
            this.games[row][col] = ' ';
            this.histories.pop();
          }
        }
        this.clearScreen();
        console.log(this.games);
        this.sleep();
    }
  }
  // Returns a string representing the current state of the board
  board() {
    let count = 0;
    for(let i=0; i<this.list.length; i+=9){
      this.games.push([]);
      for(let j=0; j<9; j++){
        if(this.list[i+j] === '0'){
          this.games[count].push(' ');
          this.index.push([count,j])
        }else{
          this.games[count].push(this.list[i+j]);
        }
      }
      count++
    }
  }
  checkAll1(row,col,value){
    for(let i=0; i<9; i++){
      const m = 3 * Math.floor(row/3) + Math.floor(i/3);
      const n = 3 * Math.floor(col/3) + i % 3;
      if(this.games[row][i] == value || this.games[i][col] == value || this.games[m][n] == value){
        return false;
      }
    }
    return true;
  }
  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e6; i++) {
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
.split("\n")[3]

var game = new Sudoku(board_string)
// console.log(game.list)

// Remember: this will just fill out what it can and not "guess"
game.solve()
// console.log(game.board())
// console.log(game.solve());

// // var input = [ 
// // [ '1', 9, '5', '8', ' ', '2', ' ', ' ', ' ' ],
// // [ ' ', '9', ' ', ' ', '7', '6', '4', ' ', '5' ],
// // [ '2', ' ', ' ', '4', ' ', ' ', '8', '1', '9' ],
// // [ ' ', '1', '9', ' ', ' ', '7', '3', ' ', '6' ],
// // [ '7', '6', '2', ' ', '8', '3', ' ', '9', ' ' ],
// // [ ' ', ' ', ' ', ' ', '6', '1', ' ', '5', ' ' ],
// // [ ' ', ' ', '7', '6', ' ', ' ', ' ', '3', ' ' ],
// // [ '4', '3', ' ', ' ', '2', ' ', '5', ' ', '1' ],

//index 
// [ [ [ 0, 1 ], [ 0, 4 ], [ 0, 6 ], [ 0, 7 ], [ 0, 8 ] ],
//   [ [ 1, 0 ], [ 1, 2 ], [ 1, 3 ], [ 1, 7 ] ],
//   [ [ 2, 1 ], [ 2, 2 ], [ 2, 4 ], [ 2, 5 ] ],
//   [ [ 3, 0 ], [ 3, 3 ], [ 3, 4 ], [ 3, 7 ] ],
//   [ [ 4, 3 ], [ 4, 6 ], [ 4, 8 ] ],
//   [ [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 6 ], [ 5, 8 ] ],
//   [ [ 6, 0 ], [ 6, 1 ], [ 6, 4 ], [ 6, 5 ], [ 6, 6 ], [ 6, 8 ] ],
//   [ [ 7, 2 ], [ 7, 3 ], [ 7, 5 ], [ 7, 7 ] ],
//   [ [ 8, 1 ], [ 8, 2 ], [ 8, 4 ], [ 8, 7 ], [ 8, 8 ] ] ]


