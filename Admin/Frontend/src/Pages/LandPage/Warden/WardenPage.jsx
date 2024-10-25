import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "./WardenPage.css";

function WardenPage() {
  const [entryBox, setEntryBox] = useState(false);
  const {
    userData,
    studentEntryCount,
    setStudentEntryCount,
    addStudent,
    setAddStudent,
    handleAddStudent,
    addStudentResult,
    setAddStudentResult,
    fetchDashboardInfo,
    dashboardInfo,
  } = useContext(AppContext);

  useEffect(() => {
    if (Object.keys(dashboardInfo).length === 0) {
      fetchDashboardInfo();
    }
  }, [dashboardInfo]);

  function genInputBox() {
    return Array.from({ length: studentEntryCount }, (_, i) => (
      <tr key={i}>
        <td>
          <label htmlFor={`studentId-${i}`}>{i + 1}: </label>
        </td>
        <td>
          <input
            type="text"
            name="studentId"
            id={`studentId-${i}`}
            className="input-field"
            value={addStudent[i] || ""}
            onChange={(e) => {
              let updatedArray = [...addStudent];
              updatedArray[i] = e.target.value;
              setAddStudent(updatedArray);
            }}
            required
          />
        </td>
        {addStudentResult.length > 0 && addStudentResult[i] && (
          <>
            <td>
              {new Date(addStudentResult[i].createdOn).toLocaleString("en-Gb", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </td>
            <td className={`add-staff`}>
              <p
                className={`
                  ${addStudentResult[i].status === "Activated" && "Activated"}
              ${addStudentResult[i].status === "Duplicate" && "Duplicate"} 
              ${addStudentResult[i].status === "Error" && "Error"}`}
              >
                {addStudentResult[i].status}
              </p>
            </td>
          </>
        )}
      </tr>
    ));
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-greeting">
        <em>
          <h1>{userData?.role === "warden" ? "Warden" : "SRO"} Dashboard</h1>
        </em>
        <span>
          {new Date()
            .toLocaleString("en-Gb", {
              month: "short",
              day: "numeric",
            })
            .replace(" ", "-")}
          &nbsp;
          <FontAwesomeIcon icon={faCalendarDays} />
        </span>
      </div>
      <div className="dashboard-insights">
        <h2>View Insights</h2>

        <div className="dashboard-cards">
          <div className="card">
            Leave Request<p>{dashboardInfo.leaveRequestsCount}</p>
          </div>
          <div className="card">
            Student Enrolled<p>{dashboardInfo.studentActiveCount}</p>
          </div>
          <div className="card">
            Library Requests<p>{dashboardInfo.libraryRequestsCount}</p>
          </div>
          <div className="card">
            Total Student List<p>{dashboardInfo.studentCount}</p>
          </div>
        </div>
      </div>
      <div className="staff-record-container">
        <div className="staff-records">
          <h3>Student Records</h3>
          <button
            className="btn add-staff-btn"
            onClick={() => {
              setEntryBox((prev) => !prev);
              setStudentEntryCount(0);
              setAddStudent([]);
              setAddStudentResult([]);
            }}
          >
            + Add Student Entry
          </button>
        </div>

        {entryBox && (
          <div className="entry-box">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEntryBox(false);
              }}
            >
              <label htmlFor="noOfEntries">No. of Entries : </label>
              <input
                type="number"
                id="noOfEntries"
                name="noOfEntries"
                value={studentEntryCount}
                onChange={(e) => setStudentEntryCount(e.target.value)}
                required
                min={1}
              />
              <button type="submit" className="btn">
                Enter
              </button>
              <button
                type="reset"
                className="btn cancel"
                onClick={() => setEntryBox(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {studentEntryCount > 0 && !entryBox && (
          <form onSubmit={(e) => handleAddStudent(e)}>
            <table className="add-staff-table">
              <thead>
                <tr>
                  <th>Student Entry</th>
                  <th>Student ID</th>
                  <th>Created On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{genInputBox()}</tbody>
            </table>
            <div className="form-buttons">
              <button type="submit" className="btn">
                Add
              </button>
              <button
                type="reset"
                className="btn cancel"
                onClick={() => {
                  setStudentEntryCount(0);
                  setAddStudent([]);
                  setAddStudentResult([]);
                }}
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default WardenPage;
