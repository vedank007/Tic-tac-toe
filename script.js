const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const messageText = document.getElementById('message-text');
const restartButton = document.getElementById('restartButton');

const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const drawSound = document.getElementById('drawSound');

let circleTurn;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.classList.add('hide');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? 'o' : 'x';
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    circleTurn = !circleTurn;
  }
}

function endGame(draw) {
  if (draw) {
    messageText.innerText = "It's a Draw!";
    drawSound.play();
  } else {
    messageText.innerText = `${circleTurn ? "⭕" : "❌"} Wins!`;
    circleTurn ? loseSound.play() : winSound.play();
  }
  message.classList.remove('hide');
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
win.mp3

lose.mp3

draw.mp3
