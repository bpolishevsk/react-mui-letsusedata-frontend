import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/fields/InputField";
import { MODEL_API_URL } from "../../../Global";
import { Container } from "react-bootstrap";
import LogoInline from "../../../assets/images/logo-white.svg";
import Icons from "../../../assets/icons";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const sendMessage = () => {
    const data = {
      registerEmail: email,
    };
    if (validateFields()) {
      fetch(`${MODEL_API_URL}ForgetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log("Success: ", jsonResponse);
          const error = jsonResponse.error;
          if (error === "The email address that you have, doesn't match with any registered email.") {
            setEmailError("Invalid Email");
          }
        })
        .catch((error) => console.log("Error: ", error));
    }
  };
  const validateFields = () => {
    let is_valid = true;
    const reg = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!email) {
      setEmailError("Email cannot be empty");
      is_valid = false;
    } else if (!reg.test(email)) {
      setEmailError("Invalid Email");
      is_valid = false;
    } else setEmailError("");
    return is_valid;
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-background"></div>
      <div className="page-auth-container">
        <Container className="auth-dialog-container">
          <div
            className="form-authentication-wrapper"
            style={{
              top: 20,
            }}
          >
            <div>
              <h2 className="text-uppercase font-28">FORGOT PASSWORD ?</h2>
              <p className="text-cus-secondary font-18">
                Enter your registered email address. We'll send you a email with a new autogenerated password
              </p>
            </div>
            <div className="mb-3">
              <InputField
                type="email"
                placeholder="Email Address"
                LeftIcon={Icons.Auth.Inbox}
                error={emailError}
                className="py-44"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between pt-4">
              <button className="btn-cus-primary w-100" onClick={sendMessage}>
                SUBMIT REQUEST
              </button>
            </div>
          </div>

          <div className="page-info-section py-3">
            <div className="back-login">
              <img src={LogoInline} alt="logo" className="logo-image" />
            </div>
            <div className="mb-5">
              <h3 className="font-24 text-white mb-2">Received your password ?</h3>
              <p className="font-18 text-cus-secondary">
                Go back to the login screen and enter your user name and new password
              </p>
            </div>
            <div className="wide-btn-group gap-4">
              <Link to="/login" className="btn-auth-secondary px-5">
                LOGIN
              </Link>
              <Link to="/contactus" className="auth-link-secondary login">
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ForgotPassword;
