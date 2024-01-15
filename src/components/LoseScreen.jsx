import React, { useState } from "react";
import * as startingSongs from "../startingSongs";

function LoseScreen(props) {
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highscore") ?? "0"
  );
  let songToBeSaved = JSON.stringify(
    startingSongs.songsUsed[startingSongs.songsUsed.length - 1]
  );

  function checkHighScore(score) {
    localStorage.setItem("lastItem", songToBeSaved);
    const lastGameState = JSON.parse(localStorage.getItem("gameState"));
    localStorage.setItem(
      "gameState",
      JSON.stringify({
        ...lastGameState,
        lives: 0,
        playerState: "gameOver",
      })
    );
    const newGameState = JSON.parse(localStorage.getItem("gameState"));

    if (highScore < score) {
      setHighScore(score);
      localStorage.setItem("highscore", score);
    }
    return highScore;
  }

  function playAgain() {
    props.setLives(3);
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

  const shareScore = React.useCallback( async () =>{
    let copiedText = "soundtracking: ⭐" + props.score + "⭐\n\nMy Playlist:\n";
    let streak = ''
    for(const song of props.cardsUsed){
      copiedText += `${song.artist}: ${song.title}\n`
      if(song.correct && song.startingCard){
        streak += '⬜️'
      } else if(song.correct){
        streak += '🟩'
      } else {
        streak += '🟥'
      }
    }
    copiedText += `\n${streak}\nhttps://soundtracking.xyz/`
    await navigator?.clipboard?.writeText(copiedText);
  })

  return (
    <div className="lostModal">
      <table className="loseTable">
        <tbody>
          <tr className="loseRow1">
            <th>
              <h1 className="loseScreenWording">Your Score</h1>
            </th>
            <th>
              <h1 className="loseScreenWording">High Score</h1>
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
                <img
                  className="replayIcon"
                  src={require("../images/replayIconWhite.png")}
                  alt="replay button"
                />
                Play Again
              </button>
            </td>
            <td>
              <button
                id="shareScore"
                className="loseButton"
                onClick={shareScore}
              >
                <img
                  className="shareIcon"
                  src={require("../images/shareIconWhite.png")}
                  alt="replay button"
                />
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
