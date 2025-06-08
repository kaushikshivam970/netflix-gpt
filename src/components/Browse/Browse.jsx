import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { getListOfNowPlaying } from "./Services/service";
import { addNowPlayingMovies } from "../../utils/movieSlice";
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
      <div className="pt-28">
        <p>Name:{user?.displayName}</p>
        <p>Email:{user?.email}</p>
      </div>
    </div>
  );
}

export default Browse;
