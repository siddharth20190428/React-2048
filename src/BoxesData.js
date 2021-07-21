export const getEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const hasValue = (board, value) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === value) {
        return true;
      }
    }
  }
  return false;
};

export const isFull = (board) => {
  return !hasValue(board, 0);
};

const randomPosition = () => {
  let row = Math.floor(Math.random() * 4);
  let col = Math.floor(Math.random() * 4);
  return [row, col];
};

export const generateRandom = (board) => {
  if (isFull(board)) {
    return board;
  }

  let [row, col] = randomPosition();
  while (board[row][col] !== 0) {
    [row, col] = randomPosition();
  }

  board[row][col] = 2;
  return board;
};

const compress = (board) => {
  const newBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    let col = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== 0) {
        newBoard[i][col] = board[i][j];
        col++;
      }
    }
  }
  return newBoard;
};

const merge = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length - 1; j++) {
      if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
        board[i][j] *= 2;
        board[i][j + 1] = 0;
      }
    }
  }
  return board;
};

export const moveLeft = (board) => {
  const nBoard1 = compress(board);
  const nBoard2 = merge(nBoard1);
  return compress(nBoard2);
};

const reverse = (board) => {
  const reverseBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      reverseBoard[i][j] = board[i][board[i].length - 1 - j];
    }
  }
  return reverseBoard;
};

export const moveRight = (board) => {
  const nBoard1 = reverse(board);
  const nBoard2 = moveLeft(nBoard1);
  return reverse(nBoard2);
};

const rotateLeft = (board) => {
  const rotateBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      rotateBoard[i][j] = board[j][board[i].length - 1 - i];
    }
  }
  return rotateBoard;
};

const rotateRight = (board) => {
  const rotateBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      rotateBoard[i][j] = board[board[i].length - 1 - j][i];
    }
  }
  return rotateBoard;
};

export const moveUp = (board) => {
  const rotateBoard = rotateLeft(board);
  const newBoard = moveLeft(rotateBoard);
  return rotateRight(newBoard);
};
export const moveDown = (board) => {
  const rotateBoard = rotateRight(board);
  const newBoard = moveLeft(rotateBoard);
  return rotateLeft(newBoard);
};

export const checkWin = (board) => {
  return hasValue(board, 2048);
};

const hasDiff = (board, updatedBoard) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== updatedBoard[i][j]) {
        return true;
      }
    }
  }
  return false;
};

export const isOver = (board) => {
  if (
    hasDiff(board, moveLeft(board)) ||
    hasDiff(board, moveRight(board)) ||
    hasDiff(board, moveUp(board)) ||
    hasDiff(board, moveDown(board))
  ) {
    return false;
  }
  return true;
};
