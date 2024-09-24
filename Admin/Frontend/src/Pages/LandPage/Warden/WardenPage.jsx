import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";

function WardenPage() {
  const [entryBox, setEntryBox] = useState(false);
  const {
    studentEntryCount,
    setStudentEntryCount,
    addStudent,
    setAddStudent,
    handleAddStudent,
    addStudentResult,
    setAddStudentResult,
  } = useContext(AppContext);

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
            <td>{addStudentResult[i].status}</td>
          </>
        )}
      </tr>
    ));
  }

  return (
    <div>
      <h2>Warden Dashboard</h2>
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
              value={studentEntryCount}
              onChange={(e) => setStudentEntryCount(e.target.value)}
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
            setStudentEntryCount(0);
            setAddStudent([]);
            setAddStudentResult([]);
          }}
        >
          + Add Staff Entry
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
          <div>
            <button type="submit">Add</button>
            <button
              type="reset"
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
