import React from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface CardProps {
  title: string;
  isLoading?: boolean;
  error?: Error | null;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  isLoading,
  error,
  children,
  className = "",
  icon,
}) => {
  let content: React.ReactNode;
  if (isLoading) {
    content = (
      <LoadingSpinner text="Loading data..." size="sm" className="py-4" color="white" />
    );
  } else if (error) {
    content = <ErrorMessage error={error} context="loading data" />;
  } else {
    content = children;
  }

  return (
    <div
      className={`bg-gray-800 border border-gray-700 shadow-lg rounded-lg overflow-hidden ${className}`}
    >
      <div className="px-6 py-4 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
        {icon && <div className="mr-3 text-indigo-400">{icon}</div>}
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="p-6">{content}</div>
    </div>
  );
};

export default Card;
