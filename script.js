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
      const cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      const rows = document.querySelectorAll(".row");
      rows.forEach((b) => {
        b.appendChild(cell);
      });
    });
  });

  return { score, message };
}

function gameController() {
  // Put the array of player into the player variable to use in the controller object
  let player = Players();
  const board = Gameboard();
  const screenController = displayGame();
  let activePlayer = player[0];
  // Begin by picking the active player
  let switchingPlayer = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };

  const printNewRound = () => console.table(board.getBoard());
  let getActivePlayer = () => activePlayer;

  const playRound = () => {
    // Selectors
    const displayedBoard = document.querySelector(".board");
    let rowIndex;
    let columnIndex;
    // Message
    screenController.message.textContent = `${
      getActivePlayer().name
    }: please choose a location.`;

    // Player will pick a cell and click on location to put marker
    displayedBoard.addEventListener("click", (e) => {
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
      // if it does the move is not valid and function is restarted
      if (board.getBoard()[rowIndex][columnIndex] !== Cell().getValue()) {
        screenController.message.textContent = `Invalid move! ${
          getActivePlayer().name
        }: please choose another location.`;
        playRound();
      }
      // then I want the marker to be placed in the cell
      e.target.textContent = Cell().getMarker(getActivePlayer().marker);
      board.getBoard()[rowIndex][columnIndex] = Cell().getMarker(
        getActivePlayer().marker
      );
      // Add tally to active player
      // Print updated board
      printNewRound();
      console.log(declareWinner());
      screenController.message.textContent = declareWinner();
    });
  };

  const declareWinner = () => {
    // Get the board
    let updatedBoard = board.getBoard();
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
          screenController.score[0].textContent = getActivePlayer().wins;
          return (screenController.message.textContent = `Congratulations ${
            getActivePlayer().name
          }! You win by horizontal!`);
        } else if (activePlayer === player[1]) {
          getActivePlayer().wins++;
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
          screenController.score[0].textContent = getActivePlayer().wins;

          return (message.textContent = `Congratulations ${
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
          screenController.score[1].textContent = getActivePlayer().wins;
          return (message.textContent = `Congratulations ${
            getActivePlayer().name
          }! You win by column!`);
        }
      }
    }
    switchingPlayer();
  };
  // initialize the game
  playRound();
}
gameController();
