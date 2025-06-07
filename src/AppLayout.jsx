import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function AppLayout() {
 const {user,isLoggedIn} = useSelector((store)=>store.user);
 const navigate = useNavigate();
useEffect(() => {
    const publicPaths = ["/", "/signin"];
    if (isLoggedIn && publicPaths.includes(location.pathname)) {
      navigate("/browse");
    }
  }, [isLoggedIn, location.pathname]);
 
  return (
      <Outlet />
  );
}

export default AppLayout;
