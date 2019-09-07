"use strict"

class Sudoku {
    constructor(board_string) {
        this.listBoard = board_string;
        this.index = [];
        this.display = [];
        this.backTrack = [];
        this.board(this.display)
    }

    solve() {
        this.clearScreen();
        console.log(this.display);
        this.sleep(100);
        for (let i = 0; i < this.index.length; i++) {
            for (let angka = 1; angka < 10; angka++) {
                if (this.checkAllCondition(this.index[i][0], this.index[i][1], angka)) {
                    this.backTrack.push({
                        row: this.index[i][0],
                        col: this.index[i][1],
                        value: angka,
                        index: i
                    })
                    this.display[this.index[i][0]][this.index[i][1]] = String(angka);
                    break;
                }

                while (angka >= 9) {
                    angka = this.backTrack[this.backTrack.length - 1].value;
                    let row = this.backTrack[this.backTrack.length - 1].row;
                    let col = this.backTrack[this.backTrack.length - 1].col;
                    i = this.backTrack[this.backTrack.length - 1].index;
                    this.display[row][col] = ' ';
                    this.backTrack.pop();
                }
            }
            this.clearScreen();
            console.log(this.display);
            this.sleep();
        }
    };

    // Returns a string representing the current state of the board
    board() {
        let count = 0;
        for (let i = 0; i < this.listBoard.length; i += 9) {
            this.display.push([]);
            for (let j = 0; j < 9; j++) {
                if (this.listBoard[i + j] === '0') {
                    this.display[count].push(' ');
                    this.index.push([count, j])
                } else {
                    this.display[count].push(this.listBoard[i + j]);
                }
            }
            count++
        }
    };

    checkAllCondition(row, col, value) {
        for (let i = 0; i < 9; i++) {
            const x = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const y = 3 * Math.floor(col / 3) + i % 3;
            if (this.display[row][i] == value || this.display[i][col] == value || this.display[x][y] == value) {
                return false;
            }
        }
        return true;
    }

    clearScreen() {
        // Un-comment this line if you have trouble with console.clear();
        // return process.stdout.write('\033c');
        console.clear();
    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e6; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
};

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[2]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

//console.log(game.board())
//console.log(game.checkVertical());
//console.log(game.checkHorizontal());