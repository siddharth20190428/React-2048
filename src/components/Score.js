import React from "react";
import { useStateValue } from "../utils/StateProvider";

const Score = () => {
  const [{ score, highScore }, dispatch] = useStateValue();

  return (
    <div>
      Score {score} High Score {highScore}
    </div>
  );
};

export default Score;
