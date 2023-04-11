import { useEffect, useState } from "react";

import "./TicTac.scss";

const winningCombinations = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];
export const TicTac = () => {
  const [list, setList] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [player, setPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      return setIsMounted(true);
    }

    if (checkIsWinner()) return setGameStatus(player);
    if (checkIsDraw()) return setGameStatus("Draw");

    setPlayer(player === "X" ? "O" : "X");
  }, [list]);

  const drawItem = (squarePosition) => {
    if (gameStatus || list[squarePosition] !== null) return;

    const newList = [...list];
    newList[squarePosition] = player;
    setList(newList);
  };

  const checkIsWinner = () => {
    return winningCombinations.some((combination) => {
      return combination.every((item) => {
        return list[item] === player;
      });
    });
  };

  const checkIsDraw = () => {
    return list.every((item) => item !== null);
  };

  const winner = gameStatus === "X" || gameStatus === "O";
  const draw = gameStatus === "Draw";
  const whoPlays = !winner && !draw;
  const active = list.includes("X" || "O");

  const resetGame = () => {
    if (list.every((item) => item === null)) return;
    setList([null, null, null, null, null, null, null, null, null]);
    setGameStatus("");
  };

  return (
    <div className="tictac">
      <div className="header">
        <button
          onClick={() => {
            resetGame();
          }}
          className={`reset ${active ? "reset--active" : ""}`}
        >
          Reset Game
        </button>

        {whoPlays && (
          <h1 className="title">
            Player: <span>{player}</span>
          </h1>
        )}
        {winner && (
          <div className="title">
            Winner Is Player: <span>{gameStatus}</span>{" "}
          </div>
        )}
        {draw && (
          <div className="title">
            Game Is: <span>{gameStatus}</span>
          </div>
        )}
      </div>

      <div className="container">
        {list.map((item, index) => (
          <div
            onClick={() => {
              drawItem(index);
            }}
            className={`item ${winner || draw ? "item--finished" : ""}`}
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
