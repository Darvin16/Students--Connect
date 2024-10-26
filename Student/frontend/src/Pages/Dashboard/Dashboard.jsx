import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LibraryRequest from "../LibraryRequest/LibraryRequest";
import LandingPage from "./LandingPage";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookOpenReader,
  faUserGraduate,
  faShapes,
  faRocket,
  faPaperPlane,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import { AppContext } from "../../Context/AppContext";
import LibraryRequestTracker from "../LibraryRequest/LibraryRequestTracker";
import RequestForm from "../LibraryRequest/RequestForm";
import Profile from "../Profile/Profile";
import LeaveRequest from "../LeaveRequest/LeaveRequest";
import LeaveTracker from "../LeaveRequest/LeaveTracker";

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
                <FontAwesomeIcon icon={faShapes} />
                &nbsp;Dashboard
              </Link>
              <Link to="/dashboard/library/request">
                <FontAwesomeIcon icon={faBookOpenReader} />
                &nbsp;Library Request
              </Link>
              <Link to="/dashboard/library/request/tracker">
                <FontAwesomeIcon icon={faRocket} />
                &nbsp;Library Tracker
              </Link>
              <Link to="/dashboard/leave/request">
                <FontAwesomeIcon icon={faWpforms} />
                &nbsp;Leave Request
              </Link>
              <Link to="/dashboard/leave/request/tracker">
                <FontAwesomeIcon icon={faPaperPlane} />
                &nbsp;Leave Tracker
              </Link>
              <Link to="/dashboard/profile">
                <FontAwesomeIcon icon={faUserGraduate} />
                &nbsp;Profile
              </Link>
              <button onClick={() => Logout()}>
                <FontAwesomeIcon icon={faSignOut} />
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
