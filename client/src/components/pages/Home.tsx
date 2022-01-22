import React, { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
// styles
import "./page.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent) => {
    const { id } = event.currentTarget;
    if (id === "game") navigate("/game");
    if (id === "scores") navigate("/scores");
    if (id === "leader") navigate("/leader");
  };

  return (
    <div className="page">
      <div className="card column">
        <button id="game" onClick={handleClick}>
          New Game
        </button>
        <button id="scores" onClick={handleClick}>
          Scores
        </button>
        <button id="leader" onClick={handleClick}>
          Leader Board
        </button>
      </div>
    </div>
  );
};

export default Home;
