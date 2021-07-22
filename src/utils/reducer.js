let highScore = localStorage.getItem("highScore");

export const initialState = {
  highScore: highScore ? +highScore : 0,
  score: 0,
};

export const actionTypes = {
  SET_SCORE: "SET_SCORE",
  SET_HIGH_SCORE: "SET_HIGH_SCORE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_HIGH_SCORE:
      localStorage.setItem("highScore", action.score);
      return {
        ...state,
        highScore: action.score,
      };
    case actionTypes.SET_SCORE:
      return {
        ...state,
        score: action.score,
      };
    default:
      return state;
  }
};
export default reducer;
