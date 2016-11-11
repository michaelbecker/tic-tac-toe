const numRows = 3;
const numCols = 3;

const x = 1;
const o = 2;


//-------------------------------------------------------------------
// Get the opponent symbol
//-------------------------------------------------------------------
function getOpponent(player) {
    if (player == x)
        return o;
    else if (player == o)
        return x;
    else 
        throw new Error("Invalid player");
}


//-------------------------------------------------------------------
// Initialize a board
//-------------------------------------------------------------------
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


//-------------------------------------------------------------------
// Debug print function
//-------------------------------------------------------------------
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


//-------------------------------------------------------------------
// Debug print function
//-------------------------------------------------------------------
function printWiningCombinationsToConsole(w) {
    console.log("There are " + w.length + " possible wins.");
    for (var i = 0; i < w.length; i++) {
        console.log("\tWin at " + w[i][0] + " " + w[i][1]);
    }
}


//-------------------------------------------------------------------
// Debug print function
//-------------------------------------------------------------------
function printForkingCombinationsToConsole(w) {
    console.log("There are " + w.length + " possible forks.");
    for (var i = 0; i < w.length; i++) {
        console.log("\tFork at " + w[i][0] + " " + w[i][1]);
    }
}


//-------------------------------------------------------------------
// Find all possible wins given a board and a player
//-------------------------------------------------------------------
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


//-------------------------------------------------------------------
// Find all possible forks given a board and a player
//-------------------------------------------------------------------
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
                board[r][c] = 0;
            }
        }
    }

    return forkCombinations;
}


//-------------------------------------------------------------------
// Find all possible empty centers of a board
//-------------------------------------------------------------------
function findCenters(board) {

    var centers = [];
    var numCenters = 0;

    // We are going to ignore non-square boards.
    if (board.length == board[0].length) {

        // Odd sized boards have one square at the center
        if ((board.length % 2) == 1) {
            var center = Math.floor(board.length / 2);
            if (board[center][center] == 0)
                centers[numCenters++] = [center, center];
        }
        // Even sized boards have 4 squares at the center
        else {
            var center1 = Math.floor(board.length / 2);
            var center2 = center1 - 1;
            if (board[center1][center1] == 0)
                centers[numCenters++] = [center1, center1];
            if (board[center1][center2] == 0)
                centers[numCenters++] = [center1, center2];
            if (board[center2][center1] == 0)
                centers[numCenters++] = [center2, center1];
            if (board[center2][center2] == 0)
                centers[numCenters++] = [center2, center2];
        }
    }

    return centers;
}


//---------------------------------------------------------------
//  Find all available corners that are opposite our opponent
//---------------------------------------------------------------
function findOppositeCorners(board, player) {

    var oppositeCorners = [];
    var numOppositeCorners = 0;

    var opponent = getOpponent(player);
    var corners = [
                    [0, 0], 
                    [0, board[0].length - 1],
                    [board.length - 1, 0], 
                    [board.length - 1, board[board.length - 1].length - 1]
                  ];
    var cornerVals = [
                        board[0][0],
                        board[0][board[0].length - 1],
                        board[board.length - 1][0],
                        board[board.length - 1][board[board.length - 1].length - 1]
                     ];

    if ((cornerVals[0] == opponent) && (cornerVals[2] == 0)) 
        oppositeCorners[numOppositeCorners++] = corners[2];
    if ((cornerVals[0] == 0) && (cornerVals[2] == opponent)) 
        oppositeCorners[numOppositeCorners++] = corners[0];

    if ((cornerVals[1] == opponent) && (cornerVals[3] == 0)) 
        oppositeCorners[numOppositeCorners++] = corners[3];
    if ((cornerVals[1] == 0) && (cornerVals[3] == opponent)) 
        oppositeCorners[numOppositeCorners++] = corners[1];

    return oppositeCorners;
}


