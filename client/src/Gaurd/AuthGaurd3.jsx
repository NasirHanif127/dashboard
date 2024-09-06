import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
// Set baseURL based on environment variables
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";  // Fallback to localhost

// Function to verify the token
const verifyToken = async (token) => {
  try {
    let response = await axios.get("/api/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Store user data in session storage
    let user = JSON.stringify(response.data.user);
    sessionStorage.setItem("user", user);

    return response.data;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};

// AuthGuard component to protect routes
const AuthGuard = () => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      if (!token) {
        setIsLoading(false);
        return; // Redirect immediately if no token
      }

      try {
        await verifyToken(token);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication error:", error.message);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [token]);

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
