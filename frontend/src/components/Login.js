import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import '../styles/Login.scss';
import Footer from "./Footer";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigation
    const { loading, error } = useSelector(state => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginRequest(email, password, navigate));
    };

    return (
        <div className="login-main-container">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit"> {loading ? "Logging in..." : "Login"}</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>

            <Footer />
        </div>

    );
};

export default Login;


