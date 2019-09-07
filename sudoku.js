"use strict"

class Sudoku {
    constructor(board_string) {
        this.board_string = board_string
        this.board_game = this.generateBoard();
    }

    solve() { //////////////////////////////////////////
            this.clearScreen();
            this.sayWords();
            let board = this.board_game;
            let limitLoop = board.length;
            while (limitLoop > 0) {
                let verticalPossibility = [];
                for (let i = 0; i < board.length; i++) {
                    let rekVertical = [];
                    for (let j = 0; j < board.length; j++) {
                        if (board[i][j] === 0) {

                            ////////////////// METHOD I REDUCED POSSIBILITY IN SUBGRID
                            //Find start and end in subgrid                           
                            let limitVerticalHorizontal = this.findLimitVerticalHorizontal(i, j)
                            let ver = limitVerticalHorizontal[0]
                            let verlim = limitVerticalHorizontal[1]
                            let hor = limitVerticalHorizontal[2]
                            let horlim = limitVerticalHorizontal[3]

                            //Generate every single possibility number in subgrid
                            let numPot = [];
                            let numPos = [];
                            let saveActualNum = [];
                            for (let a = ver; a < verlim; a++) {
                                for (let b = hor; b < horlim; b++) {
                                    if (board[a][b] != 0) {
                                        saveActualNum.push(board[a][b])
                                    }
                                }
                            }
                            let savePossibilityNum = {};
                            let alpha = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                            for (let a = 0; a < alpha.length; a++) {
                                let countNum = 0;
                                let writePos = [];
                                for (let b = ver; b < verlim; b++) {

                                    for (let c = hor; c < horlim; c++) {
                                        if (alpha[a] === board[b][c]) {
                                            countNum++
                                            writePos.push(b);
                                            writePos.push(c);
                                        }
                                    }
                                }
                                if (countNum === 0) {
                                    savePossibilityNum[alpha[a]] = true;
                                }
                            }

                            //Find position empty number i  subgrid & assign with possibility number
                            for (let a = ver; a < verlim; a++) {
                                for (let b = hor; b < horlim; b++) {
                                    if (board[a][b] === 0) {
                                        let save = [];
                                        numPot.push(savePossibilityNum);
                                        save.push(a);
                                        save.push(b)
                                        numPos.push(save)
                                    }
                                }
                            }

                            //Compare every single possibility number in subgrid with row and column
                            let reducedPossibilityNumber = [];
                            let newPossitionZeroNumber = [];
                            for (let a = 0; a < numPos.length; a++) {
                                let objNumpot = Object.keys(numPot[a]);
                                let countNum = [];
                                let rekPot = [];

                                for (let b = 0; b < objNumpot.length; b++) {
                                    let count = 0
                                    for (let c = 0; c < board.length; c++) {
                                        if (board[numPos[a][0]][c] === Number(objNumpot[b])) {
                                            count++
                                        }
                                        if (board[c][numPos[a][1]] === Number(objNumpot[b])) {
                                            count++
                                        }
                                    }
                                    countNum.push(count)
                                }
                                let totalZeroNumber = [];
                                for (let b = 0; b < countNum.length; b++) {
                                    if (countNum[b] === 0) {
                                        totalZeroNumber.push(Number(objNumpot[b]))
                                    }
                                }
                                if (totalZeroNumber.length === 1) {
                                    board[numPos[a][0]][numPos[a][1]] = totalZeroNumber[0]
                                } else if (totalZeroNumber.length > 1) {
                                    reducedPossibilityNumber.push(totalZeroNumber)
                                    newPossitionZeroNumber.push(numPos[a])
                                }
                            } //end loop a

                            ////////////// METHOD II FIND UNIQUE NUMBER IN TOTAL POSSIBILITY
                            if (limitLoop === 1) {
                                if (reducedPossibilityNumber.length > 0) {
                                    for (let a = 0; a < reducedPossibilityNumber.length; a++) {
                                        let rek = [];
                                        for (let b = 0; b < reducedPossibilityNumber[a].length; b++) {
                                            let count = 0;
                                            for (let c = 0; c < reducedPossibilityNumber.length; c++) {
                                                for (let d = 0; d < reducedPossibilityNumber[c].length; d++) {
                                                    if (reducedPossibilityNumber[a][b] === reducedPossibilityNumber[c][d]) {
                                                        count++
                                                    }
                                                }
                                            }
                                            rek.push(count)
                                        }

                                        for (let b = 0; b < rek.length; b++) {
                                            if (rek[b] === 1) {
                                                board[newPossitionZeroNumber[a][0]][newPossitionZeroNumber[a][1]] = reducedPossibilityNumber[a][b];
                                                limitLoop = board.length
                                            }
                                        }
                                    } //end loop a                                                 
                                } //end if reduce.length > 0
                            } //end if limit = 1
                        } //end if --------------------------------------------------------------------------------------------
                    } //end loop j
                } //end Main Loop


                ///////////// METHOD III ////////////////////////////////////
                if (limitLoop == 1) {
                    for (let i = 0; i < board.length; i++) {
                        let verticalPossibility = [];
                        let verticalCoor = [];
                        for (let j = 0; j < board.length; j++) {
                            if (board[i][j] == 0) {
                                let checkSubgrid = this.findLimitVerticalHorizontal(i, j);
                                let vertical = checkSubgrid[0];
                                let verticalLimit = checkSubgrid[1];
                                let horizontal = checkSubgrid[2];
                                let horizontalLimit = checkSubgrid[3];
                                let rekVer = [i, j]
                                    //check Possibility in subGrid
                                let possibilityNumber = [];
                                let alpha = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                                for (let a = 0; a < alpha.length; a++) {
                                    let count = 0;
                                    for (let b = vertical; b < verticalLimit; b++) {
                                        for (let c = horizontal; c < horizontalLimit; c++) {
                                            if (alpha[a] == board[b][c]) {
                                                count++
                                            }
                                        }
                                    }
                                    if (count == 0) {
                                        possibilityNumber.push(alpha[a]);
                                    }
                                }
                                verticalPossibility.push(possibilityNumber);
                                verticalCoor.push(rekVer);
                            } //end if board[i][j] = 0
                        } //end loop j
                        if (verticalPossibility.length > 0) {

                            for (let a = 0; a < verticalCoor.length; a++) {
                                for (let b = 0; b < verticalPossibility.length; b++) {
                                    for (let c = 0; c < board.length; c++) {
                                        let y = verticalCoor[a][1];
                                        if (board[c][y] == verticalPossibility[a][b]) {
                                            verticalPossibility[a].splice(b, 1)
                                            b--
                                        }
                                    }
                                }
                            }
                            for (let a = 0; a < verticalPossibility.length; a++) {
                                let rek = [];
                                for (let b = 0; b < verticalPossibility[a].length; b++) {
                                    let count = 0;
                                    for (let c = 0; c < verticalPossibility.length; c++) {
                                        for (let d = 0; d < verticalPossibility[c].length; d++) {
                                            if (verticalPossibility[a][b] == verticalPossibility[c][d]) {
                                                count++
                                            }
                                        }
                                    }
                                    rek.push(count)
                                }
                                for (let b = 0; b < rek.length; b++) {
                                    if (rek[b] == 1) {
                                        let x = verticalCoor[a][0];
                                        let y = verticalCoor[a][1];
                                        board[x][y] = verticalPossibility[a][b]
                                        limitLoop = board.length
                                    }
                                }
                            } //end if vertical possibility
                        } //end loop i
                    }
                }
                limitLoop--
            } //end while

            this.printBoard(board);
            let count = this.countZero(board);
            if (count == 0) {
                return '＼(o￣∇￣o)/  YEEAA!!! I CAN SOLVE THIS PUZZLE XD'
            } else {
                return `(━┳━ _ ━┳━)  I'am Sorry, i can't Solve this Puzzle........`
            }

        } //end solve/////////////////////////////////

