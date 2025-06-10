import { useState, useEffect } from "react";
import { fetchVideoInfo } from "./Services/videoServices";
import VideoTitle from "./VideoTitle"; // Make sure this is correctly imported

function VideoBackground({ info }) {
  const { original_title, overview, poster_path, id, adult } = info || {};

  const [trailerInfo, setTrailerInfo] = useState(null);
  const [isMute, setIsMute] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getTrailerInfo = async () => {
      try {
        const response = await fetchVideoInfo(id);
        console.log("Trailer response:", id,response);
        const trailer = response?.data?.results?.find(
          (item) => item?.type === "Trailer"
        );
        setTrailerInfo(trailer || null);
      } catch (error) {
        console.error("Failed to fetch trailer info:", error);
        setTrailerInfo(null);
      }
    };

    getTrailerInfo();
  }, [id]);

  if (!info || !trailerInfo?.key) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        Loading trailer...
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <iframe
        key={isMute ? "mute" : "unmute"}
        className="absolute top-0 left-0 w-screen h-screen object-cover z-0 border-0"
        src={`https://www.youtube.com/embed/${trailerInfo.key}?autoplay=1&mute=${isMute ? 1 : 0}&controls=0&loop=1&playlist=${trailerInfo.key}&modestbranding=1&showinfo=0&rel=0`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>

      {/* Mute/Unmute Button */}
      <div className="absolute z-20 bottom-32 right-32 w-10 h-10">
        <button
          onClick={() => setIsMute((prev) => !prev)}
          className="border-2 border-white rounded-full w-full h-full flex items-center justify-center text-white text-2xl"
        >
          <i
            className={`fa-solid ${
              isMute ? "fa-volume-xmark" : "fa-volume-high"
            } hover:opacity-80`}
          ></i>
        </button>
      </div>

      {/* Age Rating Tag */}
      <div className="absolute bg-gray-700 z-20 bottom-[133px] right-0 w-28 h-8 flex border-l-[5px] border-white items-center bg-opacity-50">
        <p className="text-white text-[16px] font-display ml-2 tracking-widest">
          {adult ? "U/A 18+" : "U/A 16+"}
        </p>
      </div>
    </div>
  );
}

export default VideoBackground;
