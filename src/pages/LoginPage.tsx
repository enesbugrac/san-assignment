import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../components/ui";
import { FormButton } from "../components/forms";
import { PageTitle } from "../components/ui";

const LoginPage: React.FC = () => {
  const { login, isLoggedIn, isLoading } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <LoadingSpinner
        text="Checking authentication..."
        className="flex justify-center items-center min-h-screen"
      />
    );
  }

  const handleLoginClick = () => {
    login();
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="p-8 md:p-10 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 w-full max-w-md text-center mx-auto">
        <PageTitle className="text-white mb-4">Welcome Back!</PageTitle>
        <p className="mb-8 text-gray-300">Click the button below to log in.</p>
        <FormButton
          onClick={handleLoginClick}
          variant="primary"
          size="lg"
          className="w-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          Log In as Demo User
        </FormButton>
      </div>
    </div>
  );
};

export default LoginPage;
