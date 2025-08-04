let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

gsap.from(".title", { duration: 1, y: -50, opacity: 0 });
gsap.from(".cell", { duration: 0.5, opacity: 0, stagger: 0.1 });

cells.forEach(cell => {
  cell.addEventListener("click", () => makeMove(cell));
});

function makeMove(cell) {
  const index = cell.getAttribute("data-index");
  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  gsap.fromTo(cell, { scale: 0 }, { scale: 1, duration: 0.3 });

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameBoard.includes("")) {
    statusText.textContent = "It's a draw! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Player X's turn";
  gsap.from(".cell", { opacity: 0, scale: 0.5, stagger: 0.1 });
}
