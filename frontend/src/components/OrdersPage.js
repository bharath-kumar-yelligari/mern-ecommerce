import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersRequest } from "../actions/ordersActions";
import "../styles/OrdersPage.scss";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Breadcrumbs from "../utils/BreadCrumbs";
import { FormatCurrency } from "../utils/FormatCurrency";

const OrdersPage = () => {
  let { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchOrdersRequest()); // Fetch product details
  }, [dispatch]);

  orders = typeof orders === "string" ? JSON.parse(orders) : orders;

  const totalPrice = (items) => {
    return items.length > 0
      ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
  }

  return (
    <div className="delivery-main-container">
      <Breadcrumbs />
      <div className="delivery-main-page">
        {orders.length === 0 ? (
          <p className="empty-page-msg">Your dont' have any orders</p>
        ) : (
          <div className="delivery-page">
            <h2 className="your-delivery">Your Orders</h2>
            {orders.map((item) => (
              <div key={item._id} className="delivery-item">

                {item.items.map((product) => (
                  <div key={product._id} className="items-page">
                    <div className="image-details">
                      <Link to={`/product/${product.productId}`}>
                        <img className="delivery-image" src={product.thumbnail} alt={product.name} />
                      </Link>
                      <div className="details-card">
                        <h2>{product.title}</h2>
                        <p className="brand">{product.brand}</p>
                        <p>Quantity</p>
                        <p>{product.quantity}</p>
                      </div>
                    </div>
                    <div className="delivery-main-div">
                      <div className="delivery-div">
                        <span className="order-symbol" style={{ backgroundColor: (item.deliveryStatus === 'Delivered') ? "green" : "orange" }}></span>
                        <div className="delivery-status">
                          <span>{item.deliveryStatus} on</span> {new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            // year: "numeric",
                          })}
                        </div>
                      </div>
                      {(item.deliveryStatus === 'Delivered') ? <span className="delivery-msg">Your item has been delivered</span> :
                        <span className="delivery-msg">Your item has been Placed</span>}
                      <span className="price">₹{FormatCurrency(product.price, "en-IN")}</span>
                    </div>
                  </div>
                ))}

                <h3 className='cart-total'>Total: ₹{FormatCurrency(totalPrice(item.items).toFixed(2), "en-IN")}</h3>
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
