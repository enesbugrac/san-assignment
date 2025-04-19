import React, { LabelHTMLAttributes } from "react";

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean;
  helpText?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
  className = "",
  children,
  required = false,
  helpText,
  ...rest
}) => {
  return (
    <div className="mb-1">
      <label
        className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
        {...rest}
      >
        {children}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {helpText && <p className="text-xs text-gray-500 mb-1">{helpText}</p>}
    </div>
  );
};

export default FormLabel;
