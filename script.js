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

  // If there are three markers in a row, declare the winner

  function playRound() {
    // Switch to second player if first player has taken a turn
    if (activePlayer.turn > player[1].turn) {
      activePlayer = player[1];
    } else activePlayer = player[0];

    console.log(activePlayer);
    // I want the player to pick a cell
    let row = parseInt(prompt("Select row from 0 to 2"));
    let column = parseInt(prompt("Select column from 0 to 2"));

    // then I want the marker to be placed in the cell
    board.getBoard()[row][column] = Cell().getMarker(activePlayer.marker);
    console.table(board.getBoard());

    activePlayer.turn++;
  }

  function declareWinner() {
    // Get the board
    let updatedBoard = board.getBoard();
    console.log(updatedBoard);

    // Win by diagonal
    let diagonal = [];
    updatedBoard.forEach((row) => {
      if (
        row[0][0] === "x" ||
        row[0][2] === "x" ||
        row[0][0] === "o" ||
        row[0][2] === "o" ||
        row[1][1] === "x" ||
        row[1][1] === "o" ||
        row[2][0] === "x" ||
        row[2][2] === "x" ||
        row[2][0] === "o" ||
        row[2][2] === "o"
      ) {
        diagonal.push(Cell().getMarker(activePlayer.marker));
        if (diagonal.length === 3) {
          if (diagonal.every((entry) => entry === "x" || entry === "o")) {
            console.log("Congratulations! You win by diagonal!");
          }
        }
      }
    });

    // Win by horizontal row
    for (let i = 0; i < updatedBoard.length; i++) {
      if (
        updatedBoard[i].every(
          (cell) => cell === Cell().getMarker(activePlayer.marker)
        )
      ) {
        console.log("Congratulations! You win by row!");
      }
    }
    // Win by vertical row
    let column = [];
    for (let i = 0; i < updatedBoard.length; i++) {
      for (let j = 0; j < 3; j++) {
        column.push(updatedBoard[j][i]);
        if (column.length === 3) {
          if (column.every((entry) => entry === "x" || entry === "0")) {
            console.log("Congratulations! You win by column!");
          }
        }
      }
    }

    console.table(updatedBoard);
  }
}

gameController();
