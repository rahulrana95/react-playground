import React, { useEffect, useState } from "react";

function move(game: string | any[], i: number, j: number, direction: string) {
  if (direction === "up") {
    // next location dont exist
    // next location is wall
    if (i - 1 < 0 || game[i - 1][j] === "x") return false;

    // if there is are 2 boxes in next direction
    if (
      (game[i - 1][j] === "b" && game[i - 2] && game[i - 2][j] === "b") ||
      // box is at next location and its last location
      (game[i - 1][j] === "b" && i - 1 === 0)
    ) {
      return false;
    } else if (game[i - 1][j] === "b" && game[i - 2]?.[j] !== "x") {
      // next location is of box, just move it
      game[i - 2][j] = "b"; // box
      game[i - 1][j] = "u"; // new user location
      game[i][j] = "0"; // replace old user location to path
    } else {
      // next location is empty so move the user
      if (game[i - 1][j] !== "b") {
        game[i - 1][j] = "u"; // new user location
        game[i][j] = "0"; // replace old user location to path
      }
    }
    return true;
  } else if (direction === "down") {
    // next location dont exist
    // next location is wall
    if (i + 1 >= game.length || game[i + 1][j] === "x") return false;

    // if there is are 2 boxes in next direction
    if (
      (game[i + 1][j] === "b" && game[i + 2] && game[i + 2][j] === "b") ||
      // box is at next location and its last location
      (game[i + 1][j] === "b" && i + 1 === game.length - 1)
    ) {
      return false;
    } else if (game[i + 1][j] === "b" && game[i + 2]?.[j] !== "x") {
      // next location is of box, just move it
      game[i + 2][j] = "b"; // box
      game[i + 1][j] = "u"; // new user location
      game[i][j] = "0"; // replace old user location to path
    } else {
      // next location is empty so move the user
      if (game[i + 1][j] !== "b") {
        game[i + 1][j] = "u"; // new user location
        game[i][j] = "0"; // replace old user location to path
      }
    }
    return true;
  } else if (direction === "right") {
    // next location dont exist
    // next location is wall
    if (j + 1 >= game[j].length || game[i][j + 1] === "x") return false;

    // if there is are 2 boxes in next direction
    if (
      (game[i][j + 1] === "b" && game[i][j + 2] === "b") ||
      // box is at next location and its last location
      (game[i][j + 1] === "b" && j + 1 === game[j].length - 1)
    ) {
      return false;
    } else if (game[i][j + 1] === "b" && game[i][j + 2] !== "x") {
      // next location is of box, just move it
      game[i][j + 2] = "b"; // box
      game[i][j + 1] = "u"; // new user location
      game[i][j] = "0"; // replace old user location to path
    } else {
      // next location is empty so move the user
      if (game[i][j + 1] !== "b") {
        game[i][j + 1] = "u"; // new user location
        game[i][j] = "0"; // replace old user location to path
      }
    }
    return true;
  } else if (direction === "left") {
    // next location dont exist
    // next location is wall
    if (j - 1 >= game[j].length || game[i][j - 1] === "x") return false;

    // if there is are 2 boxes in next direction
    if (
      (game[i][j - 1] === "b" && game[i][j - 2] === "b") ||
      // box is at next location and its first location
      (game[i][j - 1] === "b" && j - 1 === 0)
    ) {
      return false;
    } else if (game[i][j - 1] === "b" && game[i][j - 2] !== "x") {
      // next location is of box, just move it
      game[i][j - 2] = "b"; // box
      game[i][j - 1] = "u"; // new user location
      game[i][j] = "0"; // replace old user location to path
    } else {
      // next location is empty so move the user
      if (game[i][j - 1] !== "b") {
        game[i][j - 1] = "u"; // new user location
        game[i][j] = "0"; // replace old user location to path
      }
    }
    return true;
  } else {
    // throw error
  }

  return false;
}

