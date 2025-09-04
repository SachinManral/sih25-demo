import React from "react";
import { Link } from "react-router-dom";
import loginImg from "../assets/loginImg.jpeg";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const handleGoogleLogin = () => {
    // Placeholder for Google login logic
    alert("Google login clicked!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 bg-slate-50">
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
        <div className="bg-orange-50 rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row min-h-[650px]">
            {/* Left Panel */}
            <div className="hidden md:block md:w-5/12 bg-blue-600 relative overflow-hidden">
              <div
                className="absolute inset-0 z-0 opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://d8it4huxumps7.cloudfront.net/uploads/images/login/border-vector-image.png')",
                }}
              ></div>
              <div className="h-full w-full relative z-10">
                <img
                  src={loginImg}
                  alt="Community Engagement"
                  className="h-full w-full object-cover rounded-l-xl drop-shadow-lg"
                />
              </div>
            </div>

            {/* Right Panel (Form) */}
            <div className="w-full md:w-7/12 bg-orange-50 flex flex-col">
              <div className="px-4 sm:px-6 md:px-6 lg:px-8 py-6 flex-grow flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-2">
                      <span className="text-orange-500">Create</span>{" "}
                      <span className="text-black">your</span>{" "}
                      <span className="text-green-600">NagarNigrani</span>{" "}
                      <span className="text-orange-500">account</span>
                    </h2>
                    <p className="text-md text-gray-500">
                      Please provide your details to get started
                    </p>
                  </div>

                  {/* Scrollable Form */}
                  <div className="overflow-y-auto max-h-[65vh] pr-2 space-y-4">
                    <form className="space-y-4">
                      {/* Google Login */}
                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <FcGoogle className="w-5 h-5" /> Sign up with Google
                      </button>

                      <div className="text-center text-gray-500 text-sm">or sign up with email</div>

                      {/* First & Last Name */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          required
                          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Aadhaar / Govt. ID */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Aadhaar / Govt. ID Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your ID number"
                          required
                          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* Role */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role
                        </label>
                        <select
                          required
                          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="">Select Role</option>
                          <option value="citizen">Citizen</option>
                          <option value="officer">Officer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          required
                          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          required
                          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* Terms */}
                      <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" required />
                        <span>
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Terms & Conditions
                          </Link>
                        </span>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                      >
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-800 transition"
                >
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
