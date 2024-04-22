import { useState } from "react";
import Input from "./input.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "./validation.js";
import useInput from "./useInput.js";

///////////////////////////////////
/// PUTTING IT ALL TOGETHER //////
/////////////////////////////////

export default function ProfileEntry() {
  return (
    <main>
      <h1 className="login-welcome">Welcome, Pokemon Master!</h1>
      <form className="form auth-form">
        <input className="form-input" placeholder="Username" />
        <input className="form-input" placeholder="Password" />
        <div>
          <input type="checkbox" id="terms" name="terms" required />
          <label className="agree" htmlFor="terms">
            I agree to the terms and conditions
          </label>
        </div>
        <button className="form-btn">Need to register</button>
      </form>
      <div className="container">
        <button className="form-btn">Log In</button>
      </div>
    </main>
  );
}
