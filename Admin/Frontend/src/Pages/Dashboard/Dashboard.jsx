import React, { useContext } from "react";
import { Link, Routes, Route } from "react-router-dom";
import StaffRecord from "../StaffRecord/StaffRecord";
import { AppContext } from "../../Context/AppContext";

function Dashboard() {
  const { userData,logout } = useContext(AppContext);
  return (
    <div>
      <div>
        <h1>Dashboard of {userData?.role}</h1>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <Link to="/dashboard/record/staff">Staff Record</Link>
      <br />
      <Link to="/dashboard/record/student">Student Record</Link>
      <Routes>
        <Route path="/record/staff" element={<StaffRecord />} />
        <Route path="/record/student" element={<div>Student Record</div>} />
      </Routes>
    </div>
  );
}

export default Dashboard;
