function Gameboard() {
  let board = [];
  let rows = 3;
  let cols = 3;

  let zero = 0;
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push("hello");
    }
  }

  console.table(board);
}

Gameboard();

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
