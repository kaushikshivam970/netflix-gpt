import React, { useRef, useState } from "react";
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

function GptSearchBar({setLoading}) {
  const { language } = useSelector((store) => store.config);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const[searchTextValue,setSearchText] = useState('')
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
      setLoading(true)
      const search = searchText.current.value;
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
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const clearGptData = () => {
    dispatch(deleteAll());
    setSearchText('');
  };

  return (
    <div className="flex">
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-0"
      >
        <input
          className="px-5 py-4 w-[600px] rounded-full z-10 text-gray-200 font-semibold text-2xl outline-none bg-gray-700 selection:bg-slate-400"
          type="text"
          placeholder={lang[language].searchPlaceholder}
          ref={searchText}
          value={searchTextValue}
          onChange={(e) =>{setSearchText(e.target.value)}}
        />
        <button
          className="bg-gray-500 rounded-full w-48 -ml-16 font-bold text-2xl pl-10 hover:opacity-90 active:opacity-80 select-none outline-none"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
      <button
      onClick={handleClick}
      className={`ml-4 transition-transform duration-500 ease-in-out ${
        rotating ? "rotate-[360deg]" : ""
      }`}
    >
      <i className="text-2xl fa-solid fa-arrows-rotate"></i>
    </button>
    </div>
  );
}

export default GptSearchBar;
