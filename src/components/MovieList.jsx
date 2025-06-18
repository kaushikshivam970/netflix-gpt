import React from "react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;
  return (
    <div className="p-2 sm:p-4 lg:p-6 text-white">
      <div className="my-2 sm:my-4 lg:my-6">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl m-2 sm:m-4 hover:text-gray-300 hover:cursor-pointer inline transition-colors duration-200">
          {title}
        </h1>
      </div>
      <div className="font-display flex overflow-x-scroll scrollbar-hide flex-col">
        <div className="flex hover:cursor-pointer gap-2 sm:gap-3 lg:gap-4 pb-4">
          {movies?.length > 0 &&
            movies.map((movie) => (
              <MovieCard key={movie?.id} movieInfo={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;