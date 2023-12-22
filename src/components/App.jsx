import React, { useState, useEffect } from "react";
import * as api from "../api.js";
import * as startingSongs from "../startingSongs.js";
import { DragDropContext } from "react-beautiful-dnd";
import PlayedCards from "./PlayedCards.jsx";
import NewCard from "./NewCard.jsx";
import Lives from "./Lives.jsx";
import LoseScreen from "./LoseScreen.jsx";
import Header from "./Header.jsx";

function App() {
  const [cardsUsed, setCardsUsed] = useState([]);
  const [gameCard, setGameCard] = useState({});
  const [queuedSong, setQueuedSong] = useState([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const gameState = JSON.parse(localStorage.getItem("gameState") || "{}");
    const {
      lives: savedLives,
      cardToPlay: storedCardToPlay,
      playedCards,
      playerState: storedPlayerState,
      songQueued: storedQueuedSong,
      score: storedScore,
    } = gameState || {};
    //set player state
    // setPlayerState(storedPlayerState);
    //set lives
    setLives(storedPlayerState === "gameOver" ? 0 : savedLives || 3);
    //setScore
    setScore(storedScore || 0);
    //set played items
    if (playedCards && playedCards.length) {
      setCardsUsed(playedCards);
    } else {
      setCardsUsed([startingSongs.songsUsed[0]]);
    }
    //set card to play
    if (storedCardToPlay) {
      setGameCard(storedCardToPlay);
    } else {
      setGameCard(startingSongs.cardToPlay[0]);
    }
    //set queued card
    if (storedQueuedSong) {
      setQueuedSong(storedQueuedSong);
    } else {
      setQueuedSong(startingSongs.songQueued[0]);
    }
  }, []);

  const changeMovie = async ({ newLives, items, newScore }) => {
    const nextMovie = queuedSong;
    setGameCard({
      poster_path: "spotifyLoad",
      loading: true,
      id: "loadingSpin",
    });
    const { songQueued: newSongQueued } = await api.newMovie({
      cardsUsed,
    });
    console.log("scotttest finishes call", nextMovie);
    setQueuedSong(newSongQueued);
    setGameCard(nextMovie);
    console.log("scotttest newSongQueued", newSongQueued);
    localStorage.setItem(
      "gameState",
      JSON.stringify({
        playedCards: items,
        lives: newLives,
        score: newScore,
        cardToPlay: nextMovie,
        songQueued: newSongQueued,
        playerState: newLives < 1 ? "gameOver" : "inProgress",
      })
    );

    console.log("scotttest inside { cardToPlay, songQueued, songsUsed }", {
      gameCard,
      queuedSong,
      cardsUsed,
    });
  };

  const handleOnDragEnd = async (result) => {
    if (result.destination !== null) {
      if (
        result.source.droppableId === "next" &&
        result.destination.droppableId === "played"
      ) {
        startingSongs.songsUsed.push(gameCard);

        let tempMovie =
          startingSongs.songsUsed[startingSongs.songsUsed.length - 1];

        const items = Array.from(cardsUsed);
        items.splice(result.destination.index, 0, gameCard);

        items.sort(function (a, b) {
          let x = new Date(a.release_date);
          let y = new Date(b.release_date);
          return x - y;
        });
        let newLives = lives;
        let newScore = score;
        if (result.destination.index !== items.indexOf(tempMovie)) {
          newLives = lives - 1;
          setLives(newLives);
          items[items.indexOf(tempMovie)].correct = false;

          document.body.style.backgroundColor = "# ";
          setTimeout(() => {
            document.body.style.backgroundColor = "#121212";
          }, 200);
        } else {
          newScore = score + 1;
          setScore(newScore);
          items[items.indexOf(tempMovie)].correct = true;
        }
        console.log("scotttest items", items);
        setCardsUsed(items);
        console.log("scotttest lives movie", newLives);
        await changeMovie({ newLives, items, newScore });
        let lastGameCard = JSON.stringify(gameCard);
        if (lives > 1) {
          localStorage.setItem("lastGameCard", lastGameCard);
        }
      }
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <h1 id="gameTitle">SoundTracking</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {lives < 1 ? (
          <div className="nextCard">
            <LoseScreen
              score={score}
              setLives={setLives}
              setCardsUsed={setCardsUsed}
              setGameCard={setGameCard}
              setScore={setScore}
            />
          </div>
        ) : (
          <>
            <Lives heart={lives} />

            <div className="nextCard">
              <NewCard movieItem={gameCard} />
            </div>
          </>
        )}
        <div className="boardGame scroll">
          <PlayedCards cardsUsed={cardsUsed} lives={lives} />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
