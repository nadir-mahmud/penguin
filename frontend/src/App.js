import { Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import PrivateRoute from "./route/PrivateRoute";
import PrivateTest from "./screens/PrivateTest";
import ProductDetails from "./screens/ProductDetails";
import ProductReviews from "./components/ProductReviews";
import Cart from "./screens/Cart";
import Payment from "./screens/Payment";
import Search from "./screens/Search";
import Order from "./screens/Order";
import Test from "./screens/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/test" element={<PrivateTest />} />
        <Route path="/test2" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
