const Gameboard = (() => {
  const board = [];

  for (let i = 0; i <= 2; i++) {
    const column = [];
    for (let j = 0; j <= 2; j++) {
      const space = "";
      column.push(space);
    }
    board.push(column);
  }

  const getBoard = () => board;

  return { getBoard };
})();

const gameboard = Gameboard.getBoard();

//Players
const playerOne = {
  name,
  marker: "X",
};

const playerTwo = {
  name,
  marker: "O",
};

const getNames = () => {
  const playerOneName = prompt("Player One Name");
  const playerTwoName = prompt("Player Two Name");
  playerOne.name = playerOneName;
  playerTwo.name = playerTwoName;
};

const playerOneTurn = () => {
  const playerOneTurnNum = parseInt(prompt("From 0 to 8, choose a number"), 10);

  if (playerOneTurnNum >= 0 && playerOneTurnNum <= 2) {
    if (gameboard[0][playerOneTurnNum] !== "") {
      alert("Spot taken. Pick another space");
      playerOneTurn();
      return;
    }
    gameboard[0][playerOneTurnNum] = playerOne.marker;
  }

  if (playerOneTurnNum >= 3 && playerOneTurnNum <= 5) {
    if (gameboard[1][playerOneTurnNum - 3] !== "") {
      alert("Spot taken 2. Pick another space");
      playerOneTurn();
      return;
    }
    gameboard[1][playerOneTurnNum - 3] = playerOne.marker;
  }

  if (playerOneTurnNum >= 6 && playerOneTurnNum <= 8) {
    if (gameboard[2][playerOneTurnNum - 6] !== "") {
      alert("Spot taken 3. Pick another space");
      playerOneTurn();
      return;
    }
    gameboard[2][playerOneTurnNum - 6] = playerOne.marker;
  }
};

const playerTwoTurn = () => {
  const playerTwoTurnNum = parseInt(prompt("From 0 to 8, choose a number"), 10);

  if (playerTwoTurnNum >= 0 && playerTwoTurnNum <= 2) {
    if (gameboard[0][playerTwoTurnNum] !== "") {
      alert("Spot taken. Pick another space");
      playerTwoTurn();
      return;
    }
    gameboard[0][playerTwoTurnNum] = playerTwo.marker;
  }

  if (playerTwoTurnNum >= 3 && playerTwoTurnNum <= 5) {
    if (gameboard[1][playerTwoTurnNum - 3] !== "") {
      alert("Spot taken 2. Pick another space");
      playerTwoTurn();
      return;
    }
    gameboard[1][playerTwoTurnNum - 3] = playerTwo.marker;
  }

  if (playerTwoTurnNum >= 6 && playerTwoTurnNum <= 8) {
    if (gameboard[2][playerTwoTurnNum - 6] !== "") {
      alert("Spot taken 3. Pick another space");
      playerTwoTurn();
      return;
    }
    gameboard[2][playerTwoTurnNum - 6] = playerTwo.marker;
  }
};

const playGame = () => {
  //Names
  //   getNames();
  playerOneTurn();
  playerTwoTurn();
  console.log(gameboard);
};

playGame();
