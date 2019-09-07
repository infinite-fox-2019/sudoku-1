"use strict"

class Sudoku {
  constructor(board_string) {
    this.preNum = ['1','2','3','4','5','6','7','8','9']
    this.display = this.generateBoard(board_string)
  }

  generateBoard(board_string) {
    const board = []
    let a = 0
    for (let i=0; i<board_string.length; i+=9) {
      board.push([])
      for (let j=0; j<9; j++) {
        board[a].push(board_string[i+j])
      }
      a++
    }
    return board
  }

  // generateEmptyPos(board) {
  //   let emptyPos = []
  //   for (let i=0; i<9; i++) {
  //     for (let j=0; j<9; j++) {
  //       if (board[i][j] == '0') {
  //         emptyPos.push([i,j])
  //       }
  //     }
  //   }
  //   return emptyPos
  // }

  //apakah preNum[num] sudah ada di baris?
  horizontalCheck(row,index,preNum) {
    for (let j=0; j<9; j++) {
      if (this.display[row][j] == preNum[index]) {
        return true
      }
    }
    return false
  }

  //apakah preNum[num] sudah ada di kolom?
  verticalCheck(col,index,preNum) {
    for (let i=0; i<9; i++) {
      if (this.display[i][col] == preNum[index]) {
        return true
      }
    }
    return false
  }

  //apakah preNum[num] sudah ada di block?
  blockCheck(row,col,index,preNum) {
    let row2 = row - (row%3)
    let col2 = col - (col%3)
    for (let i=row2; i<row2+3; i++) {
      for (let j=col2; j<col2+3; j++) {
        if (this.display[i][col] == preNum[index]) {
          return true
        }
      }
    }
    return false
  }

  //apakah preNum[index] tidak terdapat di baris,kolom, dan block?
  isSafe(row,col,index,preNum) {
    if (!this.horizontalCheck(row,index,preNum) && !this.verticalCheck(col,index,preNum) && !this.blockCheck(row,col,index,preNum)) {
      return true
    }
    return false
  }


  solve() {
    let board = this.display
    const element = this.preNum
    for (let i=0; i<board.length; i++) {
      for (let j=0; j<board[i].length; j++) {
        if (board[i][j] == '0') {
          for (let index=0; index<9; index++) {
            if (this.isSafe(i,j,index,element)) {
              board[i][j] = element[index]    //belum fiks, cek backtracking
              if (this.solve()) {
                return true
              } else {
                board[i][j] = '0'
              }
            }
          }
          return false
        }
      }
    }
    return true
  }


  // Returns a string representing the current state of the board
  board() {
    let board = this.display
    for (let i=0; i<board.length; i++) {
      board[i].splice(0, 0, '||')
      board[i].splice(4, 0, '||')
      board[i].splice(8, 0, '||')
      board[i].splice(12, 0, '||')
      board[i] = this.display[i].join(' ')
      if (i % 3 == 0) {
        console.log('=============================')
      }
      console.log(board[i])
    }
    console.log('=============================')

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
game.board()
// console.log(game.emptyPosition())

