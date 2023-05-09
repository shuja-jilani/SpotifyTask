import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [audioLists, setAudioLists] = useState([]);

  const initial = () => {
    setAudioLists([]);
  };

  // Function to play the selected song
  const handlePlay = (song) => {
    const audio = {
      name: song.name,
      singer: "Artist",
      cover: "/song-cover.jpg",
      musicSrc: song.url,
    };
    initial();
    setAudioLists([audio]);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Function to fetch the songs from the "songs" folder
  const fetchSongs = () => {
    const songsContext = require.context("../Songs", true, /\.mp3$/);
    const songsArray = songsContext
      .keys()
      .map((key) => ({ name: key.split("/")[1], url: songsContext(key) }));
    setSongs(songsArray);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {songs.map((song, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handlePlay(song)}>
                <CardMedia
                  component="img"
                  alt="Song Cover"
                  height="140"
                  image="https://a10.gaanacdn.com/gn_img/albums/R7vKX6WmrP/vKX6mOqXWm/size_m.webp"
                  title="Song Cover"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {song.name.replace(".mp3", "")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ReactJkMusicPlayer
        clearPriorAudioLists="true"
        audioLists={audioLists}
        mode="full"
      />
    </div>
  );
}

export default MusicPlayer;
