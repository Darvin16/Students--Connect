import React, { useContext, useEffect, useState } from "react";
import AddStaff from "./AddStaff";
import { AppContext } from "../../Context/AppContext";
import EditStaff from "./EditStaff";

function StaffRecord() {
  const {
    editStaff,
    setEditStaff,
    fetchStaffRecords,
    staffRecords,
    selectedStaffs,
    setSelectedStaffs,
    handleRemoveStaff,
  } = useContext(AppContext);

  function handleSelectStaff(id) {
    if (selectedStaffs.includes(id)) {
      setSelectedStaffs(selectedStaffs.filter((staffId) => staffId !== id));
    } else {
      setSelectedStaffs([...selectedStaffs, id]);
    }
  }

  useEffect(() => {
    fetchStaffRecords();
  }, []);

  return (
    <div>
      <h2>Staff Records</h2>
      {selectedStaffs.length > 0 && (
        <button onClick={() => handleRemoveStaff()}>Delete</button>
      )}
      <div>
        {staffRecords.map((staff) => {
          return (
            <div key={staff.employeeId}>
              <input
                type="checkbox"
                name="deleteCheckbox"
                id="deleteCheckbox"
                checked={selectedStaffs.includes(staff.employeeId)}
                onChange={() => handleSelectStaff(staff.employeeId)}
              />
              <p>Employee ID: {staff.employeeId}</p>
              <p>Name: {staff.name}</p>
              <p>Role: {staff.role}</p>
              <p>BlockName:{staff.blockName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StaffRecord;
