import React, { useContext, useState } from "react";
import "./Login.css";
import { AppContext } from "../../Context/AppContext";

export const Login = () => {
  const { setLoginForm,StaffLogin, navigate } = useContext(AppContext);

  return (
    <div>
      <div>
        <button onClick={() => navigate("/adminlogin")}>Admin</button>
      </div>
      <div>
        <h1>Staff Login</h1>
        <form onSubmit={(e) => StaffLogin(e)}>
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
            <label htmlFor="employeePosition">Position:</label>
            <select
              name="employeePosition"
              id="employeePosition"
              onChange={(e) =>
                setLoginForm((l) => ({ ...l, position: e.target.value }))
              }
              required
            >
              <option value=""></option>
              <option value="warden">Warden</option>
              <option value="SRO">SRO</option>
              <option value="supervisor">Supervisor</option>
              <option value="librarien">Librarien</option>
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
