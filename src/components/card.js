// import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import Card from "./Card.jsx";
import * as api from "../api.js";

const movies = [
  {
    key: 123432154,
    poster_path:
      "https://i.scdn.co/image/ab67616d00001e02da5d5aeeabacacc1263c0f4b",
    title: "Fight Club",
    album: {
      albumName: "Lover",
      artist: "Taylor Swift",
    },
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
    album: {
      albumName: "Comfort Eagle",
      artist: "CAKE",
    },
    title: "Short Skirt/Long Jacket",
    release_date: "2001-07-24",
    id: "3OOFEF20WqtsUPcRbPY3L7",
    correct: null,
  },
];

const movieIDs = [542349012];

function addMovie(movie) {
  let randNum = Math.floor(Math.random() * (19 - 1 + 0)) + 0;
  let movieFound = true;
  let count = 0;
  let mov = {};
  // console.log(movie.data.results)
  while (movieFound) {
    if (
      !movie.data.results[randNum].adult &&
      movie.data.results[randNum].vote_count > 1500 &&
      !movieIDs.includes(movie.data.results[randNum].id)
    ) {
      mov = {
        key: movie.data.results[randNum].id,
        poster_path:
          "https://image.tmdb.org/t/p/original/" +
          movie.data.results[randNum].poster_path,
        title: movie.data.results[randNum].title,
        release_date: movie.data.results[randNum].release_date,
        id: movie.data.results[randNum].id,
        correct: null,
      };
      movieIDs.push(movie.data.results[randNum].id);
      movieQueued.push(mov);
      movieFound = false;
    } else if (count < 10) {
      randNum = Math.floor(Math.random() * (19 - 1 + 0)) + 0;
      count++;
    } else {
      api.newMovie();
      break;
    }
  }
}

export { addMovie, movies, movieQueued };
