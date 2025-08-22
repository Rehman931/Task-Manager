import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import AddTask from './components/AddTask';
import MyTask from "./components/MyTask";
function App() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token"));

  // Update token if it's manually changed in other tabs
  useEffect(() => {
    const checkToken = () => {
      setJwtToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            jwtToken ? <Navigate to="/dashboard" replace /> : <LandingPage />
          }
        />
        <Route
          path="/login"
          element={
            jwtToken ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage setJwtToken={setJwtToken} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={jwtToken ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/signup"
          element={<SignupPage setJwtToken={setJwtToken} />}
        />
      </Routes>
    </Router>
  );
};

export default App

