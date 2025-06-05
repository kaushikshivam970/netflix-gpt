import React from "react";
import NetflixLogo from "../assets/NetflixLogo.png";

function Header() {
  return (
    <div className="absolute px-8 w-full py-2 bg-gradient-to-b from-black z-10">
      <img src={NetflixLogo} alt="Netflix Logo" className="w-48 ml-32" />
    </div>
  );
}

export default Header;
