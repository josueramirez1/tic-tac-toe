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
  const subtractTurnCount = () => --turnCount;

  return { getBoard, getTurnCount, addTurnCount, subtractTurnCount };
};

//Players

const Players = () => {
  const playerOne = {
    name,
    marker: "X",
  };

  const playerTwo = {
    name,
    marker: "O",
  };

  return { playerOne, playerTwo };
};

const Controller = () => {
  //create new objects to use for game
  const { getBoard, getTurnCount, addTurnCount, subtractTurnCount } =
    Gameboard();
  const { playerOne, playerTwo } = Players();
  const gameboard = getBoard();

  const getNames = () => {
    const playerOneName = prompt("Player One Name");
    const playerTwoName = prompt("Player Two Name");
    playerOne.name = playerOneName;
    playerTwo.name = playerTwoName;
  };

  //Gets player names one time
  getNames();

  const playRound = () => {
    let previousCount = getTurnCount();
    playerTurn(gameboard, getTurnCount, addTurnCount, subtractTurnCount);
    let newCount = getTurnCount();
    //if getTurn function returned a number that was greater than previous round started continue playing the game
    console.table(gameboard);

    if (newCount > previousCount) {
      playRound(gameboard, getTurnCount, addTurnCount, subtractTurnCount);
    }
  };

  const playerTurn = (
    gameboard,
    getTurnCount,
    addTurnCount,
    subtractTurnCount,
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

    checkWinner(gameboard, activePlayer, addTurnCount, subtractTurnCount);
  };

  const checkWinner = (
    gameboard,
    activePlayer,
    addTurnCount,
    subtractTurnCount,
  ) => {
    // checkRowWin(gameboard, activePlayer, subtractTurnCount);
    checkColumnWin(gameboard, activePlayer, subtractTurnCount);
    // checkDiagnolWin(gameboard, activePlayer, subtractTurnCount);
    addTurnCount();
  };

  const checkRowWin = (gameboard, activePlayer, subtractTurnCount) => {
    const [columnArrOne, columnArrTwo, columnArrThree] = gameboard;
    // This condition checks winners for row wins
    if (
      columnArrOne.every((space) => space === activePlayer.marker) ||
      columnArrTwo.every((space) => space === activePlayer.marker) ||
      columnArrThree.every((space) => space === activePlayer.marker)
    ) {
      endGame(activePlayer.name, gameboard, subtractTurnCount);
      return;
    }
  };

  const checkColumnWin = (gameboard, activePlayer, subtractTurnCount) => {
    const [columnArrOne, columnArrTwo, columnArrThree] = gameboard;
    if (
      columnArrOne[0] === activePlayer.marker &&
      columnArrTwo[0] === activePlayer.marker &&
      columnArrThree[0] === activePlayer.marker
    ) {
      endGame(activePlayer.name, gameboard, subtractTurnCount);
      return;
    }

    if (
      columnArrOne[1] === activePlayer.marker &&
      columnArrTwo[1] === activePlayer.marker &&
      columnArrThree[1] === activePlayer.marker
    ) {
      endGame(activePlayer.name, gameboard, subtractTurnCount);
      return;
    }

    if (
      columnArrOne[2] === activePlayer.marker &&
      columnArrTwo[2] === activePlayer.marker &&
      columnArrThree[2] === activePlayer.marker
    ) {
      endGame(activePlayer.name, gameboard, subtractTurnCount);
      return;
    }
  };

  const checkDiagnolWin = (gameboard, activePlayer, subtractTurnCount) => {
    const [columnArrOne, columnArrTwo, columnArrThree] = gameboard;

    if (
      columnArrOne[0] === activePlayer.marker &&
      columnArrTwo[1] === activePlayer.marker &&
      columnArrThree[2] === activePlayer.marker
    ) {
      endGame(activePlayer.name, gameboard, subtractTurnCount);
      return;
    }

    if (
      columnArrOne[2] === activePlayer.marker &&
      columnArrTwo[1] === activePlayer.marker &&
      columnArrThree[0] === activePlayer.marker
    ) {
      endGame(activePlayer.name, gameboard, subtractTurnCount);
      return;
    }
  };

  const endGame = (playerName, gameboard, subtractTurnCount) => {
    alert(`${playerName} wins!`);
    console.table(gameboard);
    subtractTurnCount();
    return;
  };

  return { playRound };
};

const playGame = Controller();
console.log(playGame);
playGame.playRound();
