import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import "./Login.css";

function AdminLogin() {
  const { navigate, setAdminLoginForm, AdminLogin } = useContext(AppContext);
  return (
    <div className="admin-login login-container">
      <div className="button-alignment">
        <button onClick={() => navigate("/")}>Staff</button>
      </div>
      <div className="staff-login-container">
        <h1>Admin Login</h1>
        <form onSubmit={(e) => AdminLogin(e)} className="login-form">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) =>
                setAdminLoginForm((al) => ({ ...al, email: e.target.value }))
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
                setAdminLoginForm((al) => ({ ...al, password: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
