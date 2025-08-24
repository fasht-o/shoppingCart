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
      existingCartItems[findIndexCart] = {
        ...existingCartItems[findIndexCart],
        quantity: existingCartItems[findIndexCart].quantity + 1,
        totalPrice:
          (existingCartItems[findIndexCart].quantity + 1) *
          existingCartItems[findIndexCart].price,
      };
    }
    console.log(existingCartItems, "exist");
    setCartItems(existingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    navigate("/cart");
  };
  const handleRemoveFromCart = (productDetails, isRemoved) => {
    let existingCartItems = [...cartItems];
    const findIndexOfItem = existingCartItems.findIndex(
      (item) => item.id === productDetails.id
    );
    if (isRemoved) {
      existingCartItems.splice(findIndexOfItem, 1);
    } else {
      existingCartItems[findIndexOfItem] = {
        ...existingCartItems[findIndexOfItem],
        quantity: existingCartItems[findIndexOfItem].quantity - 1,
        totalPrice:
          (existingCartItems[findIndexOfItem].quantity - 1) *
          existingCartItems[findIndexOfItem].price,
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    setCartItems(existingCartItems);
  };

  useEffect(() => {
    fetchProductList();
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
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
          handleRemoveFromCart,
        }}
      >
        {children}
      </ShoppingCartContext.Provider>
    </div>
  );
};

export default ShoppingContext;
