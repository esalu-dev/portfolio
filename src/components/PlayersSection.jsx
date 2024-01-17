import { Player } from "./Player";
import { useState } from "react";

export function PlayersSection() {
  const songs = [
    {
      title: "Aterrizaje",
      url: "https://open.spotify.com/intl-es/track/09DNScZKnk1KcIoAOVsNVj?si=ecf1efbfcf8c4ea8",
      img: "songs/travesia.webp",
      file: "songs/aterrizaje.ogg",
    },
    {
      title: "Ella",
      url: "https://open.spotify.com/intl-es/track/0lZxLHtzuYUs7PdBWSJi9A?si=8d367932f44e45fa",
      img: "songs/travesia.webp",
      file: "songs/ella.ogg",
    },
    {
      title: "Lost Year",
      url: "https://open.spotify.com/intl-es/track/510v9k294X1ud3vOUhBpBM?si=a1ad7e046d1c4acd",
      img: "songs/lostyear.webp",
      file: "songs/lostyear.ogg",
    },
  ];

  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  const handlePlay = (index) => {
    if (currentPlayingIndex === index) {
      setCurrentPlayingIndex(null); // Pause if the same player is clicked again
    } else {
      setCurrentPlayingIndex(index);
    }
  };

  return (
    <>
      {songs.map((song, index) => (
        <Player
          key={index}
          title={song.title}
          url={song.url}
          img={song.img}
          file={song.file}
          isPlaying={index === currentPlayingIndex}
          onPlay={() => handlePlay(index)}
        />
      ))}
    </>
  );
}
