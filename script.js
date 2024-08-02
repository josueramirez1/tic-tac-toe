function Gameboard() {
  let board = [];
  let rows = 3;
  let cols = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;

  console.table(getBoard());

  return { getBoard };
}

Gameboard();

function Cell() {
  let blank = "__";

  const getBlank = () => blank;

  const getMarker = () => (player = marker);

  return { getBlank, getMarker };
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
}

function gameController() {}
