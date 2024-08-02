// import { useEffect } from "react";
// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Webfont from "webfontloader";
// import Header from "./components/layout/header/Header";
// import Footer from "./components/layout/footer/Footer";
// import Home from "./components/home/Home";
// import ProductDetails from "./components/product/ProductDetails";
// import Products from "./components/product/Products";
// import Search from "./components/product/Search";

// function App() {
//   // webfont will load before my page is loading
//   useEffect(() => {
//     Webfont.load({
//       google: {
//         families: ["Roboto", "Droid Sans", "Chilanka"],
//       },
//     });
//   }, []);
//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route exact path="/product/:id" element={<ProductDetails />} />
//         <Route exact path="/products" element={<Products />} />
//         <Route path="/products/:id" element={<Products />} />
//         <Route exact path="/search" element={<Search />} />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;

import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Webfont from "webfontloader";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";

function App() {
  // webfont will load before my page is loading
  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
