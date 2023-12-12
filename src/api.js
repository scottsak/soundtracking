// import axios from 'axios';
import {
  cardToPlay,
  songQueued,
  songsUsed,
  seedArtists,
  authParameters,
  albumIds,
} from "./startingSongs.js";

// const baseURL = "https://api.spotify.com/v1/recommendations?seed_artists=";
let startingCountCalls = 0;

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

const getRandomNumber = ({ year, trackMax }) => {
  if (year) {
    // const maxYear = 1955;
    const maxYear = 2023;
    const minYear = 1950;
    // const minYear = 1954;
    return Math.floor(Math.random() * (maxYear - minYear) + minYear);
  }
  if (trackMax) {
    const maxTrackIndex = trackMax;
    const minTrackIndex = 0;
    return Math.floor(
      Math.random() * (maxTrackIndex - minTrackIndex) + minTrackIndex
    );
  }
};

const addSongs = async ({
  topSongPlaylists,
  randomYear,
  useBestOfYearPlaylist,
}) => {
  const randomTrackNumber = getRandomNumber({
    trackMax: topSongPlaylists.length - 1,
  });
  let wentThroughOnce = false;
  for (let i = randomTrackNumber; i < topSongPlaylists.length; i++) {
    console.log("scotttest i", i);
    if (
      !albumIds.has(topSongPlaylists[i].track.album.id) &&
      ((useBestOfYearPlaylist &&
        topSongPlaylists[i].track.album.release_date.split("-")[0] ==
          randomYear) ||
        (!useBestOfYearPlaylist &&
          !topSongPlaylists[i].track.album.name
            .toLowerCase()
            .includes("remaster") &&
          !topSongPlaylists[i].track.album.name
            .toLowerCase()
            .includes("greatest hit")))
    ) {
      console.log(
        'scotttest topSongPlaylists[i].track.album.release_date.split("-")[0]',
        topSongPlaylists[i].track.album.release_date.split("-")[0]
      );
      const albumChosen = topSongPlaylists[i].track.album;
      const album = {
        key: albumChosen.id,
        poster_path: albumChosen.images[1].url,
        title: albumChosen.name.split("(")[0],
        artist: albumChosen.artists[0].name,
        release_date: albumChosen.release_date,
        id: albumChosen.id,
        correct: null,
      };
      albumIds.add(albumChosen.id);
      const lastCardPlayed = cardToPlay.pop();
      cardToPlay.push(songQueued.pop());
      songQueued.push(album);
      console.log("scotttest break");
      console.log("scotttest songsVal now", {
        cardToPlay,
        songQueued,
        songsUsed,
      });
      return true;
    }
    if (i === topSongPlaylists.length - 1) {
      console.log("scotttest makes a call resets i");
      if (wentThroughOnce) {
        return false;
      }
      i = 0;
      wentThroughOnce = true;
    }
  }
  console.log("scotttest spotify return false");
  return false;
};

const getTopSongOfRandomYearPlaylist = async (randomYear) => {
  console.log("scotttest makes a call inside playlist");
  console.log("scotttest makes api call year playlist");
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
  return randomYearBestSongs.id;
};

const getRandomAlbum = async ({
  bestSongPlaylist,
  randomYear,
  useBestOfYearPlaylist,
}) => {
  const playlistToUse = useBestOfYearPlaylist
    ? bestSongPlaylist
    : "4B0QzVzeHi0o637HoP3r6e";
  console.log("scotttest use bad spotify");
  console.log("scotttest makes a call inside album");
  console.log("scotttest makes api call playlist");
  const topSongPlaylists = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistToUse}/tracks`,
    artistParameters
  )
    .then((response) => response.json())
    .then((data) => {
      const topSongPlaylists = data?.items;
      console.log("scotttest randomYear", randomYear);
      console.log("scotttest topSongPlaylists", topSongPlaylists);
      console.log("scotttest albumIds", albumIds);

      return topSongPlaylists;
    })
    .catch((err) => {
      console.error(err);
    });

  const addedSong = await addSongs({
    topSongPlaylists,
    randomYear,
    useBestOfYearPlaylist,
  });
  console.log("scotttest makes a call addedSong", addedSong);
  if (!addedSong) {
    console.log("scotttest use bad song");
    await getRandomAlbum({
      bestSongPlaylist: "4B0QzVzeHi0o637HoP3r6e",
      useBestOfYearPlaylist: false,
    });
  }
};

const newMovie = async () => {
  console.log("scotttest makes a call");
  const randomYear = getRandomNumber({ year: true });
  const randomBoolean = Math.random() < 0.5;
  console.log("scotttest makes a call 2");
  const bestSongPlaylist = randomBoolean
    ? await getTopSongOfRandomYearPlaylist(randomYear)
    : "4B0QzVzeHi0o637HoP3r6e";
  console.log("scotttest makes a call 3");
  await getRandomAlbum({
    bestSongPlaylist,
    randomYear,
    useBestOfYearPlaylist: randomBoolean,
  });
  return { cardToPlay, songQueued, songsUsed };
};

export { newMovie, cardToPlay, songQueued, songsUsed };
