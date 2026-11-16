let numSquares = 6;
let colors;
let pickedColor;

const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const message = document.querySelector("#message");
const h1 = document.querySelector("#h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function changeColors(color) {
  squares.forEach(function (square) {
    square.style.backgroundColor = color;
  });
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "Nuevos Colores";
  message.textContent = "";
  h1.style.backgroundColor = "";

  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

function setupModeButtons() {
  modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      modeButtons.forEach(function (other) {
        other.classList.remove("selected");
      });
      this.classList.add("selected");
      numSquares = this.textContent === "EASY" ? 3 : 6;
      reset();
    });
  });
}

function setupSquares() {
  squares.forEach(function (square) {
    square.addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        message.textContent = "¡Correcto!";
        resetButton.textContent = "Play Again?";
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
      } else {
        this.style.backgroundColor = document.body.style.backgroundColor;
        message.textContent = "Intentalo Nuevamente";
      }
    });
  });
}

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

resetButton.addEventListener("click", reset);

init();