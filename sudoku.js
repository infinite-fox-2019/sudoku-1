"use strict"

class Sudoku {
    constructor(board_string) {
    this.board_string = board_string
    }

    solve(boards){
        for(let i = 0; i < boards.length; i++){
            for(let j = 0; j < boards[i].length; j++){
                if(boards[i][j] == 0){
                    for(let input = 1; input < 10; input++){
                        if(this.checkAll(boards, i, j, input)){
                            clearScreen()
                            boards[i][j] = input
                            console.log(boards);
                            sleep()
                            if(this.solve(boards)){
                                clearScreen()
                                console.log(boards);
                                return true
                            } else {
                                clearScreen()
                                boards[i][j] = 0
                                console.log(boards);
                                sleep()
                            }
                        }
                    }
                    return false
                }
            }
        }
        return true
    }

    checkAll(boards, i, j, input){
        if(this.checkHorizontal(boards, i, input) && this.checkVertical(boards, j, input) && this.checkSquare(boards, i, j, input)){
            return true
        }
    }

    checkHorizontal(boards, i, input){
        for(let a = 0; a < boards.length; a++){
            if(boards[i][a] == input){
                return false
            }
        }
        return true
    }

    checkVertical(boards, j, input){
        for(let a = 0; a < boards.length; a++){
            if(boards[a][j] == input){
                return false
            }
        }
        return true
    }

    checkSquare(boards, i, j, input){
        for(let a = 0; a < boards.length; a++){
            const x = 3 * Math.floor(i / 3) + Math.floor(a / 3)
            const y = 3 * Math.floor(j / 3) + i % 3
            if(boards[x][y] == input){
                return false
            }
            return true
        }
    }

  // Returns a string representing the current state of the board
    board() {
        let boards = []
        let count = 0
        for(let i = 0; i < 11; i++){
            let temp = []
            if(i == 3 || i == 7){
                temp.push('---------------------------------')
            } else {
                for(let j = 0; j < 11; j++){
                    if(j == 3 || j == 7){
                        temp.push('|')
                    } else if(this.board_string[count] != 0){
                        temp.push(Number(this.board_string[count]))
                        count++
                    } else if(this.board_string[count] == 0){
                        temp.push(0)
                        count++
                    }
                }
            }
            boards.push(temp)
        }
        return boards
    }
    
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0]

function clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
}

function sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > 200) {
            break;
        }
    }
}

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
const boards = game.board()
console.log(game.solve(boards));
