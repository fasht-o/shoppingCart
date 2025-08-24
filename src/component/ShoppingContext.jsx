import React, { createContext } from "react";

const ShoppingContext = ({ children }) => {
  const ShoppingCartContext = createContext(null);
  return (
    <div>
      <ShoppingCartContext.Provider>{children}</ShoppingCartContext.Provider>
    </div>
  );
};

export default ShoppingContext;
