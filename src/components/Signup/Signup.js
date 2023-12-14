// Signup.js
import React, { useState } from "react";
import "../Signin/Signin.css";
import "./Signup.css";
import Navbar1 from "../Navbar/Navbar";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpass: "",
  });
  const [username, setUsername] = useState();

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "username") {
      handleUsernameChange(value);
    }
  };

  const handleFormSubmit = (event) => {
    setOpen(false);
    setIsLoading(true);
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
    const nameRegex = /^[^\d]+$/;
    if (!nameRegex.test(formData.name)) {
      setTitle("Sign Up Error!!");
      setSubtitle("Name cannot contain numbers");
      setStatus(false);
      setOpen(true);
      setIsLoading(false);
      console.log("Name cannot contain numbers");
      return;
    }
    if (formData.password !== formData.cpass) {
      setTitle("Sign Up Error!!");
      setSubtitle("Passwords not matched");
      setStatus(false);
      setOpen(true);
      setIsLoading(false);
      console.log("Passwords not matched");
      return;
    }

    // const url = "https://music-backend-kinl.onrender.com/Signup-Login/create";
    const url = "https://vibeconnect-backend.onrender.com/User-Data/create";

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
  };

  const cont = () => {
    if (status === true) {
      console.log(formData);
      navigate("/verification", { state: { username } });
    }
    setOpen(false);
  };

  const cancel = () => {
    setOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleFormSubmit(event);
    }
  };

  return (
    <>
      <div className="signin-bg">
        <br />
        <Navbar1 />
        <div className="signup-box">
          <h1 className="form">
            <div className="waviy" style={{ color: "#75006f" }}>
              <span style={{ "--i": 1 }}>S</span>
              <span style={{ "--i": 2 }}>i</span>
              <span style={{ "--i": 3 }}>g</span>
              <span style={{ "--i": 4 }}>n</span>
              &nbsp;
              <span style={{ "--i": 5 }}>U</span>
              <span style={{ "--i": 6 }}>p</span>
            </div>
          </h1>
          <div className="line"></div>
          <br />
          <form onSubmit={handleFormSubmit} onKeyPress={handleKeyPress}>
            <div className="signin-inputbox">
              <input
                className="signin-input"
                type="text"
                name="name"
                required="required"
                value={formData.name}
                onChange={handleInputChange}
              />
              <span>Name</span>
            </div>
            <br />
            <div className="signin-inputbox">
              <input
                className="signin-input"
                type="text"
                name="username"
                required="required"
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
                name="email"
                required="required"
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
                name="password"
                required="required"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span>Password</span>
            </div>
            <br />
            <div className="signin-inputbox">
              <input
                className="signin-input"
                type="password"
                name="cpass"
                required="required"
                value={formData.cpass}
                onChange={handleInputChange}
              />
              <span>Confirm Password</span>
            </div>
            <br />
            <center>
              {isLoading ? (
                <Loading />
              ) : (
                <button
                  className="signin-button"
                  type="submit"
                  onKeyPress={handleKeyPress}
                >
                  Sign Up
                </button>
              )}
            </center>
          </form>
          <br />
          <div style={{ color: "black", fontSize: "20px" }}>
            Having an account already?{" "}
            <a href="/" style={{ color: "#75006f", textDecoration: "none" }}>
              Log in
            </a>{" "}
            Here
          </div>
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

export default Signup;
