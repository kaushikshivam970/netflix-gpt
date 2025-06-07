import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
function Browse() {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="">
      <div className="pt-28">
        <p>Name:{user?.displayName}</p>
        <p>Email:{user?.email}</p>
      </div>
    </div>
  );
}

export default Browse;
