import React, { useEffect, useState } from "react";
import { TMDB_IMAGE_BASE_URL } from "../../utils/constants";

function VideoTitle(props) {
  const { original_title, overview, poster_path, showDialog } = props.info;
  const [isTimeComplete, setIsTimeComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeComplete(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ml-4 sm:ml-6 lg:ml-10 max-w-xs sm:max-w-lg lg:max-w-4xl">
      {/* CONTENT TO SHRINK */}
      <div
        className={`flex flex-col justify-start transition-all duration-1000 origin-bottom-left ease-out ${
          isTimeComplete ? "scale-75" : "scale-100"
        }`}
      >
        <h1 className="text-white text-2xl sm:text-4xl lg:text-6xl font-bold font-display mb-4 sm:mb-6 lg:mb-8 leading-tight">
          {original_title}
        </h1>

        {/* Optional image */}
        {/* <img
          className="w-40 h-40 rounded-full bg-opacity-10"
          src={TMDB_IMAGE_BASE_URL + poster_path}
          alt="Poster"
        /> */}
        <div className="absolute bg-gray-600 bg-opacity-20 text-white top-0 hidden">
          <div className="w-40 h-40">
            <img
              className="object-fill rounded-full bg-opacity-10"
              src={TMDB_IMAGE_BASE_URL + poster_path}
              alt="Poster"
            />
          </div>
          <h1>{original_title}</h1>
          <p>{overview}</p>
        </div>

        <p
          className={`text-sm sm:text-base lg:text-lg text-white leading-relaxed tracking-normal text-justify max-w-full sm:max-w-2xl lg:max-w-3xl whitespace-pre-wrap ${
            isTimeComplete ? "hidden" : ""
          }`}
        >
          {overview}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
        <button className="bg-white flex items-center justify-center font-display px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-black rounded-lg font-semibold hover:bg-opacity-70 transition-all duration-200 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
          <i className="mr-2 sm:mr-3 text-lg sm:text-xl lg:text-2xl fa-solid fa-play"></i>
          <span>Play</span>
        </button>
        <button
          onClick={() => showDialog()}
          className="bg-opacity-50 flex items-center justify-center bg-gray-500 px-3 sm:px-4 lg:px-6 text-white py-2 sm:py-3 rounded-lg font-display hover:bg-opacity-20 font-semibold transition-all duration-200 text-sm sm:text-base lg:text-lg w-full sm:w-auto"
        >
          <i className="text-lg sm:text-xl lg:text-2xl mr-2 fa-solid fa-circle-info"></i>
          <span>More Info</span>
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;