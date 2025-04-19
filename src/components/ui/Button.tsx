import React, { ButtonHTMLAttributes } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type ButtonVariant = "primary" | "danger" | "success" | "outline";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText = "Loading...",
  disabled,
  icon,
  fullWidth = false,
  ...rest
}) => {
  const baseClasses =
    "font-medium rounded-md cursor-pointer inline-flex items-center justify-center transition-all duration-200 ease-in-out shadow-sm";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white",
    danger:
      "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white",
    success:
      "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    xs: "py-1 px-2 text-xs",
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const disabledClasses = "opacity-60 cursor-not-allowed";
  const widthClass = fullWidth ? "w-full" : "";

  const combinedClassName = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled || isLoading ? disabledClasses : ""}
    ${widthClass}
    ${className}
  `;

  return (
    <button
      className={combinedClassName.trim()}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <LoadingSpinner size="sm" className="mr-2 -ml-1" text="" />}
      {!isLoading && icon && <span className="mr-2 -ml-1">{icon}</span>}
      {isLoading ? loadingText : children}
    </button>
  );
};

export default Button;
