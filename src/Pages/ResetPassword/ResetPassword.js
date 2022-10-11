import React, { useState } from "react";
import "./ResetPassword.css";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "./../../Firebase/Firebase.init";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [userInput, setUserInput] = useState({
    email: "",
  });

  const [inputError, setInputError] = useState({
    emailError: "",
  });

  const handleEmailBlur = (e) => {
    if (
      /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/.test(
        e.target.value
      )
    ) {
      setUserInput({ ...userInput, email: e.target.value });
      setInputError({ ...inputError, emailError: "" });
    } else {
      setInputError({ ...inputError, emailError: "Invalid Email" });
      setUserInput({ ...userInput, email: "" });
    }
  };

  const toastSuccess = () =>
    toast.success(
      "An e-mail has been sent with the URL for re-issuing your password.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

  const toastError = () =>
    toast.success(
      "User not found. Please enter your registered e-mail address.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput.email === "" || userInput.password === "") {
      if (inputError.emailError === "" || inputError.passwordError === "") {
        setInputError({
          ...inputError,
          nameError: "Name is required",
          emailError: "Email is required",
          passwordError: "Password is required",
        });
      }
    } else {
      sendPasswordResetEmail(auth, userInput.email)
        .then(() => {
          toastSuccess();
        })
        .catch(() => {
          toastError();
        });
    }
  };
  return (
    <>
      <section>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="password-reset-container">
          <div className="password-reset-card">
            <h1>Reset your password</h1>
            <p>
              Enter your user account's verified email address and we will send
              you a password reset link.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="reset-input-box">
                <label htmlFor="email">Your Email</label>
                <div className="reset-input-wrapper">
                  <input
                    onBlur={(e) => handleEmailBlur(e)}
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
              </div>
              {inputError.emailError && (
                <p className="error-message">{inputError.emailError}</p>
              )}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
