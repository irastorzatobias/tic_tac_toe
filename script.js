// Tic tac toe with two players, no AI.
var winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var modal = document.querySelector(".modal");
var winnerText = document.querySelector(".winner__text");
var choices = []; // mook guide

class Player {
  constructor(name, mark, turn) {
    this.name = name;
    this.mark = mark;
    this.turn = turn;
    this.combination = [];
  }

  addCombination(cell) {
    this.combination.push(cell);
  }
}

// gameboard

class Gameboard {
  constructor() {
    this.header = document.querySelector(".header");
    this.gameboard = document.querySelector(".mainboard");
    this.squares = document.querySelectorAll(".square");
    this.player1 = new Player("Player 1", "X", true);
    this.player2 = new Player("Player 2", "O", false);
    this.choices = [];
  }

  blur() {
    // Blur the sections of the gameboard when someone wins
    this.header.classList.add("blur");
    this.gameboard.classList.add("blur");
  }

  game() {
    // Game logic
    this.squares.forEach((square) => {
      square.addEventListener("click", (e) => {
        if (e.target.innerHTML === "" && this.player1.turn) {
          e.target.innerHTML = this.player1.mark;
          this.player1.addCombination(parseInt(e.target.dataset.cell));
          this.player1.turn = false;
          this.player2.turn = true;
        } else if (e.target.innerHTML === "" && this.player2.turn) {
          e.target.innerHTML = this.player2.mark;
          this.player2.addCombination(parseInt(e.target.dataset.cell));
          this.player2.turn = false;
          this.player1.turn = true;
        }
        if (!choices.includes(e.target.dataset.cell)) {
          choices.push(e.target.dataset.cell); // mock
        }
        if (choices.length === 9 && this.checkCells(this.player1.combination) == false && this.checkCells(this.player2.combination) == false) {
          this.checkDraw();
        } else {
          this.checkWinner(this.player1);
          this.checkWinner(this.player2);
        }
      });
    });
  }

  checkDraw() {
    // Check if the game is a draw
    if (
      !this.checkCells(this.player1.combination) &&
      !this.checkCells(this.player2.combination)
    ) {
      this.blur();
      winnerText.innerHTML = "Draw!";
      modal.classList.add("show");
    }
  }

  checkCells(cells) {
    // Check if the player has won
    return winConditions.some((combination) => {
      return combination.every((cell) => cells.includes(cell));
    });
  }

  checkWinner(player) {
    // Check if the player has won
    if (this.checkCells(player.combination)) {
      this.blur();
      winnerText.innerHTML = `${player.name} wins!`;
      modal.classList.add("show");
    }
  }

  restart() {
    this.player1.turn = true;
    this.player2.turn = false;
    this.player1.combination = [];
    this.player2.combination = [];
    choices = [];
    this.squares.forEach((square) => {
      square.innerHTML = "";
    });
    this.gameboard.classList.remove("blur");
    this.header.classList.remove("blur");
    modal.classList.remove("show");
  }

  init() {
    this.game();
  }
}

// Begin game

let gameboard = new Gameboard();
gameboard.init();
