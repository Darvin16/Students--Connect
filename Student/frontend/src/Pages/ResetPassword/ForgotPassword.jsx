import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import "./ResetPassword.css";

function ForgotPassword() {
  const { forgotPassword } = useContext(AppContext);
  const [userId, setUserId] = useState();

  return (
    <div>
      <form
        className="reset-form"
        onSubmit={(e) => {
          e.preventDefault();
          forgotPassword(userId);
        }}
      >
        <h2>Forgot Password</h2>
        {/* <label htmlFor="userId">Student Id:</label> */}
        <input
          type="text"
          name="userId"
          id="userId"
          placeholder="Student ID"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          required
        />
        <button type="submit">Send</button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
