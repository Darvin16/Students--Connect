import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import { useEffect } from "react";

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
      <em>
        <h2>{userData?.role === "warden" ? "Warden" : "SRO"} Dashboard</h2>
      </em>
      <div className="dashboard-cards">
        <div className="card"><p>{dashboardInfo.leaveRequestsCount}</p>Leave Request</div>
        <div className="card"><p>{dashboardInfo.studentActiveCount}</p>Student Enrolled</div>
        <div className="card"><p>{dashboardInfo.libraryRequestsCount}</p>Library Requests</div>
        <div className="card"><p>{dashboardInfo.studentCount}</p>Total Student List</div>
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
  );
}

export default WardenPage;
