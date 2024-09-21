import React, { useContext, useState } from "react";
import "./Login.css";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

export const Login = () => {
  const { setLoginForm,StaffLogin,loginForm, navigate } = useContext(AppContext);

  return (
    <div className="staff-login login-container">
      <div className="button-alignment">
        <button onClick={() => navigate("/adminlogin")}>Admin</button>
      </div>
      <div className="staff-login-container">
        <h1>Staff Login</h1>
        <form onSubmit={(e) => StaffLogin(e)} className="login-form">
          <div>
            <label htmlFor="employeeId">Employee Id:</label>
            <input
              type="text"
              name="employeeId"
              id="employeeId"
              onChange={(e) =>
                setLoginForm((l) => ({ ...l, employeeId: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) =>
                setLoginForm((al) => ({ ...al, password: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={loginForm.rememberMe}
              onChange={() => {
                setLoginForm((al) => ({
                  ...al,
                  rememberMe: !al.rememberMe,
                }));
              }}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <p>
          Don't have an Account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
