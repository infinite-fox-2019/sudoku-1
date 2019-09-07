"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    
  }
  //--------------- // GENERATE BOARD // ----------------//
  board() {
    let output = []
    let counter = 0

    for(let i = 0; i <this.board_string.length; i+=9){
      output.push([])
      for(let j = 0; j<9; j++){

        if(this.board_string[i+j] === '0'){
          output[counter].push(0)
        }else{
          output[counter].push(Number(this.board_string[i+j]))
        }
      }
      counter++
    }
    
    return output
  }

    //--------------- // SOLVE BOARD// ----------------//

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

    //--------------- // CHECKER // ----------------//
    
    function check(indexI,indexJ,value){
      if( vertical(indexJ,value) === true &&
          horizontal(indexI,value) === true &&
          checkbox(indexI,indexJ,value) === true ){
              return true
          }
      else return false
      
  
      function vertical(indexI,value){
          for(let i = 0; i < board.length; i++){
            if(board[i][indexI] === value){
              return false
            }
          }
          return true
      }
      
      function horizontal(indexJ,value){
          for(let i = 0; i < board.length; i++){
            if(board[indexJ][i] === value){
              return false
            }
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
  

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
// console.log(game.solve())
// console.log(game.board())

const board = game.board()
console.log(game.solve(board))
console.log(board)



