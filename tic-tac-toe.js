const numRows = 3;
const numCols = 3;

const x = 1;
const o = 2;


function createBoard(rows, cols) {
    var board = new Array(rows);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(cols);
    }

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
        }
    }

    return board;
}


function printBoardToConsole(board) {

    console.log("");
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] == 0)
                process.stdout.write("  ");
            else if (board[i][j] == x)
                process.stdout.write(" X");
            else if (board[i][j] == o)
                process.stdout.write(" O");
            else 
                process.stdout.write("Er");

            if ((j + 1) == board[i].length)
                console.log("");
            else 
                process.stdout.write(" |");
        }
        if ((i + 1) != board.length)
            console.log("---+---+---");
    }
    console.log("\n");
}


function printWiningCombinationsToConsole(w) {
    console.log("There are " + w.length + " possible wins.");
    for (var i = 0; i < w.length; i++) {
        console.log("\tWin at " + w[i][0] + " " + w[i][1]);
    }
}


function printForkingCombinationsToConsole(w) {
    console.log("There are " + w.length + " possible forks.");
    for (var i = 0; i < w.length; i++) {
        console.log("\tFork at " + w[i][0] + " " + w[i][1]);
    }
}


function findWins(board, player) {
    
    var winningR = -1;
    var winningC = -1;

    //-----------------------------------------------------
    // Check if player can win a specififed row
    //-----------------------------------------------------
    function winRow(r) {
        // For all the columns in the row
        for (var c = 0; c < board[r].length; c++) {
            // If we find an empty space,
            // Look at all of the other columns in that row and see if our 
            // mark is there.
            if (board[r][c] == 0) {
                var winFound = true;
                for (var i = 0; i < board[r].length; i++) {
                    if (i == c) 
                        continue;
                    // If not, we can't win this row this turn.
                    if (board[r][i] != player) {
                        winFound = false;
                        break;
                    }
                }
                // Else we can win the game now.
                if (winFound) {
                    winningRow = r;
                    winningCol = c;
                    return true;
                }
            }
        }
        return false;
    }

    //-----------------------------------------------------
    // Check if player can win a specififed column
    //-----------------------------------------------------
    function winCol(c) {
        // For all the rows in the column
        for (var r = 0; r < board.length; r++) {
            // If we find an empty space,
            // Look at all of the other rows in that column and see if our 
            // mark is there.
            if (board[r][c] == 0) {
                var winFound = true;
                for (var i = 0; i < board.length; i++) {
                    if (i == r) 
                        continue;
                    // If not, we can't win this row this turn.
                    if (board[i][c] != player) {
                        winFound = false;
                        break;
                    }
                }
                // Else we can win the game now.
                if (winFound) {
                    winningRow = r;
                    winningCol = c;
                    return true;
                }
            }
        }
        return false;
    }

    //-----------------------------------------------------
    // Check if player can win diagonal 1 "\"
    //-----------------------------------------------------
    function winDiag1() {
        if (board.length == board[0].length) {
            for (var i = 0; i < board.length; i++) {
                if (board[i][i] == 0) {
                    var winFound = true;
                    for (var j = 0; j < board.length; j++) {
                        if (i == j)
                            continue;
                        if (board[j][j] != player) {
                            winFound = false;
                            break;
                        }
                    }
                    if (winFound) {
                        winningRow = i;
                        winningCol = i;
                        return true;
                    }
                }
            }
        }

        return false;
    }

    //-----------------------------------------------------
    // Check if player can win diagonal 2 "/"
    //-----------------------------------------------------
    function winDiag2() {
        if (board.length == board[0].length) {
            for (var i = 0, j = board.length - 1; 
                    i < board.length; 
                    i++, j--) {
                if (board[i][j] == 0) {
                    var winFound = true;
                    for (var ii = 0, jj = board.length - 1; 
                        ii < board.length; 
                        ii++, jj--) {
                        if (i == ii)
                            continue;
                        if (board[ii][jj] != player) {
                            winFound = false;
                            break;
                        }
                    }
                    if (winFound) {
                        winningRow = i;
                        winningCol = j;
                        return true;
                    }
                }
            }
        }

        return false;
    }

    var winningCombinations = [];
    var numberWins = 0;

    // Look for wining rows
    for (var row = 0; row < board.length; row++) {
        if (winRow(row)) {
            winningCombinations[numberWins++] = [winningRow, winningCol];
        }
    }

    // Look for wining cols
    for (var col = 0; col < board.length; col++) {
        if (winCol(col)) {
            winningCombinations[numberWins++] = [winningRow, winningCol];
        }
    }
    
    // Look for wining diag "\"
    if (winDiag1()) {
        winningCombinations[numberWins++] = [winningRow, winningCol];
    }

    // Look for wining diag "/"
    if (winDiag2()) {
        winningCombinations[numberWins++] = [winningRow, winningCol];
    }

    return winningCombinations;
}


function findForks(board, player) {

    var forkCombinations = [];
    var numberForks = 0;

    for (var r = 0; r < board.length; r++) {
        for (var c = 0; c < board[r].length; c++) {
            if (board[r][c] == 0) {
                board[r][c] = player;
                wins = findWins(board, player);
                if (wins.length >= 2) {
                    forkCombinations[numberForks++] = [r, c];
                }
                // MUST restore the board to the original state.
                board[r][c] == 0;
            }
        }
    }

    return forkCombinations;
}



//---------------------------------------------------------------
//  
//  Reference: https://en.wikipedia.org/wiki/Tic-tac-toe
//
//---------------------------------------------------------------

var board = createBoard(numRows, numCols);
board[0][0] = 0;
board[0][1] = 0;
board[0][2] = o;

board[1][0] = 0;
board[1][1] = o;
board[1][2] = 0;

board[2][0] = 0;
board[2][1] = 0;
board[2][2] = 0;


printBoardToConsole(board);
var wins = findWins(board, o);
printWiningCombinationsToConsole(wins);

var forks = findForks(board, o);
printForkingCombinationsToConsole(forks);




