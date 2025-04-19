import React, { TextareaHTMLAttributes } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  className = "",
  error,
  ...rest
}) => {
  return (
    <div>
      <textarea
        className={`
          w-full py-2 px-3 
          bg-white border rounded-lg
          text-gray-700 leading-tight
          ${error ? "border-red-500 bg-red-50" : "border-gray-300"}
          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
          transition-all duration-200 ease-in-out
          resize-y min-h-[100px]
          ${className}
        `}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FormTextarea;
