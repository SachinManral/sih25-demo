import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 relative">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-600 to-teal-400 flex items-center justify-center text-white font-bold">
            NN
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">NagarNigrani</h1>
            <p className="text-xs text-slate-500 -mt-1">
              Report · Track · Resolve
            </p>
          </div>
        </Link>

        {/* Centered Nav Links (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6">
          <Link
            to="/"
            className="text-slate-700 hover:text-sky-600 transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/report"
            className="text-slate-700 hover:text-sky-600 transition font-medium"
          >
            Report Issue
          </Link>
          <Link
            to="/analytics"
            className="text-slate-700 hover:text-sky-600 transition font-medium"
          >
            Analytics
          </Link>
          <Link
            to="/admin"
            className="text-slate-700 hover:text-sky-600 transition font-medium"
          >
            Admin
          </Link>
        </div>

        {/* Login/Register Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3 z-10">
          <Link
            to="/login"
            className="px-4 py-2 bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center z-20">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-700 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full right-0 w-48 bg-white shadow-lg p-4 space-y-3 rounded-l-lg z-10">
          <Link
            to="/"
            className="block text-slate-700 hover:text-sky-600 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/report"
            className="block text-slate-700 hover:text-sky-600 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Report Issue
          </Link>
          <Link
            to="/analytics"
            className="block text-slate-700 hover:text-sky-600 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Analytics
          </Link>
          <Link
            to="/admin"
            className="block text-slate-700 hover:text-sky-600 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
          <Link
            to="/login"
            className="block text-slate-700 hover:text-sky-600 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block text-slate-700 hover:text-sky-600 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
