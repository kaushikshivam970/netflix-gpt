import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
//Here Private Routes is Preventing non logged in user to use Protected or Private Routes
const PrivateRoute = ({children})=>{
    const isLoggedIn = useSelector((state)=>state.user.isLoggedIn);
    return isLoggedIn ? children : <Navigate to="/" />;
}

export default PrivateRoute;