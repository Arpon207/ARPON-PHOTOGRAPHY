import React from "react";
import "./SignUp.css";
import { useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth } from "./../../Firebase/Firebase.init";
import { FaGithub } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import formImage from "../../images/Form/Form-img-1.jpg";
import { motion } from "framer-motion";

const SignUp = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputError, setInputError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    generalError: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const [signInWithGithub] = useSignInWithGithub(auth);

  const [createUserWithEmailAndPassword, createdUser, loading, createdError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile] = useUpdateProfile(auth);

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const location = useLocation();

  console.log(location);

  const from = location.state?.from;

  const handleNameBlur = (e) => {
    if (/^[A-Za-z0-9]{4,12}$/.test(e.target.value)) {
      setUserInput({ ...userInput, name: e.target.value });
      setInputError({ ...inputError, nameError: "" });
    } else {
      setInputError({
        ...inputError,
        nameError:
          "your name should contain atleast 4 to 12 characters and should't include space or any special character.",
      });
      setUserInput({ ...userInput, name: "" });
    }
  };

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

  const handleConfirmPasswordBlur = (e) => {
    if (userInput.password === e.target.value) {
      setUserInput({ ...userInput, confirmPassword: e.target.value });
      setInputError({ ...inputError, confirmPasswordError: "" });
    } else {
      setInputError({
        ...inputError,
        confirmPasswordError: "Password did not match.",
      });
      setUserInput({ ...userInput, confirmPassword: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userInput.name === "" ||
      userInput.email === "" ||
      userInput.password === ""
    ) {
      if (
        inputError.nameError === "" ||
        inputError.emailError === "" ||
        inputError.passwordError === ""
      ) {
        setInputError({
          ...inputError,
          nameError: "Name is required",
          emailError: "Email is required",
          passwordError: "Password is required",
        });
      }
    }
    await createUserWithEmailAndPassword(userInput.email, userInput.password);
    await updateProfile({ displayName: userInput.name });
  };
  useEffect(() => {
    if (createdError?.code === "auth/email-already-in-use") {
      setInputError({
        ...inputError,
        emailError: "Provided Email is already used for another account",
      });
    }
  }, [createdError]);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
      window.scrollTo(0, 0);
    }
  }, [user]);

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
      <section className="signin-container sign-up">
        <div className="signin-card translate-right">
          <h1>Create Your Account</h1>
          <motion.form
            variants={formAnimate}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
          >
            <motion.div variants={formItemAnimate} className="input-box">
              <div className="input-wrapper">
                <input
                  onBlur={(e) => handleNameBlur(e)}
                  type="text"
                  name="name"
                  id="name"
                  required
                />
                <div className="underline"></div>
                <label htmlFor="name">User Name</label>
              </div>
            </motion.div>
            {inputError.nameError && (
              <p className="error-message">{inputError.nameError}</p>
            )}
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
            <motion.div variants={formItemAnimate} className="input-box">
              <div className="input-wrapper">
                <input
                  onBlur={(e) => handleConfirmPasswordBlur(e)}
                  type={passwordVisibility ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                />
                <div className="underline"></div>
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
            </motion.div>
            {inputError.confirmPasswordError && (
              <p className="error-message">{inputError.confirmPasswordError}</p>
            )}
            <motion.button
              variants={formItemAnimate}
              className="signin-btn"
              type="submit"
            >
              Sign Up
            </motion.button>
          </motion.form>
          <motion.p variants={formItemAnimate}>
            Have an account?{" "}
            <button onClick={() => navigate("/signin")} className="toggle-btn">
              Sign In
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
        <div>
          <motion.img
            src={formImage}
            alt=""
            initial={{
              x: "30vh",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              type: "tween",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default SignUp;
