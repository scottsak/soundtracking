import React, { useState, useEffect } from "react";
import * as app from "./App.jsx";
import * as api from "../api";
import * as startingSongs from "../startingSongs";

function LoseScreen(props) {
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highscore") ?? "0"
  );
  let movieToBeSaved = JSON.stringify(
    startingSongs.songsUsed[startingSongs.songsUsed.length - 1]
  );

  // useEffect(() => {
  //   console.log("scotttest checkHighscore");
  //   const lastGameState = JSON.parse(localStorage.getItem("gameState"));
  //   localStorage.setItem(
  //     "gameState",
  //     JSON.stringify({
  //       ...lastGameState,
  //       lives: 0,
  //       playerState: "gameEnded",
  //     })
  //   );
  //   const newGameState = JSON.parse(localStorage.getItem("gameState"));
  //   console.log("scotttest newGameState", newGameState);
  // }, []);

  function checkHighScore(score) {
    localStorage.setItem("lastItem", movieToBeSaved);
    console.log("scotttest checkHighscore");
    const lastGameState = JSON.parse(localStorage.getItem("gameState"));
    localStorage.setItem(
      "gameState",
      JSON.stringify({
        ...lastGameState,
        lives: 0,
        playerState: "gameEnded",
      })
    );
    const newGameState = JSON.parse(localStorage.getItem("gameState"));
    console.log("scotttest newGameState", newGameState);

    if (highScore < score) {
      setHighScore(score);
      localStorage.setItem("highscore", score);
    }
    return highScore;
  }

  function playAgain() {
    props.setLives(3);
    console.log("scotttest startingSongs.songsUsed", startingSongs.songsUsed);
    const songsUsed = startingSongs.songsUsed.filter((item) => item);
    songsUsed.filter((item) => item)[songsUsed.length - 1].startingCard = true;
    songsUsed.filter((item) => item)[songsUsed.length - 1].correct = true;
    props.setCardsUsed([songsUsed[songsUsed.length - 1]]);
    props.setScore(0);
    const lastGameState = JSON.parse(localStorage.getItem("gameState"));
    localStorage.setItem(
      "gameState",
      JSON.stringify({
        ...lastGameState,
        score: 0,
        playedCards: [songsUsed[songsUsed.length - 1]],
        lives: 3,
        playerState: "inProgress",
      })
    );
  }

  function shareScore() {
    let copiedText = "ScreenTime: ⭐" + props.score + " ⭐";
    navigator.clipboard.writeText(copiedText);
  }

  return (
    <div className="lostModal">
      <table className="loseTable">
        <tbody>
          <tr className="loseRow1">
            <th>
              <h1>Your Score</h1>
            </th>
            <th>
              <h1>High Score</h1>
            </th>
          </tr>
          <tr className="loseRow2">
            <td>
              <h2>{props.score}</h2>
            </td>
            <td>
              <h2>{checkHighScore(props.score)}</h2>
            </td>
          </tr>
          <tr className="loseRow2">
            <td>
              <button id="playAgain" className="loseButton" onClick={playAgain}>
                Play Again
              </button>
            </td>
            <td>
              <button
                id="shareScore"
                className="loseButton"
                onClick={shareScore}
              >
                Share Score
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LoseScreen;
