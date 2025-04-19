import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import nav from "@/navigation";
import Button from "@/components/ui/Button";

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
      <div className="container mx-auto px-4 py-4 flex justify-end items-center">
        <Button
          variant="primary"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          Menu
        </Button>
        <div className="hidden md:flex w-full items-center justify-between space-x-6">
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
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogoutClick}
              className="shadow-sm"
            >
              Logout
            </Button>
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
              <>
                <div className="px-3 py-2 text-sm text-gray-300 flex items-center">
                  {user.name}
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleLogoutClick}
                  className="shadow-sm"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
