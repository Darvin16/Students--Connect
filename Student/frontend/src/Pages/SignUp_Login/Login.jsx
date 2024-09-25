import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import "./StudentLogin.css";

const Login = () => {
  const { setLoginForm, Login } = useContext(AppContext);
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>Student Login</h2>
          <form className="login-form" onSubmit={(e) => Login(e)}>
            <div className="login-input-container">
              <input
                type="text"
                placeholder="Student Id"
                className="login-input"
                name="studentId"
                id="studentId"
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    studentId: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="login-input-container">
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                name="password"
                id="password"
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="login-input-checkbox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                onChange={() => {
                  setLoginForm((prev) => ({
                    ...prev,
                    rememberMe: !prev.rememberMe,
                  }));
                }}
              />
              <label htmlFor="rememberMe">Remeber Me</label>
            </div>
            {/* <p className="forgot-password">Forgot password?</p> */}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>

          <p className="login-divider">Or Sign Up Using</p>

          <p className="signup-link">
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
