import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function AddStaff() {
  const { addStaff, handleAddStaff, setAddStaff, setIsAddingStaff } =
    useContext(AppContext);
  return (
    <div>
      <h1>Add staff</h1>
      <form onSubmit={(e) => handleAddStaff(e)}>
        <div>
          <label htmlFor="employeeId">Employee Id:</label>
          <input
            type="text"
            name="employeeId"
            id="employeeId"
            onChange={(e) =>
              setAddStaff((prev) => ({ ...prev, employeeId: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <button type="submit">Add</button>
          <button type="reset" onClick={() => setIsAddingStaff(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStaff;
