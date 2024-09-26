import React, { useContext, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
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
import StaffRecord from "../StaffRecord/StaffRecord";
import { AppContext } from "../../Context/AppContext";
import StudentRecord from "../StudentRecord/StudentRecord";
import AdminPage from "../LandPage/Admin/AdminPage";
import WardenPage from "../LandPage/Warden/WardenPage";
import Libraryrecords from "../Libraryrecords/Libraryrecords";
import "./Dashboard.css";
import AdminStudentRecords from "../StudentRecord/AdminStudentRecords";
import LibraryRecordsHistory from "../Libraryrecords/LibraryRecordsHistory";

function Dashboard() {
  const { userData, logout } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="dashboard-page">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Student Connect
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-expanded={showMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userData?.role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/">
                      <FontAwesomeIcon icon={faPenToSquare} /> Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/record/staff">
                      <FontAwesomeIcon icon={faAddressBook} /> Staff Record
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/record/student">
                      <FontAwesomeIcon icon={faUsers} /> Student Record
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/record/library">
                      <FontAwesomeIcon icon={faBookAtlas} /> Library Record
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/record/leave">
                      <FontAwesomeIcon icon={faLayerGroup} /> Leave Record
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/profile">
                      <FontAwesomeIcon icon={faCircleInfo} /> Profile
                    </Link>
                  </li>
                </>
              )}
              {userData?.role === "warden" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/">
                      <FontAwesomeIcon icon={faPenToSquare} /> Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/warden/record/student"
                    >
                      <FontAwesomeIcon icon={faUsers} /> Student Record
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/warden/record/library"
                    >
                      <FontAwesomeIcon icon={faBookAtlas} /> Library Request
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/warden/record/leave"
                    >
                      <FontAwesomeIcon icon={faLayerGroup} /> Leave Request
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/profile">
                      <FontAwesomeIcon icon={faCircleInfo} /> Profile
                    </Link>
                  </li>
                </>
              )}
              {userData?.role === "SRO" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/">
                      <FontAwesomeIcon icon={faPenToSquare} /> Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/sro/record/student"
                    >
                      <FontAwesomeIcon icon={faUsers} /> Student Record
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/sro/record/library"
                    >
                      <FontAwesomeIcon icon={faBookAtlas} /> Library Request
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/sro/record/leave">
                      <FontAwesomeIcon icon={faLayerGroup} /> Leave Request
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/profile">
                      <FontAwesomeIcon icon={faCircleInfo} /> Profile
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => logout()}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="dashboard-components container mt-4">
        <Routes>
          {userData?.role === "admin" && (
            <>
              <Route path="/" element={<AdminPage />} />
              <Route path="/record/staff" element={<StaffRecord />} />
              <Route path="/record/student" element={<AdminStudentRecords />} />
              <Route
                path="/record/library"
                element={<LibraryRecordsHistory />}
              />
              <Route path="/record/leave" element={<></>} />
              <Route path="/profile" element={<></>} />
            </>
          )}
          {userData?.role === "warden" && (
            <>
              <Route path="/" element={<WardenPage />} />
              <Route
                path="/warden/record/student"
                element={<StudentRecord />}
              />
              <Route
                path="/warden/record/library"
                element={<Libraryrecords />}
              />
              <Route path="/warden/record/leave" element={<></>} />
              <Route path="/warden/profile" element={<></>} />
            </>
          )}
          {userData?.role === "SRO" && (
            <>
              <Route path="/" element={<WardenPage />} />
              <Route path="/sro/record/student" element={<StudentRecord/>} />
              <Route path="/sro/record/library" element={<Libraryrecords />} />
              <Route path="/sro/record/leave" element={<></>} />
              <Route path="/sro/profile" element={<></>} />
            </>
          )}
          {userData?.role === "librarian" && (
            <>
              <Route path="/" element={<div />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
