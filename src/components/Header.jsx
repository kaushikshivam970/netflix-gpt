import React, { useEffect, useState } from "react";
import NetflixLogo from "../assets/NetflixLogo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header({ isLoggedIn }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { loading } = useSelector((store) => store.user);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed px-8 w-full py-1 z-50 flex justify-between items-center ${
        isScrolled ? "bg-black" : "bg-gradient-to-b from-black"
      } transition-colors duration-300 ease-in ${loading ? "hidden" : ""}`}
    >
      <img
        src={NetflixLogo}
        alt="Netflix Logo"
        className={isLoggedIn ? "w-32 ml-8" : "w-48 ml-32"}
      />
      {isLoggedIn && (
        <>
          <div className="flex gap-8 w-full pl-10 font-display font-semibold">
            <NavLink
              to={"/browse"}
              className={({ isActive }) =>
                isActive ? "text-white brightness-200" : "text-gray-300 hover:text-gray-400 transition-colors duration-150 ease-in-out"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"loading"}
              className={({ isActive }) =>
                isActive ? "text-white" : "text-gray-300 hover:text-gray-400 transition-colors duration-150 ease-in-out"
              }
            >
              Loading
            </NavLink>
          </div>
          <div className="">
            <button
              className="p-2 rounded-lg text-2xl text-white font-display font-bold pr-2 hover:text-red-500 transition-colors duration-200"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
