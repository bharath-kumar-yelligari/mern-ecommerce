import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersRequest } from "../actions/ordersActions";
import "../styles/OrdersPage.scss";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const OrdersPage = () => {
  let { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchOrdersRequest()); // Fetch product details
  }, [dispatch]);

  orders = typeof orders === "string" ? JSON.parse(orders) : orders;

  return (
    <div className="delivery-main-container">
      <div className="delivery-main-page">
        {orders.length === 0 ? (
          <p className="empty-page-msg">Your dont' have any orders</p>
        ) : (
          <div className="delivery-page">
            <h2 className="your-delivery">Your Orders</h2>
            {orders.map((item) => (
              <div key={item._id} className="delivery-item">
                <div className="image-details">
                  <Link to={`/product/${item.productId}`}>
                    <img className="delivery-image" src={item.thumbnail} alt={item.name} />
                  </Link>
                  {/* <img className="cart-image" src={item.thumbnail} alt={item.name} /> */}
                  <div className="details-card">
                    <h2>{item.title}</h2>
                    <p className="brand">{item.brand}</p>
                    <p>Quantity</p>
                    <p>{item.quantity}</p>
                  </div>
                </div>
                <div className="delivery-main-div">
                  <div className="delivery-div">
                    <span className="order-symbol" style={{ backgroundColor: (item.deliveryStatus === 'Delivered') ? "green" : "orange" }}></span>
                    <span>{item.deliveryStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
