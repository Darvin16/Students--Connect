import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Libraryrecords.css";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faUserGraduate,
  faUniversity,
  faAddressCard,
  faCalendarDays,
  faMagnifyingGlass,
  faFileArrowDown,
  faFilter,
  faCheck,
  faXmark,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import delayIcon from "../../Asset/delay-hour.jpg";
import "font-awesome/css/font-awesome.min.css";

const LibraryRequests = () => {
  const {
    userData,
    libraryRequests,
    fetchLibraryRequests,
    handleLibraryRequest,
    generatePDF,
    studentUploadsURL,
  } = useContext(AppContext);

  useEffect(() => {
    if (libraryRequests.length === 0) {
      fetchLibraryRequests();
    }
  }, [libraryRequests]);

  const calcEntryTime = (time) => {
    if (!time) {
      return "";
    }

    const approveTime = new Date(time).getHours();

    if (approveTime < 21) {
      return new Date(time + 30 * 60 * 1000).toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return new Date(time + 15 * 60 * 1000).toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  if (userData?.role === "librarian") {
    return (
      <div className="library-requests-container">
        <h2 className="text-center my-4">Library Requests</h2>
        <div className="card">
          <div className="card-body">
            <table className="table table-responsive">
              <thead className="thead-light">
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Block Name</th>
                  <th>Room No</th>
                  <th>Request Form</th>
                  <th>Requested Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {libraryRequests.map((request) => (
                  <tr key={request.requestId}>
                    <td>{request.studentId}</td>
                    <td>{request.studentName}</td>
                    <td>{request.studentDepartment}</td>
                    <td>{request.studentBlockName}</td>
                    <td>{request.studentRoomNumber}</td>
                    <td>
                      <button
                        className="download-file-btn"
                        onClick={() => generatePDF(request.requestId)}
                      >
                        Download Request
                      </button>
                    </td>
                    <td>
                      {new Date(request.requestDate).toLocaleString("en-GB", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      })}
                    </td>
                    <td>
                      {request.in ? (
                        <>
                          {request.out ? (
                            <p>Student Left</p>
                          ) : (
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                handleLibraryRequest(request.requestId, "out")
                              }
                            >
                              OUT
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          className="btn btn-success me-1"
                          onClick={() =>
                            handleLibraryRequest(request.requestId, "in")
                          }
                        >
                          IN
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="library-requests-page">
      <div className="library-request-greeting">
        <h2>Library Requests</h2>
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
      <div className="library-requests-insights">
        <div className="library-request-status">
          <h3>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{
                color: "green",
              }}
            />
            &nbsp; Approval Status
          </h3>
          <p>Requested</p>
          <p>Approved</p>
          <p>Rejected</p>
          <p>Pending</p>
          <p>1</p>
          <p className="lib-starus-border">23</p>
          <p className="lib-starus-border">567</p>
          <p className="lib-starus-border">0</p>
        </div>
        <div className="library-request-delay-summary">
          <div>
            <img src={delayIcon} alt="Icon of clock with exclamation" />
            <h3>Delay Hours Summmery</h3>
          </div>
          <p>Overtime Students</p>
          <p>Avarage Delay per Week</p>
          <p>00</p>
          <p className="lib-starus-border">2</p>
        </div>
      </div>

      <div className="library-request-filters">
        <div className="library-filter-1">
          <div className="lib-filter-1-grp">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            &nbsp;
            <input
              type="search"
              name="library-search"
              id="library-search"
              placeholder="Search by id"
            />
          </div>
          <div className="lib-filter-1-grp">
            <FontAwesomeIcon icon={faUniversity} />
            &nbsp;
            <input
              type="number"
              name="academicYear"
              id="academicYear"
              placeholder="Academic Year"
            />
          </div>
          <div className="lib-filter-1-grp">
            <FontAwesomeIcon icon={faAddressCard} />
            &nbsp;
            <select name="department-filter" id="department-filter">
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
          <div className="lib-filter-1-grp">
            <label htmlFor="delay-filter">
              <FontAwesomeIcon icon={faFilter} />
              &nbsp; Delay Filter
            </label>
            &nbsp;
            <input type="checkbox" name="delay-filter" id="delay-filter" />
          </div>
        </div>
        <div className="library-filter-2">
          <div className="lib-filter-2-approve">
            <FontAwesomeIcon icon={faCheck} />
            &nbsp;
            <span>Approve All</span>
          </div>
          <div className="lib-filter-2-reject">
            <FontAwesomeIcon icon={faXmark} />
            &nbsp;
            <span>Reject All</span>
          </div>
        </div>
      </div>

      <div className="library-request-table">
        <table>
          <thead>
            <tr>
              <th>
                <FontAwesomeIcon icon={faUserGraduate} />
                &nbsp; Student ID
              </th>
              <th>
                <FontAwesomeIcon icon={faUserGraduate} />
                &nbsp;Student
              </th>
              <th>
                <FontAwesomeIcon icon={faWpforms} />
                &nbsp; Request Details
              </th>
              <th>
                <FontAwesomeIcon icon={faClock} />
                &nbsp;Requested Time
              </th>
              <th>
                <i className="fa fa-check-square-o" aria-hidden="true"></i>
                &nbsp;Action
              </th>
              <th>
                <FontAwesomeIcon icon={faClock} />
                &nbsp;Library Entry Time
              </th>
            </tr>
          </thead>
          <tbody>
            {libraryRequests.map((request) => (
              <tr key={request.requestId}>
                <td>{request.studentId}</td>
                <td>
                  <img
                    src={studentUploadsURL + request.studentImage}
                    alt={`${request.studentName}'s Image`}
                  />
                  {request.studentName}
                </td>
                <td>
                  <button
                    title="Download PDF"
                    className="download-file-btn"
                    onClick={() => generatePDF(request.requestId)}
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} />
                  </button>
                </td>
                <td>
                  {new Date(request.requestDate).toLocaleString("en-GB", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>
                {userData.role === "warden" ? (
                  <>
                    {request.wardenApproval ? (
                      <td
                        style={
                          request.wardenApproval.status === "approved"
                            ? { color: "green", fontWeight: "bold" }
                            : { color: "red", fontWeight: "bold" }
                        }
                      >
                        {request.wardenApproval.status.toUpperCase()}
                      </td>
                    ) : (
                      <td>
                        <button
                          title="Approve"
                          className="lib-btn lib-approve"
                          onClick={() =>
                            handleLibraryRequest(request.requestId, "approved")
                          }
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          title="Reject"
                          className="lib-btn lib-reject"
                          onClick={() =>
                            handleLibraryRequest(request.requestId, "rejected")
                          }
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </td>
                    )}
                  </>
                ) : (
                  <>
                    {request.SROApproval ? (
                      <td
                        style={
                          request.SROApproval.status === "approved"
                            ? { color: "green", fontWeight: "bold" }
                            : { color: "red", fontWeight: "bold" }
                        }
                      >
                        {request.SROApproval.status.toUpperCase()}
                      </td>
                    ) : (
                      <td>
                        <button
                          title="Approve"
                          className="lib-btn lib-approve"
                          onClick={() =>
                            handleLibraryRequest(request.requestId, "approved")
                          }
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          title="Reject"
                          className="lib-btn lib-reject"
                          onClick={() =>
                            handleLibraryRequest(request.requestId, "rejected")
                          }
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </td>
                    )}
                  </>
                )}
                <td>{calcEntryTime(request.SROApproval?.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibraryRequests;
