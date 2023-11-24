// import axios from 'axios';
import * as moviesFile from "./components/card.js";
import {
  cardToPlay,
  songQueued,
  songsUsed,
  seedArtists,
} from "./startingSongs.js";

const baseURL = "https://api.spotify.com/v1/recommendations?seed_artists=";

const authParameters = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body:
    "grant_type=client_credentials&client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    "&client_secret=" +
    process.env.REACT_APP_CLIENT_SECRET,
};

const accessToken = await fetch(
  "https://accounts.spotify.com/api/token",
  authParameters
)
  .then((result) => result.json())
  .then((data) => data.access_token)
  .catch((err) => console.error(err));

const artistParameters = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
  },
};

const newMovie = async () => {
  console.log("scotttest makes a call");
  await fetch(`${baseURL}${seedArtists.join(",")}`, artistParameters)
    .then((response) => response.json())
    .then((data) => {
      console.log("scotttest finaldata", data.tracks);
      moviesFile.addMovie(data.tracks);
    })
    .catch((err) => {
      console.error(err);
      // newMovie();
    });
};

export { newMovie, cardToPlay, songQueued, songsUsed };
