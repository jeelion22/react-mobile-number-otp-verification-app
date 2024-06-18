import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function App() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const [user, setUser] = useState(null);

  const [showOtp, setShowOtp] = useState(false);
  const [showPhone, setShowPhone] = useState(true);
  const [error, setError] = useState("");

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            onSignup();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            setError("reCAPTCHA expired. Please try again.");
          },
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    setError("");
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPhone = "+" + value;

    signInWithPhoneNumber(auth, formatPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowPhone(false);
        setShowOtp(true);
      })
      .catch((error) => {
        console.log("Error during signInWithPhoneNumber:", error);
        setError("Failed to send OTP Input. Please try again later");
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    setError("");
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res.user);
        setUser(res.user);
        setLoading(false);
        setShowOtp(false);
        setShowPhone(false);
      })
      .catch((error) => {
        console.log("Error during OTP verification:", error);
        setError("Invalid OTP. Please try again.");
        setLoading(false);
      });
  }
  return (
    <div className="container vh-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col bg-primary bg-opacity-50  text-center p-2 rounded">
          <h1 className="text-white mt-2 mb-6 ">
            Welcome to <br /> CODE A PROGRAM
          </h1>

          <div id="recaptcha-container"></div>

          {error && <p className="text-danger">{error}</p>}

          {user && <h2 className="text-center text-white ">👍Login Success</h2>}

          {showPhone && (
            <>
              {" "}
              <div>
                <FontAwesomeIcon
                  icon={faPhone}
                  size="2x"
                  className=" bg-light border rounded-circle p-4 mt-4"
                />
              </div>
              <label htmlFor="otp" className="fs-3 text-white mt-3">
                Verify your phone number
              </label>
              <div className="m-4   d-flex justify-content-center text-center">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={value}
                  onChange={setValue}
                />
              </div>
              <button
                className="btn btn-dark "
                type="button"
                onClick={onSignup}
              >
                {loading && (
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}{" "}
                <span role="status">Send OTP via SMS</span>
              </button>{" "}
            </>
          )}

          {showOtp && (
            <>
              <div>
                <FontAwesomeIcon
                  icon={faLock}
                  size="2x"
                  className=" bg-light  border rounded-circle p-4"
                />
              </div>

              <div>
                <label htmlFor="otp" className="fs-3 text-white">
                  Enter Your OTP
                </label>
                <div className="m-4  p-2  d-flex justify-content-center fs-3">
                  <OtpInput
                    inputStyle={{ width: "45px" }}
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <button
                  className="btn btn-dark "
                  type="button"
                  onClick={onOTPVerify}
                >
                  {loading && (
                    <span
                      className="spinner-grow spinner-grow-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}{" "}
                  <span role="status">Verify OTP</span>
                </button>{" "}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
