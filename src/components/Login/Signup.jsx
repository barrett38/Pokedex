import { useState } from "react";
import Login from "./StateLogin.jsx";

export default function Signup() {
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
    <>
      <form onSubmit={handleSubmit}>
        <h2>Welcome, Pokemon Master!</h2>
        <p>Sign up here of Log in below!</p>
        {/* Signup section */}
        <div className="control-row">
          <div className="control">
            <label htmlFor="first-name">First & Last Name</label>
            <input type="text" id="first-name" name="first-name" required />
          </div>
        </div>
        <div className="control">
          <label htmlFor="email">Email</label>
          <input id="signup-email" type="email" name="email" required />
        </div>
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
        <p className="form-actions">
          <button type="reset" className="button button-flat">
            Reset
          </button>
          <button type="submit" className="button">
            Sign up
          </button>
        </p>
      </form>
      <Login />;
    </>
  );
}
