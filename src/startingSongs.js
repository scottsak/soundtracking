const albumIds = new Set(["3OOFEF20WqtsUPcRbPY3L7"]);

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

const songsUsed = [
  {
    key: 123432154,
    poster_path:
      "https://i.scdn.co/image/ab67616d00001e02da5d5aeeabacacc1263c0f4b",
    title: "Lover",
    artist: "Taylor Swift",
    release_date: "2017-11-10",
    id: "0VE4kBnHJUgtMf0dy6DRmW",
    correct: true,
    startingCard: true,
  },
];

const songQueued = [
  {
    key: 32134432435,
    poster_path:
      "https://i.scdn.co/image/ab67616d00001e025551adb75cf7c4737f93ed1d",
    artist: "Various Artists",
    title: "Sing 2",
    release_date: "2021-12-17",
    id: "3WCLzYOlSmLD2cy1RXdwUd",
    correct: null,
  },
];

const cardToPlay = [
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

export { cardToPlay, songQueued, songsUsed, albumIds, authParameters };
