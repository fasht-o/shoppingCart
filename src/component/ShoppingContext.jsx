import React, { createContext, useEffect, useState } from "react";

const ShoppingContext = ({ children }) => {
  const ShoppingCartContext = createContext(null);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState({});
  const fetchProductList = async () => {
    const resp = await fetch("https://dummyjson.com/products");
    const result = await resp.json();
    console.log(result);
    if (result && result?.products) {
      setProductList(result?.products);
    }
  };
  useEffect(() => {
    fetchProductList();
  }, []);
  console.log(productList);
  return (
    <div>
      <ShoppingCartContext.Provider value={{ productList }}>
        {children}
      </ShoppingCartContext.Provider>
    </div>
  );
};

export default ShoppingContext;
