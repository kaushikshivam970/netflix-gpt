import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard";
import LoadingScreen from "../LoadingScreen";

function GptMovieSuggestions() {
  const { message, gptSuggestedMovies } = useSelector((store) => store.gpt);

  return gptSuggestedMovies ? (
    <div className="flex flex-col gap-4 font-bold">
      <h1 className="text-3xl font-display">GPT Suggested Movies</h1>
      <h2>Suggested Movie Names: {message}</h2>
      <div className="flex flex-wrap gap-2">
        {gptSuggestedMovies &&
          gptSuggestedMovies.map((movie) => (
            <MovieCard key={movie?.id} movieInfo={movie} />
          ))}
      </div>
    </div>
  ) : (
    <div>

    </div>
  );
}

export default GptMovieSuggestions;
