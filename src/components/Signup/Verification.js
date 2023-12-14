import React, { useState, useRef, useEffect } from "react";
import "../Signin/Signin.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import Loading from "../Loading/Loading";

function Verification() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [status, setStatus] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  let username = location.state ? location.state.username : null;
  const [data, setData] = useState();
  const [isLoadingClear, setIsLoadingClear] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const [formData, setFormData] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  const inputRefs = {
    otp1: useRef(null),
    otp2: useRef(null),
    otp3: useRef(null),
    otp4: useRef(null),
    otp5: useRef(null),
    otp6: useRef(null),
  };

  const getNextInputName = (currentInputName) => {
    const keys = Object.keys(formData);
    const currentIndex = keys.indexOf(currentInputName);

    if (currentIndex < keys.length - 1) {
      return keys[currentIndex + 1];
    }

    return null;
  };

  const handleInputChange = (event, inputName) => {
    const { value } = event.target;

    if (value === "" && event.key === "Backspace") {
      const prevInputName = getNextInputName(inputName);
      if (prevInputName) {
        setFormData((prevData) => ({
          ...prevData,
          [inputName]: value,
        }));
        inputRefs[prevInputName].current.focus();
      }
    } else {
      const limitedValue = value.slice(0, 1);

      setFormData((prevData) => ({
        ...prevData,
        [inputName]: limitedValue,
      }));

      const nextInputName = getNextInputName(inputName);
      if (nextInputName !== null) {
        inputRefs[nextInputName].current.focus();
      }
    }
  };

  const handleSubmit = async (event) => {
    setOpen(false);
    setIsLoadingSubmit(true);
    event.preventDefault();

    const otp =
      formData.otp1 +
      formData.otp2 +
      formData.otp3 +
      formData.otp4 +
      formData.otp5 +
      formData.otp6;

    const dataResponse = await axios.post(
      "https://vibeconnect-backend.onrender.com/User-Data/data",
      { username }
    );

    try {
      const obj = { username, otp, email: dataResponse.data.email };

      const url =
        "https://vibeconnect-backend.onrender.com/User-Data/verifyOTP";

      const verificationResponse = await axios.post(url, obj);

      if (verificationResponse.status === 200) {
        setTitle("Sign Up Successful!!");
        setSubtitle("Redirecting to Login Page..");
        setStatus(true);
        setOpen(true);
        setIsLoadingSubmit(false);
        if (open === false) navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setTitle("Sign Up Error!!");
        setSubtitle(err.response.data);
        setStatus(false);
        setOpen(true);
        setIsLoadingSubmit(false);
      } else {
        setTitle("Sign Up Error!!");
        setSubtitle(err.message);
        setStatus(false);
        setOpen(true);
        setIsLoadingSubmit(false);
      }
    }
  };

  const handleClear = () => {
    setOpen(false);
    setIsLoadingClear(true);
    const firstInputName = Object.keys(formData)[0];
    const firstInputRef = inputRefs[firstInputName].current;

    const clearedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});

    setFormData(clearedFormData);

    if (firstInputRef) {
      firstInputRef.focus();
    }
  };

  const handleResend = async () => {
    setOpen(false);
    setIsLoadingResend(true);
    try {
      let obj = { username };
      const url = "https://vibeconnect-backend.onrender.com/User-Data/data";
      const response = await axios.post(url, obj);
      setData(response.data);
      console.log(data);

      const email = data.email;
      obj = { username, email };
      const resendUrl =
        "https://vibeconnect-backend.onrender.com/User-Data/resendOTPVerificationCode";
      const res = await axios.post(resendUrl, obj);

      if (res.status === 200) {
        setTitle("OTP Resent Successfully!!");
        setSubtitle("Enter the OTP to successfully Sign Up.");
        setStatus(false);
        setOpen(true);
        setIsLoadingResend(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setTitle("Sign Up Error!!");
        setSubtitle(error.response.data);
        setStatus(false);
        setOpen(true);
        setIsLoadingResend(false);
      } else {
        console.error("An error occurred:", error);
        setTitle("Sign Up Error!!");
        setSubtitle("An error occurred while resending OTP.");
        setStatus(false);
        setOpen(true);
        setIsLoadingResend(false);
      }
    }
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
      handleSubmit(event);
    }
  };

  return (
    <>
      <div className="signin-bg">
        <div className="signin-box">
          <h1 className="form">
            <div style={{ color: "#75006f" }}>
              <span>Enter OTP</span>
            </div>
          </h1>
          <h5 style={{ color: "red" }}>Enter the OTP sent to your email</h5>
          <br />
          <div>
            {Object.keys(formData).map((key, index) => (
              <React.Fragment key={key}>
                <input
                  ref={inputRefs[key]}
                  name={key}
                  type="number"
                  style={{
                    width: "40px",
                    height: "50px",
                    fontSize: "20px",
                    border: "2px solid #75006f",
                    outline: "none",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                  value={formData[key]}
                  onChange={(e) => handleInputChange(e, key)}
                  maxLength="1"
                />
                &nbsp;
              </React.Fragment>
            ))}
          </div>
          <br />
          {isLoadingClear ? (
            <Loading />
          ) : (
            <button
              className="signin-button"
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
          <br />
          {isLoadingSubmit ? (
            <Loading />
          ) : (
            <button
              className="signin-button"
              type="button"
              onKeyPress={handleKeyPress}
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
          <br />
          {isLoadingResend ? (
            <Loading />
          ) : (
            <button
              className="signin-button"
              type="button"
              onClick={handleResend}
            >
              Resend
            </button>
          )}
          <br />
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

export default Verification;
