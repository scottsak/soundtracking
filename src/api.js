// import axios from 'axios';
import * as moviesFile from "./components/card.js";
import * as app from "./components/App.jsx";

const apiKEY = "api_key=9192af8a9192f6deb676dc0150d2e4aa&language=en-US";
const baseURL = "https://api.themoviedb.org/3/movie/popular?";
const urlTest =
  "https://api.themoviedb.org/3/movie/550?api_key=9192af8a9192f6deb676dc0150d2e4aa&language=en-US";

const axios = require("axios");

function getRandMovie() {
  return (Math.floor(Math.random() * (484 - 1 + 1)) + 1).toString();
}

function newMovie() {
  axios
    .get(baseURL + apiKEY + "&page=" + getRandMovie())
    .then((res) => {
      moviesFile.addMovie(res);
    })
    .catch((error) => {
      newMovie();
    });
}

export { newMovie, apiKEY };
