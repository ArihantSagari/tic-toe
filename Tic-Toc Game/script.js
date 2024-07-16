let board;
let currentPlayer;
let userScore = 0;
let computerScore = 0;

function initGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    updateScoreboard();
}

function makeMove(cell, index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        cell.value = currentPlayer;
        cell.disabled = true;
        cell.classList.add(currentPlayer.toLowerCase());
        if (checkWin(currentPlayer)) {
            highlightWinningCells();
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                resetGame();
            }, 100);
            updateScore(currentPlayer === 'X');
        } else if (board.every(cell => cell)) {
            setTimeout(() => {
                alert('It\'s a tie!');
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                setTimeout(computerMove, 500);
            }
        }
    }
}

function computerMove() {
    const move = findRandomMove();
    if (move !== undefined) {
        board[move] = 'O';
        const cell = document.getElementById(`b${move + 1}`);
        cell.value = 'O';
        cell.disabled = true;
        cell.classList.add('o');
        if (checkWin('O')) {
            highlightWinningCells();
            setTimeout(() => {
                alert('O wins!');
                resetGame();
            }, 100);
            updateScore(currentPlayer === 'O');
        } else if (board.every(cell => cell)) {
            setTimeout(() => {
                alert('It\'s a tie!');
                resetGame();
            }, 100);
        } else {
            currentPlayer = 'X';
        }
    }
}

function findRandomMove() {
    const availableMoves = board.map((cell, index) => cell ? null : index).filter(index => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => pattern.every(index => board[index] === player));
}

function highlightWinningCells() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    winPatterns.forEach(pattern => {
        if (pattern.every(index => board[index] === currentPlayer)) {
            pattern.forEach(index => {
                const cell = document.getElementById(`b${index + 1}`);
                cell.classList.add('winning-cell');
            });
        }
    });
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.value = '';
        cell.disabled = false;
        cell.classList.remove('x', 'o', 'winning-cell');
    });
    updateScoreboard();
}

function updateScore(userWon) {
    if (userWon) {
        userScore++;
    } else {
        computerScore++;
    }
    updateScoreboard();
}

function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerText = `User: ${userScore} | Computer: ${computerScore}`;
}

document.addEventListener('DOMContentLoaded', initGame);
