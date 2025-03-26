import axios from "axios";
import { toast } from "react-toastify";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Change this to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle token expiration or errors
api.interceptors.response.use(
  (response) => response, // If the response is fine, just return it
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error("Unauthorized! Logging out...");
      localStorage.clear(); // Remove token if expired/invalid
      toast.error("🎉 Unauthorized! Logging out...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setTimeout(() => {
        window.location.href = "/login"; 
      }, 1000);
      //navigate("/login"); // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
