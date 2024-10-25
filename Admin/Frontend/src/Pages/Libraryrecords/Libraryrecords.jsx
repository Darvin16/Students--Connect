import React, { useContext, useEffect, useState } from "react";
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
  faHourglassEnd,
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
    dashboardInfo,
  } = useContext(AppContext);

  const [sortby, setSortby] = useState({
    id: "",
    academicYear: "",
    department: "",
    delayList: false,
  });

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

  const calcDelayTime = (time) => {
    if (!time) {
      return "-";
    }

    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : ``} ${
      remainingMinutes > 0
        ? `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
        : ""
    }`;
  };

  const filterRequest = () => {
    let filteredRequests = [...libraryRequests];

    if (sortby.id) {
      filteredRequests = filteredRequests.filter(
        (req) => req.studentId === sortby.id
      );
    }
    if (sortby.academicYear.length >= 4) {
      filteredRequests = filteredRequests.filter(
        (req) => req.studentAcademicYear === parseInt(sortby.academicYear)
      );
    }
    if (sortby.department) {
      filteredRequests = filteredRequests.filter(
        (req) => req.studentDepartment === sortby.department
      );
    }
    if (sortby.delayList) {
      filteredRequests = filteredRequests.filter((req) => req.delayTime);
    }

    return filteredRequests;
  };

  if (!userData) {
    return <div>Loading...</div>;
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
          <p>{userData.role === "librarian" ? "Entry" : "Approved"}</p>
          <p>{userData.role === "librarian" ? "Exit" : "Rejected"}</p>
          <p>Pending</p>
          <p>{dashboardInfo.libraryRequestsCount}</p>
          <p className="lib-starus-border">
            {userData.role === "librarian"
              ? dashboardInfo.entryStatus
              : dashboardInfo.approvedLibraryRequests}
          </p>
          <p className="lib-starus-border">
            {userData.role === "librarian"
              ? dashboardInfo.exitStatus
              : dashboardInfo.rejectedLibraryRequests}
          </p>
          <p className="lib-starus-border">
            {userData.role === "librarian"
              ? dashboardInfo.pendingStatus
              : dashboardInfo.pendingLibraryRequests}
          </p>
        </div>
        <div className="library-request-delay-summary">
          <div>
            <img src={delayIcon} alt="Icon of clock with exclamation" />
            <h3>Delay Hours Summmery</h3>
          </div>
          <p>Overtime Students</p>
          <p>Avarage Delay per Week</p>
          <p>{dashboardInfo.delayedLibraryEntry}</p>
          <p className="lib-starus-border">{dashboardInfo.averageDelay}</p>
        </div>
      </div>

      <div className="library-request-filters">
        <div
          className="library-filter-1"
          style={
            userData.role === "librarian"
              ? {
                  flex: "1",
                }
              : {}
          }
        >
          <div
            className="lib-filter-1-grp"
            style={
              userData.role === "librarian"
                ? {
                    flex: "1",
                    display: "flex",
                    alignItems: "center",
                  }
                : {}
            }
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            &nbsp;
            <input
              type="search"
              name="library-search"
              id="library-search"
              placeholder="Search by id"
              value={sortby.id}
              style={
                userData.role === "librarian"
                  ? {
                      flex: "1",
                    }
                  : {}
              }
              onChange={(e) =>
                setSortby((prev) => ({ ...prev, id: e.target.value }))
              }
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
              value={sortby.academicYear}
              onChange={(e) =>
                setSortby((prev) => ({ ...prev, academicYear: e.target.value }))
              }
            />
          </div>
          <div className="lib-filter-1-grp">
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
          <div className="lib-filter-1-grp">
            <label htmlFor="delay-filter">
              <FontAwesomeIcon icon={faFilter} />
              &nbsp; Delay Filter
            </label>
            &nbsp;
            <input
              type="checkbox"
              name="delay-filter"
              id="delay-filter"
              checked={sortby.delayList}
              onChange={(e) =>
                setSortby((prev) => ({ ...prev, delayList: !prev.delayList }))
              }
            />
          </div>
        </div>
        {userData.role !== "librarian" && (
          <div className="library-filter-2">
            <div
              className="lib-filter-2-approve"
              onClick={() => handleLibraryRequest("all", "approved")}
            >
              <FontAwesomeIcon icon={faCheck} />
              &nbsp;
              <span>Approve All</span>
            </div>
            <div
              className="lib-filter-2-reject"
              onClick={() => handleLibraryRequest("all", "rejected")}
            >
              <FontAwesomeIcon icon={faXmark} />
              &nbsp;
              <span>Reject All</span>
            </div>
          </div>
        )}
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
              {sortby.delayList && (
                <th>
                  <FontAwesomeIcon icon={faHourglassEnd} />
                  &nbsp;Delayed Time
                </th>
              )}
              <th>
                <FontAwesomeIcon icon={faClock} />
                &nbsp;IN Time
              </th>
              <th>
                <FontAwesomeIcon icon={faClock} />
                &nbsp;OUT Time
              </th>
            </tr>
          </thead>
          <tbody>
            {filterRequest().map((request) => (
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
                {userData.role === "librarian" ? (
                  request.in ? (
                    <>
                      {request.out ? (
                        <td>Student Left</td>
                      ) : (
                        <td>
                          <button
                            className="lib-btn lib-reject"
                            onClick={() =>
                              handleLibraryRequest(request.requestId, "out")
                            }
                          >
                            OUT
                          </button>
                        </td>
                      )}
                    </>
                  ) : (
                    <td>
                      <button
                        className="lib-btn lib-approve"
                        onClick={() =>
                          handleLibraryRequest(request.requestId, "in")
                        }
                      >
                        IN
                      </button>
                    </td>
                  )
                ) : userData.role === "warden" ? (
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
                <td>
                  {request.SROApproval?.status === "approved"
                    ? calcEntryTime(request.SROApproval?.time)
                    : "-"}
                </td>
                {sortby.delayList && (
                  <>
                    <td>{calcDelayTime(request.delayTime)}</td>
                  </>
                )}
                <td>
                  {request.in
                    ? new Date(request.in.time).toLocaleString("en-GB", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                    : "-"}
                </td>
                <td>
                  {request.out
                    ? new Date(request.out.time).toLocaleString("en-GB", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibraryRequests;
