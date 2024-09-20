//Инициализвация элементов
const statusDisplay = document.querySelector(".game--status");
const resetButton = document.querySelector(".game--restart");
const cells = document.querySelectorAll(".cell");

// Состояние игры
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Условия выйрыша
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Функция для обработки хода, смена игрока, Проверка результата
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "0" : "X";
  statusDisplay.innerHTML = `Ход игрока: ${currentPlayer}`;
}
function handleResultValidation() {
  let roundWon = false;

  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];

    if (a === "" && b === "" && c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `${currentPlayer} Победил!`;
    gameActive = false;
    return;
  }

  const roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = "Ничья!";
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

// Обработа клика на ячейку
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

// Функция перезапуска игры
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = `Ход игрока: ${currentPlayer}`;
  cells.forEach((cell) => (cell.innerHTML = ""));
}

function initGame() {
  statusDisplay.innerHTML = `Ход игрока: ${currentPlayer}`;
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", handleRestartGame);
}

initGame();
// Инициализация игры
