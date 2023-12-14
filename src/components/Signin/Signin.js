import React, { useState } from "react";
import "./Signin.css";
import Navbar1 from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import Loading from "../Loading/Loading";

function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [status, setStatus] = useState(true);
  const [data, setData] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true during the API request

    const url = "https://vibeconnect-backend.onrender.com/User-Data/login";
    const username = formData.username;

    try {
      const res = await axios.post(url, formData);

      if (res.status === 200) {
        const obj = { username };
        const url1 = "https://vibeconnect-backend.onrender.com/User-Data/data";
        const response = await axios.post(url1, obj);
        setData(response.data);

        if (response.data.verified === false) {
          setTitle("Verification Error");
          setSubtitle(
            "Your account is not verified. Please verify your account."
          );
          setStatus(true);
          setOpen(true);
          setIsLoading(false);
          return;
        }
      }

      navigate("/dashboard", { state: { username } });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setTitle("Sign Up Error!!");
        setSubtitle(err.response.data);
        setStatus(false);
        setOpen(true);
        setIsLoading(false);
      } else {
        setTitle("Sign Up Error!!");
        setSubtitle("An error occurred while signing in.");
        setStatus(false);
        setOpen(true);
        setIsLoading(false);
      }
    }

    setIsLoading(false); // Set loading to false after API request completes
  };

  const cancel = () => {
    setOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const verify = async () => {
    setOpen(false);
    setIsLoading(true);

    try {
      let obj = { username: formData.username };
      const url = "https://vibeconnect-backend.onrender.com/User-Data/data";
      const response = await axios.post(url, obj);
      setData(response.data);

      const verified = data.verified;

      if (verified !== true) {
        const username = data.username;
        const email = data.email;

        obj = { username, email };
        const resendUrl =
          "https://vibeconnect-backend.onrender.com/User-Data/resendOTPVerificationCode";
        const res = await axios.post(resendUrl, obj);

        if (res.status === 200) {
          setTitle("OTP Resent Successfully!!");
          setSubtitle("Enter the OTP to successfully Sign Up.");
          setStatus(true);
          setOpen(true);
          setIsLoading(false);

          navigate("/verification", { state: { username } });
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setTitle("Sign Up Error!!");
        setSubtitle(error.response.data);
        setStatus(false);
        setOpen(true);
        setIsLoading(false);
      } else {
        console.error("An error occurred:", error);
        setTitle("Sign Up Error!!");
        setSubtitle("An error occurred while resending OTP.");
        setStatus(false);
        setOpen(true);
        setIsLoading(false);
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="signin-bg">
        <br />
        <Navbar1 />
        <div className="signin-box">
          <h1 className="form">
            <div className="waviy" style={{ color: "#75006f" }}>
              <span style={{ "--i": 1 }}>L</span>
              <span style={{ "--i": 2 }}>o</span>
              <span style={{ "--i": 3 }}>g</span>
              &nbsp;
              <span style={{ "--i": 4 }}>i</span>
              <span style={{ "--i": 5 }}>n</span>
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
              <center
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <button
                    className="signin-button"
                    type="submit"
                    onKeyPress={handleKeyPress}
                  >
                    Log in
                  </button>
                )}
              </center>
              <div style={{ color: "black", fontSize: "20px" }}>
                <br />
                Forgot{" "}
                <a
                  href="/forgot-password"
                  style={{ color: "#75006f", textDecoration: "none" }}
                >
                  Password
                </a>
                ?
              </div>
              <div style={{ color: "black", fontSize: "20px" }}>
                New to website{" "}
                <a
                  href="/signup"
                  style={{ color: "#75006f", textDecoration: "none" }}
                >
                  Sign Up
                </a>{" "}
                Here
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
        deleteFunction={verify}
      />
    </>
  );
}

export default Signin;
