"use strict"

class Sudoku {
    constructor(board_string) {
        this.board_string = board_string
        this.board = this.generateBoard();
    }

    solve() {//////////////////////////////////////////
        
        this.sayWords()


        let limitLoop = this.board.length;
        
        while (limitLoop > 0) {

            for (let i = 0;i<this.board.length;i++) {
                for (let j = 0;j<this.board[i].length;j++) {
                    if (this.board[i][j] === 0) {

                        let limit = this.findLimitVerticalHorizontal(i,j);
                        let ver = limit[0];
                        let verlim = limit[1];
                        let hor = limit[2];
                        let horlim = limit[3];

                        ///////METHOD I - COMPARE POSSIBILITY NUMBER;
                        let savePos = [];
                        let alpha = [1,2,3,4,5,6,7,8,9];
                        for (let a = 0;a<alpha.length;a++) {
                            let count = 0;
                            for (let b = ver;b<verlim;b++) {
                                for (let c = hor;c < horlim;c++) {
                                    if (alpha[a] == this.board[b][c]) {
                                        count++
                                    }
                                }
                            }
                            if (count == 0) {
                                savePos.push(alpha[a])
                            }
                        }

                        let numPoss = [];
                        let numPot = [];
                        for (let a = ver;a<verlim;a++) {
                            for (let b = hor;b<horlim;b++){
                                if (this.board[a][b] == 0) {
                                    numPot.push(savePos);
                                    let rekPos = [a,b];
                                    numPoss.push(rekPos)
                                }
                            }
                        }
                        //compare with vertical & horizontal;
                        let newNumpot = [];
                     
                        let countPoss= [];
                        for (let a = 0;a<numPot.length;a++) {
                            let compare = [];
                            for (let b = 0;b<numPot.length;b++) {
                                let count = 0;
                                for (let c = 0;c<this.board.length;c++) {
                                    let x = numPoss[a][0];
                                    let y = numPoss[a][1];
                                    if (this.board[x][c] == numPot[a][b]) {
                                        count++
                                    }
                                    if (this.board[c][y] == numPot[a][b]) {
                                        count++
                                    }
                                }
                                compare.push(count)
                            }
                            countPoss.push(compare);
                        }
                    
                        
                        for (let a = 0;a<numPot.length;a++) {
                            let rekNew = [];
                            for (let b = 0;b<numPot[a].length;b++) {
                                if (countPoss[a][b] == 0) {
                                    rekNew.push(numPot[a][b])
                                }
                            }
                            newNumpot.push(rekNew)
                        }

                        //fill single Possibility to empty Box;
                        for (let a = 0;a<newNumpot.length;a++) {
                            if (newNumpot[a].length == 1) {
                                let x = numPoss[a][0];
                                let y = numPoss[a][1];
                                this.board[x][y] = newNumpot[a][0]
                                newNumpot.splice(a,1);
                                numPoss.splice(a,1);
                                a--

                            }
                        }

                        let countZero = 0;
                        for (let a = 0;a<this.board.length;a++) {
                            for (let b = 0;b<this.board[a].length;b++) {
                                if (this.board[a][b] == 0){
                                    countZero++
                                }
                            }
                        }
                        if (countZero == 0) {
                            console.log(this.printBoard(this.board))
                            return '＼(o￣∇￣o)/  YEEAA!!! I CAN SOLVE THIS PUZZLE XD'
                        }
                        /////////////METHOD II - FIND UNIQUE NUMBER
                        //find Unique Number;
                        if (limitLoop == 1) {
                            let uniqueNumber = [];
                            for (let a = 0;a<newNumpot.length;a++) {
                                let rekUnique = [];
                                for (let b = 0;b<newNumpot[a].length;b++) {
                                    let count = 0;
                                    for (let c = 0;c<newNumpot.length;c++) {
                                        for (let d = 0;d<newNumpot[c].length;d++) {
                                            if (newNumpot[a][b] == newNumpot[c][d]) {
                                                count++
                                            }
                                        }
                                    }
                                    rekUnique.push(count);
                                }
                                uniqueNumber.push(rekUnique)
                            }
                           
                            for (let a = 0;a < newNumpot.length;a++) {
                                let x = numPoss[a][0];
                                let y = numPoss[a][1];
                                for (let b = 0;b<newNumpot[a].length;b++) {
                                    if (uniqueNumber[a][b] === 1) {
                                        this.board[x][y] = newNumpot[a][b];
                                        limitLoop = this.board.length
                                    }
                                }
                            }

                        }//unique
                    }// main if //---------------------------------------->
                }// j
            }// i

             ///////////// METHOD III  FIND HIDDEN CELL////////////////////////////////////
             if (limitLoop == 1) {
                for (let i = 0; i < this.board.length; i++) {
                    let verticalPossibility = [];
                    let verticalCoor = [];
                    for (let j = 0; j < this.board.length; j++) {
                        if (this.board[i][j] == 0) {
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
                                        if (alpha[a] == this.board[b][c]) {
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

                        // console.log(verticalPossibility);
                        // console.log(verticalCoor)
                        // console.log('-------------------')
                        for (let a = 0; a < verticalCoor.length; a++) {
                            for (let b = 0; b < verticalPossibility.length; b++) {
                                for (let c = 0; c < this.board.length; c++) {
                                    let y = verticalCoor[a][1];
                                    if (this.board[c][y] == verticalPossibility[a][b]) {
                                        verticalPossibility[a].splice(b, 1)
                                        b--
                                    }
                                }
                            }
                        }

                        for (let a = 0; a < verticalCoor.length; a++) {
                            for (let b = 0; b < verticalPossibility.length; b++) {
                                for (let c = 0; c < this.board.length; c++) {
                                    let x = verticalCoor[a][0];
                                    if (this.board[x][c] == verticalPossibility[a][b]) {
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
                                    this.board[x][y] = verticalPossibility[a][b]
                                    limitLoop = this.board.length
                                }
                            }
                        } //end if vertical possibility
                    } //end loop i
                }
            }

            ///////////////////
            limitLoop --
        }//end while

        //=======================================================
        
        console.log(this.printBoard(this.board))
        return  `(━┳━ _ ━┳━)  I'am Sorry, i can't Solve this Puzzle........`

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

    printBoard() {
        
        let boardFix = '';

        for (let i = 0; i < this.board.length; i++) {

            let str1 = '';
            for (let j = 0; j < this.board[i].length; j++) {

                if (this.board[i][j] === 0) {
                    let ver = i;
                    let hor = j;
                    this.board[ver][hor] = ' '
                }
                boardFix += ` ${this.board[i][j]} `
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
        return boardFix;
    }//end function printBoard

    findLimitVerticalHorizontal(idx1,idx2) {
        let a,b,c,d
        if (idx1 < 3) {//vertical
            a = 0;
            b = 3;
        }else if (idx1 < 6) {
            a = 3;
            b = 6;
        }else if (idx1 < 9) {
            a = 6;
            b = 9;
        }if (idx2 < 3) {//horizontal
           c = 0;
            d = 3;
        }else if (idx2 < 6) {
            c = 3;
            d = 6;
        }else if (idx2 < 9) {
            c = 6;
            d = 9;
        }
        let gather = [a,b,c,d];
        return gather    
    }//end functin

    countZero() {
        let count = 0;
        for (let i = 0;i<this.board.length;i++) {
            for (let j = 0;j<this.board.length;j++) {
                if (this.board[i][j] == 0){
                    count++
                }
            }
        }
        console.log(count)
    }

    findUniqueNumber() {

    }//end findUniqueNumber

    sayWords () {
        this.clearScreen()
        console.log(' ')
        console.log("(  ¬`.`)¬  I'm Generating Random Puzzle first");
        this.sleep(1300);
        this.clearScreen()
        console.log(' ')
        console.log(`(⇀‸↼) Wait a minute, I'm thingking`);
        this.sleep(700);
        this.clearScreen()
        console.log(' ')
        console.log(`(⇀‸↼) Wait a minute, I'm thingking.`);
        this.sleep(700);
        this.clearScreen()
        console.log(' ')
        console.log(`(⇀‸↼) Wait a minute, I'm thingking..`);
        this.sleep(700);
        this.clearScreen()
        console.log(' ')
        console.log(`(⇀‸↼) Wait a minute, I'm thingking...`);
        this.sleep(500);
        this.clearScreen()
        console.log(' ')
        console.log('(‾‾O  ‾‾    ) z')
        this.sleep(700);
        this.clearScreen()
        console.log(' ')
        console.log('(‾‾º  ‾‾    ) zz')
        this.sleep(700);
        this.clearScreen()
        console.log(' ')
        console.log('(‾‾O  ‾‾    ) zzZ')
        this.sleep(700);
        this.clearScreen()
        console.log(' ')
        console.log('(‾‾º  ‾‾    ) z')
        this.sleep(700);
        this.clearScreen()
        console.log(' ')
        console.log('(‾‾O  ‾‾    ) zz')
        this.sleep(700);
        this.clearScreen()
        console.log(' ')
        console.log('(‾‾º  ‾‾    ) zzZ')
        this.sleep(700);
        this.clearScreen()
        console.log(' ')
        console.log(` ＼(.  ͡  ∇  ͡  .)ﾉ  OK, Let's Do that!!`)
        this.sleep(2000);
        this.clearScreen()
    }//end function sayWords

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







// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var boardArr = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
    .toString()
    .split("\n")


    var board_string = boardArr[0]


var game = new Sudoku(board_string)
    // Remember: this will just fill out what it can and not "guess"
    // game.solve()
console.log(game.solve())
    // console.log(game.board())
    // console.log(game.printBoard())
    // console.log(game.board)