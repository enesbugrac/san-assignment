import React from "react";

interface ErrorMessageProps {
  error: Error | null | undefined;
  context?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  context,
  className = "",
}) => {
  if (!error) return null;

  const defaultMessage = "An unexpected error occurred.";
  const message = error instanceof Error ? error.message : defaultMessage;

  return (
    <div
      className={`p-4 border border-red-200 bg-gradient-to-r from-red-50 to-red-100 text-red-700 rounded-lg shadow-sm ${className}`}
      role="alert"
    >
      <p className="font-medium">Error{context ? ` ${context}` : ""}</p>
      <p className="text-sm mt-1 text-red-600">{message}</p>
    </div>
  );
};

export default ErrorMessage;
