function Gameboard() {
  let board = [];
  const rows = 3;
  const cols = 3;
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell().getValue());
    }
  }
  const getBoard = () => board;
  return { getBoard };
}

function Cell() {
  let value = "___";
  let getValue = () => value;
  let getMarker = (marker) => (value = marker);
  return { getValue, getMarker };
}

function Players() {
  const player = [
    {
      name: "Player One",
      marker: "x",
      wins: 0,
    },
    {
      name: "Player Two",
      marker: "o",
      wins: 0,
    },
  ];
  return player;
}

function displayGame() {
  const body = document.querySelector("body");
  const board = document.createElement("div");
  const score = document.querySelectorAll(".score");
  const message = document.querySelector(".message");
  board.setAttribute("class", "board");
  body.appendChild(board);
  const gameBoard = Gameboard().getBoard();
  gameBoard.forEach((r) => {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    board.appendChild(row);
    r.forEach((c) => {
      const cell = document.createElement("button");
      cell.setAttribute("class", "cell");
      const rows = document.querySelectorAll(".row");
      rows.forEach((b) => {
        b.appendChild(cell);
      });
    });
  });
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset Game";
  resetBtn.setAttribute("class", "reset");
  board.appendChild(resetBtn);
  return { score, message, resetBtn };
}

