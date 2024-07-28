let gameboard = [];

function createBoard() {
  let body = document.querySelector("body");
  let board = document.createElement("div");
  board.setAttribute("class", "board");
  body.appendChild(board);

  for (let i = 1; i <= 9; i++) {
    let tile = document.createElement("div");
    tile.setAttribute("class", "tile");
    board.appendChild(tile);
  }
}

createBoard();
