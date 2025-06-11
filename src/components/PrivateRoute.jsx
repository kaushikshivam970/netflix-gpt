import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
//Here Private Routes is Preventing non logged in user to use Protected or Private Routes
const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state) => state.user);
  if (loading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
