const Gameboard = () => {
  const board = [];
  let turnCount = 0;

  for (let i = 0; i <= 2; i++) {
    const column = [];
    for (let j = 0; j <= 2; j++) {
      const space = "";
      column.push(space);
    }
    board.push(column);
  }

  const getBoard = () => board;
  const getTurnCount = () => turnCount;
  const addTurnCount = () => ++turnCount;

  return { getBoard, getTurnCount, addTurnCount };
};

//Players
const playerOne = {
  name,
  marker: "X",
};

const playerTwo = {
  name,
  marker: "O",
};

const playGame = () => {
  const { getBoard, getTurnCount, addTurnCount } = Gameboard();
  const gameboard = getBoard();
  getNames();
  playRound(gameboard, getTurnCount, addTurnCount);
};

const playRound = (gameboard, getTurnCount, addTurnCount) => {
  let previousCount = getTurnCount();
  playerTurn(gameboard, getTurnCount, addTurnCount);
  let newCount = getTurnCount();
  console.log(previousCount, newCount);
  //if playerTurn function returned a number that was greater than previous round started continue playing the game
  if (newCount > previousCount) {
    playRound(gameboard, getTurnCount, addTurnCount);
  }
};

const playerTurn = (gameboard, getTurnCount, addTurnCount) => {
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
      playerTurn(gameboard, getTurnCount, addTurnCount);
      return;
    }
    gameboard[0][activePlayerNum] = activePlayer.marker;
  }

  if (activePlayerNum >= 3 && activePlayerNum <= 5) {
    if (gameboard[1][activePlayerNum - 3] !== "") {
      alert("Spot taken 2. Pick another space");
      playerTurn(gameboard, getTurnCount, addTurnCount);
      return;
    }
    gameboard[1][activePlayerNum - 3] = activePlayer.marker;
  }

  if (activePlayerNum >= 6 && activePlayerNum <= 8) {
    if (gameboard[2][activePlayerNum - 6] !== "") {
      alert("Spot taken 3. Pick another space");
      playerTurn(gameboard, getTurnCount, addTurnCount);
      return;
    }
    gameboard[2][activePlayerNum - 6] = activePlayer.marker;
  }

  checkWinner(gameboard, activePlayer, getTurnCount, addTurnCount);
};

const checkWinner = (gameboard, activePlayer, getTurnCount, addTurnCount) => {
  checkRowWin(gameboard, activePlayer, getTurnCount, addTurnCount);
  // checkColumnWin(gameboard);
};

const checkRowWin = (gameboard, activePlayer, getTurnCount, addTurnCount) => {
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

//helper function
const getNames = () => {
  const playerOneName = prompt("Player One Name");
  const playerTwoName = prompt("Player Two Name");
  playerOne.name = playerOneName;
  playerTwo.name = playerTwoName;
};

playGame();
