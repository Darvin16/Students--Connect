import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LibraryRequest from "../LibraryRequest/LibraryRequest";
import LandingPage from "./LandingPage";

function Dashboard() {
  return (
    <div>
      <Link to="/dashboard/library/request">Library Request</Link>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/library/request" element={<LibraryRequest />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
