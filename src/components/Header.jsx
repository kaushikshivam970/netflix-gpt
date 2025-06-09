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
    <div className="fixed px-8 w-full py-2 bg-gradient-to-b from-black z-20 flex justify-between items-center">
      <img src={NetflixLogo} alt="Netflix Logo" className={`${isLoggedIn ? "w-48 ml-20" :"w-48 ml-32"}`} />
      {isLoggedIn && (
        <div className="p-2">
          <button
            className="p-2 rounded-lg text-2xl text-white font-display font-bold pr-2 hover:text-red-500 transition-colors duration-200"
            onClick={() => {
              handleLogout();
            }}
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
