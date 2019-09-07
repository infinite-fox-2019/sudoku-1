"use strict"

class Sudoku {
  constructor(board_string) {
      this.string = board_string
      this.base = []
      this.emptyBoard = []
      this.history = []
      this.board()
  }

  checkHorizontal(indexI, number){
    for (let i = 0; i < this.base.length; i++) {
        if(this.base[indexI[0]][i] === String(number)){
            return false
        }
    }
    return true
  }

  checkVertical(indexJ, number){
      for(let i = 0 ; i <this.base.length; i++){
          if(this.base[i][indexJ[1]] === String(number)){
              return false
          }
      }
      return true
  }

  checkBox(index,number){
      let indexI = Math.floor(index[0]/3) * 3
      let indexJ = Math.floor(index[1]/3) * 3

      for(let i = indexI ; i < indexI + 3 ; i++){
          for(let j = indexJ ; j < indexJ + 3 ; j++){
            if(this.base[i][j] === String(number)) {
                return false
            }
          }
      }
      return true
  }
  
  print(index,number){
      this.base[index[0]][index[1]] = String(number);
  }

  deleteNum(index){
      this.base[index[0]][index[1]] = ' ';
  }

  solve() {

    for(let i = 0 ; i < this.emptyBoard.length; i++){
        let num = 1
        
        let counter = 0
        while (num <= 9){
            if(this.checkHorizontal(this.emptyBoard[i],num) === false){
                num ++
                counter ++
                clearScreen()
                console.log(this.base)
                sleep(100)
                this.print(this.emptyBoard[i],counter)
            }
            else if (this.checkVertical(this.emptyBoard[i],num) === false){
                num ++
            }
            else if ( this.checkBox(this.emptyBoard[i],num) === false){
                num ++
                

            }else{
                clearScreen()
                console.log(this.base)
                sleep(10)
                this.print(this.emptyBoard[i],num)
                this.history.push([this.emptyBoard[i],i,num])
             
                break

            }
            if(num === 10){
                let index = this.history[this.history.length - 1]
                while(index[2] === 9){
                    this.deleteNum(index[0])
                    this.history.pop()
                    index = this.history[this.history.length-1]
                }
                counter = 0
                this.print(this.emptyBoard[i],' ')
                num = index[2] + 1
                i = index[1]
                this.deleteNum(index[0])
                this.history.pop()
            }
        }
        clearScreen()
        console.log(this.base)
        sleep(10)
    }
  }

  // Returns a string representing the current state of the board
  board() {

    let index = 0
    for(let i = 0; i<9; i++){
        this.base.push([])
        for(let j = 0 ; j<9; j++){
            if(this.string[index] === '0'){
                this.base[i].push(' ')
                this.emptyBoard.push([i,j])
            }else{
                this.base[i].push(this.string[index])
            }
            index++
        }
    }
    
  }
}



// console.log(game.board())
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

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
    var fs = require('fs')
    var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0]

  
  
// Remember: this will just fill out what it can and not "guess"
    var game = new Sudoku(board_string)
    game.solve()
    // console.log(game.board())


