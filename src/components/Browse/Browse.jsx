import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { getListOfNowPlaying, getListOfPopular, getListOfTopRated, getListOfUpcoming } from "./Services/service";
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies } from "../../utils/movieSlice";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

function Browse() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  const fetchNowPlaying = async () => {
    try {
      const response = await getListOfNowPlaying();
      const popularMovies = await getListOfPopular();
      const topRatedMovies = await getListOfTopRated();
      const upcomingMovies = await getListOfUpcoming();
      
      // In one dispatch, we can execute only one action.
      dispatch(addNowPlayingMovies(response?.data?.results));
      dispatch(addPopularMovies(popularMovies?.data?.results));
      dispatch(addTopRatedMovies(topRatedMovies?.data?.results));
      dispatch(addUpcomingMovies(upcomingMovies?.data?.results));
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
}

export default Browse;