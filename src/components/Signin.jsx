import React, { useRef, useState } from "react";
import signinbgimage from "../assets/signinbgimage.jpg";
import Header from "./Header";
import { Link } from "react-router-dom";
import { checkValidData, checkValidName } from "../utils/validate";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { signinUser, signupNewUser } from "../services/auth.js";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

function Signin() {
  const [isSigninForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const toggleSigninForm = (e) => {
    e.preventDefault();
    setIsSignInForm(!isSigninForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validate the form data
    const _email = email?.current?.value;
    const _password = password?.current?.value;
    const validationResult = checkValidData(_email, _password);
    if (isSigninForm) {
      // // console.log(validationResult);
      if (!validationResult) {
        const response = await signinUser(_email, _password);

        if (response?.isUserSignedIn) {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } else {
        setErrorMessage(validationResult?.message);
        toast.error(validationResult?.message, {
          position: "top-right",
          type: "error",
        });
      }
    } else {
      const _name = name?.current?.value;
      const nameValidationResult = checkValidName(_name);
      // console.log(nameValidationResult);

      // console.log(validationResult);
      if (!validationResult && !nameValidationResult) {
        const response = await signupNewUser(_email, _password, _name);

        if (response.isUserSignedUp) {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } else {
        setErrorMessage(
          validationResult?.message || nameValidationResult?.message
        );
        toast.error(
          nameValidationResult?.message || validationResult?.message,
          {
            position: "top-right",
            type: "error",
          }
        );
      }
    }
  };

  return (
    <div className="font-display min-h-screen relative">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      
      {/* Header - Always visible */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={signinbgimage} 
          alt="Background Image" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better form visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md mx-auto p-6 sm:p-8 lg:p-16 bg-black bg-opacity-85 rounded-md flex flex-col items-start gap-4"
          autoComplete="on"
        >
          <h1 className="text-white font-bold text-2xl sm:text-3xl mb-3 brightness-200">
            {isSigninForm ? "Sign In" : "Sign Up"}
          </h1>
          
          {!isSigninForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="px-4 py-3 sm:py-4 rounded-md w-full text-white bg-gray-600 border-[0.5px] border-gray-500 placeholder-gray-300 bg-opacity-10 text-sm sm:text-base"
            />
          )}
          
          <input
            ref={email}
            type="email"
            placeholder="Email address"
            className="px-4 py-3 sm:py-4 rounded-md w-full text-white bg-gray-600 border-[0.5px] border-gray-500 placeholder-gray-300 bg-opacity-10 text-sm sm:text-base"
          />
          
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="px-4 py-3 sm:py-4 rounded-md w-full text-white bg-gray-600 border-[0.5px] border-gray-500 placeholder-gray-300 bg-opacity-10 text-sm sm:text-base"
          />

          <button
            className="px-4 py-2 sm:py-3 w-full text-white bg-[#EA2F14] font-semibold rounded-md hover:bg-[#CB0404] transition-colors duration-200 ease-in-out text-sm sm:text-base"
            onClick={handleSubmit}
          >
            {isSigninForm ? "Sign In" : "Sign Up"}
          </button>

          {isSigninForm && (
            <>
              <div className="w-full text-center">
                <p className="my-1 text-white text-center text-sm sm:text-base">OR</p>
              </div>
              
              <button className="px-4 py-2 sm:py-3 w-full text-white bg-gray-600 bg-opacity-50 font-semibold rounded-md hover:bg-opacity-40 transition-opacity duration-200 delay-150 ease-in-out text-sm sm:text-base">
                Use a sign-in Code
              </button>
              
              <Link className="text-white mx-auto underline hover:text-gray-500 transition-colors duration-150 ease-in text-sm sm:text-base">
                Forgot password?
              </Link>
              
              <div className="text-white flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="rememberme"
                  id="rememberme"
                  className="accent-gray-500 scale-125 sm:scale-150 hover:accent-gray-600 transition-accent-colors duration-200 ease-in"
                />
                <label htmlFor="rememberme" className="hover:cursor-pointer text-sm sm:text-base">
                  Remember me
                </label>
              </div>
            </>
          )}

          <p className="text-slate-400 font-semibold text-sm sm:text-base">
            {isSigninForm ? "New to Netflix?" : "Already have an account?"}
            <button
              onClick={toggleSigninForm}
              className="text-white hover:underline transition-all duration-150 ease-in ml-1"
            >
              {isSigninForm ? "Sign Up now." : "Sign In."}
            </button>
          </p>

          <p className="text-slate-400 text-xs sm:text-sm">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </p>
          
          <Link className="text-xs sm:text-sm text-blue-600 underline">
            Learn more.
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signin;