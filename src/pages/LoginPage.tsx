import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login, isLoggedIn, isLoading } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  const handleLoginClick = () => {
    login();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-xs text-center">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <p className="mb-4">Click the button to log in as the dummy user.</p>
        <button
          onClick={handleLoginClick}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log In (John Doe)
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
