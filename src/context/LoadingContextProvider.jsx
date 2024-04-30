import React, { createContext, useState } from "react";
export const LoadingContext = createContext(null);

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState({});
  async function withLoading(callback, key) {
    setLoading({ ...loading, [key]: true });
    await callback();
    setLoading({ ...loading, [key]: false });
  }
  return (
    <LoadingContext.Provider value={{ loading, setLoading, withLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
