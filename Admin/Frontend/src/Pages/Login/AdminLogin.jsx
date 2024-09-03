import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function AdminLogin() {
  const { navigate, setAdminLoginForm, AdminLogin } = useContext(AppContext);
  return (
    <div>
      <div>
        <button onClick={() => navigate("/")}>Staff</button>
      </div>
      <div>
        <h1>Admin Login</h1>
        <form onSubmit={(e) => AdminLogin(e)}>
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
              type="text"
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
