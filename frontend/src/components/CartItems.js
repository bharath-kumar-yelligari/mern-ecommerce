import React from 'react'
import "../styles/CartPage.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormatCurrency } from "../utils/FormatCurrency";
import { fetchAddCartRequest, fetchRemoveCartRequest } from "../actions/cartActions";

function CartItems({ cart = [] }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCartItem = (id) => {
    dispatch(fetchRemoveCartRequest(id));
  }

  const updateCart = (product, action) => {
    product["action"] = action;
    dispatch(fetchAddCartRequest(product));
  }

  cart = typeof cart === "string" ? JSON.parse(cart) : cart;

  const totalPrice = cart.length > 0
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  return (
    <div>
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
                <div className="details-card">
                  <h2>{item.title}</h2>
                  <p className="brand">{item.brand}</p>
                  <p>Quantity</p>
                  <div className="quantity-actions"><p onClick={() => updateCart(item, 'remove')}>-</p><p>{item.quantity}</p><p onClick={() => updateCart(item, 'add')}>+</p></div>
                </div>
              </div>

              <div className="remove-btn-div">
                <p>₹{FormatCurrency(item.price, "en-IN")}</p>
                <button onClick={() => removeCartItem(item._id)} className="remove-btn">Remove</button>
              </div>
            </div>
          ))}
          <h3 className='cart-total'>Total: ₹{FormatCurrency(totalPrice.toFixed(2), "en-IN")}</h3>
        </div>
      )}

    </div>
  )
}

export default CartItems