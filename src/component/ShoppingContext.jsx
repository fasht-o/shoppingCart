import React, { createContext, useEffect, useState } from "react";
export const ShoppingCartContext = createContext(null);
const ShoppingContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [productLists, setProductLists] = useState([]);
  const fetchProductList = async () => {
    try {
      const resp = await fetch("https://dummyjson.com/products");
      const result = await resp.json();

      const product = await result?.products;
      console.log(result);
      if (product) {
        setProductLists(product);
        setLoading(false);

        console.log(productLists);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div>
      <ShoppingCartContext.Provider value={{ productLists, loading }}>
        {children}
      </ShoppingCartContext.Provider>
    </div>
  );
};

export default ShoppingContext;
