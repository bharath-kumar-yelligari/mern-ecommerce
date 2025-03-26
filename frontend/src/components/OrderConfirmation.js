import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/OrdersPage.scss";
import { FormatCurrency } from "../utils/FormatCurrency";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  let totalPrice;
  const [countdown, setCountdown] = useState(3); // 3 seconds countdown

  let { latestOrder } = useSelector((state) => state.orders);

  useEffect(() => {
    console.log("into order confirmation")
    if (!latestOrder) {
      navigate("/"); // Redirect to homepage if no order found
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);


    const redirectTimer = setTimeout(() => {
      navigate("/orders"); // Redirect to orders page after 5 seconds
    }, 3000);

    // Cleanup
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };

    // return () => clearTimeout(timer);
  }, [latestOrder, navigate]);

  if (latestOrder.items) {
    totalPrice = latestOrder.items.length > 0
      ? latestOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
  }

  if (!latestOrder) {
    return <h2>Loading order details...</h2>;
  }

  return (
    <div className="order-confirmation">
      <h1>🎉 Order Confirmed!</h1>
      <p>Thank you for your purchase.</p>
      <h3>Order Number: <strong>{latestOrder.orderID}</strong></h3>
      <p><strong>Total Amount:</strong> ₹{FormatCurrency(totalPrice, "en-IN")}</p>
      <p>Your order will be delivered soon. You can track your orders in the "My Orders" section.</p>
      <p>Redirecting to
        <Link to="/orders">
          <strong> Orders Page </strong>
        </Link>
        in {countdown} seconds...</p>
      {/* <button onClick={() => navigate("/orders")}>View My Orders</button> */}
    </div>
  );
};

export default OrderConfirmation;
