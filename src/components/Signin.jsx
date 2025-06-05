import React, { useState } from "react";
import signinbgimage from "../assets/signinbgimage.jpg";
import Header from "./Header";
import { Link } from "react-router-dom";

function Signin() {
  const [isSigninForm,setIsSignInForm] = useState(true);
  const toggleSigninForm = (e)=>{
    e.preventDefault();
    setIsSignInForm(!isSigninForm);
  }
  console.log(isSigninForm);
  
  return (
    <div className="font-display">
      <Header />
      <div className="absolute">
        <img src={signinbgimage} alt="Background Image" />
      </div>
      <form
        action=""
        className="absolute mx-auto top-24 right-0 left-0 p-16 bg-black w-[450px] flex flex-col items-start gap-4 bg-opacity-85 rounded-md "
      >
        <h1 className="text-white font-bold text-3xl mb-3 brightness-200">{isSigninForm ? "Sign In" : "Sign Up"}</h1>
        {!isSigninForm &&
        <input
          type="text"
          placeholder="Full Name"
          className="px-4 py-4 rounded-md w-full text-white bg-gray-600 border-[0.5px] border-gray-500 placeholder-gray-300 bg-opacity-10"
        />}
        <input
          type="email"
          placeholder="Email address"
          className="px-4 py-4 rounded-md w-full text-white bg-gray-600 border-[0.5px] border-gray-500 placeholder-gray-300 bg-opacity-10"
        />
        <input
          type="text"
          placeholder="Password"
          className="px-4 py-4 rounded-md w-full text-white bg-gray-600 border-[0.5px] border-gray-500 placeholder-gray-300 bg-opacity-10"
        />

        <button className="px-4 py-2 w-full text-white bg-[#EA2F14] font-semibold rounded-md hover:bg-[#CB0404] transition-colors duration-200 ease-in-out">
          {isSigninForm ? "Sign In" : "Sign Up"}
        </button>
        {isSigninForm ? <div className="w-full text-center">
          <p className="my-1 text-white text-center">OR</p>
        </div>: <span className="-m-2"></span>}
        {isSigninForm?<button className="px-4 py-2 w-full text-white bg-gray-600 bg-opacity-50 font-semibold rounded-md hover:bg-opacity-40 transition-opacity duration-200 delay-150 ease-in-out">
          Use a sign-in Code
        </button> : <span className="-m-2"></span>}
        {isSigninForm ? <Link className="text-white m-auto underline hover:text-gray-500 transition-colors duration-150 ease-in">
         Forgot password?
        </Link> : <span className="-m-2"></span>}
        {isSigninForm ? <div className="text-white flex gap-2">
          <input type="checkbox" name="rememberme" id="rememberme" className="accent-gray-500 scale-150 hover:accent-gray-600 transition-accent-colors duration-200 ease-in"/>
          <label htmlFor="rememberme" className="hover:cursor-pointer">Remember me</label>
        </div> : <span className="-m-2"></span>}

        {isSigninForm ? <p className="text-slate-400 font-semibold">
          New to Netflix?<button onClick={toggleSigninForm} className="text-white hover:underline transition-all duration-150 ease-in">Sign Up now.</button >
        </p>
        :<p className="text-slate-400 font-semibold">
          Already have an account?<button onClick={toggleSigninForm} className="text-white hover:underline transition-all duration-150 ease-in">Sign In.</button >
        </p>}
        <p className="text-slate-400 text-sm">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
        <Link className="text-sm text-blue-600 underline" >
        Learn more.
        </Link>
        <div className="mb-10"></div>
      </form>
    </div>
  );
}

export default Signin;
