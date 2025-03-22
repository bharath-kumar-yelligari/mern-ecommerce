import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../actions/productActions";
import { fetchAddCartRequest } from "../actions/cartActions";

import "../styles/Dashboard.scss";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products, filteredProducts, loading, error } = useSelector((state) => state.products);

    const addToCart = (product) => {
        dispatch(fetchAddCartRequest(product));
    }

    useEffect(() => {
        dispatch(fetchProductsRequest()); // Fetch products when dashboard loads
    }, [dispatch]);

    return (
        <div className="main-dashboard-container">
            <div className="dashboard-container">
                <h2>Products</h2>
                {loading && <p>Loading products...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="product-list">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product._id} className="product-card">

                                <Link to={`/product/${product._id}`}>
                                    <img src={product.thumbnail} className="product-image" alt="thumbnail" />
                                </Link>
                                {/* <img src={product.thumbnail} className="product-image" alt="thumbnail" /> */}
                                <h2 className="product-title">{product.title}</h2>
                                <p className="product-brand">{product.brand}</p>
                                <div className="price-cart">
                                    <p> ₹{product.price}</p>
                                    <button className="add-cart-btn" onClick={() => addToCart(product)}>Add To Cart</button>
                                </div>
                            </div>
                        ))) : (
                        <p className="empty-page-msg">No products found.</p>
                    )
                    }
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default Dashboard;
