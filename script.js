function Gameboard() {
  let board = [];
  let { value, player1, player2 } = marks();
  let { numFromPlayer1, numFromPlayer2 } = flow();

  for (let i = 1; i <= 9; i++) {
    board.push(value);
  }

  let updatedBoard = board.map((val, index) => {
    if (index + 1 === numFromPlayer1) val = player1;
    if (index + 1 === numFromPlayer2) val = player2;

    return val;
  });

  return updatedBoard;
}

function marks() {
  let value = 0;
  let player1 = 1;
  let player2 = 2;
  return { value, player1, player2 };
}

function flow() {
  let numFromPlayer1 = parseInt(
    prompt("Player 1: Pick index number from 1 to 9", "")
  );

  let numFromPlayer2 = parseInt(
    prompt("Player 2: Pick index number from 1 to 9", "")
  );

  if (numFromPlayer1 < 1 || numFromPlayer1 > 9) {
    numFromPlayer1 = parseInt(
      prompt("Player 1: Pick another index number from 1 to 9", "")
    );
  }

  if (numFromPlayer2 < 1 || numFromPlayer2 > 9) {
    numFromPlayer2 = parseInt(
      prompt("Player 2: Pick another index number from 1 to 9", "")
    );
  }

  if (numFromPlayer1 !== numFromPlayer2) {
    return { numFromPlayer1, numFromPlayer2 };
  } else {
    numFromPlayer2 = repeatChoice();
    return { numFromPlayer1, numFromPlayer2 };
  }

  function repeatChoice() {
    let numFromPlayer2 = parseInt(
      prompt("Player 2: Pick index number from 1 to 9", "")
    );

    if (numFromPlayer2 < 1 || numFromPlayer2 > 9) {
      numFromPlayer2 = parseInt(
        prompt("Player 2: Pick another index number from 1 to 9", "")
      );
    }

    if (numFromPlayer1 === numFromPlayer2) repeatChoice();
    return numFromPlayer2;
  }
}

console.log(Gameboard());
