import React from "react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;
  return (
    <div className="p-4 text-white">
      <div className="my-4">
        <h1 className="font-bold text-3xl m-4 hover:text-gray-300 hover:cursor-pointer inline">{title}</h1>
      </div>
      <div className="font-display flex overflow-x-scroll scrollbar-hide flex-col">
        <div className="flex hover:cursor-pointer gap-4">
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
