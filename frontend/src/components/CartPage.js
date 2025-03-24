import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartProductsRequest, fetchAddCartRequest, fetchRemoveCartRequest } from "../actions/cartActions";
import "../styles/CartPage.scss";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Breadcrumbs from "../utils/BreadCrumbs";
import CartItems from "./CartItems";
import { fetchAddressRequest } from "../actions/addressListActions";

const CartPage = () => {
  let { cart } = useSelector((state) => state.cart);
  const { addresses, loading } = useSelector((state) => state.addresses);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutNavigate = () => {
    if (!loading && addresses.length > 0) {
      navigate("/cart/checkout") // Navigate only when data is ready
    }
  }

  useEffect(() => {
    dispatch(fetchCartProductsRequest()); // Fetch product details
    dispatch(fetchAddressRequest()); // Fetch product details
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
        {cart.length > 0 && <button className="checkout-button"  onClick={() => checkoutNavigate()}>Proceed to Checkout</button>}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