    generateBoard() {
            let count = 0;
            let result = [];
            for (let i = 0; i < 9; i++) {
                let rek = [];
                for (let j = 0; j < 9; j++) {
                    rek.push(Number(this.board_string[count]));
                    count++
                }
                result.push(rek)
            }
            return result;
        } //end board

    printBoard(board) {

            let boardFix = '';

            for (let i = 0; i < board.length; i++) {

                let str1 = '';
                for (let j = 0; j < board[i].length; j++) {

                    if (board[i][j] === 0) {
                        let ver = i;
                        let hor = j;
                        board[ver][hor] = ' '
                    }
                    boardFix += ` ${board[i][j]} `
                    if (j === 2 || j === 5) {
                        boardFix += '|'
                    }
                }
                boardFix += '\n'
                if (i === 2 || i === 5) {
                    boardFix += '-----------------------------'
                    boardFix += '\n'
                }
            }
            console.log(boardFix);
        } //end function printBoard

    countZero(board) {
            let zeroCount = 0;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] == 0) {
                        zeroCount++
                    }
                }
            }
            return zeroCount;
        } //end board

    findLimitVerticalHorizontal(idx1, idx2) {
            let a, b, c, d
            if (idx1 < 3) { //vertical
                a = 0;
                b = 3;
            } else if (idx1 < 6) {
                a = 3;
                b = 6;
            } else if (idx1 < 9) {
                a = 6;
                b = 9;
            }
            if (idx2 < 3) { //horizontal
                c = 0;
                d = 3;
            } else if (idx2 < 6) {
                c = 3;
                d = 6;
            } else if (idx2 < 9) {
                c = 6;
                d = 9;
            }
            let gather = [a, b, c, d];
            return gather
        } //end functin

    sayWords() {
            this.clearScreen()
            console.log("(  ¬`.`)¬   I'm Generating the Puzzle first");
            this.sleep(1300);
            this.clearScreen()
            console.log(`(⇀‸↼) Wait a minute, I'm thingking`);
            this.sleep(700);
            this.clearScreen()
            console.log(`(⇀‸↼) Wait a minute, I'm thingking.`);
            this.sleep(700);
            this.clearScreen()
            console.log(`(⇀‸↼) Wait a minute, I'm thingking..`);
            this.sleep(700);
            this.clearScreen()
            console.log(`(⇀‸↼) Wait a minute, I'm thingking...`);
            this.sleep(500);
            this.clearScreen()
            console.log('(‾‾O  ‾‾    ) z')
            this.sleep(700);
            this.clearScreen()
            console.log('(‾‾º  ‾‾    ) zz')
            this.sleep(700);
            this.clearScreen()
            console.log('(‾‾O  ‾‾    ) zzZ')
            this.sleep(700);
            this.clearScreen()
            console.log('(‾‾º  ‾‾    ) z')
            this.sleep(700);
            this.clearScreen()
            console.log('(‾‾O  ‾‾    ) zz')
            this.sleep(700);
            this.clearScreen()
            console.log('(‾‾º  ‾‾    ) zzZ')
            this.sleep(700);
            this.clearScreen()
                // clearScreen()
            console.log(` ＼(.  ͡  ∇  ͡  .)ﾉ  OK, Let's Do that!!`)
            this.sleep(2000);
            this.clearScreen()
        } //end function sayWords

    sleep(milliseconds) { //.............SleepFunction
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if (new Date().getTime() - start > milliseconds) {
                break;
            }
        }
    }

    clearScreen() { //........................clearScreen
        // Un-comment this line if you have trouble with console.clear();
        // return process.stdout.write('\033c');
        console.clear();
    }

} //end class Sudoku

//////////////////////////////////

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var boardArr = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
    .toString()
    .split("\n")

var numRandom = Math.floor(Math.random() * boardArr.length);
var board_string = boardArr[1]

var game = new Sudoku(board_string)
    // Remember: this will just fill out what it can and not "guess"
    // game.solve()
console.log(game.solve())
    // console.log(game.board())
    // console.log(game.printBoard())
    // console.log(game.board)