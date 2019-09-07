"use strict"

class Sudoku {
    constructor(board_string) {
        this.board = board_string;
        this.emptyCoordinates = [];
        this.backTrack = [];
        this.result = [];
        this.generateBoard();
    }
    checkHorizontal(indeksI, value) {
        for (let j = 0; j < this.result.length; j++) {
            if (this.result[indeksI[0]][j] === String(value)) {
                return false;
            }
        }
        return true;
    }
    checkVertival(indeksJ, value) {
        for (let i = 0; i < this.result.length; i++) {
            if (this.result[i][indeksJ[1]] === String(value)) {
                return false;
            }
        }
        return true;
    }

    checkGrid(indeks, value) {
        let indeksI = Math.floor(indeks[0] / 3) * 3;
        let indeksJ = Math.floor(indeks[1] / 3) * 3;
        for (let i = indeksI; i < indeksI + 3; i++) {
            for (let j = indeksJ; j < indeksJ + 3; j++) {
                if (this.result[i][j] === String(value)) {
                    return false;
                }
            }
        }
        return true;
    }
    print(indeks, value) {
        this.result[indeks[0]][indeks[1]] = String(value);
    }
    deleteNum(indeks) {
        this.result[indeks[0]][indeks[1]] = ' ';
    }
    solve() {
        for (let i = 0; i < this.emptyCoordinates.length; i++) {
            let num = 1;
            while (num <= 9) {
                if (this.checkHorizontal(this.emptyCoordinates[i], num) === false) {
                    num++;
                } else if (this.checkVertival(this.emptyCoordinates[i], num) === false) {
                    num++;
                } else if (this.checkGrid(this.emptyCoordinates[i], num) === false) {
                    num++;
                } else {
                    this.print(this.emptyCoordinates[i], num);
                    this.backTrack.push([this.emptyCoordinates[i], i, num]);
                    break;
                }
                if (num === 10) {
                    let indeks = this.backTrack[this.backTrack.length - 1];
                    while (indeks[2] === 9) {
                        this.deleteNum(indeks[0]);
                        this.backTrack.pop();
                        indeks = this.backTrack[this.backTrack.length - 1];
                    }
                    num = indeks[2] + 1;
                    i = indeks[1];
                    this.deleteNum(indeks[0]);
                    this.backTrack.pop();
                }
            }
            clearScreen()
            console.log(this.joinBoard());
            sleep(300)
        }
    }
    // Returns a string representing the current state of the board
    generateBoard() {
        let indeks = 0;
        for (let i = 0; i < 9; i++) {
            this.result.push([]);
            for (let j = 0; j < 9; j++) {
                if (this.board[indeks] === '0') {
                    this.result[i].push(' ');
                    this.emptyCoordinates.push([i, j]);
                } else {
                    this.result[i].push(this.board[indeks]);
                }
                indeks++;
            }
        }
    }
    joinBoard() {
        let tes = [];
        for (let i = 0; i < this.result.length; i++) {
            tes.push(this.result[i].join('|'));
        }
        return tes;
    }
}
function clearScreen() {
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
// The file has newlines at the end of each line, so we call split to remove it
// (\n)
var fs = require('fs')
var board_string = fs
    .readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[1]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()
