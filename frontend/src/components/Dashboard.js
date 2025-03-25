import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../actions/productActions";
import { fetchAddCartRequest } from "../actions/cartActions";
import { FaStar } from "react-icons/fa"; // Star icons
import "../styles/Dashboard.scss";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Breadcrumbs from "../utils/BreadCrumbs";
import { FormatCurrency } from "../utils/FormatCurrency";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { filteredProducts, loading, error } = useSelector((state) => state.products);
    const [sortOption, setSortOption] = useState("low-to-high");

    const addToCart = (product) => {
        dispatch(fetchAddCartRequest(product));
    }

    useEffect(() => {
        let sortOptions = (sortOption === "low-to-high") ? { sort: "price", order: "asc" } : (sortOption === "high-to-low") ? { sort: "price", order: "desc" } : { sort: "rating", order: "desc" };
        dispatch(fetchProductsRequest(sortOptions.sort, sortOptions.order)); // Fetch products when dashboard loads
    }, [dispatch, sortOption]);

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOption(value)
    };

    return (
        <div className="main-dashboard-container">
            <Breadcrumbs />
            <div className="dashboard-container">
                <div className="products-header-div">
                    <h2>Products</h2>
                    <select onChange={handleSortChange} value={sortOption}>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                        <option value="popular">Most Popular</option>
                    </select>
                </div>
                {loading && <p>Loading products...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="product-list">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product._id} className="product-card">
                                <Link to={`/product/${product._id}`}>
                                    <img src={product.thumbnail} className="product-image" alt="thumbnail" />
                                </Link>
                                <h2 className="product-title">{product.title}</h2>
                                <div className="rating-div" style={{ backgroundColor: (product.rating < 4) ? "orange" : "green" }}><p>{product.rating}</p><FaStar /></div>
                                <p className="product-brand">{product.brand}</p>
                                <div className="price-cart">
                                    <p> ₹{FormatCurrency(product.price, "en-IN")}</p>
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
