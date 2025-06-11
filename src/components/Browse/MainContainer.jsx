import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMainMovie } from "../../utils/movieSlice";
import VideoBackground from "../VideoBackground/VideoBackground";
import VideoTitle from "../VideoBackground/VideoTitle";
import { TMDB_IMAGE_BASE_URL } from "../../utils/constants";

function MainContainer() {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  const [dialogDisplay,setDialogDisplay] = useState(false);
  const dispatch = useDispatch();
  const [mainMovie, setMainMovie] = useState(null);
  useEffect(() => {
    if (movies && movies.length > 0) {
      const length = movies.length;
      const randomIndex = Math.floor(Math.random() * length);
      const movie = movies[randomIndex];
      setMainMovie(movie);
      dispatch(addMainMovie(movie));
    }
  }, [movies]);

  const closeDialog = ()=>{
    setDialogDisplay(false);
  }

  return mainMovie ? (
    <div className="pt-0">
      <VideoBackground info={{ id: mainMovie?.id, adult: mainMovie?.adult }} />
      <div className="absolute z-10 top-0 left-0 w-full h-full flex items-center px-10 pt-16 bg-gradient-to-r from-black via-transparent to-transparent">
        <VideoTitle
          info={{
            original_title: mainMovie?.original_title,
            overview: mainMovie?.overview,
            poster_path: mainMovie?.poster_path,
            showDialog:()=>{setDialogDisplay(true)}
          }}
        />
      </div>
      <div className={`absolute top-[130px] left-[420px] text-white z-30 bg-gray-800 bg-opacity-80 font-display flex flex-col gap-4 w-6/12 px-8 py-8 rounded-lg ${!dialogDisplay ? "hidden":""}`}>
        <button className="text-right inline" onClick={()=>{closeDialog()}}>
          <i className="text-2xl fa-solid fa-xmark hover:text-red-500 transition-colors duration-200"></i>
        </button>
        <img
          className="w-40 h-40 rounded-lg"
          src={TMDB_IMAGE_BASE_URL + mainMovie?.poster_path}
          alt="Poster"
        />
        <h1 className="text-3xl border-b-2 font-bold tracking-wide w-fit">{mainMovie?.original_title}</h1>
        <p className="text-base text-white leading-relaxed tracking-normal text-justify max-w-3xl whitespace-pre-wrap">{mainMovie?.overview}</p>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default MainContainer;
