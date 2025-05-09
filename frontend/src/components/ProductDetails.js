import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAddCartRequest } from "../actions/cartActions";
import { fetchProductDetailsRequest } from "../actions/productActions";
import "../styles/ProductDetails.scss";
import { FaShippingFast, FaArrowAltCircleDown, FaUndo } from "react-icons/fa";
import Footer from "./Footer";
import StarRating from "../utils/StarRating";
import Breadcrumbs from "../utils/BreadCrumbs";
import { FormatCurrency } from "../utils/FormatCurrency";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.selectedProduct);
  const [selectedImage, setSelectedImage] = useState("");

  const addToCart = (product) => {
    dispatch(fetchAddCartRequest(product));
  }

  useEffect(() => {
    dispatch(fetchProductDetailsRequest(id)); // Fetch product details
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setSelectedImage(selectedProduct.images[0]); // Default image
    }
  }, [selectedProduct]);


  if (!selectedProduct) return <h2>Loading...</h2>;

  return (
    <div className="product-details-container">
      <Breadcrumbs products={selectedProduct.title} />
      <div className="product-details">
        <div className="image-block">
          <div>
            {selectedImage && <img className="main-image" src={selectedImage} alt="thumbnail" />}
          </div>
          <div className="image-gallery">
            {selectedProduct?.images?.length > 0 ? (
              selectedProduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
        <div className="details-block">
          <h2 className="title">{selectedProduct.description}</h2>
          <p className="description">{selectedProduct.title}</p>
          <div className="details-rating-div"><p > {selectedProduct.rating}</p> <StarRating colorVal={selectedProduct.rating < 4 ? "orange" : "green"} rating={selectedProduct.rating} /> <p > {selectedProduct.ratingQuantity} Ratings</p> </div>

          <h3 className="price">₹{FormatCurrency(selectedProduct.price, "en-IN")}</h3>
          <div className="delivery-details">
            <div className="delivery-div"><p className="icon"><FaShippingFast /></p>  <p>Free Delivery</p></div>
            <div className="returns-div"> <p className="icon"><FaUndo /></p>    <p>7 Days Return Policy</p></div>
          </div>
          <button className="btn-large add-cart-btn" onClick={() => addToCart(selectedProduct)}>Add To Cart</button>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default ProductDetails;
