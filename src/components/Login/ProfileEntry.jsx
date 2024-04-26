import { useState, useContext, createContext } from "react";
import axios from "axios"; // installed axios already
const AuthContext = createContext();

export default function ProfileEntry() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  // const { dispatch } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    let body = { username, password };
  };

  return (
    <main>
      <h1 className="login-welcome">Welcome, Pokemon Master!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <input type="checkbox" id="terms" name="terms" required />
          <label className="agree" htmlFor="terms">
            I agree to the terms and conditions
          </label>
        </div>
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <div className="container">
        <button className="form-btn" onClick={() => setRegister(!register)}>
          Need to {register ? "Login" : "Sign Up"}?
        </button>
      </div>
    </main>
  );
}
