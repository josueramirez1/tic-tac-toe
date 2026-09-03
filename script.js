const Gameboard = () => {
  //Selector
  const body = document.querySelector("body");
  //Logic
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

  //UI

  const printBoard = () => {
    //create container
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game-container");
    body.appendChild(gameDiv);
    //create array to append later
    let boardToPrint = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const space = document.createElement("div");
        space.classList.add("space");
        boardToPrint.push(space);
      }
    }
    boardToPrint.forEach((space) => gameDiv.appendChild(space));
  };

  return {
    getBoard,
    getTurnCount,
    addTurnCount,
    subtractTurnCount,
    printBoard,
  };
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

//Gameflow

const Controller = () => {
  //create new objects to use for game
  const {
    getBoard,
    getTurnCount,
    addTurnCount,
    subtractTurnCount,
    printBoard,
  } = Gameboard();
  const { playerOne, playerTwo } = Players();
  const gameboard = getBoard();

  const getNames = () => {
    const playerOneName = prompt("Player One Name");
    const playerTwoName = prompt("Player Two Name");
    playerOne.name = playerOneName;
    playerTwo.name = playerTwoName;
  };

  const printNames = () => {
    const body = document.querySelector("body");
    //create container for names
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name-container");
    body.appendChild(nameDiv);
    const playerOneSpan = document.createElement("span");
    const playerTwoSpan = document.createElement("span");
    playerOneSpan.textContent = `Player One: ${playerOne.name}`;
    playerTwoSpan.textContent = `Player Two: ${playerTwo.name}`;
    nameDiv.append(playerOneSpan, playerTwoSpan);
  };

  //Gets player names one time
  // getNames();
  // printNames();

  const initGame = () => {
    //get selectors
    const spaces = document.querySelectorAll(".space");
    spaces.forEach((space, index) =>
      space.addEventListener("click", (e) => {
        playerTurn(
          gameboard,
          getTurnCount,
          addTurnCount,
          subtractTurnCount,
          index,
          e,
        );
        console.table(gameboard);
      }),
    );
  };

  const playerTurn = (
    gameboard,
    getTurnCount,
    addTurnCount,
    subtractTurnCount,
    index,
    e,
  ) => {
    let activePlayer;
    let currentCount = getTurnCount();

    currentCount % 2 === 0
      ? (activePlayer = playerOne)
      : (activePlayer = playerTwo);

    const activePlayerNum = index;

    if (activePlayerNum >= 0 && activePlayerNum <= 2) {
      if (gameboard[0][activePlayerNum] !== "") {
        alert("Spot taken. Pick another space");
        playerTurn(gameboard, getTurnCount, addTurnCount, index);
        return;
      }
      gameboard[0][activePlayerNum] = activePlayer.marker;
      e.target.textContent = activePlayer.marker;
    }

    if (activePlayerNum >= 3 && activePlayerNum <= 5) {
      if (gameboard[1][activePlayerNum - 3] !== "") {
        alert("Spot taken 2. Pick another space");
        playerTurn(gameboard, getTurnCount, addTurnCount, index);
        return;
      }
      gameboard[1][activePlayerNum - 3] = activePlayer.marker;
      e.target.textContent = activePlayer.marker;
    }

    if (activePlayerNum >= 6 && activePlayerNum <= 8) {
      if (gameboard[2][activePlayerNum - 6] !== "") {
        alert("Spot taken 3. Pick another space");
        playerTurn(gameboard, getTurnCount, addTurnCount, index);
        return;
      }
      gameboard[2][activePlayerNum - 6] = activePlayer.marker;
      e.target.textContent = activePlayer.marker;
    }

    checkWinner(gameboard, activePlayer, addTurnCount, subtractTurnCount);
  };

  const checkWinner = (
    gameboard,
    activePlayer,
    addTurnCount,
    subtractTurnCount,
  ) => {
    const spaces = document.querySelectorAll(".space");

    checkRowWin(gameboard, activePlayer, subtractTurnCount, spaces);
    checkColumnWin(gameboard, activePlayer, subtractTurnCount, spaces);
    checkDiagnolWin(gameboard, activePlayer, subtractTurnCount, spaces);
    checkDraw(gameboard, subtractTurnCount, spaces);
    addTurnCount();
  };

  const checkDraw = (gameboard, subtractTurnCount, spaces) => {
    const [columnArrOne, columnArrTwo, columnArrThree] = gameboard;
    // This condition checks winners for row wins

    if (
      columnArrOne.every((space) => space !== "") &&
      columnArrTwo.every((space) => space !== "") &&
      columnArrThree.every((space) => space !== "")
    ) {
      showDraw(gameboard, subtractTurnCount, spaces);
      return;
    }
  };

  const checkRowWin = (gameboard, activePlayer, subtractTurnCount, spaces) => {
    const [columnArrOne, columnArrTwo, columnArrThree] = gameboard;
    // This condition checks winners for row wins
    if (
      columnArrOne.every((space) => space === activePlayer.marker) ||
      columnArrTwo.every((space) => space === activePlayer.marker) ||
      columnArrThree.every((space) => space === activePlayer.marker)
    ) {
      showWinner(activePlayer.name, gameboard, subtractTurnCount, spaces);
      return;
    }
  };

  const checkColumnWin = (
    gameboard,
    activePlayer,
    subtractTurnCount,
    spaces,
  ) => {
    const [columnArrOne, columnArrTwo, columnArrThree] = gameboard;
    if (
      columnArrOne[0] === activePlayer.marker &&
      columnArrTwo[0] === activePlayer.marker &&
      columnArrThree[0] === activePlayer.marker
    ) {
      showWinner(activePlayer.name, gameboard, subtractTurnCount, spaces);
      return;
    }

    if (
      columnArrOne[1] === activePlayer.marker &&
      columnArrTwo[1] === activePlayer.marker &&
      columnArrThree[1] === activePlayer.marker
    ) {
      showWinner(activePlayer.name, gameboard, subtractTurnCount, spaces);
      return;
    }

    if (
      columnArrOne[2] === activePlayer.marker &&
      columnArrTwo[2] === activePlayer.marker &&
      columnArrThree[2] === activePlayer.marker
    ) {
      showWinner(activePlayer.name, gameboard, subtractTurnCount, spaces);
      return;
    }
  };

  const checkDiagnolWin = (
    gameboard,
    activePlayer,
    subtractTurnCount,
    spaces,
  ) => {
    const [columnArrOne, columnArrTwo, columnArrThree] = gameboard;

    if (
      columnArrOne[0] === activePlayer.marker &&
      columnArrTwo[1] === activePlayer.marker &&
      columnArrThree[2] === activePlayer.marker
    ) {
      showWinner(activePlayer.name, gameboard, subtractTurnCount, spaces);
      return;
    }

    if (
      columnArrOne[2] === activePlayer.marker &&
      columnArrTwo[1] === activePlayer.marker &&
      columnArrThree[0] === activePlayer.marker
    ) {
      showWinner(activePlayer.name, gameboard, subtractTurnCount, spaces);
      return;
    }
  };

  const showWinner = (playerName, gameboard, subtractTurnCount, spaces) => {
    alert(`${playerName} wins!`);
    console.table(gameboard);
    subtractTurnCount();
    spaces.forEach((space) => space.classList.add("inactive"));
    return;
  };

  const showDraw = (gameboard, subtractTurnCount, spaces) => {
    alert("It's a draw!. Play again?");
    console.log(gameboard);
    subtractTurnCount();
    spaces.forEach((space) => space.classList.add("inactive"));
    return;
  };

  return { initGame, printBoard };
};

const game = Controller();
//Initiate board
game.printBoard();
game.initGame();
