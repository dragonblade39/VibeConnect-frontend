import React, { useState } from "react";
import "../Signin/Signin.css";
import "./ForgotPassword.css";
import Navbar1 from "../Navbar/Navbar";
import Modal from "../Signup/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    setOpen(false);
    setIsLoading(true);
    event.preventDefault();
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setTitle("Sign Up Error!!");
      setSubtitle("Invalid email syntax..");
      setStatus(false);
      setOpen(true);
      setIsLoading(false);
      console.log("Invalid email syntax");
      return;
    }
    if (formData.password.length < 8) {
      setTitle("Sign Up Error!!");
      setSubtitle("Password must be at least 8 characters long..");
      setStatus(false);
      setOpen(true);
      setIsLoading(false);
      console.log("Password must be at least 8 characters long");
      return;
    }
    const lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(formData.password)) {
      setTitle("Sign Up Error!!");
      setSubtitle("Password must contain at least one lowercase letter..");
      setStatus(false);
      setOpen(true);
      setIsLoading(false);
      console.log("Password must contain at least one lowercase letter");
      return;
    }

    const digitRegex = /\d/;
    if (!digitRegex.test(formData.password)) {
      setTitle("Sign Up Error!!");
      setSubtitle("Password must contain at least one digit..");
      setStatus(false);
      setOpen(true);
      setIsLoading(false);
      console.log("Password must contain at least one digit");
      return;
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(formData.password)) {
      setTitle("Sign Up Error!!");
      setSubtitle("Password must contain at least one special character..");
      setStatus(false);
      setOpen(true);
      setIsLoading(false);
      console.log("Password must contain at least one special character");
      return;
    }

    const url =
      "https://vibeconnect-backend.onrender.com/User-Data/forgotPassword";

    axios
      .post(url, formData)
      .then((res) => {
        if (res.status === 200) {
          setTitle("OTP sent to your Email!!");
          setSubtitle("Enter the OTP to complete Signup..");
          setStatus(true);
          setOpen(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setTitle("Sign Up Error!!");
          setSubtitle(err.response.data);
          setStatus(false);
          setOpen(true);
          setIsLoading(false);
          // alert(err.response.data); // Display the response data from the server
        } else {
          setTitle("Sign Up Error!!");
          setSubtitle(err.response.data);
          setStatus(false);
          setOpen(true);
          setIsLoading(false);
          // alert("An error occurred: " + err.message);
        }
      });
    console.log(formData);
  };

  const cont = () => {
    if (status === true) {
      console.log(formData);
      navigate("/verificationForPassword", {
        state: { username: formData.username, password: formData.password },
      });
    }
    setOpen(false);
  };

  const cancel = () => {
    setOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <>
      <div className="signin-bg">
        <br />
        <Navbar1 />
        <div className="signin-box">
          <h1 className="form">
            <div className="waviy" style={{ color: "#75006f" }}>
              <span style={{ "--i": 1 }}>F</span>
              <span style={{ "--i": 2 }}>o</span>
              <span style={{ "--i": 3 }}>r</span>
              <span style={{ "--i": 4 }}>g</span>
              <span style={{ "--i": 5 }}>o</span>
              <span style={{ "--i": 6 }}>t</span>
              &nbsp;
              <span style={{ "--i": 7 }}>p</span>
              <span style={{ "--i": 8 }}>a</span>
              <span style={{ "--i": 9 }}>s</span>
              <span style={{ "--i": 10 }}>s</span>
              <span style={{ "--i": 11 }}>w</span>
              <span style={{ "--i": 12 }}>o</span>
              <span style={{ "--i": 13 }}>r</span>
              <span style={{ "--i": 14 }}>d</span>
            </div>
          </h1>
          <div className="line"></div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="signin-inputbox">
              <input
                className="signin-input"
                type="text"
                required="required"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <span>Username</span>
            </div>
            <br />
            <div className="signin-inputbox">
              <input
                className="signin-input"
                type="text"
                required="required"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span>Email</span>
            </div>
            <br />
            <div className="signin-inputbox">
              <input
                className="signin-input"
                type="password"
                required="required"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span>Password</span>
            </div>
            <br />
            <center>
              {isLoading ? (
                <Loading />
              ) : (
                <button className="signin-button" onKeyPress={handleKeyPress}>
                  Continue
                </button>
              )}

              <div style={{ color: "black", fontSize: "20px" }}>
                <br />
                Go to{" "}
                <a
                  href="/"
                  style={{ color: "#75006f", textDecoration: "none" }}
                >
                  Login
                </a>{" "}
                Page
              </div>
            </center>
          </form>
        </div>
      </div>
      <Modal
        open={open}
        closeDialog={cancel}
        title={title}
        subtitle={subtitle}
        deleteFunction={cont}
      />
    </>
  );
}

export default ForgotPassword;
