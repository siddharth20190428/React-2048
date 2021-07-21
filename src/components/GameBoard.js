import React, { useEffect, useState } from "react";

import {
  getEmptyBoard,
  generateRandom,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isOver,
  checkWin,
} from "../BoxesData";

const Cell = ({ number }) => (
  <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
);

const GameBoard = () => {
  const [board, setBoard] = useState(generateRandom(getEmptyBoard()));

  const checkEndGame = () => {
    if (checkWin(board)) {
      console.log("You winn");
    } else if (isOver(board)) {
      console.log("You lose");
    }
  };

  const left = () => {
    const newBoard = moveLeft(board);
    setBoard(generateRandom(newBoard));
    checkEndGame();
  };
  const right = () => {
    const newBoard = moveRight(board);
    setBoard(generateRandom(newBoard));
    checkEndGame();
  };
  const up = () => {
    const newBoard = moveUp(board);
    setBoard(generateRandom(newBoard));
    checkEndGame();
  };
  const down = () => {
    const newBoard = moveDown(board);
    setBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        left();
        break;
      case "ArrowRight":
        right();
        break;
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        break;

      default:
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="game-board">
      {board.map((row, i) => {
        return (
          <div key={`row-${i}`} className="row">
            {row.map((cell, j) => (
              <Cell key={`cel-${i}-${j}`} number={cell} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default GameBoard;
