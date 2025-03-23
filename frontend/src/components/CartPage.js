import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { removeFromCart, updateQuantity } from "../redux/actions";
import { fetchCartProductsRequest, fetchAddCartRequest, fetchRemoveCartRequest } from "../actions/cartActions";
import "../styles/CartPage.scss";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Breadcrumbs from "../utils/BreadCrumbs";
import { FormatCurrency } from "../utils/FormatCurrency";

const CartPage = () => {
  let { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  const removeCartItem = (id) => {
    dispatch(fetchRemoveCartRequest(id));
  }

  const addToCart = (product, action) => {
    product["action"] = action;
    dispatch(fetchAddCartRequest(product));
  }


  useEffect(() => {
    dispatch(fetchCartProductsRequest()); // Fetch product details
  }, [dispatch]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      //dispatch(updateQuantity(id, quantity));
    }
  };

  cart = typeof cart === "string" ? JSON.parse(cart) : cart;

  const totalPrice = cart.length > 0
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;
  // const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-main-container">
      <Breadcrumbs />
      <div className="cart-main-page">
        {cart.length === 0 ? (
          <p className="empty-page-msg">Your cart is empty</p>
        ) : (
          <div className="cart-page">
            <h2 className="your-cart">Your Cart</h2>
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="image-details">
                  <Link to={`/product/${item.productId}`}>
                    <img className="cart-image" src={item.thumbnail} alt={item.name} />
                  </Link>
                  {/* <img className="cart-image" src={item.thumbnail} alt={item.name} /> */}
                  <div className="details-card">
                    <h2>{item.title}</h2>
                    <p className="brand">{item.brand}</p>
                    <p>Quantity</p>
                    <div className="quantity-actions"><p onClick={() => addToCart(item, 'remove')}>-</p><p>{item.quantity}</p><p onClick={() => addToCart(item, 'add')}>+</p></div>
                  </div>
                </div>

                <div className="remove-btn-div">
                  <p>₹{FormatCurrency(item.price, "en-IN")}</p>
                  <button onClick={() => removeCartItem(item._id)} className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
            {/* <h3>Total: ${totalPrice.toFixed(2)}</h3> */}
            <h3>Total: ₹{FormatCurrency(totalPrice.toFixed(2), "en-IN")}</h3>

            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
