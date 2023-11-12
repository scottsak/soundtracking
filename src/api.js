// import axios from 'axios';
import * as moviesFile from "./components/card.js";

const apiKEY = "api_key=9192af8a9192f6deb676dc0150d2e4aa&language=en-US";
const baseURL = "https://api.themoviedb.org/3/movie/popular?";

const axios = require("axios");

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

console.log("scotttest accessToken", accessToken);

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

export { newMovie };
