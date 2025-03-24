import React, { useState } from "react";
import "../styles/CheckoutPage.scss";
import CartPage from "../components/CartPage.js";
import Accordion from "../utils/Accordion.js";
import Breadcrumbs from "../utils/BreadCrumbs.js";

const CheckoutPage = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default open first section

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="checkoutPage-main-container">
      <Breadcrumbs />
      <div className="checkout-main-page">
        <div className="toggle-details">
          <Accordion
            title="Shipping Address"
            isOpen={openIndex === 0}
            toggle={() => toggleAccordion(0)}
          >
          </Accordion>

          <Accordion
            title="Shipping Method"
            isOpen={openIndex === 1}
            toggle={() => toggleAccordion(1)}
          >
            <p>Standard Shipping - 5 to 7 Business Days</p>
          </Accordion>

          <Accordion
            title="Payment Method"
            isOpen={openIndex === 2}
            toggle={() => toggleAccordion(2)}
          >
            <p>Credit Card / PayPal</p>
          </Accordion>
        </div>

        <div className="order-summary">

        </div>

      </div>

    </div>
  );
};

export default CheckoutPage;
