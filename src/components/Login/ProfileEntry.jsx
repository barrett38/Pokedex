import { useState } from "react";
import Input from "./input.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "./validation.js";
import useInput from "./useInput.js";

////////////////////////
/// SIGNUP FUNCTION ///
//////////////////////

function Signup() {
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries()); // returns object
    data.acquisition = acquisitionChannel;

    if (data.password !== data["confirm-password"]) {
      setPasswordsAreNotEqual(true);
      return;
    }

    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="login-welcome">Welcome, Pokemon Master!</h2>
      <p className="titles">Sign up here or Log in below!</p>

      {/* Signup Full name info */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First & Last Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>
      </div>

      {/* Signup Email entry */}
      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="signup-email" type="email" name="email" required />
      </div>

      {/* Set Password */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="signup-password"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </div>

        {/* Confirm Password */}
        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          <div className="control-error">
            {passwordsAreNotEqual && <p>Passwords must match</p>}
          </div>
        </div>

        {/* Terms and conditions */}
        <div className="control">
          <label htmlFor="terms-and-conditions">
            <input
              type="checkbox"
              id="terms-and-conditions"
              name="terms"
              required
            />
            I agree to the terms and conditions
          </label>
        </div>
      </div>

      {/* Reset and Submit buttons */}
      <p className="control">
        <button className="button" type="submit">
          SIGN UP
        </button>
      </p>
    </form>
  );
}

///////////////////////
/// LOGIN FUNCTION ///
/////////////////////

function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="titles">Login</h2>

      {/* Login Email */}
      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a valid email address..."}
        />

        {/* Login Email */}
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && "Password must be 6 characters long"}
        />
      </div>

      {/* Login Button */}
      <p className="control">
        <button className="button">LOGIN</button>
      </p>
    </form>
  );
}

///////////////////////////////////
/// PUTTING IT ALL TOGETHER //////
/////////////////////////////////

export default function ProfileEntry() {
  return (
    <>
      <Signup />
      <hr style={{ borderColor: "#ffca99" }} />
      <Login />
    </>
  );
}
