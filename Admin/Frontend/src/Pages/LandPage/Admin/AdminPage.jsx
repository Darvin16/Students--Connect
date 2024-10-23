import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import "./AdminPage.css"; // CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function AdminPage() {
  const [entryBox, setEntryBox] = useState(false);
  const {
    staffEntryCount,
    setStaffEntryCount,
    addStaff,
    setAddStaff,
    handleAddStaff,
    addStaffResult,
    dashboardInfo,
    setAddStaffResult,
  } = useContext(AppContext);

  function genInputBox() {
    return Array.from({ length: staffEntryCount }, (_, i) => (
      <tr key={i}>
        <td>
          <label htmlFor={`employeeId-${i}`}>{i + 1}: </label>
        </td>
        <td>
          <input
            type="text"
            name="employeeId"
            id={`employeeId-${i}`}
            className="input-field"
            value={addStaff[i] || ""}
            onChange={(e) => {
              let updatedArray = [...addStaff];
              updatedArray[i] = e.target.value;
              setAddStaff(updatedArray);
            }}
            required
          />
        </td>
        {addStaffResult.length > 0 && addStaffResult[i] ? (
          <>
            <td>
              {new Date(addStaffResult[i].createdOn).toLocaleString("en-Gb", {
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
                  ${addStaffResult[i].status === "Activated" && "Activated"}
              ${addStaffResult[i].status === "Duplicate" && "Duplicate"} 
              ${addStaffResult[i].status === "Error" && "Error"}`}
              >
                {addStaffResult[i].status}
              </p>
            </td>
          </>
        ):<><td></td><td></td></>}
      </tr>
    ));
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-greeting">
        <em>
          <h1>Hello Admin,</h1>
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
            Total Staff Count<p>{dashboardInfo.staffCount}</p>
          </div>
          <div className="card">
            Active Entries <p>{dashboardInfo.staffCount}</p>
          </div>
          <div className="card">
            Total Students<p>{dashboardInfo.studentCount}</p>
          </div>
          <div className="card">
            Active Students<p>{dashboardInfo.studentActiveCount}</p>
          </div>
          <div className="card">
            Library Requests<p>{dashboardInfo.libraryRequestsCount}</p>
          </div>
          <div className="card">
            Leave Requests<p>{dashboardInfo.leaveRequestsCount}</p>
          </div>
        </div>
      </div>
      <div className="staff-record-container">
        <div className="staff-records">
          <h3>Staff Entries</h3>
          <button
            className="btn add-staff-btn"
            onClick={() => {
              setEntryBox((prev) => !prev);
              setStaffEntryCount(0);
              setAddStaff([]);
              setAddStaffResult([]);
            }}
          >
            + Add Staff Entry
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
              <label htmlFor="noOfEntries">No. of Entries:&nbsp;</label>
              <input
                type="number"
                id="noOfEntries"
                name="noOfEntries"
                value={staffEntryCount}
                onChange={(e) => setStaffEntryCount(e.target.value)}
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

        {staffEntryCount > 0 && !entryBox && (
          <form onSubmit={(e) => handleAddStaff(e)} className="staff-form">
            <table className="add-staff-table">
              <thead>
                <tr>
                  <th>Staff Entry</th>
                  <th>Employee ID</th>
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
                  setStaffEntryCount(0);
                  setAddStaff([]);
                  setAddStaffResult([]);
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

export default AdminPage;
