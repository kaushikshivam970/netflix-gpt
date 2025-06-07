import React from "react";
import NetflixLogo from "../assets/NetflixLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

function Header({ isLoggedIn }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute px-8 w-full py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img src={NetflixLogo} alt="Netflix Logo" className="w-48 ml-32" />
      {isLoggedIn && (
        <div className="p-2">
          <button
            className="bg-red-500 p-2 rounded-lg text-white font-display font-bold"
            onClick={() => {
              handleLogout();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
