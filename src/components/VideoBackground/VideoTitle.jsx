import React, { useEffect, useState } from "react";
import { TMDB_IMAGE_BASE_URL } from "../../utils/constants";

function VideoTitle(props) {
  const { original_title, overview, poster_path } = props.info;
  const [isTimeComplete, setIsTimeComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeComplete(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ml-10">
      {/* CONTENT TO SHRINK */}
      <div
        className={`flex flex-col justify-start transition-all duration-1000 origin-bottom-left ease-out ${
          isTimeComplete ? "scale-50" : "scale-100"
        }`}
      >
        <h1 className="text-white text-6xl font-bold font-display">
          {original_title}
        </h1>

        {/* Optional image */}
        <img
          className="w-40 h-40 rounded-full bg-opacity-10"
          src={TMDB_IMAGE_BASE_URL + poster_path}
          alt="Poster"
        />

        <p
          className={`text-base text-white leading-relaxed tracking-normal text-justify max-w-3xl whitespace-pre-wrap ${
            isTimeComplete ? "hidden" : ""
          }`}
        >
          {overview}
        </p>
      </div>
      <div className="flex gap-4 mt-6">
        <button className="bg-white flex items-center font-display px-8 py-3 text-black rounded-lg font-semibold hover:bg-opacity-70">
          <i className="mr-3 text-2xl fa-solid fa-play"></i>
          <span>Play</span>
        </button>
        <button className="bg-opacity-50 flex items-center bg-gray-500 px-3 text-white py-3 rounded-lg font-display hover:bg-opacity-20 font-semibold">
          <i className="text-2xl mr-2 fa-solid fa-circle-info"></i>
          <span>More Info</span>
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;
