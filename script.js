document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');
    const resetBtn = document.getElementById('reset-btn');
    const setNamesBtn = document.getElementById('setNamesBtn');

    let currentPlayer = 'X';
    let gameBoard = getStoredBoard() || ['', '', '', '', '', '', '', '', ''];
    let player1Name = getStoredPlayerName('player1') || 'Player 1';
    let player2Name = getStoredPlayerName('player2') || 'Player 2';
    let gameActive = true;

    // Set initial player names
    document.getElementById('player1').textContent = player1Name;
    document.getElementById('player2').textContent = player2Name;

    // Create the Tic Tac Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        cell.textContent = gameBoard[i];
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkForWinner()) {
                endGame(`সাবাশ ${getPlayerName(currentPlayer)} জিতেছেন!`);
            } else if (gameBoard.every(cell => cell !== '')) {
                endGame("ওহ! খেলাটি ড্র হয়েছে..");
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateMessage();
            }
        }
    }

    function checkForWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    function endGame(result) {
        gameActive = false;
        message.textContent = result;
    }

    function updateMessage() {
        message.textContent = ` এখন খেলবে : ${getPlayerName(currentPlayer)}`;
    }

    function getStoredBoard() {
        return JSON.parse(localStorage.getItem('ticTacToeBoard'));
    }

    function updateStoredBoard() {
        localStorage.setItem('ticTacToeBoard', JSON.stringify(gameBoard));
    }

    function getStoredPlayerName(player) {
        return localStorage.getItem(`player${player}Name`);
    }

    function updateStoredPlayerName(player, name) {
        localStorage.setItem(`player${player}Name`, name);
    }

    function getPlayerName(player) {
        return player === 'X' ? player1Name : player2Name;
    }

    resetBtn.addEventListener('click', () => {
        localStorage.removeItem('ticTacToeBoard');
        resetGame();
    });

    setNamesBtn.addEventListener('click', () => {
        player1Name = player1NameInput.value || 'Player 1';
        player2Name = player2NameInput.value || 'Player 2';

        document.getElementById('player1').textContent = player1Name;
        document.getElementById('player2').textContent = player2Name;

        updateStoredPlayerName('1', player1Name);
        updateStoredPlayerName('2', player2Name);
    });

    function resetGame() {
        // Clear the board and reset game state
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        message.textContent = '';
        
        // Update the board display
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
});
