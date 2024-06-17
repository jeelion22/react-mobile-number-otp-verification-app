import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function App() {
  const [otp, setOtp] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [value, setValue] = useState();

  const [showOtp, setShowOtp] = useState(false);
  const [showPhone, setShowPhone] = useState(true);

  return (
    <div className="container vh-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col bg-primary bg-opacity-50  text-center p-2 rounded">
          <h1 className="text-white mt-2 mb-6 ">
            Welcome to <br /> CODE A PROGRAM
          </h1>

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
              <button className="btn btn-primary mb-4 ">
                Send code via SMS
              </button>
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
                <button class="btn btn-dark " type="button">
                  {spinner && (
                    <span
                      class="spinner-grow spinner-grow-sm me-2"
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
