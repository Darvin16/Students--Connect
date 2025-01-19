import React, { useContext, useEffect, useState } from "react";
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
  faUserCheck,
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
import LibrarianPage from "../LandPage/Librarian/LibrarianPage";
import Profile from "../Profile/Profile";
import LeaveRecords from "../LeaveRequests/LeaveRecords";
import LeaveRequests from "../LeaveRequests/LeaveRequests";
import LatePermission from "../LatePermission/LatePermission";
import LatePermissionHistory from "../LatePermission/LatePermissionHistory";
import SupervisorPage from "../LandPage/Supervisor/SupervisorPage";
import Complaints from "../Complaints/Complaints";
import ComplaintsRecords from "../Complaints/ComplaintsRecords";

function Dashboard() {
  const { userData, logout } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDesktopLogout, setShowDesktopLogout] = useState(true);

  useEffect(() => {
    function showLogout() {
      setTimeout(() => {
        if (window.innerWidth >= 992) {
          setShowDesktopLogout(true);
        } else {
          setShowDesktopLogout(false);
        }
      }, 0);
    }

    if (window.innerWidth < 992) {
      setShowDesktopLogout(false);
    }

    window.addEventListener("resize", showLogout);

    return () => {
      window.removeEventListener("resize", showLogout);
    };
  }, []);

  return (
    <div className="dashboard-page">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            Student Connect
          </Link>
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
                      <FontAwesomeIcon icon={faAddressBook} /> Staff Records
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/record/student">
                      <FontAwesomeIcon icon={faUsers} /> Student Records
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to=""
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faBookAtlas} /> Records
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/record/library"
                        >
                          <FontAwesomeIcon icon={faBookAtlas} /> Library Records
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/record/leave"
                        >
                          <FontAwesomeIcon icon={faLayerGroup} /> Leave Records
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/record/late-permission"
                        >
                          <FontAwesomeIcon icon={faLayerGroup} /> Late
                          Permission Records
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/complaints"
                        >
                          <FontAwesomeIcon icon={faUserCheck} /> Complaints
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/complaints/records"
                        >
                          <FontAwesomeIcon icon={faUserCheck} /> Complaint
                          Records
                        </Link>
                      </li>
                    </ul>
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
                      <FontAwesomeIcon icon={faUsers} /> Student Records
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/warden/record/library"
                    >
                      <FontAwesomeIcon icon={faBookAtlas} /> Library Requests
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/warden/requests/leave"
                    >
                      <FontAwesomeIcon icon={faLayerGroup} /> Leave Requests
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faBookAtlas} /> Records
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/warden/record/library/past"
                        >
                          <FontAwesomeIcon icon={faBookAtlas} /> Library Records
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/warden/record/leave"
                        >
                          <FontAwesomeIcon icon={faLayerGroup} /> Leave Records
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/warden/requests/late-permission"
                        >
                          <FontAwesomeIcon icon={faLayerGroup} /> Late
                          Permission Requests
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/warden/record/late-permission"
                        >
                          <FontAwesomeIcon icon={faLayerGroup} /> Late
                          Permission Records
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/warden/profile">
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
                      <FontAwesomeIcon icon={faUsers} /> Student Records
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/sro/record/library"
                    >
                      <FontAwesomeIcon icon={faBookAtlas} /> Library Requests
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/sro/requests/leave"
                    >
                      <FontAwesomeIcon icon={faLayerGroup} /> Leave Requests
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faBookAtlas} /> Records
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/sro/record/library/past"
                        >
                          <FontAwesomeIcon icon={faBookAtlas} /> Library Records
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/sro/record/leave"
                        >
                          <FontAwesomeIcon icon={faLayerGroup} /> Leave Records
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/sro/requests/late-permission"
                        >
                          <FontAwesomeIcon icon={faLayerGroup} /> Late
                          Permission Requests
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard/sro/record/late-permission"
                        >
                          <FontAwesomeIcon icon={faLayerGroup} /> Late
                          Permission Records
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/sro/profile">
                      <FontAwesomeIcon icon={faCircleInfo} /> Profile
                    </Link>
                  </li>
                </>
              )}
              {userData?.role === "librarian" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/">
                      <FontAwesomeIcon icon={faPenToSquare} /> Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/librarian/library/requests"
                    >
                      <FontAwesomeIcon icon={faBookAtlas} /> Library Requests
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/librarian/profile"
                    >
                      <FontAwesomeIcon icon={faCircleInfo} /> Profile
                    </Link>
                  </li>
                </>
              )}
              {userData?.role === "supervisor" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/">
                      <FontAwesomeIcon icon={faPenToSquare} /> Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/supervisor/complaints"
                    >
                      <FontAwesomeIcon icon={faUserCheck} /> New Complaits
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/supervisor/complaints/records"
                    >
                      <FontAwesomeIcon icon={faUserCheck} /> Complaint Records
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/dashboard/supervisor/profile"
                    >
                      <FontAwesomeIcon icon={faCircleInfo} /> Profile
                    </Link>
                  </li>
                </>
              )}

              {showMenu && !showDesktopLogout && (
                <li className="nav-item">
                  <button className="logout-btn" onClick={() => logout()}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
          {showDesktopLogout && (
            <button className="logout-btn" onClick={() => logout()}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <div className="dashboard-components">
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
              <Route path="/record/leave" element={<LeaveRecords />} />
              <Route
                path="/record/late-permission"
                element={<LatePermissionHistory />}
              />
              <Route path="/complaints" element={<Complaints />} />
              <Route
                path="/complaints/records"
                element={<ComplaintsRecords />}
              />
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
              <Route
                path="/warden/record/library/past"
                element={<LibraryRecordsHistory />}
              />
              <Route path="/warden/record/leave" element={<LeaveRecords />} />
              <Route
                path="/warden/requests/leave"
                element={<LeaveRequests />}
              />
              <Route
                path="/warden/requests/late-permission"
                element={<LatePermission />}
              />
              <Route
                path="/warden/record/late-permission"
                element={<LatePermissionHistory />}
              />
              <Route path="/warden/profile" element={<Profile />} />
            </>
          )}
          {userData?.role === "SRO" && (
            <>
              <Route path="/" element={<WardenPage />} />
              <Route path="/sro/record/student" element={<StudentRecord />} />
              <Route path="/sro/record/library" element={<Libraryrecords />} />
              <Route
                path="/sro/record/library/past"
                element={<LibraryRecordsHistory />}
              />
              <Route path="/sro/record/leave" element={<LeaveRecords />} />
              <Route path="/sro/requests/leave" element={<LeaveRequests />} />
              <Route
                path="/sro/requests/late-permission"
                element={<LatePermission />}
              />
              <Route
                path="/sro/record/late-permission"
                element={<LatePermissionHistory />}
              />

              <Route path="/sro/profile" element={<Profile />} />
            </>
          )}
          {userData?.role === "librarian" && (
            <>
              <Route path="/" element={<LibrarianPage />} />
              <Route
                path="/librarian/library/requests"
                element={<Libraryrecords />}
              />
              <Route path="/librarian/profile" element={<Profile />} />
            </>
          )}
          {userData?.role === "supervisor" && (
            <>
              <Route path="/" element={<SupervisorPage />} />
              <Route path="/supervisor/complaints" element={<Complaints />} />
              <Route
                path="/supervisor/complaints/records"
                element={<ComplaintsRecords />}
              />
              <Route path="/supervisor/profile" element={<Profile />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
