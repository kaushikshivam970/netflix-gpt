import React, { useEffect, useState } from "react";
import NetflixLogo from "../assets/NetflixLogo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { useLocation } from "react-router-dom";
import { changeLanguage } from "../utils/configSlice";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { loading, isLoggedIn } = useSelector((store) => store.user);
  const location = useLocation();
  const currentEndPoint = location.pathname;
  const dispatch = useDispatch(); 
  const { language } = useSelector((store) => store.config);

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

  const handleLanguageChange = (e) => {
    try {
      dispatch(changeLanguage(e.target.value));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Don't hide header completely even when loading
  // Instead, show a simplified version or reduce opacity
  return (
    <div
      className={`absolute px-4 sm:px-8 w-full py-2 sm:py-1 z-50 ${
        isScrolled ? "bg-black" : "bg-gradient-to-b from-black"
      } transition-colors duration-300 ease-in ${
        loading ? "opacity-75" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img
          src={NetflixLogo}
          alt="Netflix Logo"
          className={`${
            isLoggedIn 
              ? "w-24 sm:w-32 ml-0 sm:ml-8" 
              : "w-32 sm:w-48 ml-0 sm:ml-32"
          } transition-all duration-300`}
        />

        {isLoggedIn && (
          <>
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 w-full pl-10 font-display font-semibold">
              <NavLink
                to={"/browse"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white brightness-200"
                    : "text-gray-300 hover:text-gray-400 transition-colors duration-150 ease-in-out"
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"gpt-search"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "text-gray-300 hover:text-gray-400 transition-colors duration-150 ease-in-out"
                }
              >
                GPT Search
              </NavLink>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex gap-4 lg:gap-6 items-center">
              {currentEndPoint === "/gpt-search" && (
                <select
                  name=""
                  id=""
                  className="hover:cursor-pointer outline-none rounded-xl h-fit py-1 px-2 lg:px-4 bg-gray-700 text-white font-display font-semibold text-sm lg:text-base"
                  onChange={handleLanguageChange}
                  value={language}
                >
                  {SUPPORTED_LANGUAGES &&
                    SUPPORTED_LANGUAGES.map((lang) => (
                      <option
                        key={lang.identifier}
                        className="hover:bg-slate-400"
                        value={lang.identifier}
                      >
                        {lang.name}
                      </option>
                    ))}
                </select>
              )}
              <button
                className="p-2 rounded-lg text-xl lg:text-2xl text-white font-display font-bold hover:text-red-500 transition-colors duration-200"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white text-xl"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-black bg-opacity-95 md:hidden">
                <div className="flex flex-col p-4 space-y-4">
                  <NavLink
                    to={"/browse"}
                    className={({ isActive }) =>
                      `font-display font-semibold py-2 ${
                        isActive
                          ? "text-white brightness-200"
                          : "text-gray-300 hover:text-gray-400 transition-colors duration-150 ease-in-out"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  
                  <NavLink
                    to={"gpt-search"}
                    className={({ isActive }) =>
                      `font-display font-semibold py-2 ${
                        isActive
                          ? "text-white"
                          : "text-gray-300 hover:text-gray-400 transition-colors duration-150 ease-in-out"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    GPT Search
                  </NavLink>

                  {currentEndPoint === "/gpt-search" && (
                    <select
                      name=""
                      id=""
                      className="hover:cursor-pointer outline-none rounded-xl h-fit py-2 px-4 bg-gray-700 text-white font-display font-semibold w-full"
                      onChange={handleLanguageChange}
                      value={language}
                    >
                      {SUPPORTED_LANGUAGES &&
                        SUPPORTED_LANGUAGES.map((lang) => (
                          <option
                            key={lang.identifier}
                            className="hover:bg-slate-400"
                            value={lang.identifier}
                          >
                            {lang.name}
                          </option>
                        ))}
                    </select>
                  )}

                  <button
                    className="flex items-center gap-2 py-2 text-white font-display font-bold hover:text-red-500 transition-colors duration-200"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;