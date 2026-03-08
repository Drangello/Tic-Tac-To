const statusDisplay = document.querySelector('.status-display');
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.game-restart');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Spieler ${currentPlayer === 'X' ? 'Lila' : 'Rot'} hat gewonnen!`;
const drawMessage = () => `Unentschieden!`;
const currentPlayerTurn = () => `Spieler ${currentPlayer === 'X' ? 'Lila' : 'Rot'} ist dran!`;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function updateStatusColor() {
    if (currentPlayer === 'X') {
        statusDisplay.classList.remove('o-turn');
        statusDisplay.classList.add('x-turn');
    } else {
        statusDisplay.classList.remove('x-turn');
        statusDisplay.classList.add('o-turn');
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Füge die entsprechende Klasse für die Farbe hinzu
    if (currentPlayer === 'X') {
        clickedCell.classList.add('x');
    } else {
        clickedCell.classList.add('o');
    }
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    updateStatusColor();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        // Remove color classes for draw
        statusDisplay.className = "status-display";
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    // getAttribute gibt einen String zurück, we need a number
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    updateStatusColor();

    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('x', 'o');
    });
}

// Initialer Status
statusDisplay.innerHTML = currentPlayerTurn();
updateStatusColor();

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
