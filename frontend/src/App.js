import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import "./App.css";
import LoginSignup from "./components/user/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/header/UserOptions";
import { useDispatch, useSelector } from "react-redux";

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadUser());
    }, [dispatch]);

    return (
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
}

export default App;
