import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./components/Header";


//here useEffect is preventing logged in User in order to access public routes or paths
function AppLayout() {
 const {user,isLoggedIn} = useSelector((store)=>store.user);
 const navigate = useNavigate();
useEffect(() => {
    const publicPaths = ["/", "/signin","/signup"];
    if (isLoggedIn && publicPaths.includes(location.pathname)) {
      navigate("/browse");
    }
  }, [isLoggedIn, location.pathname]);
 
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
}

export default AppLayout;
