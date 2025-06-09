import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { getListOfNowPlaying } from "./Services/service";
import { addNowPlayingMovies } from "../../utils/movieSlice";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
function Browse() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const fetchNowPlaying = async()=>{
    try {
      const response = await getListOfNowPlaying();
      dispatch(addNowPlayingMovies(response?.data?.results))
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    fetchNowPlaying();
  },[])
  return (
    <div className="">
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
}

export default Browse;
