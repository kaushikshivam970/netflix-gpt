import React from "react";
import MovieList from "../MovieList";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  console.log("Movies at Secondary Container", movies);
  return movies ? (
    <div className="h-fit pb-10 -mt-32 relative z-20 ">
      <MovieList title={"Now Playing"} movies={movies} />
      <MovieList title={"Trending"} movies={movies} />
      <MovieList title={"Horror"} movies={movies} />
      <MovieList title={"Action"} movies={movies} />
    </div>
  ) : (
    <div></div>
  );
}

export default SecondaryContainer;
