import React, { useContext, useEffect, useState } from "react";
import AddStaff from "./AddStaff";
import { AppContext } from "../../Context/AppContext";
import EditStaff from "./EditStaff";

function StaffRecord() {
  const {
    isAddingStaff,
    setIsAddingStaff,
    editStaff,
    setEditStaff,
    fetchStaffRecords,
    staffRecords,
    handleRemoveStaff,
  } = useContext(AppContext);

  const [removeStaff, setRemoveStaff] = useState(null);

  useEffect(() => {
    fetchStaffRecords();
  }, []);
  return (
    <div>
      <div>
        <button onClick={() => setIsAddingStaff(true)}>Add Staff</button>
      </div>
      {isAddingStaff && <AddStaff />}
      {removeStaff && (
        <div>
          <p>Are you sure you want to remove {removeStaff.name}?</p>
          <button
            onClick={() => {
              handleRemoveStaff(removeStaff.employeeId);
              setRemoveStaff(null);
            }}
          >
            Yes
          </button>
          <button onClick={() => setRemoveStaff(null)}>No</button>
        </div>
      )}
      {staffRecords.map((staff) => {
        return (
          <div key={staff.employeeId}>
            <p>Employee ID: {staff.employeeId}</p>
            <p>Name: {staff.name}</p>
            <p>Role: {staff.role}</p>
            <p>BlockName:{staff.blockName}</p>
            <div>
              <button onClick={() => setRemoveStaff(staff)}>Remove</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StaffRecord;
