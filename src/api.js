// import axios from 'axios';
import * as moviesFile from "./components/card.js";
import {
  cardToPlay,
  songQueued,
  songsUsed,
  seedArtists,
  authParameters,
  albumIds,
} from "./startingSongs.js";

// const baseURL = "https://api.spotify.com/v1/recommendations?seed_artists=";

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

const getRandomYear = () => {
  const max = 2023;
  const min = 1920;
  return Math.floor(Math.random() * (max - min) + min);
};

const getTopSongOfRandomYearPlaylist = async (randomYear) => {
  const randomYearBestSongs = await fetch(
    `https://api.spotify.com/v1/search?q=Top+hits+of+${randomYear}&type=playlist`,
    artistParameters
  )
    .then((response) => response.json())
    .then((data) => {
      const topSongPlaylists = data?.playlists?.items?.[0];
      console.log("scotttest finaldata", topSongPlaylists);
      return topSongPlaylists;
      // moviesFile.addMovie(data.tracks);
    })
    .catch((err) => {
      console.error(err);
    });
  return randomYearBestSongs;
};

const getRandomAlbum = async (bestSongPlaylist) => {
  await fetch(
    `https://api.spotify.com/v1/playlists/${bestSongPlaylist?.id}/tracks`,
    artistParameters
  )
    .then((response) => response.json())
    .then((data) => {
      const topSongPlaylists = data?.items;
      console.log("scotttest topSongPlaylists", topSongPlaylists);
      for (let i = 0; i < topSongPlaylists.length; i++) {
        if (!albumIds.has(topSongPlaylists[i].track.album.id)) {
          const albumChosen = topSongPlaylists[i].track.album;
          const album = {
            key: albumChosen.id,
            poster_path: albumChosen.images[1].url,
            title: albumChosen.name,
            release_date: albumChosen.release_date,
            id: albumChosen.id,
            correct: null,
          };
          albumIds.add(albumChosen.id);
          const lastCardPlayed = cardToPlay.pop();
          cardToPlay.push(songQueued.pop());
          songQueued.push(album);
          break;
        }
      }
      return topSongPlaylists;
      // moviesFile.addMovie(data.tracks);
    })
    .catch((err) => {
      console.error(err);
    });
};

const newMovie = async () => {
  console.log("scotttest makes a call");
  const randomYear = getRandomYear();
  const bestSongPlaylist = await getTopSongOfRandomYearPlaylist(randomYear);
  const randomAlbum = await getRandomAlbum(bestSongPlaylist);
};

export { newMovie, cardToPlay, songQueued, songsUsed };
