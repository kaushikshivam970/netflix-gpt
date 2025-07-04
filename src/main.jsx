import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./components/Browse/Browse.jsx";
import Signin from "./components/Signin.jsx";
import AppLayout from "./AppLayout.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import { auth } from "./utils/firebase.js";
import PrivateRoute from "./components/PrivateRoute.jsx";

import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "./utils/userSlice.js";
import ErrorPage from "./components/ErrorPage.jsx";
import { removeNowPlayingMovies } from "./utils/movieSlice.js";
import LoadingScreen from "./components/LoadingScreen.jsx";
import GptSearch from "./components/GptSearchPage/GptSearch.jsx";
//Fire base API to handle Signed In and Sign Out Logic in order to maintain appstore
onAuthStateChanged(auth, (user) => {
  if (user) {
    appStore.dispatch(
      addUser({
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        accessToken: user?.accessToken,
      })
    );
  } else {
    appStore.dispatch(removeUser());
    appStore.dispatch(removeNowPlayingMovies());
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={appStore}>
        <AppLayout />
      </Provider>
    ),
    children: [
      {
        path: "",
        element: <Signin />,
      },
      {
        path: "/browse",

        element: (
          <PrivateRoute>
            <Browse />
          </PrivateRoute>
        ),
      },
      {
        path: "/gpt-search",
        element: (
          <PrivateRoute>
            <GptSearch />
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
