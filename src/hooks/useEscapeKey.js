import React from "react";

export const useEscapeKey = (callback) => {
  React.useEffect(() => {
    const runCallback = (e) => {
      if (e.code == "Escape") {
        callback();
      }
    };

    window.addEventListener("keydown", runCallback);

    return () => {
      window.removeEventListener("keydown", runCallback);
    };
  });
};
