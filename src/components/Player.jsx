import { useEffect, useRef, useState } from "react";

export function Player({ title, url, img, file, isPlaying, onPlay }) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();

  const handleDuration = () => {
    setDuration(audioRef.current.duration);
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    setDuration(audioRef.current.duration);
    audioRef.current.addEventListener("ended", () => onPlay(null)); // Notify PlayersSection that playback has ended
    audioRef.current.addEventListener("timeupdate", handleDuration);

    return () => {
      audioRef.current.removeEventListener("ended", () => onPlay(null));
      audioRef.current.removeEventListener("timeupdate", handleDuration);
    };
  }, [onPlay]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleClick = () => {
    onPlay(title); // Notify PlayersSection that this player is clicked
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const progressBarStyle = {
    width: `${(currentTime / duration) * 100}%`,
  };

  return (
    <article className="flex gap-4">
      <img src={img} alt={title} className="size-32" />
      <div className="w-full">
        <h2 className="hidden font-Onest text-xl font-bold tracking-wide sm:flex items-center gap-2">
          {title} {previewBadge}
        </h2>
        <h2 className="sm:hidden font-Onest text-lg font-bold tracking-wide flex items-center gap-2">
          {title} {previewBadgeMobile}
        </h2>
        <div className="flex justify-between">
          <h4 className="font-Onest text-sm sm:text-md">Esalu</h4>
          <p className="font-Onest text-xs">{formatTime(duration)}</p>
        </div>
        <div>
          <span className="flex h-1 bg-gray-50 my-3 rounded">
            <span
              className="bg-esalu-green-400 h-full rounded"
              style={progressBarStyle}
            ></span>
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              onClick={handleClick}
              className="bg-gray-300 size-10 rounded-full flex items-center justify-center"
            >
              {isPlaying ? pauseIcon : playerIcon}
            </button>
            <button
              onClick={() => {
                audioRef.current.pause(),
                  (audioRef.current.currentTime = 0),
                  isPlaying && onPlay(null);
              }} // Notify PlayersSection to stop playback
              className="bg-woodsmoke-100 size-10 rounded-full flex items-center justify-center"
            >
              {stopIcon}
            </button>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 size-10 rounded-full flex items-center justify-center"
          >
            {urlIcon}
          </a>
        </div>

        <audio src={file} ref={audioRef}></audio>
      </div>
    </article>
  );
}

// Rest of your icon components and previewBadge remain unchanged

const playerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-player-play-filled"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
      strokeWidth="0"
      fill="#000"
    />
  </svg>
);

const urlIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-link"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="#000"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 15l6 -6" />
    <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
    <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
  </svg>
);

const pauseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-player-pause-filled"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="#000"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"
      strokeWidth="0"
      fill="#000"
    />
    <path
      d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"
      strokeWidth="0"
      fill="#000"
    />
  </svg>
);

const previewBadge = (
  <span className="h-5 flex items-center border-gray-200 bg-gray-200 bg-opacity-30 border-2 font-Onest text-gray-200 text-[10px]  font-medium me-2 px-1 py-0.5 rounded ">
    Preview
  </span>
);

const previewBadgeMobile = (
  <span className="h-5 flex items-center border-gray-200 bg-gray-200 bg-opacity-30 border-2 font-Onest text-gray-200 text-[10px]  font-medium me-2 px-1 py-0.5 rounded ">
    P
  </span>
);

const stopIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-player-stop-filled"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z"
      strokeWidth="0"
      fill="#000"
    />
  </svg>
);
