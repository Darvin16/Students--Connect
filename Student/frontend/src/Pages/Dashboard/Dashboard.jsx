import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LibraryRequest from "../LibraryRequest/LibraryRequest";

function Dashboard() {
  return (
    <div>
      <Link to="/dashboard/library/request">Library Rquest</Link>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/library/request" element={<LibraryRequest />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
