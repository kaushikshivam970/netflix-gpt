import React from 'react'
import { TMDB_IMAGE_BASE_URL } from '../utils/constants';

function MovieCard({movieInfo}) {
    const {adult,backdrop_path,genre_ids,id,original_language,overview,popularity,poster_path,release_date,title,video,vote_average,vote_count} = movieInfo;

  return (
    <div className='w-28 h-40 sm:w-32 sm:h-48 lg:w-40 lg:h-60 border-gray-400 hover:cursor-pointer flex-shrink-0 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl'>
        <img 
          className='object-cover w-full h-full hover:opacity-90 transition-opacity duration-200' 
          src={TMDB_IMAGE_BASE_URL + poster_path} 
          alt={title + " movie poster"} 
        />
    </div>
  )
}

export default MovieCard