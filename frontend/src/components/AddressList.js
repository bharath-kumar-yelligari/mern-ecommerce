import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressRequest, fetchAddAddressRequest, fetchDeleteAddressRequest, fetchUpdateAddressRequest } from "../actions/addressListActions";
import "../styles/AddressList.scss";
import Footer from "./Footer";
import Breadcrumbs from "../utils/BreadCrumbs";
import validationForm from "../utils/AddressFormValidation"

const AddressList = () => {
  let { addresses } = useSelector((state) => state.addresses);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchAddressRequest());
  }, [dispatch]);


  const handleAddAddress = (e) => {
    e.preventDefault();
    const newErrors = validationForm(name, mobile, email, address);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      dispatch(fetchAddAddressRequest({ name, mobile, email, address: address }));
      clearAddressFields()
    }
  };

  const handleEdit = (id, details) => {
    setEditingId(id);
    setName(details.name);
    setMobile(details.mobile);
    setEmail(details.email);
    setAddress(details.address);
    setErrors({});
  };

  const handleUpdate = (e) => {
    // dispatch(fetchUpdateAddressRequest({ id: editingId, name, mobile, email, address }));
    // setEditingId(null);
    // clearAddressFields()

    e.preventDefault();
    const newErrors = validationForm(name, mobile, email, address);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      dispatch(fetchUpdateAddressRequest({ id: editingId, name, mobile, email, address }));
      setEditingId(null);
      clearAddressFields()
    }
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

  addresses = typeof addresses === "string" ? JSON.parse(addresses) : addresses;

  return (

    <div className="address-main-container">
      <Breadcrumbs />
      <div className="address-main-page">
        <div className="address-add-page">
          <h2 className="add-address-h2">Add Address</h2>
          <div className="contact-details">
            <div className="address-field">
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="address-field">
              <input
                type="text"
                placeholder="Enter Mobile No"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
            <div className="address-field">
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          </div>
          <div className="address-field">
            <textarea
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          {editingId ? (
            <button className="add-btn" onClick={handleUpdate}>✅ Update</button>
          ) : (
            <button className="add-btn" onClick={handleAddAddress}>➕ Add</button>
          )}
        </div>

        <h2 className="your-address">Your Addresses</h2>
        {addresses.length === 0 ? (
          <p className="empty-page-msg">Your dont' have any saved addresses</p>
        ) : (
          <div className="address-page">
            {addresses.map((item) => (
              <div key={item._id} className="address-item">
                <div className="address-div">
                  <span className="name">{item.name}</span>
                  <span>{item.mobile}</span>
                  <span>{item.email}</span>
                  <span className="address-field"><b>Address:</b> {item.address}</span>
                </div>
                <div className="action-btns-div">
                  <button onClick={() => handleEdit(item._id, item)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
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

export default AddressList;
