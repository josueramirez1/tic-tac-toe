function Gameboard() {
  let board = [];
  let rows = 3;
  let cols = 3;
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell().getValue());
    }
  }
  const getBoard = () => board;

  const dropMarker = (row, column, player) => {
    const availableCells = board
      .filter((row) => console.log(row[column].getValue() === 0))
      .map((row) => row[column]);

    console.log(availableCells);

    if (!availableCells.length) return;

    board[row][column].addMarker(player);
  };

  return { getBoard, dropMarker };
}

function Cell() {
  let value = 0;
  const getValue = () => value;
  const addMarker = (marker) => (value = marker);
  return { getValue, addMarker };
}

function Players() {
  let player = [
    {
      name: "Player One",
      marker: "x",
      turn: 0,
    },
    {
      name: "Player Two",
      marker: "o",
      turn: 0,
    },
  ];

  return player;
}

function gameController() {
  // Put the array of player into the player variable to use in the controller object
  let player = Players();
  let board = Gameboard();
  // Begin by picking the active player
  let activePlayer = player[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };

  function playRound() {
    // Switch to second player if first player has taken a turn
    // if (activePlayer.turn > player[1].turn) {
    //   activePlayer = player[1];
    // } else activePlayer = player[0];
    console.log(`${activePlayer.name}: place your marker.`);
    // I want the player to pick a cell
    let row = parseInt(prompt("Select row from 0 to 2"));
    let column = parseInt(prompt("Select column from 0 to 2"));
    // then I want the marker to be placed in the cell
    board.dropMarker(row, column, activePlayer.marker);

    switchPlayerTurn();

    // board.getBoard()[row][column] = Cell().addMarker(activePlayer.marker);
    // Add tally to active player
    activePlayer.turn++;
    // Print updated board
    console.table(board.getBoard());
    // const result = declareWinner();
    // console.log(result);
  }

  function declareWinner() {
    // Get the board
    let updatedBoard = board.getBoard();
    // Win by diagonal
    if (activePlayer === player[0]) {
      for (let i = 0; i < updatedBoard.length; i++) {
        if (
          (updatedBoard[0][0] === "x" || updatedBoard[0][2] === "x") &&
          updatedBoard[1][1] === "x" &&
          (updatedBoard[2][0] === "x" || updatedBoard[2][2] === "x")
        ) {
          return "Congratulations! You win by diagonal!";
        }
      }
    }

    if (activePlayer === player[1]) {
      for (let i = 0; i < updatedBoard.length; i++) {
        if (
          (updatedBoard[0][0] === "o" || updatedBoard[0][2] === "o") &&
          updatedBoard[1][1] === "o" &&
          (updatedBoard[2][0] === "o" || updatedBoard[2][2] === "o")
        ) {
          return "Congratulations! You win by diagonal!";
        }
      }
    }

    // Win by horizontal row
    for (let i = 0; i < updatedBoard.length; i++) {
      if (
        updatedBoard[i].every(
          (cell) => cell === Cell().addMarker(activePlayer.marker)
        )
      ) {
        return "Congratulations! You win by row!";
      }
    }
    // Win by vertical row
    let column = [];
    for (let i = 0; i < updatedBoard.length; i++) {
      for (let j = 0; j < 3; j++) {
        column.push(updatedBoard[j][i]);
        if (column.length === 3) {
          if (column.every((entry) => entry === "x")) {
            return "Congratulations! You win by column!";
          } else if (column.every((entry) => entry === "o")) {
            return "Congratulations! You win by column!";
          }
        }
      }
    }
    playRound();
  }
  // initialize the game
  playRound();
}

gameController();
