
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
  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e6; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  solve() {
    // this.clearScreen();
    // console.log(this.games);
    // this.sleep();
    for(let i=0; i<this.index.length; i++){
      for(let j=0; j<this.index[i].length; j++){
        for(let val = 1; val<10; val++){
          if(this.checkAll1(this.index[i][j][0], this.index[i][j][1], val)){
            this.histories.push({
              posI:this.index[i][j][0],
              posJ:this.index[i][j][0],
              value:val,
            })
            this.games[this.index[i][j][0]][this.index[i][j][1]] = String(val);
            break;
          }
          // while ( val >= 9 ){
          //   // val = this.histories[this.histories.length-1].value;
          //   let posI = this.histories[this.histories.length-1].posI;
          //   let posJ = this.histories[this.histories.length-1].posJ;
          //   // i = this.histories[this.histories.length-1].index;
          //   this.games[posI][posJ] = ' ';
          //   this.histories.pop();
          // }
        }
        this.clearScreen();
        console.log(this.games);
        this.sleep();
      }
    }
  }
  // Returns a string representing the current state of the board
  board(list) {
    let count = 0;
    for(let i=0; i<this.list.length; i+=9){
      this.games.push([]);
      this.index.push([]);
      for(let j=0; j<9; j++){
        if(this.list[i+j] === '0'){
          this.games[count].push(' ');
          this.index[count].push([count,j])
        }else{
          this.games[count].push(this.list[i+j]);
        }
      }
      count++
    }
    // this.clearScreen();
    // console.log(result);
    // this.sleep();
    // let val = 1;
    // while(val<10){
      // for(let i=0; i<indexPos.length; i++){
      //   for(let j=0; j<indexPos[i].length; j++){
      //     if(this.checkAll1(result,indexPos[i][j][0], indexPos[i][j][1], val)){
      //       this.histories.push({posI:indexPos[i][j][0],posJ:indexPos[i][j][0],value:val})
      //       result[indexPos[i][j][0]][indexPos[i][j][1]] = String(val);
      //     }
      //     // if(val = 9){
      //       // indexPos[i][j][0] = this.histories[this.histories.length-1].posI;
      //       // indexPos[i][j][1] = this.histories[this.histories.length-1].posJ;
      //       // result[indexPos[i][j][0]][indexPos[i][j][1]] = ' ';
      //       // val = this.histories[this.histories.length-1].value;
      //       // this.histories.pop();
      //     // }
      //   }
      //   this.clearScreen();
      //   console.log(result);
      //   this.sleep();
      // }
    //   val++;
    // }
    // for(let i=0; i<result.length; i++){
    //   for(let j=0; j<result[i].length; j++){
    //     if(result[i][j] === ' '){
    //       for(let k=1; k< 10; k++){
    //         if(this.checkAll1(result, i, j, k)){
    //           result[i][j] = String(k);
    //         }
    //       }
    //     }
    //   }
    // }
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
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
.toString()
.split("\n")[0]

var game = new Sudoku(board_string)
// console.log(game.list)

// Remember: this will just fill out what it can and not "guess"
game.solve()
// console.log(game.board())
// console.log(game.solve());

// function checkHorizontal(input, value){
  // let hasil = false;
  // for(let j=0; j< 9; j++){
  //   if(input[0][j] === value){
  //     hasil = true;
  //   }
  // }
  // if(!hasil){
//     return true;
//   }else{
//     return false;
//   }
// }
// // var input = [ 
// // [ '1', 9, '5', '8', ' ', '2', ' ', ' ', ' ' ],
// // [ ' ', '9', ' ', ' ', '7', '6', '4', ' ', '5' ],
// // [ '2', ' ', ' ', '4', ' ', ' ', '8', '1', '9' ],
// // [ ' ', '1', '9', ' ', ' ', '7', '3', ' ', '6' ],
// // [ '7', '6', '2', ' ', '8', '3', ' ', '9', ' ' ],
// // [ ' ', ' ', ' ', ' ', '6', '1', ' ', '5', ' ' ],
// // [ ' ', ' ', '7', '6', ' ', ' ', ' ', '3', ' ' ],
// // [ '4', '3', ' ', ' ', '2', ' ', '5', ' ', '1' ],

// let input = [[ '6', '1', '1', '3', '1', '8', '9', '1', '1' ]];
// console.log(checkHorizontal(input,'2'))


