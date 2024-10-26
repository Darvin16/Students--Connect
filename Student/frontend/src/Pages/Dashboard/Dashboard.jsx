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
import LeaveRequest from "../LeaveRequest/LeaveRequest";
import LeaveTracker from "../LeaveRequest/LeaveTracker";
import dashboardIcon from "../../Asset/dashboard.gif";
import libraryRequestIcon from "../../Asset/library-request.gif";
import libraryTrackerIcon from "../../Asset/library-tracker.gif";
import leaveRequestIcon from "../../Asset/leave-request.gif";
import leaveTrackerIcon from "../../Asset/leave-tracker.gif";
import profileIcon from "../../Asset/profile.gif";
import logoutIcon from "../../Asset/logout.gif";

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
              <Link to="/dashboard/">
                <img src={dashboardIcon} alt="library request Icon" />
                &nbsp;Dashboard
              </Link>
              <Link to="/dashboard/library/request">
                <img src={libraryRequestIcon} alt="library request Icon" />
                &nbsp;Library Request
              </Link>
              <Link to="/dashboard/library/request/tracker">
                <img src={libraryTrackerIcon} alt="library tracker Icon" />
                &nbsp; Library Tracker
              </Link>
              <Link to="/dashboard/leave/request">
                <img src={leaveRequestIcon} alt="library tracker Icon" />
                &nbsp;Leave Request
              </Link>
              <Link to="/dashboard/leave/request/tracker">
                <img src={leaveTrackerIcon} alt="library tracker Icon" />
                &nbsp;Leave Tracker
              </Link>
              <Link to="/dashboard/profile">
                <img src={profileIcon} alt="library tracker Icon" />
                &nbsp;Profile
              </Link>
              <button onClick={() => Logout()}>
                <img src={logoutIcon} alt="library tracker Icon" />
                &nbsp;Logout
              </button>
            </div>
          </div>
        )}
        <div className="dashboard-components">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/library/request" element={<LibraryRequest />} />
            <Route
              path="/library/request/tracker"
              element={<LibraryRequestTracker />}
            />
            <Route path="/library/request/form" element={<RequestForm />} />
            <Route path="/leave/request" element={<LeaveRequest />} />
            <Route path="/leave/request/tracker" element={<LeaveTracker />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
