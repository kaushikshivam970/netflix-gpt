import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard";
import LoadingScreen from "../LoadingScreen";

function GptMovieSuggestions() {
  const { message, gptSuggestedMovies } = useSelector((store) => store.gpt);

  return gptSuggestedMovies ? (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 font-bold w-full px-2 sm:px-4 md:px-6">
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display mb-2 sm:mb-3">
          GPT Suggested Movies
        </h1>
        <h2 className="text-sm sm:text-base md:text-lg text-gray-300 break-words">
          <span className="block sm:inline">Suggested Movie Names: </span>
          <span className="text-white">{message}</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 justify-items-center">
        {gptSuggestedMovies &&
          gptSuggestedMovies.map((movie) => (
            <div key={movie?.id} className="w-full max-w-[200px]">
              <MovieCard movieInfo={movie} />
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center py-8 sm:py-12 md:py-16">
      <p className="text-gray-400 text-sm sm:text-base md:text-lg text-center px-4">
        Search for movies to see AI-powered recommendations
      </p>
    </div>
  );
}

export default GptMovieSuggestions;