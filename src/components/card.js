// import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import * as api from "../api.js";

const albumIds = new Set(["3OOFEF20WqtsUPcRbPY3L7"]);

function addMovie(movie) {
  console.log("scotttest add Movie gets called");
  let movieNotFound = true;
  let count = 0;
  let mov = {};
  // console.log(movie.data.results)
  const response = movie[0];
  console.log("scotttest movie", response);
  console.log("scotttest response.album.id", response.album.id);
  while (movieNotFound) {
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
      const lastCardPlayed = api.cardToPlay.pop();
      api.songsUsed.push(lastCardPlayed);
      api.songQueued.push(mov);
      console.log("scotttest api.cardToPlay", api.cardToPlay);
      movieNotFound = false;
    } else {
      console.log("scotttest calls add Movie");
      // api.newMovie();
      break;
    }
  }
}

export { addMovie };
