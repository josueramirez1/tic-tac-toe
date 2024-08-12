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
  const container = document.querySelector(".container");
  const board = document.createElement("div");
  const score = document.querySelectorAll(".score");
  const message = document.querySelector(".message");
  board.setAttribute("class", "board");
  container.appendChild(board);
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
  container.appendChild(resetBtn);
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
      e.target.style = "color:#fff;";
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

  const declaringWinner = () => {
    if (activePlayer === player[0]) {
      getActivePlayer().wins++;
      cells.forEach((cell) => (cell.disabled = true));
      screenController.score[0].textContent = getActivePlayer().wins;
      return (screenController.message.textContent = `Congratulations ${
        getActivePlayer().name
      }! You win!`);
    }

    if (activePlayer === player[1]) {
      getActivePlayer().wins++;
      cells.forEach((cell) => (cell.disabled = true));
      screenController.score[1].textContent = getActivePlayer().wins;
      return (screenController.message.textContent = `Congratulations ${
        getActivePlayer().name
      }! You win!`);
    }
  };

  const declareWinner = () => {
    // When marker is placed in the cell, check if player has one by...
    // Getting the board
    let updatedBoard = board.getBoard();
    // If player satisfies any conditions, then player will
    // 1. Get a win tally
    // 2. Disable all button cells to prevent changes
    // 3. Displaying message

    for (let i = 0; i < updatedBoard.length; i++) {
      for (let j = 0; j < updatedBoard[i].length; j++) {
        if (
          updatedBoard[i][j] !== "___" &&
          updatedBoard[i][0] === updatedBoard[i][1] &&
          updatedBoard[i][1] === updatedBoard[i][2]
        ) {
          return declaringWinner();
        }

        if (
          updatedBoard[i][j] !== "___" &&
          updatedBoard[0][j] === updatedBoard[1][j] &&
          updatedBoard[1][j] === updatedBoard[2][j]
        ) {
          return declaringWinner();
        }

        if (
          (updatedBoard[0][0] !== "___" && updatedBoard[0][0]) ===
            updatedBoard[1][1] &&
          updatedBoard[1][1] === updatedBoard[2][2]
        ) {
          return declaringWinner();
        }
        if (
          (updatedBoard[0][2] !== "___" && updatedBoard[0][2]) ===
            updatedBoard[1][1] &&
          updatedBoard[1][1] === updatedBoard[2][0]
        ) {
          return declaringWinner();
        }
      }
    }
    let everyCell = [];
    for (let i = 0; i < updatedBoard.length; i++) {
      for (let j = 0; j < updatedBoard[i].length; j++) {
        everyCell.push(updatedBoard[i][j]);
      }
    }
    if (everyCell.every((item) => item !== Cell().getValue())) {
      cells.forEach((cell) => (cell.disabled = true));
      return (screenController.message.textContent = `It's a draw! Play again?`);
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
