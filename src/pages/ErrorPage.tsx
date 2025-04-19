import React from "react";
import nav from "../navigation";

interface ErrorPageProps {
  code: string;
  title: string;
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, title, message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-2xl p-8 rounded-xl bg-gray-800/80 backdrop-blur-sm shadow-xl border border-gray-700/50 text-center relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 mb-8">
          <div className="text-9xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4 opacity-80">
            {code}
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-300 text-lg max-w-md mx-auto">{message}</p>
        </div>

        <button
          onClick={() => nav.home.go()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg flex items-center justify-center mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
