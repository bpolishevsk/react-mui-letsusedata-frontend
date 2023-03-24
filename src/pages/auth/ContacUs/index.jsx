import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/fields/InputField";
import { MODEL_API_URL } from "../../../Global";
import Icons from "../../../assets/icons";
import LogoInline from "../../../assets/images/logo-white.svg";
import TextareaField from "../../../components/fields/TextareaField";
import { toast } from "../../../libs";
import { Container } from "react-bootstrap";
function ContactUs({ hideLogin }) {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const sendMessage = () => {
    const data = {
      SenderName: username,
      SenderEmail: email,
      Message: message,
    };
    if (validateFields()) {
      fetch(`${MODEL_API_URL}ContactUs`, {
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
          if (error === "Sorry! Your Email address is not valid. Please provide a valid email address.") {
            setUsernameError("");
            setEmailError("Invalid Email");
            return;
          }
          if (error === "Sorry! The Name field cannot be left blank.") {
            setUsernameError("Name field cannot be empty");
            setEmailError("");
            return;
          }
          if (error.length > 0) {
            toast.error(error);
          }
          if (jsonResponse.success === "Your Message has been sent successfully.") {
            setUsername("");
            setEmail("");
            setMessage("");
            setUsernameError("");
            setEmailError("");
            setMessageError("");
            setMessageSent(true);
          }
        })
        .catch((error) => console.log("Error: ", error));
    }
  };
  const validateFields = () => {
    let is_valid = true;
    const reg = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!username) {
      setUsernameError("Name field cannot be empty");
      is_valid = false;
    } else setUsernameError("");
    if (!email) {
      setEmailError("Email field cannot be empty");
      is_valid = false;
    } else if (!reg.test(email)) {
      setEmailError("Invalid Email");
      is_valid = false;
    } else setEmailError("");
    if (!message) {
      setMessageError("Message field cannot be empty");
      is_valid = false;
    } else setMessageError("");
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
              top: -90,
            }}
          >
            <div>
              <h2 className="text-uppercase font-28">Contact Form</h2>
            </div>
            <div className="mb-3">
              <InputField
                type="text"
                placeholder="Name"
                LeftIcon={Icons.Auth.UserOutlined}
                error={usernameError}
                className="py-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                type="email"
                placeholder="Email"
                LeftIcon={Icons.Auth.Inbox}
                error={emailError}
                className="pt-3 pb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pt-3 pb-2 ps-1">
                <Icons.Message
                  style={{
                    color: "#D1D1D1",
                    width: "1.125rem",
                    height: "1.125rem",
                  }}
                />
                <span
                  className="ps-2"
                  style={{
                    fontWeight: 500,
                    color: "#D0D0D0",
                  }}
                >
                  Message
                </span>
              </div>
              <TextareaField
                className="textarea-cus mt-2"
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={messageError}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <button className="btn-cus-primary w-100" onClick={sendMessage}>
                Send Message
              </button>
            </div>
            {messageSent && (
              <div className="d-flex align-items-center mt-4 message-sent">
                <Icons.Success />
                <span className="ps-2">Message sent</span>
              </div>
            )}
          </div>
          <div className="page-info-section py-3">
            <div className="back-login">
              <img src={LogoInline} alt="logo" className="logo-image" />
            </div>
            <div className="mb-5">
              <h3 className="font-24 text-white mb-2">Get in touch!</h3>
              <p className="font-20 text-cus-secondary">Fill the form or send as an email</p>
            </div>
            <div className="wide-btn-group gap-4 pt-4">
              <Link
                to="#"
                onClick={(e) => {
                  window.location.href = "mailto:help@letsusedata.com";
                  e.preventDefault();
                }}
                className="btn-auth-secondary px-5"
              >
                Email US
              </Link>
              {!hideLogin && (
                <Link to="/login" className="auth-link-secondary login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

ContactUs.defaultProps = {
  hideLogin: false,
};

export default ContactUs;
