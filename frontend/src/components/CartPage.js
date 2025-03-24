import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartProductsRequest, fetchAddCartRequest, fetchRemoveCartRequest } from "../actions/cartActions";
import "../styles/CartPage.scss";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Breadcrumbs from "../utils/BreadCrumbs";
import CartItems from "./CartItems";

const CartPage = () => {
  let { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutNavigate = () => {
    navigate("/cart/checkout")
  }

  useEffect(() => {
    dispatch(fetchCartProductsRequest()); // Fetch product details
  }, [dispatch]);

  cart = typeof cart === "string" ? JSON.parse(cart) : cart;

  const totalPrice = cart.length > 0
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="cart-main-container">
      <Breadcrumbs />
      <div className="cart-main-page">
        <CartItems cart={cart} />
        <button className="checkout-button" onClick={() => checkoutNavigate()}>Proceed to Checkout</button>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
