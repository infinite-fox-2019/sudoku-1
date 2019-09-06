"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    
  }

  solve(board) {
    let kosong = []
    for(let i = 0; i < board.length; i ++){
      for(let j = 0; j < board[i].length; j++){
        if(board[i][j] === 0)kosong.push([i,j])
      }
    }

    let histories = []
    for(let i = 0; i < kosong.length; i++){
      for(let input = 1; input <= 9; input++ ){

        if(check(kosong[i][0],kosong[i][1],input)){
          // console.log(kosong[i])
          board[kosong[i][0]][kosong[i][1]] = input
          histories.push({
            indexProcess : i,
            value : input        
          })
          break
        }

        while( input >= 9){
          input = histories[histories.length-1].value
          i = histories[histories.length-1].indexProcess
          board[kosong[i][0]][kosong[i][1]] = 0
          histories.pop()
        }

      }
    }

    


    
    
    
    console.log(board)
    function check(row,col,value){
      if( verticalCheck(col,value) === true &&
          horizontalCheck(row,value) === true &&
          checkbox(row,col,value) === true ){
              return true
          }
      else return false
      
  
      function verticalCheck(x,value){
          for(let i = 0; i < board.length; i++){
          if(board[i][x] === value)return false
          }
          return true
      }
      
      function horizontalCheck(y,value){
          for(let i = 0; i < board.length; i++){
          if(board[y][i] === value)return false
          }
          return true
      }
      
      function checkbox(row,col,value){
          let rows = Math.floor( row / 3 ) * 3
          let cols = Math.floor( col / 3 ) * 3
          
          for(let i = rows; i < rows + 3; i++){
          for(let j = cols; j < cols + 3; j++){
              if(board[i][j] === value)return false
          }
          }
          return true
      
      }
         
    }
  }
  
  

  // Returns a string representing the current state of the board
  board() {
    let board = this.board_string
    let out = []
    let temp = []
    
    for(let i = 0; i < board.length; i++){
      if(i % 9 === 0 && i !== 0){
          out.push(temp)
          temp = []   
      }
      temp.push(Number(board[i]))
    }
    out.push(temp)
    return out
  }
}





// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[1]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
// console.log(game.solve())
// console.log(game.board())

const board = game.board()
console.log(game.solve(board))
// console.log(board)



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }