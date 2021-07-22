import React, { useEffect, useState } from "react";

import {
  getEmptyBoard,
  generateRandom,
  isOver,
  checkWin,
  compress,
  reverse,
  rotateLeft,
  rotateRight,
} from "../BoxesData";

import { useStateValue } from "../utils/StateProvider";
import { actionTypes } from "../utils/reducer";

const Cell = ({ number }) => (
  <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
);

const GameBoard = () => {
  const [board, setBoard] = useState(generateRandom(getEmptyBoard()));
  const [{ score, highScore }, dispatch] = useStateValue();

  const checkEndGame = () => {
    if (checkWin(board)) {
      console.log("You winn");
    } else if (isOver(board)) {
      console.log("You lose");
    }
  };

  const merge = (board) => {
    let currScore = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length - 1; j++) {
        if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
          currScore += board[i][j] * 2;
          board[i][j] *= 2;
          board[i][j + 1] = 0;
        }
      }
    }
    let newScore = score + currScore;
    if (highScore <= newScore) {
      dispatch({
        type: actionTypes.SET_HIGH_SCORE,
        score: newScore,
      });
    }
    dispatch({
      type: actionTypes.SET_SCORE,
      score: newScore,
    });
    return board;
  };

  const moveFunctionCreator = (main, mediator, result) => {
    const nBoard1 = main(board);
    const nBoard2 = mediator(nBoard1);
    return result(nBoard2);
  };

  const moveLeft = () => moveFunctionCreator(compress, merge, compress);
  const moveRight = () => moveFunctionCreator(reverse, moveLeft, reverse);
  const moveUp = () => moveFunctionCreator(rotateLeft, moveLeft, rotateRight);
  const moveDown = () => moveFunctionCreator(rotateRight, moveLeft, rotateLeft);

  const onKeyDown = (e) => {
    let dir = () => {};
    switch (e.key) {
      case "ArrowLeft":
        dir = moveLeft;
        break;
      case "ArrowRight":
        dir = moveRight;
        break;
      case "ArrowUp":
        dir = moveUp;
        break;
      case "ArrowDown":
        dir = moveDown;
        break;

      default:
        return;
    }

    checkEndGame();
    const newBoard = dir(board);
    setBoard(generateRandom(newBoard));
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
              <Cell key={`cell-${i}-${j}`} number={cell} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default GameBoard;
