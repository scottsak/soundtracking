import {
  authParameters,
  albumIds,
  customGamePlaylistId,
} from "./startingSongs.js";

let artistParameters = {};

let customGamePlaylist = [];

const getAuth = async () => {
  try {
    const accessTokenData = await fetch(
      "https://accounts.spotify.com/api/token",
      authParameters
    )
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.error(err));

    const accessToken = accessTokenData?.access_token;
    const apiParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    artistParameters = apiParameters;

    return artistParameters;
  } catch (error) {
    console.log(error);
  }
};

const getPlaylistById = async (playlistToUse) => {
  const topSongPlaylists = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistToUse}/tracks`,
    artistParameters
  )
    .then((response) => response.json())
    .then((data) => {
      const topSongPlaylists = data?.items;
      return topSongPlaylists;
    })
    .catch((err) => {
      console.error(err);
    });
  return topSongPlaylists;
};

const getAllItemsFromPlaylistById = async (playlistToUse, pagesize, offset) => {
  const topSongPlaylists = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistToUse}/tracks?limit=${pagesize}&offset=${offset}`,
    artistParameters
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
  return topSongPlaylists;
};

const getCustomSongs = async () => {
  try {
    let offset = 0;
    let pagesize = 100;
    let continueloop = true;

    let result = await getAllItemsFromPlaylistById(
      customGamePlaylistId,
      pagesize,
      offset
    );
    let playlistItems = result.items;

    do {
      try {
        if (result.next !== null) {
          offset = offset + pagesize;
          result = await getAllItemsFromPlaylistById(
            customGamePlaylistId,
            pagesize,
            offset
          );
          playlistItems = playlistItems.concat(result.items);
        } else {
          continueloop = false;
        }
      } catch (e) {
        console.log("scotttest error", e);
        continueloop = false;
      }
    } while (continueloop);

    customGamePlaylist = playlistItems;

    console.debug("scotttest customGamePlaylist", customGamePlaylist);

    return playlistItems;
  } catch (error) {
    console.log(error);
  }
};

const getRandomNumber = ({ year, trackMax }) => {
  if (year) {
    const maxYear = 2023;
    const minYear = 1950;
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
    trackMax: topSongPlaylists?.length - 1,
  });
  let wentThroughOnce = false;
  for (let i = randomTrackNumber; i < topSongPlaylists?.length; i++) {
    if (
      !albumIds.has(topSongPlaylists[i].track.album.id) &&
      ((useBestOfYearPlaylist &&
        `${topSongPlaylists[i].track.album.release_date.split("-")[0]}` ===
          `${randomYear}`) ||
        (!useBestOfYearPlaylist &&
          !topSongPlaylists[i].track.album.name
            .toLowerCase()
            .includes("remaster") &&
          !topSongPlaylists[i].track.album.name
            .toLowerCase()
            .includes("greatest hit")))
    ) {
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

      return {
        foundSong: true,
        newSongQueued: album,
      };
    }
    if (i === topSongPlaylists.length - 1) {
      if (wentThroughOnce) {
        return { foundSong: false };
      }
      i = 0;
      wentThroughOnce = true;
    }
  }
  return { foundSong: false };
};

const getTopSongOfRandomYearPlaylist = async (randomYear) => {
  console.debug("scotttest makes api call year playlist");
  const randomYearBestSongs = await fetch(
    `https://api.spotify.com/v1/search?q=Top+hits+of+${randomYear}&type=playlist`,
    artistParameters
  )
    .then((response) => response.json())
    .then((data) => {
      const topSongPlaylists = data?.playlists?.items?.[0];
      return topSongPlaylists;
    })
    .catch((err) => {
      console.error(err);
    });
  return randomYearBestSongs?.id;
};

const getRandomAlbum = async ({
  bestSongPlaylist,
  randomYear,
  useBestOfYearPlaylist,
  cardsUsed,
  retrySong = false,
}) => {
  const playlistToUse = useBestOfYearPlaylist
    ? bestSongPlaylist
    : "0seHpe5Jg3uRYPlzPjg7tH";
  console.debug("scotttest makes api call playlist");
  const topSongPlaylists = useBestOfYearPlaylist
    ? await getPlaylistById(playlistToUse)
    : customGamePlaylist;

  let addedSong = await addSongs({
    topSongPlaylists,
    randomYear,
    useBestOfYearPlaylist,
    cardsUsed,
  });
  if (!addedSong.foundSong) {
    addedSong = await getRandomAlbum({
      bestSongPlaylist: "0seHpe5Jg3uRYPlzPjg7tH",
      useBestOfYearPlaylist: false,
      cardsUsed,
      randomYear,
      retrySong: true,
    });
  } else if (retrySong) {
    console.debug("scotttest addedSong.foundSong Second", addedSong);
  }
  return addedSong;
};

const newSong = async ({ cardsUsed }) => {
  if (albumIds.size === 1) {
    for (const card of cardsUsed) {
      albumIds.add(card.id);
    }
  }
  if (!customGamePlaylist.length) {
    console.debug("scotttest gets custom playlist");
    await getCustomSongs();
  }
  const randomYear = getRandomNumber({ year: true });
  const useBestOfYearPlaylist = Math.random() < 0.5;
  const bestSongPlaylist = useBestOfYearPlaylist
    ? await getTopSongOfRandomYearPlaylist(randomYear)
    : "0seHpe5Jg3uRYPlzPjg7tH";
  const foundSongs = await getRandomAlbum({
    bestSongPlaylist: bestSongPlaylist || "0seHpe5Jg3uRYPlzPjg7tH",
    randomYear,
    useBestOfYearPlaylist,
    cardsUsed,
    retrySong: false,
    // albumIds,
  });
  return {
    songQueued: foundSongs.newSongQueued,
    albumIds: foundSongs.albumIds,
  };
};

export { newSong, getAuth, getCustomSongs };
