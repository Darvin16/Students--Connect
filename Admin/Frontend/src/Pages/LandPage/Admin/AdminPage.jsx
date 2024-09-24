import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";

function AdminPage() {
  const [entryBox, setEntryBox] = useState(false);
  const {
    staffEntryCount,
    setStaffEntryCount,
    addStaff,
    setAddStaff,
    handleAddStaff,
    addStaffResult,
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
            value={addStaff[i] || ""}
            onChange={(e) => {
              let updatedArray = [...addStaff];
              updatedArray[i] = e.target.value;
              setAddStaff(updatedArray);
            }}
            required
          />
        </td>
        {addStaffResult.length > 0 && addStaffResult[i] && (
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
            <td>{addStaffResult[i].status}</td>
          </>
        )}
      </tr>
    ));
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {entryBox && (
        <div>
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
              value={staffEntryCount}
              onChange={(e) => setStaffEntryCount(e.target.value)}
              required
              min={1}
            />
            <button type="submit">Enter</button>
            <button type="reset" onClick={() => setEntryBox(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <div>
        <h3>Staff Records</h3>
        <button
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
      {staffEntryCount > 0 && !entryBox && (
        <form onSubmit={(e) => handleAddStaff(e)}>
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
          <div>
            <button type="submit">Add</button>
            <button
              type="reset"
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
  );
}

export default AdminPage;
