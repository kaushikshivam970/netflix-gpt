import React from "react";
import MovieList from "../MovieList";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  // console.log("Movies at Secondary Container", movies);
  return (movies && popularMovies && topRatedMovies && upcomingMovies) ? (
    <div className="h-fit pb-10 -mt-32 relative z-20 ">
      <MovieList title={"Now Playing"} movies={movies} />
      <MovieList title={"Popular"} movies={popularMovies} />
      <MovieList title={"Top Rated"} movies={topRatedMovies} />
      <MovieList title={"Upcoming"} movies={upcomingMovies} />
    </div>
  ) : (
    <div></div>
  );
}

export default SecondaryContainer;
