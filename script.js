const Players = () => {
  const players = [
    { name, marker: "X" },
    { name, marker: "O" },
  ];

  return { players };
};

const Gameboard = () => {
  //Logic
  let board = [];
  let turnCount = 0;

  const createBoard = () => {
    board = [];
    turnCount = 0;

    for (let i = 0; i <= 2; i++) {
      const column = [];
      for (let j = 0; j <= 2; j++) {
        const space = "";
        column.push(space);
      }
      board.push(column);
    }
  };

  createBoard();

  const getBoard = () => board;
  const getTurnCount = () => turnCount;
  const addTurnCount = () => ++turnCount;
  const subtractTurnCount = () => --turnCount;
  //UI

  const fetchNames = (playerOne, playerTwo) => {
    const playerOneName = prompt("Player One Name");
    const playerTwoName = prompt("Player Two Name");
    playerOne.name = playerOneName;
    playerTwo.name = playerTwoName;
  };

  const printContainer = () => {
    const body = document.querySelector("body");
    const container = document.createElement("div");
    container.classList.add("container");
    body.appendChild(container);
  };

  const printNames = (playerOne, playerTwo) => {
    const container = document.querySelector(".container");
    const nameDiv = document.createElement("div");
    const messageDiv = document.createElement("div");
    nameDiv.classList.add("name-container");
    messageDiv.classList.add("message-container");
    container.append(nameDiv, messageDiv);
    const playerOneSpan = document.createElement("span");
    const playerTwoSpan = document.createElement("span");
    playerOneSpan.textContent = `Player One: ${playerOne.name}`;
    playerTwoSpan.textContent = `Player Two: ${playerTwo.name}`;
    nameDiv.append(playerOneSpan, playerTwoSpan);
  };

  const printBoard = () => {
    const container = document.querySelector(".container");
    //create container
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game-container");
    container.appendChild(gameDiv);
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
    fetchNames,
    printContainer,
    printNames,
    getBoard,
    printBoard,
    getTurnCount,
    addTurnCount,
    subtractTurnCount,
    createBoard,
  };
};

const Controller = () => {
  //creating player instance with two players
  const { players } = Players();
  //creating componenets of gameboard, including names, gameboard, counting
  const {
    fetchNames,
    printContainer,
    printNames,
    getBoard,
    printBoard,
    getTurnCount,
    addTurnCount,
    subtractTurnCount,
    createBoard,
  } = Gameboard();

  //calling the console gameboard

  const initGame = () => {
    const [playerOne, playerTwo] = players;
    const noName = players.some((player) => player.name === "");
    if (noName) {
      fetchNames(playerOne, playerTwo);
      printContainer();
    }

    printNames(playerOne, playerTwo);
    createBoard();
    printBoard();
    //console board
    let gameboard = getBoard();
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
    let activeNum = getTurnCount();
    const [playerOne, playerTwo] = players;

    activeNum % 2 === 0
      ? (activePlayer = playerOne)
      : (activePlayer = playerTwo);

    const activePlayerNum = index;

    if (activePlayerNum >= 0 && activePlayerNum <= 2) {
      if (gameboard[0][activePlayerNum] !== "") {
        alert("Spot taken. Pick another space");
        playerTurn(gameboard, getTurnCount, addTurnCount, index, e);
        return;
      }
      gameboard[0][activePlayerNum] = activePlayer.marker;
      e.target.textContent = activePlayer.marker;
    }

    if (activePlayerNum >= 3 && activePlayerNum <= 5) {
      if (gameboard[1][activePlayerNum - 3] !== "") {
        alert("Spot taken 2. Pick another space");
        playerTurn(gameboard, getTurnCount, addTurnCount, index, e);
        return;
      }
      gameboard[1][activePlayerNum - 3] = activePlayer.marker;
      e.target.textContent = activePlayer.marker;
    }

    if (activePlayerNum >= 6 && activePlayerNum <= 8) {
      if (gameboard[2][activePlayerNum - 6] !== "") {
        alert("Spot taken 3. Pick another space");
        playerTurn(gameboard, getTurnCount, addTurnCount, index, e);
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
      showDraw(subtractTurnCount, spaces);
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
      showWinner(activePlayer.name, subtractTurnCount, spaces);
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
      showWinner(activePlayer.name, subtractTurnCount, spaces);
      return;
    }

    if (
      columnArrOne[1] === activePlayer.marker &&
      columnArrTwo[1] === activePlayer.marker &&
      columnArrThree[1] === activePlayer.marker
    ) {
      showWinner(activePlayer.name, subtractTurnCount, spaces);
      return;
    }

    if (
      columnArrOne[2] === activePlayer.marker &&
      columnArrTwo[2] === activePlayer.marker &&
      columnArrThree[2] === activePlayer.marker
    ) {
      showWinner(activePlayer.name, subtractTurnCount, spaces);
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
      showWinner(activePlayer.name, subtractTurnCount, spaces);
      return;
    }

    if (
      columnArrOne[2] === activePlayer.marker &&
      columnArrTwo[1] === activePlayer.marker &&
      columnArrThree[0] === activePlayer.marker
    ) {
      showWinner(activePlayer.name, subtractTurnCount, spaces);
      return;
    }
  };

  const showWinner = (playerName, subtractTurnCount, spaces) => {
    const messageDiv = document.querySelector(".message-container");
    const message = document.createElement("p");
    message.textContent = `${playerName} wins!`;
    const button = document.createElement("button");
    button.textContent = "Play Again?";
    button.classList.add("reset");
    messageDiv.append(message, button);
    subtractTurnCount();
    spaces.forEach((space) => space.classList.add("inactive"));
    resetGame();

    return;
  };

  const showDraw = (subtractTurnCount, spaces) => {
    const messageDiv = document.querySelector(".message-container");
    const message = document.createElement("p");
    message.textContent = "It's a draw!";
    const button = document.createElement("button");
    button.textContent = "Play Again?";
    messageDiv.append(message, button);
    subtractTurnCount();
    spaces.forEach((space) => space.classList.add("inactive"));

    return;
  };

  const resetGame = () => {
    const resetBtn = document.querySelector(".reset");
    resetBtn.addEventListener("click", () => {
      const messageDiv = document.querySelector(".message-container");
      const nameDiv = document.querySelector(".name-container");
      const gameDiv = document.querySelector(".game-container");
      nameDiv.remove();
      messageDiv.remove();
      gameDiv.remove();
      initGame();
    });
  };

  return { initGame };
};

const game = Controller();

game.initGame();
