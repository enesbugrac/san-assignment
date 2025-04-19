import React from "react";
import FormButton from "../forms/FormButton";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isConfirming?: boolean;
  confirmVariant?: "danger" | "primary" | "warning";
  icon?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isConfirming = false,
  confirmVariant = "danger",
  icon,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl p-6 z-50 max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex items-start mb-4">
          {icon && <div className="flex-shrink-0 mr-4">{icon}</div>}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm">{message}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <FormButton
            variant="outline"
            onClick={onClose}
            disabled={isConfirming}
            size="sm"
          >
            {cancelText}
          </FormButton>
          <FormButton
            variant={confirmVariant}
            onClick={onConfirm}
            isLoading={isConfirming}
            loadingText="Processing..."
            size="sm"
          >
            {confirmText}
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
