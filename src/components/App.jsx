import React, { useState, useEffect } from "react";
import * as api from "../api.js";
import { DragDropContext } from "react-beautiful-dnd";
import PlayedCards from "./PlayedCards.jsx";
import NewCard from "./NewCard.jsx";
import Lives from "./Lives.jsx";
import LoseScreen from "./LoseScreen.jsx";
import Header from "./Header.jsx";

function App() {
  const [movieData, setMovie] = useState([]);
  const [gameCard, setGameCard] = useState({});
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log("scotttest should run at start");
    if (
      localStorage.getItem("lastItem") === "undefined" ||
      localStorage.getItem("lastItem") === null
    ) {
      setMovie([api.songsUsed[api.songsUsed.length - 1]]);
    } else {
      const lastSong = [JSON.parse(localStorage.getItem("lastItem"))];
      lastSong[0].correct = true;
      console.log("scotttest lastSong", lastSong);
      setMovie(lastSong);
    }
    if (
      localStorage.getItem("lastGameCard") === "undefined" ||
      localStorage.getItem("lastGameCard") === null
    ) {
      setGameCard(api.cardToPlay[api.cardToPlay.length - 1]);
    } else {
      setGameCard(JSON.parse(localStorage.getItem("lastGameCard")));
    }
  }, []);

  const changeMovie = async () => {
    let nextMovie = api.songQueued[api.songQueued.length - 1];
    setGameCard({
      poster_path: "spotifyLoad",
      loading: true,
      id: "loadingSpin",
    });
    const { cardToPlay, songQueued, songsUsed } = await api.newMovie();
    setGameCard(nextMovie);

    console.log("scotttest inside { cardToPlay, songQueued, songsUsed }", {
      cardToPlay,
      songQueued,
      songsUsed,
    });
  };

  const handleOnDragEnd = async (result) => {
    let correct = true;
    if (result.destination !== null) {
      if (
        result.source.droppableId === "next" &&
        result.destination.droppableId === "played"
      ) {
        api.songsUsed.push(gameCard);

        let tempMovie = api.songsUsed[api.songsUsed.length - 1];

        const items = Array.from(movieData);
        items.splice(result.destination.index, 0, gameCard);

        items.sort(function (a, b) {
          let x = new Date(a.release_date);
          let y = new Date(b.release_date);
          return x - y;
        });
        if (result.destination.index !== items.indexOf(tempMovie)) {
          // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          setLives(lives - 1);
          items[items.indexOf(tempMovie)].correct = false;

          document.body.style.backgroundColor = "# ";
          setTimeout(() => {
            document.body.style.backgroundColor = "#121212";
          }, 200);
        } else {
          setScore(score + 1);
          items[items.indexOf(tempMovie)].correct = true;
        }
        console.log("scotttest items", items);
        setMovie(items);
        await changeMovie();
        let lastGameCard = JSON.stringify(gameCard);
        if (lives > 1) {
          localStorage.setItem("lastGameCard", lastGameCard);
        }
      }
    }
  };

  return (
    <div>
      <Header />
      <h1 id="gameTitle">Scottify</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {lives < 1 ? (
          <div className="nextCard">
            <LoseScreen
              score={score}
              setLives={setLives}
              setMovie={setMovie}
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
          <PlayedCards movieData={movieData} lives={lives} />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
