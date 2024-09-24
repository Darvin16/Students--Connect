import React, { useContext, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import StaffRecord from "../StaffRecord/StaffRecord";
import { AppContext } from "../../Context/AppContext";
import StudentRecord from "../StudentRecord/StudentRecord";
import AdminPage from "../LandPage/Admin/AdminPage";
import WardenPage from "../LandPage/Warden/WardenPage";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPenToSquare,
  faCircleInfo,
  faBookAtlas,
  faAddressBook,
  faLayerGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const { userData, logout } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-heading">
          <h2 onClick={() => setShowMenu((prev) => !prev)}>
            <FontAwesomeIcon icon={faBars} />
          </h2>
          <h1>Student Connect</h1>
        </div>
      </div>
      {userData?.role === "admin" && (
        <div className="dashboard-container">
          {showMenu && (
            <div className="dashboard-nav">
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faPenToSquare} />
                <Link to="/dashboard/">Dashboard</Link>
              </div>
              <hr />
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faAddressBook} />
                <Link to="/dashboard/record/staff">Staff Record</Link>
              </div>
              <hr />
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faUsers} />
                <Link to="/dashboard/record/student">Student Record</Link>
              </div>
              <hr />
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faBookAtlas} />
                <Link to="/dashboard/record/library">Library Record</Link>
              </div>
              <hr />
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faLayerGroup} />
                <Link to="/dashboard/record/leave">Leave Record</Link>
              </div>
              <hr />
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faCircleInfo} />
                <Link to="/dashboard/profile">Profile</Link>
              </div>
              <hr />
              <button onClick={() => logout()}>Logout</button>
            </div>
          )}
          <div className="dashboard-components">
            <Routes>
              <Route path="/" element={<AdminPage />} />
              <Route path="/record/staff" element={<StaffRecord />} />
              <Route
                path="/record/student"
                element={<div>Student Record</div>}
              />
            </Routes>
          </div>
        </div>
      )}
      {userData?.role === "warden" && (
        <div className="dashboard-container">
          {showMenu && (
            <div className="dashboard-nav">
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faPenToSquare} />
                <Link to="/dashboard/">Dashboard</Link>
              </div>
              <hr />
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faUsers} />
                <Link to="/dashboard/warden/record/student">
                  Student Record
                </Link>
              </div>
              <hr />
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faBookAtlas} />

                <Link to="/dashboard/warden/record/library">
                  Library Request
                </Link>
              </div>
              <hr />
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faLayerGroup} />
                <Link to="/dashboard/warden/record/leave">Leave Request</Link>
              </div>
              <hr />
              <div className="dashboard-nav-group">
                <FontAwesomeIcon icon={faCircleInfo} />
                <Link to="/dashboard/profile">Profile</Link>
              </div>
              <hr />
              <button onClick={() => logout()}>Logout</button>
            </div>
          )}
          <div className="dashboard-components">
            <Routes>
              <Route path="/" element={<WardenPage />} />
              <Route
                path="/warden/record/student"
                element={<StudentRecord />}
              />
              <Route
                path="/warden/record/library"
                element={<div>Warden Library Record</div>}
              />
              <Route
                path="/warden/record/leave"
                element={<div>Warden Leave Record</div>}
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
