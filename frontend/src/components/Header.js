import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartProductsRequest } from "../actions/cartActions";
import { filterProducts } from "../actions/productActions";

import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt, FaShoppingBag, FaBox, FaAddressBook, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../styles/Header.scss";
import { logout } from "../actions/authActions";

const Header = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user); // Get user from Redux
  const cartItems = useSelector((state) => state.cart.cart);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const cartLength = typeof cartItems === "string" ? JSON.parse(cartItems).length : cartItems.length;
  const dropdownRef = useRef(null); // Reference for dropdown menu

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false); // Close dropdown after logout
    localStorage.clear();
    navigate("/login"); // Redirect to login
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(fetchCartProductsRequest()); // Fetch product details
    }
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(filterProducts(e.target.value)); // Dispatch filter action
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Close dropdown and navigate
  const handleNavigation = (path) => {
    setShowDropdown(false); // Close dropdown
    navigate(path); // Redirect to the page
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛒 MERN E-Shop</Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>

        {user ? (
          <input
            className="search-text"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
          />
        ) : (
          <></>
        )}

        <ul>
          {/* <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li> */}
          {/* {user ? ( */}
          <li><Link to="/cart" onClick={() => setMenuOpen(false)}>
            <FaShoppingCart className="shop-icon" />
            {(cartLength > 0 && user) && <span className="cart-count">{cartLength}</span>} Cart
          </Link></li>
          {/* ) : (
            <></>
          )} */}
        </ul>

        {/* User Section */}
        <div className="user-section">
          {user ? (
            <div className="profile-dropdown" ref={dropdownRef}>
              <button className="dropdown-btn" onClick={() => setShowDropdown(!showDropdown)}>
                <FaUser className="user-icon" />Hey  {user}{showDropdown ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleNavigation("/address")}><FaAddressBook /> My Addresses</li>
                  <li onClick={() => handleNavigation("/orders")}><FaBox /> My Orders</li>
                  <li onClick={handleLogout}><FaSignOutAlt />  Logout</li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
