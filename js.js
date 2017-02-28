(function(){ 
$('#chessfield, #result').hide();

$('#optionX').on('click', () => { initXOXO("x", "o"); });
$('#optionY').on('click', () => { initXOXO("o", "x"); });
$('#resetButton').on('click', reset);

$("td").click(function() { move(this, playerSymbol); });

const doesCompStart = Math.round(Math.random());

let playerSymbol = "o";
let compSymbol = "x";
let isGameFinished = false;
let recurIteration = 0;
let moveCounter = 0;

let takenFields = [];
setFields(false);

let board = [];
resetBoard();

let resultsDiv = $('#result');

function setFields (state) {
    takenFields = Array(9).fill(state);
}

function resetBoard () {
    board = [...Array(9).keys()].map((i) => i );
}

function generateFields (prefix) {
    return [...Array(9).keys()].map((i) => `${prefix}${i}` );
}

function initXOXO(player, computer) { 
    $('#chooseOption').hide();
    $('#chessfield').show("slow");
    playerSymbol = player;
    compSymbol = computer;
    if (doesCompStart) move(this, playerSymbol); 
}

function gameOver (result) {
    isGameFinished = true;
    setFields(true);
    $('#score').html(result);
    resultsDiv.show('fast');
};

function move(element, player) {
  
    if (!takenFields[element.id]) {
        moveCounter++;
        $(element).html(player);

        board[element.id] = player;
        takenFields[element.id] = true;
    
        if (hasPlayerWon(board, player)) {
            setTimeout(() => gameOver('You won!'), 600);
      
        } else if (moveCounter > 8) {
            setTimeout(() => gameOver('It\'s a tie!'), 600);
      
        } else {
            moveCounter++;
            let index = minMax(board, compSymbol).index;
            let selector = "#" + index;

            board[index] = compSymbol;
            $(selector).html(compSymbol);
            takenFields[index] = true;

            if (hasPlayerWon(board, compSymbol)) {
                setTimeout(() => gameOver('You lost!'), 600);

            } else if (freeSpots(board) === 0) {
                setTimeout(() => gameOver('It\'s a tie!'), 600);
            }
        }
    }
}

function reset() {
    moveCounter = 0;
    recurIteration = 0;
    isGameFinished = false;
    resultsDiv.hide();
    $(generateFields('#').join(",")).empty();

    setFields(false);
    resetBoard();
}

function minMax(recurBoard, player) {
    recurIteration++;
    let array = freeSpots(recurBoard);
    if (hasPlayerWon(recurBoard, playerSymbol)) {
        return {
            score: -1
        };
    } else if (hasPlayerWon(recurBoard, compSymbol)) {
        return {
            score: 1
        };
    } else if (array.length === 0) {
        return {
            score: 0
        };
    }

    let moves = [];
    for (let i = 0; i < array.length; i++) {
        let move = {};
        move.index = recurBoard[array[i]];
        recurBoard[array[i]] = player;

        if (player == compSymbol) {
            let g = minMax(recurBoard, playerSymbol);
            move.score = g.score;
        } else {
            let g = minMax(recurBoard, compSymbol);
            move.score = g.score;
        }
        recurBoard[array[i]] = move.index;
        moves.push(move);
    }

    let bestMove;
    if (player === compSymbol) {
        let bestScore = -100;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
            }
        }
    } else {
        let bestScore = 100;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

function freeSpots(recurBoard) {
  return recurBoard.filter(f => f != "x" && f != "o");
}

function hasPlayerWon(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) { 
    return true;
    } else {
    return false;
  }
}
}());