function gameController() {
  // Selectors
  let player = Players();
  const board = Gameboard();
  const screenController = displayGame();
  const displayedBoard = document.querySelector(".board");
  const cells = [...document.querySelectorAll(".cell")];
  let rowIndex;
  let columnIndex;
  let activePlayer = player[0];

  // Begin by picking the active player
  let switchingPlayer = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };
  let getActivePlayer = () => activePlayer;
  //Print table on console
  const printNewRound = () => console.table(board.getBoard());

  // Display Message
  screenController.message.textContent = `${
    getActivePlayer().name
  }: please choose a location.`;

  // Player will pick a cell and click on location to put marker
  displayedBoard.addEventListener("click", (e) => {
    // Collecting index of row and column to add into board
    if (!e.target.matches(".cell")) return;
    const row = [...document.querySelectorAll(".row")];
    row.forEach((r, index) => {
      if (r === e.target.closest(".row")) {
        rowIndex = index;
      }
    });
    for (let i = 0; i < row.length; i++) {
      let column = [...row[i].children];
      column.forEach((c, index) => {
        if (c === e.target.closest(".cell")) {
          columnIndex = index;
        }
      });
    }
    // Check if the cell already contains a marker
    // if it does the move is not valid. Player is asked to pick another cell
    if (board.getBoard()[rowIndex][columnIndex] !== Cell().getValue()) {
      screenController.message.textContent = `Invalid move! ${
        getActivePlayer().name
      }: please choose another location.`;
      return;
    } else {
      // If move is valid, then marker to be placed in the cell
      e.target.textContent = Cell().getMarker(getActivePlayer().marker);
      board.getBoard()[rowIndex][columnIndex] = Cell().getMarker(
        getActivePlayer().marker
      );
      // Print updated board
      printNewRound();
      // Check if there is a winner and display it
      const result = declareWinner();
      // Switch turns
      switchingPlayer();
      // If player wins, display result, if no one has one yet, display next player
      result
        ? (screenController.message.textContent = result)
        : (screenController.message.textContent = `${
            getActivePlayer().name
          }: please choose a location.`);
    }
  });

  const declareWinner = () => {
    // When marker is placed in the cell, check if player has one by...
    // Getting the board
    let updatedBoard = board.getBoard();
    // If player satisfies any conditions, then player will
    // 1. Get a win tally
    // 2. Disable all button cells to prevent changes
    // 3. Displaying message
    // Win by diagonal
    if (activePlayer === player[0]) {
      for (let i = 0; i < updatedBoard.length; i++) {
        if (
          (updatedBoard[0][0] === "x" &&
            updatedBoard[1][1] === "x" &&
            updatedBoard[2][2] === "x") ||
          (updatedBoard[0][2] === "x" &&
            updatedBoard[1][1] === "x" &&
            updatedBoard[2][0] === "x")
        ) {
          getActivePlayer().wins++;
          cells.forEach((cell) => (cell.disabled = true));
          screenController.score[0].textContent = getActivePlayer().wins;
          return (screenController.message.textContent = `Congratulations ${
            getActivePlayer().name
          }! You win by diagonal!`);
        }
      }
    }
    if (activePlayer === player[1]) {
      for (let i = 0; i < updatedBoard.length; i++) {
        if (
          (updatedBoard[0][0] === "o" &&
            updatedBoard[1][1] === "o" &&
            updatedBoard[2][2] === "o") ||
          (updatedBoard[0][2] === "o" &&
            updatedBoard[1][1] === "o" &&
            updatedBoard[2][0] === "o")
        ) {
          getActivePlayer().wins++;
          cells.forEach((cell) => (cell.disabled = true));
          screenController.score[1].textContent = getActivePlayer().wins;
          return (screenController.message.textContent = `Congratulations ${
            getActivePlayer().name
          }! You win by diagonal!`);
        }
      }
    }
    // Win by horizontal row
    for (let i = 0; i < updatedBoard.length; i++) {
      if (
        updatedBoard[i].every(
          (cell) => cell === Cell().getMarker(getActivePlayer().marker)
        )
      ) {
        if (activePlayer === player[0]) {
          getActivePlayer().wins++;
          cells.forEach((cell) => (cell.disabled = true));
          screenController.score[0].textContent = getActivePlayer().wins;
          return (screenController.message.textContent = `Congratulations ${
            getActivePlayer().name
          }! You win by horizontal!`);
        } else if (activePlayer === player[1]) {
          getActivePlayer().wins++;
          cells.forEach((cell) => (cell.disabled = true));
          screenController.score[1].textContent = getActivePlayer().wins;
          return (screenController.message.textContent = `Congratulations ${
            getActivePlayer().name
          }! You win by horizontal!`);
        }
      }
    }
    // Win by column row
    if (activePlayer === player[0]) {
      for (let i = 0; i < updatedBoard.length; i++) {
        if (
          (updatedBoard[0][0] === "x" &&
            updatedBoard[1][0] === "x" &&
            updatedBoard[2][0] === "x") ||
          (updatedBoard[0][1] === "x" &&
            updatedBoard[1][1] === "x" &&
            updatedBoard[2][1] === "x") ||
          (updatedBoard[0][2] === "x" &&
            updatedBoard[1][2] === "x" &&
            updatedBoard[2][2] === "x")
        ) {
          getActivePlayer().wins++;
          cells.forEach((cell) => (cell.disabled = true));
          screenController.score[0].textContent = getActivePlayer().wins;

          return (screenController.message.textContent = `Congratulations ${
            getActivePlayer().name
          }! You win by column!`);
        }
      }
    }
    if (activePlayer === player[1]) {
      for (let i = 0; i < updatedBoard.length; i++) {
        if (
          (updatedBoard[0][0] === "o" &&
            updatedBoard[1][0] === "o" &&
            updatedBoard[2][0] === "o") ||
          (updatedBoard[0][1] === "o" &&
            updatedBoard[1][1] === "o" &&
            updatedBoard[2][1] === "o") ||
          (updatedBoard[0][2] === "o" &&
            updatedBoard[1][2] === "o" &&
            updatedBoard[2][2] === "o")
        ) {
          getActivePlayer().wins++;
          cells.forEach((cell) => (cell.disabled = true));
          screenController.score[1].textContent = getActivePlayer().wins;
          return (screenController.message.textContent = `Congratulations ${
            getActivePlayer().name
          }! You win by column!`);
        }
      }
    }
  };
  // If user decides to reset button...
  screenController.resetBtn.addEventListener("click", (e) => {
    cells.forEach((cell) => {
      cell.disabled = false;
      cell.textContent = "";
    });
    let resetBtn = board.getBoard();
    resetBtn.forEach((row) => {
      for (let i = 0; i < row.length; i++) {
        row[i] = Cell().getValue();
      }
    });
    activePlayer = player[0];
    screenController.message.textContent = `${
      getActivePlayer().name
    }: please choose a location.`;
    printNewRound();
  });
}
gameController();
