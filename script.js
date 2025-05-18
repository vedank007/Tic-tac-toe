let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "❌";
let gameActive = true;
let vsAI = false;

const boardElement = document.getElementById("board");
const resultElement = document.getElementById("result");
const winnerText = document.getElementById("winner-text");
const winSound = document.getElementById("win-sound");

function startGame(mode) {
  vsAI = mode === "ai";
  resetGame();
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "❌";
  gameActive = true;
  resultElement.classList.add("hidden");
  renderBoard();
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.textContent = cell;
    div.addEventListener("click", () => handleCellClick(index));
    boardElement.appendChild(div);
  });
}

function handleCellClick(index) {
  if (!gameActive || board[index]) return;
  board[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    gameOver(`${currentPlayer} wins!`);
    return;
  }
  if (board.every(cell => cell)) {
    gameOver("It's a draw!");
    return;
  }
  currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";

  if (vsAI && currentPlayer === "⭕") {
    setTimeout(() => {
      aiMove();
      renderBoard();
      if (checkWinner()) {
        gameOver(`${currentPlayer} wins!`);
        return;
      }
      if (board.every(cell => cell)) {
        gameOver("It's a draw!");
        return;
      }
      currentPlayer = "❌";
    }, 300);
  }
}if (checkWin()) {
    showBanner(currentPlayer + " wins!");
    playSound(currentPlayer === "X" ? "x-win" : "o-win");
    gameActive = false;
} else if (!gameState.includes("")) {
    showBanner("It's a Draw!");
    playSound("draw");
    gameActive = false;
}

function aiMove() {
  let bestScore = -Infinity;
  let move;
  board.forEach((cell, i) => {
    if (!cell) {
      board[i] = "⭕";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  });
  board[move] = "⭕";
}

function minimax(newBoard, depth, isMaximizing) {
  const winner = checkWinnerRaw(newBoard);
  if (winner === "⭕") return 10 - depth;
  if (winner === "❌") return depth - 10;
  if (newBoard.every(cell => cell)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    newBoard.forEach((cell, i) => {
      if (!cell) {
        newBoard[i] = "⭕";
        best = Math.max(best, minimax(newBoard, depth + 1, false));
        newBoard[i] = "";
      }
    });
    return best;
  } else {
    let best = Infinity;
    newBoard.forEach((cell, i) => {
      if (!cell) {
        newBoard[i] = "❌";
        best = Math.min(best, minimax(newBoard, depth + 1, true));
        newBoard[i] = "";
      }
    });
    return best;
  }
}

function checkWinnerRaw(bd) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (bd[a] && bd[a] === bd[b] && bd[b] === bd[c]) return bd[a];
  }
  return null;
}

function checkWinner() {
  const winner = checkWinnerRaw(board);
  return winner;
}

function gameOver(message) {
  gameActive = false;
  winnerText.textContent = message;
  resultElement.classList.remove("hidden");
  winSound.play();
}

startGame('1v1');
document.getElementById("restart").addEventListener("click", restartGame);

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("winner-banner").style.display = "none";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
    gameState = ["", "", "", "", "", "", "", "", ""];
}
function showBanner(message) {
    const banner = document.getElementById("winner-banner");
    banner.textContent = message;
    banner.style.display = "block";
}
function playSound(id) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}
