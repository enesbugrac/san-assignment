import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className = "", subtitle }) => (
  <div className={`mb-8 ${className}`}>
    <h1 className="text-3xl font-bold text-white leading-tight">{children}</h1>
    {subtitle && <p className="text-gray-400 mt-2 text-lg">{subtitle}</p>}
  </div>
);

export default PageTitle;
