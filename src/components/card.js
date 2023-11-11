// import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import Card from "./Card.jsx";
import * as api from "../api.js";

const movies = [
  {
    key: 123432154,
    poster_path:
      "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    title: "Fight Club",
    release_date: "1999-11-11",
    id: 53454332,
    correct: true,
  },
];

const movieQueued = [
  {
    key: 123432112530,
    poster_path:
      "https://image.tmdb.org/t/p/original/6rVIjriV3Sv1B9INrzGRXW8Q7aY.jpg",
    title: "The Magnificent Seven",
    release_date: "1960-04-14",
    id: 542349012,
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
