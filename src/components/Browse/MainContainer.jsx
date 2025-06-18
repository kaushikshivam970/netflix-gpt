import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMainMovie } from "../../utils/movieSlice";
import VideoBackground from "../VideoBackground/VideoBackground";
import VideoTitle from "../VideoBackground/VideoTitle";
import { TMDB_IMAGE_BASE_URL } from "../../utils/constants";

function MainContainer() {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  const [dialogDisplay, setDialogDisplay] = useState(false);
  const dispatch = useDispatch();
  const [mainMovie, setMainMovie] = useState(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const length = movies.length;
      const randomIndex = Math.floor(Math.random() * length);
      const movie = movies[randomIndex];
      setMainMovie(movie);
      dispatch(addMainMovie(movie));
    }
  }, [movies]);

  const closeDialog = () => {
    setDialogDisplay(false);
  };

  // Close dialog when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeDialog();
    }
  };

  // Close dialog on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeDialog();
      }
    };

    if (dialogDisplay) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [dialogDisplay]);

  return mainMovie ? (
    <div className="pt-0 relative">
      <VideoBackground info={{ id: mainMovie?.id, adult: mainMovie?.adult }} />
      <div className="absolute z-10 top-0 left-0 w-full h-full flex items-center px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 lg:pt-16 bg-gradient-to-r from-black via-black/60 sm:via-black/40 lg:via-transparent to-transparent">
        <VideoTitle
          info={{
            original_title: mainMovie?.original_title,
            overview: mainMovie?.overview,
            poster_path: mainMovie?.poster_path,
            showDialog: () => { setDialogDisplay(true); }
          }}
        />
      </div>

      {/* Responsive Modal Dialog */}
      {dialogDisplay && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black bg-opacity-80"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-xs sm:max-w-lg lg:max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-800 bg-opacity-95 rounded-lg shadow-2xl">
            {/* Close Button */}
            <button 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 text-white hover:text-red-500 transition-colors duration-200 bg-black bg-opacity-50 rounded-full"
              onClick={closeDialog}
              aria-label="Close dialog"
            >
              <i className="text-lg sm:text-xl lg:text-2xl fa-solid fa-xmark"></i>
            </button>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                {/* Movie Poster */}
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    className="w-32 h-48 sm:w-40 sm:h-60 lg:w-48 lg:h-72 rounded-lg object-cover shadow-lg"
                    src={TMDB_IMAGE_BASE_URL + mainMovie?.poster_path}
                    alt={`${mainMovie?.original_title} poster`}
                  />
                </div>

                {/* Movie Details */}
                <div className="flex-1 text-white font-display">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide mb-3 sm:mb-4 lg:mb-6 border-b-2 border-white/30 pb-2">
                    {mainMovie?.original_title}
                  </h1>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed tracking-normal text-justify whitespace-pre-wrap">
                      {mainMovie?.overview}
                    </p>
                    
                    {/* Additional movie details */}
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-white/70 pt-3 sm:pt-4 border-t border-white/20">
                      <span>Release: {mainMovie?.release_date || 'N/A'}</span>
                      <span>Rating: {mainMovie?.vote_average ? `${mainMovie.vote_average.toFixed(1)}/10` : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-base sm:text-lg">Loading...</div>
    </div>
  );
}

export default MainContainer;