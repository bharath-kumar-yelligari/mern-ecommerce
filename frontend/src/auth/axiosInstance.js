import axios from "axios";

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
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Logging out...");
      localStorage.removeItem("token"); // Remove token if expired/invalid
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
