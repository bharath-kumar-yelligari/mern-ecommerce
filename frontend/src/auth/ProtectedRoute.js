import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";
import { store } from "../store";
import { logoutRequest } from "../actions/authActions";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    localStorage.clear();
    store.dispatch(logoutRequest());
    window.location.href = "/login";
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
