import React, { useEffect, useState } from "react";
import "./Signin.css";
import { BsGoogle } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { auth } from "./../../Firebase/Firebase.init";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import formImage from "../../images/Form/Form-img-2.jpg";
import { motion } from "framer-motion";
import PageTitle from "./../Shared/PageTitle/PageTitle";
import Loading from "../Loading/Loading";

const SignIn = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [inputError, setInputError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [user] = useAuthState(auth);

  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const [signInWithGithub] = useSignInWithGithub(auth);

  const [signInWithEmailAndPassword, user1, loading, error] =
    useSignInWithEmailAndPassword(auth);

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

  const handlePasswordBlur = (e) => {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value)) {
      setUserInput({ ...userInput, password: e.target.value });
      setInputError({ ...inputError, passwordError: "" });
    } else {
      setInputError({
        ...inputError,
        passwordError:
          "Password should contain minimum eight characters, at least one letter and one number.",
      });
      setUserInput({ ...userInput, password: "" });
    }
  };

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
    }

    signInWithEmailAndPassword(userInput.email, userInput.password);
  };

  useEffect(() => {
    if (
      error?.code === "auth/wrong-password" ||
      error?.code === "auth/user-not-found"
    ) {
      setInputError({
        ...inputError,
        passwordError: "Email or password wrong.",
      });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
      window.scrollTo(0, 0);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  const formAnimate = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const formItemAnimate = {
    hidden: {
      y: 10,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  };

  const socialAnimate = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const socialOptionAnimate = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  };

  return (
    <>
      <PageTitle title="Signin" />
      <section className="background">
        <div className="signin-container">
          <div>
            <motion.img
              src={formImage}
              alt=""
              initial={{
                x: "-30vh",
                opacity: 0,
              }}
              animate={{
                x: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                type: "tween",
              }}
            />
          </div>
          <div className="signin-card translate-left">
            <h1>Sign into your account</h1>
            <motion.form
              variants={formAnimate}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit}
            >
              <motion.div variants={formItemAnimate} className="input-box">
                <div className="input-wrapper">
                  <input
                    onBlur={(e) => handleEmailBlur(e)}
                    type="text"
                    name="email"
                    id="email"
                    required
                  />
                  <div className="underline"></div>
                  <label htmlFor="email">Email</label>
                </div>
              </motion.div>
              {inputError.emailError && (
                <p className="error-message">{inputError.emailError}</p>
              )}
              <motion.div variants={formItemAnimate} className="input-box">
                <div className="input-wrapper">
                  <input
                    onBlur={(e) => handlePasswordBlur(e)}
                    type={passwordVisibility ? "text" : "password"}
                    name="password"
                    id="password"
                    required
                  />
                  <div
                    className="visiblity-btn"
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                  >
                    {passwordVisibility ? (
                      <AiFillEye className="eye-icon" />
                    ) : (
                      <AiFillEyeInvisible className="eye-icon" />
                    )}
                  </div>
                  <div className="underline"></div>
                  <label htmlFor="password">Password</label>
                </div>
              </motion.div>
              {inputError.passwordError && (
                <p className="error-message">{inputError.passwordError}</p>
              )}
              <div className="form-btns">
                <motion.button
                  variants={formItemAnimate}
                  className="signin-btn"
                  type="submit"
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => navigate("/reset-password")}
                  variants={formItemAnimate}
                  className="reset-pass-btn"
                >
                  Forget your password?
                </motion.button>
              </div>
            </motion.form>
            <motion.p variants={formItemAnimate}>
              Don't have an account?{" "}
              <button
                className="toggle-btn"
                onClick={() =>
                  navigate("/signup", {
                    state: { from },
                  })
                }
              >
                Create an account
              </button>
            </motion.p>
            <div className="social-login">
              <div></div>
              <p>OR</p>
              <div></div>
            </div>
            <motion.div
              variants={socialAnimate}
              initial="hidden"
              animate="show"
              className="social-login-options"
            >
              <motion.button
                variants={socialOptionAnimate}
                onClick={() => signInWithGoogle()}
                className="login-btn"
              >
                <div className="icon-box">
                  <BsGoogle className="icon" />
                </div>
                <span>Google</span>
              </motion.button>
              <motion.button
                variants={socialOptionAnimate}
                onClick={() => signInWithGithub()}
                className="login-btn"
              >
                <div className="icon-box github">
                  <FaGithub className="icon" />
                </div>
                <span>Github</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
