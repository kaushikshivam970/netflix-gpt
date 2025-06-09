import React, { useEffect, useState } from "react";
import VideoTitle from "./VideoTitle";
import { fetchVideoInfo } from "./Services/videoServices";

function VideoBackground(props) {
  const { original_title, overview, poster_path, id } = props?.info;

  const [trailerInfo, setTrailerInfo] = useState(null);
  const [isMute, setIsMute] = useState(true); // start muted for autoplay

  useEffect(() => {
    const getTrailerInfo = async () => {
      try {
        const response = await fetchVideoInfo(id);
        const info = response?.data?.results?.find(
          (item) => item?.type === "Trailer"
        );
        setTrailerInfo(info);
      } catch (error) {
        console.log(error);
      }
    };
    getTrailerInfo();
  }, [id]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {trailerInfo && trailerInfo.key && (
        // Add key here to force re-render when mute changes
        <iframe
          key={isMute ? "mute" : "unmute"}
          className="absolute top-0 left-0 w-screen h-screen object-cover z-0 border-0"
          src={`https://www.youtube.com/embed/${trailerInfo.key}?autoplay=1&mute=${isMute ? 1 : 0}&controls=0&loop=1&playlist=${trailerInfo.key}`}
          title="YouTube video player"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
      <div className="absolute text-white text-2xl z-20 bottom-32 right-32 w-10 h-10">
        {!isMute ? (
          <button onClick={() => setIsMute(true)}>
            <i className="hover:opacity-80 fa-solid fa-volume-high"></i>
          </button>
        ) : (
          <button onClick={() => setIsMute(false)}>
            <i className="hover:opacity-80 fa-solid fa-volume-xmark"></i>
          </button>
        )}
      </div>

      <div className="absolute z-10 top-0 left-0 w-full h-full flex items-center px-10 bg-gradient-to-r from-black via-transparent to-transparent">
        <VideoTitle info={{ original_title, overview, poster_path }} />
      </div>
    </div>
  );
}

export default VideoBackground;