// Function to find the coordinates of 'u'
function findCharacterU(game: string | any[]) {
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game[i].length; j++) {
      if (game[i][j] === "u") {
        return { j, i }; // Return coordinates { x, y }
      }
    }
  }
}
function generateRandomGameBoard(rows: number, cols: number): string[][] {
  const game = [];
  const validDirections = ["up", "down", "left", "right"];

  // Helper function to shuffle an array
  function shuffleArray(array: string | any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // @ts-expect-error
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Initialize the game board with walls
  for (let i = 0; i < rows; i++) {
    game[i] = Array(cols).fill("x");
  }

  // Randomly place paths
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      game[i][j] = Math.random() < 0.7 ? "0" : "x";
    }
  }

  // Randomly place flags and boxes
  const flags = [];
  const boxes = [];
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      if (game[i][j] === "0") {
        if (Math.random() < 0.05) {
          flags.push({ row: i, col: j });
          game[i][j] = "f";
        } else if (Math.random() < 0.05) {
          boxes.push({ row: i, col: j });
          game[i][j] = "b";
        }
      }
    }
  }

  // Randomly place the user
  let userRow, userCol;
  do {
    userRow = Math.floor(Math.random() * (rows - 2)) + 1;
    userCol = Math.floor(Math.random() * (cols - 2)) + 1;
  } while (game[userRow][userCol] !== "0");
  game[userRow][userCol] = "u";

  // Ensure that at least one flag and one box are reachable from the user
  while (true) {
    const shuffledDirections = shuffleArray(validDirections);
    let reachableFlags = false;
    let reachableBoxes = false;

    for (const direction of shuffledDirections) {
      let i = userRow,
        j = userCol;
      while (true) {
        if (game[i][j] === "f") reachableFlags = true;
        if (game[i][j] === "b") reachableBoxes = true;

        if (direction === "up") i--;
        if (direction === "down") i++;
        if (direction === "left") j--;
        if (direction === "right") j++;

        if (game[i][j] === "x") break; // Hit a wall
      }
    }

    if (reachableFlags && reachableBoxes) break;

    // Regenerate the board if at least one flag or one box is not reachable
    return generateRandomGameBoard(rows, cols);
  }

  return game;
}

// Helper function to get color based on cell value
const getColor = (value: string) => {
  switch (value) {
    case "x":
      return "black";
    case "b":
      return "brown";
    case "u":
      return "blue";
    case "f":
      return "green";
    default:
      return "transparent";
  }
};

function getFlagPositions(game: string | any[]) {
  const flagPositions = [];
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game[i].length; j++) {
      if (game[i][j] === "f") {
        flagPositions.push({ row: i, col: j });
      }
    }
  }
  return flagPositions;
}
const gameA = generateRandomGameBoard(20, 20);
const posA = getFlagPositions(gameA);

function Game() {
  const [game, setGame] = useState(gameA);
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      const coord = findCharacterU(game);

      // Check if the pressed key is the "ArrowUp" key
      if (event.key === "ArrowUp") {
        move(game, coord?.i || 0, coord?.j || 0, "up");
      }
      // Check if the pressed key is the "ArrowDown" key
      else if (event.key === "ArrowDown") {
        console.log("Down key pressed");
        move(game, coord?.i || 0, coord?.j || 0, "down");
      } else if (event.key === "ArrowRight") {
        console.log("Down key pressed");
        move(game, coord?.i || 0, coord?.j || 0, "right");
      } else if (event.key === "ArrowLeft") {
        console.log("Down key pressed");
        move(game, coord?.i || 0, coord?.j || 0, "left");
      }

      for (const pos of posA) {
        const { row, col } = pos;
        if (game[row][col] !== "u") {
          game[row][col] = "f";
        }
      }

      setGame([...game]);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {game.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid #ccc",
                backgroundColor: getColor(col), // Get color based on cell value
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Game;

// We will develop a simple box pushing game. Example game https://sokoban.info/

// On a square map of arbitrary size there is a number of boxes and an equivalent amount of spots (flags).
// A character moves boxes by pushing them one position up, down, left or right (no diagonal movement).
// Only a single box can be pushed in one direction, it is impossible to push two boxes in the same direction.
// In order to win the game all boxes must be pushed on flags, when all boxes are placed on top of all flags the game is over.
// It doesn’t matter which box goes on which flag.

// Task - Create a square map of fixed size (hardcoded values). Write a function to move boxes according to the game rules.

// TODO
// foloowing improvements can be done
// 1. Switch statements for direction
// 2. for up and down, for right and left
//        we can extract the logic in util and because the param i+1, is same so we can pass
//        execpt 2 conditinos <0 or === game.length -1, we can pass direction so we handle these 2

// x is wall
// 0 is valid path
// u is user
// b is box
// f is flag

// i and j is current locatio of user
