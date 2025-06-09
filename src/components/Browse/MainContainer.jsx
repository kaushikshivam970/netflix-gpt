import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoBackground from "../VideoBackground/VideoBackground";

function MainContainer() {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  const [mainMovie, setMainMovie] = useState(null);
  useEffect(() => {
    if (movies && movies.length > 0) {
      setMainMovie(movies[0]);
    }
  }, [movies]);
  // console.log("MAIN MOVIE",mainMovie);
  
  return mainMovie ? (
  <div className="pt-0">
    <VideoBackground info ={mainMovie} />
  </div>) : <div>Loading...</div> 

}

export default MainContainer;
