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

const playerTurn = (gameboard, playerOne, playerTwo, turnCount) => {
  console.table(gameboard);
  console.log(turnCount);
  let activePlayer;
  turnCount % 2 === 0 ? (activePlayer = playerOne) : (activePlayer = playerTwo);

  const activePlayerNum = parseInt(
    prompt(`${activePlayer.name}: From 0 to 8, choose a number`),
    10,
  );

  if (activePlayerNum >= 0 && activePlayerNum <= 2) {
    if (gameboard[0][activePlayerNum] !== "") {
      alert("Spot taken. Pick another space");
      playerTurn(gameboard, playerOne, playerTwo, turnCount);
      return;
    }
    gameboard[0][activePlayerNum] = activePlayer.marker;
    checkWinner(gameboard, activePlayer);
    return ++turnCount;
  }

  if (activePlayerNum >= 3 && activePlayerNum <= 5) {
    if (gameboard[1][activePlayerNum - 3] !== "") {
      alert("Spot taken 2. Pick another space");
      playerTurn(gameboard, playerOne, playerTwo, turnCount);
      return;
    }
    gameboard[1][activePlayerNum - 3] = activePlayer.marker;
    checkWinner(gameboard, activePlayer);
    return ++turnCount;
  }

  if (activePlayerNum >= 6 && activePlayerNum <= 8) {
    if (gameboard[2][activePlayerNum - 6] !== "") {
      alert("Spot taken 3. Pick another space");
      playerTurn(gameboard, playerOne, playerTwo, turnCount);
      return;
    }
    gameboard[2][activePlayerNum - 6] = activePlayer.marker;
    checkWinner(gameboard, activePlayer);
    return ++turnCount;
  }
};

const playRound = (gameboard, turnCount) => {
  playerTurn(gameboard, playerOne, playerTwo, turnCount);
  console.log(turnCount);
  //if conditions haven't been met keep playing
  playRound(gameboard, turnCount);
};

const checkRowWin = (gameboard, activePlayer) => {
  const [columnArrOne, columnArrTwo, columnArrThree] = gameboard;
  // This condition checks winners for row wins
  if (
    columnArrOne.every((space) => space === activePlayer.marker) ||
    columnArrTwo.every((space) => space === activePlayer.marker) ||
    columnArrThree.every((space) => space === activePlayer.marker)
  ) {
    endGame(activePlayer.name, gameboard);
    return;
  }
};

const checkColumnWin = (gameboard) => {
  gameboard.forEach((columnArr) => {
    columnArr.forEach((space, index) => {
      if (
        (index === 0 && space === playerOne.marker) ||
        (index === 1 && space === playerOne.marker) ||
        (index === 2 && space === playerOne.marker)
      ) {
        console.log("winner");
        endGame(gameboard);
      }
    });
  });
};

const endGame = (playerName, gameboard) => {
  debugger;
  alert(`${playerName} wins!`);
  console.table(gameboard);
  return;
};

const checkWinner = (gameboard, activePlayer) => {
  checkRowWin(gameboard, activePlayer);
  // checkColumnWin(gameboard);
};

const playGame = () => {
  const gameboard = Gameboard.getBoard();
  let turnCount = 0;
  getNames();
  playRound(gameboard, turnCount);
};

playGame();
