import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
function Browse() {
    const {user} = useSelector((store)=>store.user)

    
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="bg-red-500 p-2 rounded-lg text-white font-display font-bold"
        onClick={() => {
          handleLogout();
        }}
      >
        Sign Out
      </button>
      <div>
        <p>Name:{user?.displayName}</p>
        <p>Email:{user?.email}</p>
      </div>
    </div>
  );
}

export default Browse;
