import React from 'react'
import { TMDB_IMAGE_BASE_URL } from '../utils/constants';

function MovieCard({movieInfo}) {
    const {adult,backdrop_path,genre_ids,id,original_language,overview,popularity,poster_path,release_date,title,video,vote_average,vote_count} = movieInfo;

  return (
    <div className='min-w-36 min-h-36'>
        <img className='object-cover'  src={TMDB_IMAGE_BASE_URL + poster_path} alt={title + " movie poster"} />
    </div>
  )
}

export default MovieCard