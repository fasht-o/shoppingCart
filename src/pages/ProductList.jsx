import React, { useContext } from "react";
import ShoppingContext from "../component/ShoppingContext";

const ProductList = () => {
  const getContextValue = useContext(ShoppingContext);
  console.log(getContextValue);
  return <div></div>;
};

export default ProductList;
