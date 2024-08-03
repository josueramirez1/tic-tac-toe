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
  // Begin by picking the active player
  let activePlayer = player[0].marker;
  // Switch to second player
  // if (activePlayer !== player[0]) {
  //   activePlayer = player[1].marker;
  // }

  // I want the player to pick a cell

  let board = Gameboard().getBoard();
  console.table(board);
  let row = parseInt(prompt("Select row from 0 to 2"));
  let column = parseInt(prompt("Select column from 0 to 2"));

  // then I want the marker to be placed in the cell
  board[row][column] = Cell().getMarker(activePlayer);
  console.table(board);
}

gameController();
