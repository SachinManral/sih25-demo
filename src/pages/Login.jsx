import React from "react";
import { Link } from "react-router-dom";
import loginImg from "../assets/loginImg.jpeg";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleGoogleLogin = () => {
    alert("Google login clicked!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 bg-slate-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://statics.myclickfunnels.com/image/301108/file/215e0050b0709c2f41a105beec3f25ff.svg')",
          backgroundSize: "600px",
          backgroundRepeat: "repeat",
          opacity: 0.1,
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Card */}
        <div className="bg-orange-50/90 rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row" style={{ minHeight: "650px" }}>
            
            {/* Left Illustration (hidden on mobile) */}
            <div className="hidden md:block md:w-5/12 bg-blue-600 relative overflow-hidden">
              <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                  backgroundImage:
                    "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              ></div>
              <div className="h-full w-full">
                <img
                  src={loginImg}
                  alt="Civic Illustration"
                  className="h-full w-full object-cover rounded-l-xl drop-shadow-lg"
                />
              </div>
            </div>

            {/* Right Form */}
            <div className="w-full md:w-7/12 flex flex-col">
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                  
                  {/* Heading */}
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Welcome back to <span className="text-orange-600 text-3xl">NagarNigrani</span> 👋
                    </h2>
                    <p className="text-md text-gray-600">
                      Sign in to report and track civic issues.
                    </p>
                  </div>

                  {/* Form */}
                  <form className="space-y-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="abc@gmail.com"
                        className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="@12345"
                        required
                        className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                      />
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-orange-600 hover:text-orange-800"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors"
                    >
                      Login
                    </button>

                    {/* Google login */}
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <FcGoogle className="w-5 h-5" /> Login with Google
                    </button>

                    {/* Register link */}
                    <div className="text-center text-sm mt-4">
                      <span className="text-gray-600">New to CivicEye?</span>{" "}
                      <Link
                        to="/register"
                        className="font-semibold text-orange-600 hover:text-orange-800"
                      >
                        Create an account →
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* End Right */}
          </div>
        </div>
      </div>
    </div>
  );
}