//---------------------------------------------------------------
//  Find all empty corners 
//---------------------------------------------------------------
function findEmptyCorners(board) {

    var emptyCorners = [];
    var numEmptyCorners = 0;

    var corners = [
                    [0, 0], 
                    [0, board[0].length - 1],
                    [board.length - 1, 0], 
                    [board.length - 1, board[board.length - 1].length - 1]
                  ];
    var cornerVals = [
                        board[0][0],
                        board[0][board[0].length - 1],
                        board[board.length - 1][0],
                        board[board.length - 1][board[board.length - 1].length - 1]
                     ];

    for (var i = 0; i < 4; i++) {
        if (cornerVals[i] == 0)
            emptyCorners[numEmptyCorners++] = corners[i];
    }

    return emptyCorners;
}


//---------------------------------------------------------------
//  Find empty spots on the sides, ignoring corners
//---------------------------------------------------------------
function findEmptySides(board) {
    
    var emptySides = [];
    var numEmptySides = 0;

    // Pin a row down, look in there
    function emptyInRow(board, row) {
        for (var i = 1; i < (board[row].length - 1); i++){
            if (board[row][i] == 0)
                emptySides[numEmptySides++] = [row, i];
        }
    }

    // Pin a column down, look in there
    function emptyInCol(board, col) {
        for (var i = 1; i < (board.length - 1); i++){
            if (board[i][col] == 0)
                emptySides[numEmptySides++] = [i, col];
        }
    }

    emptyInRow(board, 0);
    emptyInRow(board, board.length - 1);
    emptyInCol(board, 0);
    emptyInCol(board, board[0].length - 1);

    return emptySides;
}


//---------------------------------------------------------------
//  Find the next place to move.
//  Reference: https://en.wikipedia.org/wiki/Tic-tac-toe
//---------------------------------------------------------------
function runStrategy(board, player) {

    // 1) Win
    var wins = findWins(board, player);
    if (wins.length >= 1) {
        return wins[0];
    }

    // 2) Block
    var blocks = findWins(board, getOpponent(player));
    if (blocks.length >= 1) {
        return blocks[0];
    }

    // 3) Fork
    var forks = findForks(board, player);
    if (forks.length >= 1) {
        return forks[0];
    }

    // 4) Block opponent's fork
    var opponentsForks = findForks(board, getOpponent(player));
    if (opponentsForks.length >= 1) {
        return opponentsForks[0];
    }

    // 5) Center
    var centers = findCenters(board);
    if (centers.length >= 1) {
        return centers[0];
    }

    // 6) Opposite corner of opponent
    var oppositeCorners = findOppositeCorners(board, player);
    if (oppositeCorners.length >= 1) {
        return oppositeCorners[0];
    }

    // 7) Empty Corner
    var emptyCorner = findEmptyCorners(board);
    if (emptyCorner.length >= 1) {
        return emptyCorner[0];
    }

    // 8) Empty Side
    var emptySides = findEmptySides(board);
    if (emptySides.length >= 1) {
        return emptySides[0];
    }

    // Should never get here.
    throw new Error("Invalid strategy / board");
}


//---------------------------------------------------------------
//  Did someone win?
//---------------------------------------------------------------
function isWinner(board, player) {

    for (var r = 0; r < board.length; r++) {
        var cnt = 0;
        for (var c = 0; c < board[r].length; c++){
            if (board[r][c] == player)
                cnt++;
            else
                break;
        }
        if (cnt == board[r].length)
           return true; 
    }

    for (var c = 0; c < board[0].length; c++) {
        var cnt = 0;
        for (var r = 0; r < board.length; r++){
            if (board[r][c] == player)
                cnt++;
            else
                break;
        }
        if (cnt == board.length)
           return true; 
    }

    if (board.length == board[0].length) {
        var cnt = 0;
        for (var i = 0; i < board.length; i++) {
            if (board[i][i] == player)
                cnt++;
            else
                break;
        }
        if (cnt == board.length)
            return true;
    }

    if (board.length == board[0].length) {
        var cnt = 0;
        for (var i = 0, j = board.length - 1; 
                i < board.length; 
                i++, j--) {
            if (board[i][j] == player)
                cnt++;
            else
                break;
        }
        if (cnt == board.length)
            return true;
    }

    return false;
}


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

runStrategy(board, o);
isWinner(board, o);

