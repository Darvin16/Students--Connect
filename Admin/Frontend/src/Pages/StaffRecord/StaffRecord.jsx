import React, { useContext, useEffect } from "react";
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
  } = useContext(AppContext);

  useEffect(() => {
    fetchStaffRecords();
  }, []);
  return (
    <div>
      <div>
        <button onClick={() => setIsAddingStaff(true)}>Add Staff</button>
      </div>
      {isAddingStaff && <AddStaff />}
      {editStaff && <EditStaff/>}
      {staffRecords.map((staff) => {
        return (
          <div key={staff.employeeId}>
            <p>Employee ID: {staff.employeeId}</p>
            <p>Name: {staff.name}</p>
            <p>Role: {staff.role}</p>
            <div>
              <button onClick={()=>setEditStaff({...staff,previousEmployeeId:staff.employeeId})}>Edit</button><button>Remove</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StaffRecord;
