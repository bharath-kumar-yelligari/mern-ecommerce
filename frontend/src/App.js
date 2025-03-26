import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"
import ProductDetails from "./components/ProductDetails"
import ProtectedRoute from "./auth/ProtectedRoute"
import './App.scss';
import Header from "./components/Header";
import CartPage from "./components/CartPage";
import OrdersPage from "./components/OrdersPage";
import AddressList from "./components/AddressList";
import NotFound from "./components/NotFound";
import CheckoutPage from "./components/CheckoutPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderConfirmation from "./components/OrderConfirmation";

function App() {

  return (
    <Router>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Default Route - Redirect to Home */}
        {/* <Route path="/" element={<ProtectedRoute><Navigate to="/home" /> </ProtectedRoute>} /> */}

        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route exact path='/product/:id' element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/cart/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />

        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/orders/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        <Route path="/address" element={<ProtectedRoute><AddressList /></ProtectedRoute>} />

        {/* 404 Page - Handles unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
