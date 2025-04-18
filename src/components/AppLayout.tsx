import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Permission } from "../routes.tsx";

const AppLayout: React.FC = () => {
  const { logout, user } = useAuth();

  const handleLogoutClick = () => {
    logout();
  };

  const canCreatePost = user?.permissions.includes(Permission.CREATE_POST);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Octofront App</Link>
        </h1>
        <div className="flex items-center space-x-4">
          <nav className="space-x-4">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/posts" className="hover:text-gray-300">
              Posts
            </Link>
            {canCreatePost && (
              <Link to="/posts/create" className="hover:text-gray-300">
                Create Post
              </Link>
            )}
          </nav>
          {user && <span className="text-sm">Welcome, {user.name}!</span>}
          <button
            onClick={handleLogoutClick}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
      <footer className="bg-gray-700 text-white p-4 text-center text-sm">
        Octofront Assignment
      </footer>
    </div>
  );
};

export default AppLayout;
