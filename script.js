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

const playerTurn = (
  gameboard,
  playerOne,
  playerTwo,
  getTurnCount,
  addTurnCount,
) => {
  let activePlayer;
  let currentCount = getTurnCount();

  currentCount % 2 === 0
    ? (activePlayer = playerOne)
    : (activePlayer = playerTwo);

  const activePlayerNum = parseInt(
    prompt(`${activePlayer.name}: From 0 to 8, choose a number`),
    10,
  );

  if (activePlayerNum >= 0 && activePlayerNum <= 2) {
    if (gameboard[0][activePlayerNum] !== "") {
      alert("Spot taken. Pick another space");
      playerTurn(gameboard, playerOne, playerTwo, currentCount);
      return;
    }
    gameboard[0][activePlayerNum] = activePlayer.marker;
  }

  if (activePlayerNum >= 3 && activePlayerNum <= 5) {
    if (gameboard[1][activePlayerNum - 3] !== "") {
      alert("Spot taken 2. Pick another space");
      playerTurn(gameboard, playerOne, playerTwo, currentCount);
      return;
    }
    gameboard[1][activePlayerNum - 3] = activePlayer.marker;
  }

  if (activePlayerNum >= 6 && activePlayerNum <= 8) {
    if (gameboard[2][activePlayerNum - 6] !== "") {
      alert("Spot taken 3. Pick another space");
      playerTurn(gameboard, playerOne, playerTwo, currentCount);
      return;
    }
    gameboard[2][activePlayerNum - 6] = activePlayer.marker;
  }

  checkWinner(gameboard, activePlayer, addTurnCount);
};

const playRound = (gameboard, getTurnCount, addTurnCount) => {
  playerTurn(gameboard, playerOne, playerTwo, getTurnCount, addTurnCount);

  //if playerTurn function returned a number that was greater than previous round started continue playing the game

  playRound(gameboard, getTurnCount, addTurnCount);
};

const checkRowWin = (gameboard, activePlayer, addTurnCount) => {
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
  addTurnCount();
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
  alert(`${playerName} wins!`);
  console.table(gameboard);
  return;
};

const checkWinner = (gameboard, activePlayer, addTurnCount) => {
  checkRowWin(gameboard, activePlayer, addTurnCount);
  // checkColumnWin(gameboard);
};

const playGame = () => {
  const gameboard = Gameboard.getBoard();
  let turnCount = 0;
  const getTurnCount = () => turnCount;
  const addTurnCount = () => ++turnCount;

  getNames();
  playRound(gameboard, getTurnCount, addTurnCount);
};

playGame();
