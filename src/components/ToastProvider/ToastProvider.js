import React from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useEscapeKey(() => setToasts([]));

  const dismissToast = (toastId) => {
    const updatedToasts = toasts.filter((toast) => toast.id !== toastId);
    setToasts([...updatedToasts]);
  };

  const addToast = (variant, message) => {
    const newToast = {
      id: crypto.randomUUID(),
      variant: variant,
      message: message,
    };
    setToasts([...toasts, newToast]);
  };

  const contextValue = React.useMemo(() => {
    return {
      toasts,
      addToast,
      dismissToast,
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
