import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { toast, axios } from "../../../libs";
import OlsLoader from "../../../components/loader/ols/index";
import InputField from "../../../components/fields/InputField";
import Icons from "../../../assets/icons";
import LogoInline from "../../../assets/images/logo-white.svg";

const defaultForm = {
  Name: "",
  Email: "",
  SchoolName: "",
  CourseName: "",
};

const defaultError = {
  Name: "",
  Email: "",
  SchoolName: "",
  CourseName: "",
};

function RequestLogin() {
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState(defaultError);

  const submitRequestLogin = () => {
    setLoading(true);
    if (validateFields()) {
      axios
        .post(`/StudentRequestLogin`, form)
        .then((response) => {
          if (response.Success) {
            toast.success(response.Message);
          } else {
            toast.error(response.Message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Unknown error was occured");
        })
        .then(() => setLoading(false));
    }
  };

  const validateFields = () => {
    let is_valid = true;
    const reg = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!form.SchoolName) {
      setError({ ...error, SchoolName: "School name cannot be empty" });
      is_valid = false;
    } else setError({ ...error, SchoolName: "" });
    if (!form.CourseName) {
      setError({ ...error, CourseName: "Course name cannot be empty" });
      is_valid = false;
    } else setError({ ...error, CourseName: "" });

    if (!form.Name) {
      setError({ ...error, Name: "Name cannot be empty" });
      is_valid = false;
    } else setError({ ...error, Name: "" });

    if (!form.Email) {
      setError({ ...error, Email: "Email cannot be empty" });
      is_valid = false;
    } else setError({ ...error, Email: "" });

    if (!reg.test(form.Email)) {
      setError({ ...error, Email: "Invalid Email" });
      is_valid = false;
    } else setError({ ...error, Email: "" });

    return is_valid;
  };

  return (
    <div className="auth-wrapper">
      {isLoading && <OlsLoader></OlsLoader>}
      <div className="auth-background"></div>
      <div className="page-auth-container">
        <Container className="auth-dialog-container">
          <div
            className="form-authentication-wrapper"
            style={{
              top: -95,
            }}
          >
            <div>
              <h2 className="text-uppercase font-28 font-500">REQUEST ACCOUNT</h2>
              <p className="auth-subheader font-18 font-500">Enter your information</p>
            </div>
            <div className="mb-3">
              <InputField
                type="text"
                placeholder="School Name"
                LeftIcon={Icons.Home}
                error={error.SchoolName}
                className="py-3"
                value={form.SchoolName}
                onChange={(e) => {
                  setForm({ ...form, SchoolName: e.target.value });
                }}
              />
              <InputField
                type="text"
                placeholder="Course Name"
                LeftIcon={Icons.NumbericalStar}
                error={error.CourseName}
                className="py-3"
                value={form.CourseName}
                onChange={(e) => {
                  setForm({ ...form, CourseName: e.target.value });
                }}
              />
              <InputField
                type="text"
                placeholder="Full Name"
                LeftIcon={Icons.Auth.User}
                error={error.Name}
                className="py-3"
                value={form.Name}
                onChange={(e) => {
                  setForm({ ...form, Name: e.target.value });
                }}
              />
              <InputField
                type="email"
                placeholder="Email"
                LeftIcon={Icons.Auth.Inbox}
                error={error.Email}
                className="py-3"
                value={form.Email}
                onChange={(e) => {
                  setForm({ ...form, Email: e.target.value });
                }}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between pt-4">
              <button className="btn-cus-primary w-100" onClick={submitRequestLogin}>
                SUBMIT REQUEST
              </button>
            </div>
          </div>

          <div className="page-info-section py-3">
            <div className="back-login">
              <img src={LogoInline} alt="logo" className="logo-image" />
            </div>
            <div className="mb-5">
              <h3 className="font-24 text-white mb-2">Already have an account ?</h3>
              <p className="font-18 text-cus-secondary">
                Go back to the login screen and enter your username with password
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

export default RequestLogin;
