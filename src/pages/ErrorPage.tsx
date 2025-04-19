import nav from "@/navigation";
import React from "react";
import { Link } from "react-router-dom";

interface ErrorPageProps {
  code: string;
  title: string;
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, title, message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl p-8 rounded-xl bg-gray-800/80 backdrop-blur-sm shadow-xl border border-gray-700/50 text-center relative overflow-hidden">
        <div className="relative z-10 mb-8">
          <div className="text-9xl font-bold mb-4 opacity-80">{code}</div>
          <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">{message}</p>
        </div>

        <Link
          to={nav.home.get()}
          className="px-6 py-3 text-white font-medium flex items-center justify-center mx-auto"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
