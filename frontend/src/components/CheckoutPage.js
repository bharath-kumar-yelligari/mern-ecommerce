import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/CheckoutPage.scss";
import CartPage from "../components/CartPage.js";
import { fetchAddressRequest, fetchAddAddressRequest, fetchDeleteAddressRequest, fetchUpdateAddressRequest } from "../actions/addressListActions";
import Accordion from "../utils/Accordion.js";
import Breadcrumbs from "../utils/BreadCrumbs.js";
import "../styles/AddressList.scss";
import CartItems from "./CartItems.js";
import { useNavigate } from "react-router-dom";
import { FormatCurrency } from "../utils/FormatCurrency.js";

const CheckoutPage = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default open first section
  const [selectedAddress, setSelectedAddress] = useState(null);
  let { addresses } = useSelector((state) => state.addresses);
  let { cart } = useSelector((state) => state.cart);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigation

  const [paymentOption, setPaymentOption] = useState(1)
  const paymentOptions = [{
    id: 1,
    "type": "Cash"
  },

  {
    id: 2,
    "type": "Credit/Debit Card"
  },
  {
    id: 3,
    "type": "Wallet"
  }]


  // useEffect(() => {
  //   dispatch(fetchAddressRequest());
  // }, [dispatch]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleEdit = (id, details) => {
    setEditingId(id);
    setName(details.name);
    setMobile(details.mobile);
    setEmail(details.email);
    setAddress(details.address);
  };

  const handleAddAddress = () => {
    if (address.trim()) {
      dispatch(fetchAddAddressRequest({ name, mobile, email, address: address }));
      clearAddressFields()
    }
  };


  const handleUpdate = () => {
    dispatch(fetchUpdateAddressRequest({ id: editingId, name, mobile, email, address }));
    setEditingId(null);
    clearAddressFields()
  };

  function clearAddressFields() {
    setName("");
    setMobile("");
    setEmail("");
    setAddress("");
  }

  const handleDelete = (id) => {
    dispatch(fetchDeleteAddressRequest(id));
  };

  const placeOrder = () => {

  }

  const updateAddressSelection = (address)=>{
    console.log(address)

  }

  cart = typeof cart === "string" ? JSON.parse(cart) : cart;
  addresses = typeof addresses === "string" ? JSON.parse(addresses) : addresses;
  // addresses.push({"_id":"new address"})
  // setSelectedAddress(addresses[0]._id)
  const totalPrice = cart.length > 0
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;
  const platformFee = 10;
  const totalOrderAmount = totalPrice + platformFee;

  return (
    <div className="checkoutPage-main-container">
      <Breadcrumbs />
      <div className="checkout-main-page">
        <div className="toggle-details">
          <Accordion
            title="1.Shipping Address"
            isOpen={openIndex === 0}
            toggle={() => toggleAccordion(0)}
          >
            <div className="shipping-accordion-div">
              <div className="address-list">
                {addresses.length === 0 ? (
                  <p className="empty-page-msg">Please add an address to Proceed</p>
                ) : (
                  <div className="address-page">
                    {addresses.map((item) => (

                      <div key={item._id} className="address-item">
                        <input
                          type="radio"
                          name="address"
                          value={item._id}
                          checked={selectedAddress === item._id}
                          onChange={() => updateAddressSelection(item)}
                        />
                        <div className="address-div">
                          <span className="name">{item.name}</span>
                          <span>{item.mobile}</span>
                          <span>{item.email}</span>
                          <span className="address-field"><b>Address:</b> {item.address}</span>
                        </div>
                        <div className="action-btns-div">
                          <button onClick={() => handleEdit(item._id, item)}>✏️ Edit</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="address-add-page">
                  <h2 className="add-address-h2">Add Address</h2>
                  <div className="radio-main-div">
                    <input
                      type="radio"
                      name="address"
                      value={address._id}
                      checked={selectedAddress === address._id}
                      onChange={() => updateAddressSelection(address) }
                    />
                    <div className="add-new-address-div">
                      <div className="contact-details">
                        <div className="address-field">
                          {/* <label className="field-label">Name</label> */}
                          <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="address-field">
                          {/* <label className="field-label">Mobile</label> */}
                          <input
                            type="text"
                            placeholder="Enter Mobile No"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>
                        <div className="address-field">
                          {/* <label className="field-label">Email</label> */}
                          <input
                            type="text"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="address-field">
                        {/* <label className="field-label">Address</label> */}
                        <textarea
                          type="text"
                          placeholder="Enter address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {editingId ? (
                    <button className="add-btn" onClick={handleUpdate}>✅ Update</button>
                  ) : (
                    <button className="add-btn" onClick={handleAddAddress}>➕ Add</button>
                  )}
                </div>
                <button className="continue-btn" disabled={selectedAddress === null} onClick={handleAddAddress}> Continue</button>
              </div>
            </div>
          </Accordion>

          <Accordion
            title="2. Cart Summary"
            isOpen={openIndex === 1}
            toggle={() => toggleAccordion(1)}
          >
            <div className="cart-summary">
              <CartItems cart={cart} />
              <button className="continue-btn" disabled={selectedAddress === null} onClick={handleAddAddress}> Continue</button>
            </div>

          </Accordion>
          <Accordion
            title="3. Payment Method"
            isOpen={openIndex === 2}
            toggle={() => toggleAccordion(2)}
          >
            <div className="payment-main-div">
              {paymentOptions.map((item) => (
                <div key={item.id} className="payment-options-item">
                  <div className="option-div">
                    <input
                      type="radio"
                      name="address"
                      value={item.id}
                      checked={paymentOption === item.id}
                      onChange={() => setPaymentOption(item.id)}
                    />
                    <span>{item.type}</span>
                  </div>
                </div>
              ))}

              <button className="continue-btn" disabled={selectedAddress === null} onClick={placeOrder}> Place Order</button>

            </div>
          </Accordion>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="sub-total-field"><span>Sub Total </span><span>{FormatCurrency(totalPrice, "en-IN")}</span></div>
          <div className="shipping-field"><span>Shipping </span><span className="shipping-value">Free</span></div>
          <div className="tax-field"><span>Platform Fee </span><span>{FormatCurrency(platformFee, "en-IN")}</span></div>
          <div className="total-field"><span>Total </span><span>{FormatCurrency(totalOrderAmount, "en-IN")}</span></div>
          <button className="continue-btn" disabled={selectedAddress === null} onClick={handleAddAddress}> Place Order</button>
        </div>
      </div>

    </div>
  );
};

export default CheckoutPage;
