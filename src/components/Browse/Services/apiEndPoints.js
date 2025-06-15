export default {
   NOWPLAYING:"/movie/now_playing?language=hindi&page=1&include_adult=true&include_video=true",
   POPULAR:"/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc",
   TOPRATED:"/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200",
   UPCOMING:"/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}"
}