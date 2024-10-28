import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCircleCheck,
  faMagnifyingGlass,
  faUniversity,
  faAddressCard,
  faUsersLine,
  faUserGraduate,
  faClock,
  faFontAwesome,
  faFileArrowDown,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import "font-awesome/css/font-awesome.min.css";
import "./leave.css";

function LeaveRequests() {
  const {
    handleLeaveRequest,
    fetchLeaveRequests,
    leaveRequests,
    dashboardInfo,
    LeaveImagesURL,
    generatePDF,
  } = useContext(AppContext);

  const [sortby, setSortby] = useState({
    id: "",
    academicYear: "",
    department: "",
    leaveType: "",
  });
  const [showUpdateMany, setShowUpdateMany] = useState(false);
  const [updateMany, setUpdateMany] = useState({
    from: "",
    to: "",
    leaveType: "all",
  });

  useEffect(() => {
    if (leaveRequests.length === 0) {
      fetchLeaveRequests();
    }
  }, [leaveRequests]);

  function filterRequests() {
    let filteredRequests = [...leaveRequests];

    if (sortby.id) {
      filteredRequests = filteredRequests.filter(
        (request) => request.studentId === sortby.id
      );
    }
    if (sortby.academicYear.length >= 4) {
      filteredRequests = filteredRequests.filter(
        (request) =>
          request.studentAcademicYear === parseInt(sortby.academicYear)
      );
    }
    if (sortby.department) {
      filteredRequests = filteredRequests.filter(
        (request) => request.studentDepartment === sortby.department
      );
    }
    if (sortby.leaveType) {
      filteredRequests = filteredRequests.filter(
        (request) => request.leaveType === sortby.leaveType
      );
    }

    return filteredRequests;
  }

  return (
    <div className="leave-requests-page">
      <div className="leave-requests-header">
        <h2>Leave Requests</h2>
        <span>
          {new Date()
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })
            .replace(" ", "-")}
          &nbsp;
          <FontAwesomeIcon icon={faCalendarDays} />
        </span>
      </div>
      <hr />
      <div className="leave-requests-insights">
        <h3>
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{
              color: "green",
            }}
          />
          &nbsp;Approval Status
        </h3>
        <p>Requested</p>
        <p>Approved</p>
        <p>Rejected</p>
        <p>Pending</p>
        <p>{dashboardInfo.leaveRequestsCount}</p>
        <p>{dashboardInfo.approvedLeaveRequests}</p>
        <p>{dashboardInfo.rejectedLeaveRequests}</p>
        <p>{dashboardInfo.pendingLeaveRequests}</p>
      </div>
      <div className="leave-filters">
        <div className="leave-filter-1">
          <div className="leave-filter-group">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            &nbsp;
            <input
              type="search"
              name="id"
              id="id"
              placeholder="Search by Id"
              value={sortby.id}
              onChange={(e) =>
                setSortby((prev) => ({ ...prev, id: e.target.value }))
              }
            />
          </div>
          <div className="leave-filter-group">
            <FontAwesomeIcon icon={faUniversity} />
            &nbsp;
            <input
              type="number"
              name="academicYear"
              id="academicYear"
              placeholder="Academic Year"
              value={sortby.academicYear}
              onChange={(e) =>
                setSortby((prev) => ({ ...prev, academicYear: e.target.value }))
              }
            />
          </div>
          <div className="leave-filter-group">
            <FontAwesomeIcon icon={faAddressCard} />
            &nbsp;
            <select
              name="department-filter"
              id="department-filter"
              value={sortby.department}
              onChange={(e) =>
                setSortby((prev) => ({ ...prev, department: e.target.value }))
              }
            >
              <option value="">Department</option>
              <optgroup label="Bachelor's Degrees">
                <option value="B.Tech">B.Tech</option>
                <option value="B.Sc">B.Sc</option>
                <option value="B.C.A">B.C.A</option>
                <option value="B.Arch">B.Arch</option>
                <option value="B.Des">B.Des</option>
                <option value="B.Pharm">B.Pharm</option>
                <option value="B.B.A">B.B.A</option>
                <option value="B.M.S">B.M.S</option>
                <option value="B.Com">B.Com</option>
                <option value="B.I.T">B.I.T</option>
                <option value="B.Voc">B.Voc</option>
                <option value="B.S">B.S</option>
                <option value="B.F.A">B.F.A</option>
                <option value="B.L">B.L</option>
                <option value="B.Ed">B.Ed</option>
                <option value="B.P.Ed">B.P.Ed</option>
                <option value="B.F.Sc">B.F.Sc</option>
                <option value="B.D.S">B.D.S</option>
                <option value="B.H.M">B.H.M</option>
                <option value="B.S.W">B.S.W</option>
              </optgroup>
              <optgroup label="Master's Degrees">
                <option value="M.Sc">M.Sc</option>
                <option value="M.C.A">M.C.A</option>
                <option value="M.Arch">M.Arch</option>
                <option value="M.Des">M.Des</option>
                <option value="M.B.A">M.B.A</option>
                <option value="M.S">M.S</option>
                <option value="M.Pharm">M.Pharm</option>
                <option value="M.Com">M.Com</option>
                <option value="M.Phil">M.Phil</option>
                <option value="M.Voc">M.Voc</option>
                <option value="M.F.A">M.F.A</option>
                <option value="M.Ed">M.Ed</option>
                <option value="M.P.Ed">M.P.Ed</option>
                <option value="M.L">M.L</option>
                <option value="M.F.Sc">M.F.Sc</option>
                <option value="M.D">M.D</option>
                <option value="M.Tech">M.Tech</option>
                <option value="M.Sc">M.Sc</option>
              </optgroup>
            </select>
          </div>
          <div className="leave-filter-group">
            <FontAwesomeIcon icon={faFontAwesome} />
            &nbsp;
            <select
              name="leaveType"
              id="leaveType"
              value={sortby.leaveType}
              onChange={(e) =>
                setSortby((prev) => ({ ...prev, leaveType: e.target.value }))
              }
            >
              <option value="">Leave Type</option>
              <option value="Health_Issues">Health Issues</option>
              <option value="Function">Function</option>
              <option value="Personal">Personal </option>
              <option value="Exam">Exam</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
        </div>
        <div className="leave-filter-2">
          <button onClick={() => setShowUpdateMany((prev) => !prev)}>
            <FontAwesomeIcon icon={faUsersLine} />
            &nbsp;Update Many
          </button>
          {showUpdateMany && (
            <div className="leave-request-update-many">
              <span onClick={() => setShowUpdateMany(false)}>❌</span>
              <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
                Filter the Requests
              </h3>
              <label htmlFor="upadte-leaveType">Leave Type:</label>
              <select
                name="upadte-leaveType"
                id="upadte-leaveType"
                value={updateMany.leaveType}
                onChange={(e) =>
                  setUpdateMany((prev) => ({
                    ...prev,
                    leaveType: e.target.value,
                  }))
                }
              >
                <option value="all">All</option>
                <option value="Health_Issues">Health Issues</option>
                <option value="Function">Function</option>
                <option value="Personal">Personal </option>
                <option value="Exam">Exam</option>
                <option value="Emergency">Emergency</option>
              </select>
              <label htmlFor="upadte_from">From:</label>
              <input
                type="date"
                name="update_from"
                id="update_from"
                value={updateMany.from}
                onChange={(e) =>
                  setUpdateMany((prev) => ({ ...prev, from: e.target.value }))
                }
              />
              <label htmlFor="upadte_to">To:</label>
              <input
                type="date"
                name="upadte_to"
                id="upadte_to"
                value={updateMany.to}
                onChange={(e) =>
                  setUpdateMany((prev) => ({ ...prev, to: e.target.value }))
                }
              />
              <div className="leave-update-many-btn">
                <button
                  className="leave-btn leave-approve"
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleLeaveRequest("many", "approved",updateMany)
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                  &nbsp;Approve All
                </button>
                <button
                  className="leave-btn leave-reject"
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleLeaveRequest("many", "rejected", updateMany)
                  }
                >
                  <FontAwesomeIcon icon={faXmark} />
                  &nbsp;Reject All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="leave-requests-table">
        <table>
          <thead>
            <tr>
              <th>
                <FontAwesomeIcon icon={faUserGraduate} />
                &nbsp;Student ID
              </th>
              <th>
                <FontAwesomeIcon icon={faUserGraduate} />
                &nbsp;Student
              </th>
              <th>
                <FontAwesomeIcon icon={faAddressCard} />
                &nbsp;Department
              </th>
              <th>
                <FontAwesomeIcon icon={faUniversity} />
                &nbsp;Academic Year
              </th>
              <th>
                <FontAwesomeIcon icon={faFontAwesome} />
                &nbsp;Leave Type
              </th>
              <th>
                <FontAwesomeIcon icon={faClock} />
                &nbsp;Leave Duration
              </th>
              <th>
                <FontAwesomeIcon icon={faWpforms} />
                &nbsp;Request Details
              </th>
              <th>
                <i className="fa fa-check-square-o" aria-hidden="true"></i>
                &nbsp;Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filterRequests().map((request) => {
              return (
                <tr className="leave-request-group">
                  <td>{request.studentId}</td>
                  <td>
                    <img
                      src={LeaveImagesURL + request.studentImage}
                      alt={`${request.studentName}'s Image`}
                    />
                    <span>{request.studentName}</span>
                  </td>
                  <td>{request.studentDepartment}</td>
                  <td>{request.studentAcademicYear}</td>
                  <td>{request.leaveType.replace("_", " ")}</td>
                  <td>
                    {request.oneDayLeave
                      ? new Date(request.from).toLocaleString("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : `${new Date(request.from).toLocaleString("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })} to ${new Date(request.to).toLocaleString("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}`}
                  </td>
                  <td>
                    <button
                      className="download-file-btn"
                      onClick={() => generatePDF(request.requestId, "leave")}
                    >
                      <FontAwesomeIcon icon={faFileArrowDown} />
                    </button>
                  </td>
                  <td>
                    <button
                      className="leave-btn leave-approve"
                      onClick={() =>
                        handleLeaveRequest(request.requestId, "approved")
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      className="leave-btn leave-reject"
                      onClick={() =>
                        handleLeaveRequest(request.requestId, "rejected")
                      }
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveRequests;
