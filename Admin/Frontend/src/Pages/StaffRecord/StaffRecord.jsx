import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import "./StaffRecord.css"; // Add this file for custom styling

function StaffRecord() {
  const {
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
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3 className="sidebar-title">Algectra</h3>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>Attendance</li>
          <li>Calendar</li>
          <li>Leave</li>
          <li>Posts</li>
          <li>Employees</li>
          <li>Reports</li>
          <li>Configuration</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Staff Records</h2>
        {selectedStaffs.length > 0 && (
          <button onClick={() => handleRemoveStaff()} className="delete-btn">
            Delete Selected
          </button>
        )}
        <div className="staff-records-container">
          {staffRecords.map((staff) => {
            return (
              <div key={staff.employeeId} className="staff-card">
                <input
                  type="checkbox"
                  name="deleteCheckbox"
                  id="deleteCheckbox"
                  className="delete-checkbox"
                  checked={selectedStaffs.includes(staff.employeeId)}
                  onChange={() => handleSelectStaff(staff.employeeId)}
                />
                <div className="staff-info">
                  <p>Employee ID: {staff.employeeId}</p>
                  <p>Name: {staff.name}</p>
                  <p>Role: {staff.role}</p>
                  <p>Block: {staff.blockName}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StaffRecord;
