import React from "react";
import MovieList from "../MovieList";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  // Loading state
  if (!movies || !popularMovies || !topRatedMovies || !upcomingMovies) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="bg-black relative z-20 pb-10 sm:pb-16 lg:pb-20">
      {/* Responsive negative margin for overlap with video */}
      <div className="-mt-16 sm:-mt-24 lg:-mt-32 pt-16 sm:pt-24 lg:pt-32">
        {/* Movie Lists Container */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          <MovieList title={"Now Playing"} movies={movies} />
          <MovieList title={"Popular"} movies={popularMovies} />
          <MovieList title={"Top Rated"} movies={topRatedMovies} />
          <MovieList title={"Upcoming"} movies={upcomingMovies} />
        </div>
      </div>
    </div>
  );
}

export default SecondaryContainer;