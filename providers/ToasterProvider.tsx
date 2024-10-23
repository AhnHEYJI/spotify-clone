"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        stlye: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
  );
};
