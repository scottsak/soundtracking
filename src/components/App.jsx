import React, { useState, useEffect } from "react";
import * as api from "../api.js";
import * as startingSongs from "../startingSongs.js";
import { DragDropContext } from "react-beautiful-dnd";
import PlayedCards from "./PlayedCards.jsx";
import NewCard from "./NewCard.jsx";
import Lives from "./Lives.jsx";
import LoseScreen from "./LoseScreen.jsx";
import Header from "./Header.jsx";
import moment from "moment";

function App() {
  const TIME_TO_RESET_TOKEN = 3540000;
  const [cardsUsed, setCardsUsed] = useState([]);
  const [gameCard, setGameCard] = useState({});
  const [queuedSong, setQueuedSong] = useState([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);
  const [authToken, setAuthToken] = useState(moment().unix());

  useEffect(() => {
    const getStartingInformation = async () => {
      setAuthToken(await api.getAuth());
    };

    getStartingInformation();
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
    if (!storedPlayerState) {
      setShow(true);
    }
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
    const interval = setInterval(() => {
      console.log("scotttest Logs every minute");
      api.getAuth();
    }, TIME_TO_RESET_TOKEN);

    return () => clearInterval(interval);
  }, []);

  const changeSong = async ({ newLives, items, newScore }) => {
    const nextSong = queuedSong;
    setGameCard({
      poster_path: "spotifyLoad",
      loading: true,
      id: "loadingSpin",
    });
    if (authToken > moment().unix()) {
      const newAuthToken = await api.getAuth();
      setAuthToken(newAuthToken);
    }
    const { songQueued: newSongQueued } = await api.newSong({
      cardsUsed,
    });
    setQueuedSong(newSongQueued);
    setGameCard(nextSong);
    localStorage.setItem(
      "gameState",
      JSON.stringify({
        playedCards: items,
        lives: newLives,
        score: newScore,
        cardToPlay: nextSong,
        songQueued: newSongQueued,
        playerState: newLives < 1 ? "gameOver" : "inProgress",
      })
    );
  };

  const handleOnDragEnd = async (result) => {
    if (result.destination !== null) {
      if (
        result.source.droppableId === "next" &&
        result.destination.droppableId === "played"
      ) {
        startingSongs.songsUsed.push(gameCard);

        let tempSong =
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
        if (result.destination.index !== items.indexOf(tempSong)) {
          newLives = lives - 1;
          setLives(newLives);
          items[items.indexOf(tempSong)].correct = false;

          document.body.style.backgroundColor = "#";
          setTimeout(() => {
            document.body.style.backgroundColor = "#121212";
          }, 200);
        } else {
          newScore = score + 1;
          setScore(newScore);
          items[items.indexOf(tempSong)].correct = true;
        }
        setCardsUsed(items);
        await changeSong({ newLives, items, newScore });
        let lastGameCard = JSON.stringify(gameCard);
        if (lives > 1) {
          localStorage.setItem("lastGameCard", lastGameCard);
        }
      }
    }
  };

  return (
    <div>
      <Header show={show} setShow={setShow} />
      <h1 id="gameTitle">Soundtrack</h1>
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
              <NewCard songItem={gameCard} />
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
