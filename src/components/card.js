// import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import Card from "./Card.jsx";
import * as api from "../api.js";

const movies = [
  {
    key: 123432154,
    poster_path:
      "https://i.scdn.co/image/ab67616d00001e02da5d5aeeabacacc1263c0f4b",
    title: "Lover",
    artist: "Taylor Swift",
    release_date: "2017-11-10",
    id: "0VE4kBnHJUgtMf0dy6DRmW",
    correct: true,
  },
];

const movieQueued = [
  {
    key: 123432112530,
    poster_path:
      "https://i.scdn.co/image/ab67616d00001e0231dc2b6da1570a9c8929e0f6",
    artist: "CAKE",
    title: "Comfort Eagle",
    release_date: "2001-07-24",
    id: "3OOFEF20WqtsUPcRbPY3L7",
    correct: null,
  },
];

const albumIds = new Set(["3OOFEF20WqtsUPcRbPY3L7"]);

function addMovie(movie) {
  console.log("scotttest add Movie gets called");
  let movieFound = true;
  let count = 0;
  let mov = {};
  // console.log(movie.data.results)
  const response = movie[0];
  console.log("scotttest movie", response);
  console.log("scotttest response.album.id", response.album.id);
  while (movieFound) {
    console.log(
      "scotttest goes through while ooo[",
      response.album.id,
      response.popularity
    );
    count = count + 1;
    if (!albumIds.has(response.album.id) && response.popularity > 50) {
      console.log("scotttest goes through hereeee");
      mov = {
        key: response.album.id,
        poster_path: response.album.images[1].url,
        title: response.album.name,
        release_date: response.album.release_date,
        id: response.album.id,
        correct: null,
      };
      albumIds.add(response.album.id);
      movieQueued.push(mov);
      console.log("scotttest movieQueued", movieQueued);
      movieFound = false;
    } else {
      console.log("scotttest calls add Movie");
      // api.newMovie();
      break;
    }
  }
}

export { addMovie, movies, movieQueued };
