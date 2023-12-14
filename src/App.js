// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./components/Signin/Signin";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/Forgot Password/ForgotPassword";
import { UserProvider } from "./UserContext";
import Verification from "./components/Signup/Verification";
import Home from "./components/Home/Home";
import VerificationForPassword from "./components/Forgot Password/VerificationForPassword";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/dashboard" element={<Home />} />
          <Route
            path="/verificationForPassword"
            element={<VerificationForPassword />}
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
