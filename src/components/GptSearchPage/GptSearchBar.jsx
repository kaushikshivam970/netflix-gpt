import React, { useState } from "react";
import { lang } from "../../utils/languageconstants";
import { useDispatch, useSelector } from "react-redux";
import {
  chatWithGemini,
  chatWithGPT,
  searchMovies,
} from "./Services/GptServices";
import {
  addGptSuggestedMovies,
  addMessage,
  deleteGptSuggestedMovies,
  deleteMessage,
  deleteAll
} from "../../utils/gptSlice";

function GptSearchBar({ setLoading }) {
  const { language } = useSelector((store) => store.config);
  const dispatch = useDispatch();
  const [searchTextValue, setSearchText] = useState('');
  const [rotating, setRotating] = useState(false);

  const handleClick = () => {
    if (rotating) return; // prevent spam clicks
    setRotating(true);
    clearGptData(); // your function

    // Reset rotation state after animation duration
    setTimeout(() => {
      setRotating(false);
    }, 500); // match `duration-500`
  };

  const handleGptSearchClick = async () => {
    try {
      if (!searchTextValue.trim()) {
        alert('Please enter a search query');
        return;
      }
      
      setLoading(true);
      const search = searchTextValue;
      const query = `Act as a movie recommendation system and suggest some movies for the query and just give response of names just names of 5 movies comma seperated but after comma no space with no enter in last: ${search}`;
      const response = await chatWithGemini(query);
      const listOfMovies = response.text.split(",");
      listOfMovies[listOfMovies.length - 1] = listOfMovies[
        listOfMovies.length - 1
      ].slice(0, -1);
      const moviesData = await searchMovies(listOfMovies);
      let extractedMovies = moviesData.map((item) => item.data.results);
      extractedMovies = extractedMovies.flat(2);
      extractedMovies = extractedMovies.filter((movie) => movie.poster_path);
      dispatch(addGptSuggestedMovies(extractedMovies));
      dispatch(addMessage(listOfMovies.join(', ')));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const clearGptData = () => {
    dispatch(deleteAll());
    setSearchText('');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGptSearchClick();
        }}
        className="relative flex w-full max-w-2xl"
      >
        <input
          className="px-4 sm:px-5 py-3 sm:py-4 w-full pr-20 sm:pr-24 md:pr-28 lg:pr-32 rounded-full z-10 text-gray-200 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl outline-none bg-gray-700 selection:bg-slate-400 placeholder:text-gray-400"
          type="text"
          placeholder={lang[language].searchPlaceholder}
          value={searchTextValue}
          onChange={(e) => { setSearchText(e.target.value) }}
        />
        <button
          className="absolute right-0 top-0 bottom-0 bg-gray-500 rounded-full w-16 sm:w-20 md:w-24 lg:w-28 font-bold text-sm sm:text-base md:text-lg lg:text-xl hover:opacity-90 active:opacity-80 select-none outline-none transition-opacity duration-200"
          type="submit"
        >
          {lang[language].search}
        </button>
      </form>
      
      <button
        onClick={handleClick}
        className={`flex-shrink-0 p-2 sm:p-3 bg-gray-600 hover:bg-gray-500 rounded-full transition-all duration-500 ease-in-out ${
          rotating ? "rotate-[360deg]" : ""
        } hover:opacity-90 active:opacity-80`}
        aria-label="Clear search and refresh"
      >
        <i className="text-lg sm:text-xl md:text-2xl fa-solid fa-arrows-rotate"></i>
      </button>
    </div>
  );
}

export default GptSearchBar;