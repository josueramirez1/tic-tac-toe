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

  return { getBoard };
}
function Cell() {
  let value = "___";
  const getValue = () => value;
  const getMarker = (marker) => (value = marker);
  return { getValue, getMarker };
}
function Players() {
  let player = [
    {
      name: "Player One",
      marker: "x",
    },
    {
      name: "Player Two",
      marker: "o",
    },
  ];
  return player;
}
function gameController() {
  // Put the array of player into the player variable to use in the controller object
  let player = Players();
  let board = Gameboard();
  let activePlayer = player[0];
  // Begin by picking the active player
  const switchingPlayer = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };

  const printNewRound = () => {
    console.table(board.getBoard());
  };
  const getActivePlayer = () => activePlayer;

  const playRound = () => {
    console.log(`${getActivePlayer().name}: please choose a spot.`);

    // I want the player to pick a cell
    let row = parseInt(prompt("Select row from 0 to 2"));
    let column = parseInt(prompt("Select column from 0 to 2"));
    // Check if the cell already contains a marker
    // if it does the move is not valid and function is restarted
    if (board.getBoard()[row][column] !== Cell().getValue()) {
      playRound();
    }
    // then I want the marker to be placed in the cell
    board.getBoard()[row][column] = Cell().getMarker(getActivePlayer().marker);
    // Add tally to active player
    // Print updated board
    printNewRound();
    console.log(declareWinner());
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
          return "Congratulations! You win by diagonal!";
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
          return "Congratulations! You win by diagonal!";
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
        return "Congratulations! You win by row!";
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
          return "Congratulations! You win by column!";
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
          return "Congratulations! You win by column!";
        }
      }
    }
    switchingPlayer();
    playRound();
  };
  // initialize the game
  playRound();
}
gameController();
