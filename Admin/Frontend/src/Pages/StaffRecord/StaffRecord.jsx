import React, { useContext, useEffect } from "react";
import AddStaff from "./AddStaff";
import { AppContext } from "../../Context/AppContext";

function StaffRecord() {
  const { isAddingStaff, setIsAddingStaff, fetchStaffRecords, staffRecords, } =
    useContext(AppContext);

  useEffect(() => {
    fetchStaffRecords();
  }, []);
  return (
    <div>
      <div>
        <button onClick={() => setIsAddingStaff(true)}>Add Staff</button>
      </div>
      {isAddingStaff && <AddStaff />}
      {staffRecords.map((staff) => {
        return (
          <div key={staff.employeeId}>
            <p>Employee ID: {staff.employeeId}</p>
            <p>Name: {staff.name}</p>
            <p>Role: {staff.role}</p>
          </div>
        )
      })}
    </div>
  );
}

export default StaffRecord;
