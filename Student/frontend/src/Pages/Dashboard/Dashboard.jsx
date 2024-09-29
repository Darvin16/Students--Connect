import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LibraryRequest from "../LibraryRequest/LibraryRequest";
import LandingPage from "./LandingPage";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../Context/AppContext";
import LibraryRequestTracker from "../LibraryRequest/LibraryRequestTracker";
import RequestForm from "../LibraryRequest/RequestForm";
import Profile from "../Profile/Profile";

function Dashboard() {
  const [showMenu, setShowMenu] = React.useState(false);
  const { Logout } = useContext(AppContext);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 onClick={() => setShowMenu((prev) => !prev)}>
          <FontAwesomeIcon icon={faBars} />
        </h2>
        <h1>Student Connect</h1>
      </div>
      <div className="dashboard-container">
        {showMenu && (
          <div className="dashboard-nav">
            <div className="dashboard-nav-link">
              <Link to="/dashboard/">Dashboard</Link>
              <Link to="/dashboard/library/request">Library Request</Link>
              <Link to="/dashboard/library/request/Tracking">Tracker</Link>
              <Link to="/dashboard/leave/request">Leave Request</Link>
              <Link to="/dashboard/profile">Profile</Link>
              <button onClick={() => Logout()}>Logout</button>
            </div>
          </div>
        )}
        <div className="dashboard-components">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/library/request" element={<LibraryRequest />} />
            <Route
              path="/library/request/tracking"
              element={<LibraryRequestTracker />}
            />
            <Route path="/library/request/form" element={<RequestForm />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
