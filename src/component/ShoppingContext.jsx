import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const ShoppingCartContext = createContext(null);
const ShoppingContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [productLists, setProductLists] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
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
  const handleAddToCart = (productDetails) => {
    console.log(productDetails);
    let existingCartItems = [...cartItems];

    const findIndexCart = existingCartItems.findIndex(
      (cartItem) => cartItem.id === productDetails.id
    );
    console.log(findIndexCart);

    if (findIndexCart === -1) {
      existingCartItems.push({
        ...productDetails,
        quantity: 1,
        totalPrice: productDetails?.price,
      });
    } else {
    }
    console.log(existingCartItems, "exist");
    setCartItems(existingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    navigate("/cart");
  };
  useEffect(() => {
    fetchProductList();
  }, []);
  console.log(cartItems);

  return (
    <div>
      <ShoppingCartContext.Provider
        value={{
          productLists,
          loading,
          productDetails,
          setProductDetails,
          handleAddToCart,
          cartItems,
        }}
      >
        {children}
      </ShoppingCartContext.Provider>
    </div>
  );
};

export default ShoppingContext;
