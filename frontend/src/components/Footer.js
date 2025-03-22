import React from "react";
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-main-div">
        <div className="main-row">
          <div className="about-us">
            <h3 >About Us</h3>
            <p className="text-gray-400">
              We provide the best products at affordable prices. Your satisfaction is our priority!
            </p>
          </div>
          <div className="quick-links">
            <h3 >Quick Links</h3>
            <ul className="links-div">
              <li><a href="/products" >Products</a></li>
              <li><a href="/cart" >Cart</a></li>
              <li><a href="/orders" >Orders</a></li>
              <li><a href="/contact" >Contact Us</a></li>
            </ul>
          </div>

          <div className="social-media-links">
            <h3 >Follow Us</h3>
            <div className="links-div">
              <a href="#" >🌐 Facebook</a>
              <a href="#" >📸 Instagram</a>
              <a href="#" >🐦 Twitter</a>
            </div>
          </div>
        </div>

        <div className="copyrights-class">
          © {new Date().getFullYear()} MyShop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
