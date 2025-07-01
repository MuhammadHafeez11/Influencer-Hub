"use client"

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import BusinessRegisterForm from "../../pages/BusinessRegisterForm"



const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-pink-500"
      : "text-gray-700 hover:text-pink-500";
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">IH</span>
            </div>
            <span
              className={`font-bold text-xl ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Influencer Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-300 ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              to="/influencers"
              className={`font-medium transition-colors duration-300 ${isActive("/influencers")}`}
            >
              Influencers
            </Link>

            {userInfo && userInfo.token ? (
              <>
                <Link
                  to="/bookings"
                  className={`font-medium transition-colors duration-300 ${isActive("/bookings")}`}
                >
                  Bookings
                </Link>
                <Link
                  to="/chat"
                  className={`font-medium transition-colors duration-300 ${isActive("/chat")}`}
                >
                  Messages
                </Link>

                <button
                  onClick={() => setShowBusinessForm(!showBusinessForm)}
                  className="font-medium transition-colors duration-300 text-gray-700 hover:text-pink-500"
                >
                  {showBusinessForm ? "Close Business Form" : "Register Business"}
                </button>

                <div className="relative group">
                  <button className="flex items-center space-x-1 font-medium">
                    <img
                      src={userInfo.avatar || "https://via.placeholder.com/40"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-pink-500"
                    />
                    <span>{userInfo.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    {userInfo.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium text-gray-700 hover:text-pink-500 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-500 focus:outline-none"
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

        {/* Toggleable Business Register Form */}
        {showBusinessForm && (
          <div className="bg-white shadow-md border-t border-gray-200">
            <div className="container mx-auto px-4 py-6">
              <BusinessRegisterForm />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/influencers"
              className="block py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Influencers
            </Link>

            {userInfo && userInfo.token ? (
              <>
                <Link
                  to="/bookings"
                  className="block py-2 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Bookings
                </Link>
                <Link
                  to="/chat"
                  className="block py-2 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Messages
                </Link>

                <button
                  onClick={() => {
                    setShowBusinessForm(!showBusinessForm);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 font-medium text-pink-500"
                >
                  {showBusinessForm ? "Close Business Form" : "Register Business"}
                </button>

                <Link
                  to="/profile"
                  className="block py-2 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                {userInfo.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block py-2 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 font-medium text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 font-medium text-pink-500"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
