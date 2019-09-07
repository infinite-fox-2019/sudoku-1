"use strict"

class Sudoku {
    constructor(board_string) {
        this.board_string = board_string

    }

    checkHorizontal(posI,angka){
        for(let i = 0; i < board.length; i++){
            if(board[posI][i] === angka){
                return false
            }
        }
        return true
    }

    checkVertical(posJ,angka){
        for(let i = 0; i < board.length; i++){
            if(board[i][posJ] === angka){
                return false
            }
        }
        return true
    }

    checkbox(posI,posJ,angka){
        let rows = Math.floor(posI/3)*3
        let cols = Math.floor(posJ/3)*3
        for(let i = rows; i < rows + 3; i++){
            for(let j = cols; j < cols + 3; j++){
                if(board[i][j] === angka){
                    return false
                }
            }
        }
        return true
    }

    checkAll(posI,posJ,angka){
        if(this.checkHorizontal(posI,angka) === true && this.checkVertical(posJ,angka) === true && this.checkbox(posI,posJ,angka) === true ){
            return true
        }else{
            return false
        } 
    }

    solve(board) {
        let titikKosong = []
        for(let i = 0; i < board.length; i ++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j] === 0){
                    titikKosong.push([i,j])
                }
            }
        }
        
        let histories = []
        for(let i = 0; i < titikKosong.length; i++){
            for(let angka = 1; angka <= 9; angka++ ){
                
                if(this.checkAll(titikKosong[i][0],titikKosong[i][1],angka)){
                    board[titikKosong[i][0]][titikKosong[i][1]] = angka
                    histories.push({
                        index : i,
                        value : angka       
                    })
                    break
                }
            
                while( angka >= 9){
                    angka = histories[histories.length-1].value
                    i = histories[histories.length-1].index
                    board[titikKosong[i][0]][titikKosong[i][1]] = 0
                    histories.pop()
                    clearScreen()
                    console.log(board)
                    sleep(300)
                    clearScreen()

                }
            }
        }
    
        return board
    }


  // Returns a string representing the current state of the board
    board() {
        let board = this.board_string
        let papan = []
        for(let i = 0; i < board.length; i+=9){
            let line = []
            for(let j=0; j<9; j++){
                line.push(Number(board[i+j]))
            }
            papan.push(line)
        }
        return papan
    }

  
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  //.split("\n")[0]
  .split("\n")[1]

var game = new Sudoku(board_string)


// Remember: this will just fill out what it can and not "guess"

const board = game.board()
//console.log(board)
console.log(game.solve(board))


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  } 

  function clearScreen() {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }