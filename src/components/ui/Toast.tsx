import React, { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-emerald-500/90 to-green-600/90 border-emerald-600/50";
      case "error":
        return "bg-gradient-to-r from-red-500/90 to-rose-600/90 border-red-600/50";
      case "info":
        return "bg-gradient-to-r from-blue-500/90 to-indigo-600/90 border-blue-600/50";
      default:
        return "bg-gradient-to-r from-gray-700/90 to-gray-800/90 border-gray-600/50";
    }
  };

  return (
    <div
      className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`flex items-center backdrop-blur-sm border rounded-lg shadow-lg max-w-sm p-4 ${getTypeStyles()}`}
      >
        <div className="text-white font-medium">{message}</div>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-4 text-white cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Toast;
