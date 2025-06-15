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
    const _email = email?.current?.value;
    const _password = password?.current?.value;
    const validationResult = checkValidData(_email, _password);

    if (isSigninForm) {
      if (!validationResult) {
        const response = await signinUser(_email, _password);
        if (response?.isUserSignedIn) {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } else {
        setErrorMessage(validationResult?.message);
        toast.error(validationResult?.message);
      }
    } else {
      const _name = name?.current?.value;
      const nameValidationResult = checkValidName(_name);
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
          nameValidationResult?.message || validationResult?.message
        );
      }
    }
  };

  return (
    <div className="font-display min-h-screen relative overflow-hidden">
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

      {/* Header */}
      <Header />

      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={signinbgimage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="flex justify-center items-start sm:items-center min-h-screen pt-32 sm:pt-0 px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full sm:w-[90%] md:w-[450px] p-6 sm:p-8 md:p-10 lg:p-12 bg-black bg-opacity-85 rounded-md flex flex-col gap-4"
          autoComplete="on"
        >
          <h1 className="text-white font-bold text-3xl sm:text-4xl">
            {isSigninForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSigninForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="px-4 py-3 rounded-md w-full text-white bg-gray-600 border border-gray-500 placeholder-gray-300 bg-opacity-10"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email address"
            className="px-4 py-3 rounded-md w-full text-white bg-gray-600 border border-gray-500 placeholder-gray-300 bg-opacity-10"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md w-full text-white bg-gray-600 border border-gray-500 placeholder-gray-300 bg-opacity-10"
          />

          <button
            className="px-4 py-3 w-full text-white bg-[#EA2F14] font-semibold rounded-md hover:bg-[#CB0404] transition-colors duration-200"
            onClick={handleSubmit}
          >
            {isSigninForm ? "Sign In" : "Sign Up"}
          </button>

          {isSigninForm && (
            <>
              <div className="w-full text-center text-white">OR</div>

              <button className="px-4 py-3 w-full text-white bg-gray-600 bg-opacity-50 font-semibold rounded-md hover:bg-opacity-40 transition-opacity duration-200">
                Use a sign-in Code
              </button>

              <Link className="text-white text-center underline hover:text-gray-500">
                Forgot password?
              </Link>

              <div className="text-white flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="rememberme"
                  className="accent-gray-500 scale-150"
                />
                <label htmlFor="rememberme">Remember me</label>
              </div>
            </>
          )}

          <p className="text-slate-400 font-semibold">
            {isSigninForm ? "New to Netflix?" : "Already have an account?"}{" "}
            <button
              onClick={toggleSigninForm}
              className="text-white hover:underline"
            >
              {isSigninForm ? "Sign Up now." : "Sign In."}
            </button>
          </p>

          <p className="text-slate-400 text-sm">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <Link className="text-blue-600 underline text-sm">Learn more.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
