import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import nav from "../../navigation";
import FormButton from "../forms/FormButton";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogoutClick = () => {
    logout();
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-800 text-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          <Link
            to={nav.home.get()}
            className="hover:text-indigo-300 transition duration-150 ease-in-out flex items-center"
          >
            <svg
              className="w-7 h-7 mr-2 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Octofront
          </Link>
        </h1>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        ></button>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-1">
            <Link
              to={nav.home.get()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                isActivePath(nav.home.get())
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to={nav.posts.get()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                isActivePath(nav.posts.get())
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Posts
            </Link>

            <Link
              to={nav.createPost.get()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                isActivePath(nav.createPost.get())
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Create Post
            </Link>
          </nav>
          <div className="flex items-center space-x-3 border-l pl-4 border-gray-700">
            {user && (
              <span className="text-sm text-gray-300 hidden sm:flex items-center">
                {user.name}
              </span>
            )}
            <FormButton
              variant="danger"
              size="sm"
              onClick={handleLogoutClick}
              className="shadow-sm"
            >
              Logout
            </FormButton>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 pb-2">
          <div className="px-2 pt-2 pb-2 space-y-1">
            <Link
              to={nav.home.get()}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath(nav.home.get())
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={nav.posts.get()}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath(nav.posts.get())
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Posts
            </Link>
            <Link
              to={nav.createPost.get()}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath(nav.createPost.get())
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Post
            </Link>
            {user && (
              <div className="px-3 py-2 text-sm text-gray-300 flex items-center">
                {user.name}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
