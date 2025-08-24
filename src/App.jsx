import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/productList";
import CartList from "./pages/cartList";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="products" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartList />} />
      </Routes>
    </div>
  );
};

export default App;
