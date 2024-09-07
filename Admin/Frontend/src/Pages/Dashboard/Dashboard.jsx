import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import StaffRecord from "../StaffRecord/StaffRecord";

function Dashboard() {
  return (
    <div>
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
