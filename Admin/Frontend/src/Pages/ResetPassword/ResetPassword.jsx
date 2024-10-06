import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const { resetPassword } = useContext(AppContext);
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { token } = useParams();

  return (
    <div>
      <form
        className="reset-form"
        onSubmit={(e) => {
          e.preventDefault();
          resetPassword(token, newPassword, confirmPassword);
        }}
      >
        <h2>Reset Password</h2>
        {/* <label htmlFor="newPassword">New Password:</label> */}
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {/* <label htmlFor="confirmPassword">Confirm Password:</label> */}
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
}

export default ResetPassword;
