import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  className = "",
  error,
  icon,
  ...rest
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {icon}
        </div>
      )}
      <input
        className={`
          w-full py-2 px-3 ${icon ? "pl-10" : ""}
          bg-[#121212] border rounded-lg
          text-gray-700 leading-tight
          ${error ? "border-red-500 bg-red-50" : "border-gray-300"}
          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
          transition-all duration-200 ease-in-out
          ${className}
        `}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;
