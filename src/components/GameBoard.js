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

  const moveLeft = (board) => {
    const nBoard1 = compress(board);
    const nBoard2 = merge(nBoard1);
    return compress(nBoard2);
  };

  const moveRight = (board) => {
    const nBoard1 = reverse(board);
    const nBoard2 = moveLeft(nBoard1);
    return reverse(nBoard2);
  };

  const moveUp = (board) => {
    const rotateBoard = rotateLeft(board);
    const newBoard = moveLeft(rotateBoard);
    return rotateRight(newBoard);
  };
  const moveDown = (board) => {
    const rotateBoard = rotateRight(board);
    const newBoard = moveLeft(rotateBoard);
    return rotateLeft(newBoard);
  };

  const left = () => {
    checkEndGame();
    const newBoard = moveLeft(board);
    setBoard(generateRandom(newBoard));
  };
  const right = () => {
    checkEndGame();
    const newBoard = moveRight(board);
    setBoard(generateRandom(newBoard));
  };
  const up = () => {
    checkEndGame();
    const newBoard = moveUp(board);
    setBoard(generateRandom(newBoard));
  };
  const down = () => {
    checkEndGame();
    const newBoard = moveDown(board);
    setBoard(generateRandom(newBoard));
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
              <Cell key={`cell-${i}-${j}`} number={cell} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default GameBoard;
