import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

function Login() {
  const { setLoginForm, Login } = useContext(AppContext);
  return (
    <div>
      <form onSubmit={(e) => Login(e)}>
        <div>
          <label htmlFor="studentId">Student Id:</label>
          <input
            type="text"
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
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <div>
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
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <p>
          Doesn't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
