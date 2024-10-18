import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import "./StaffRecord.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function StaffRecord() {
  const {
    fetchStaffRecords,
    staffRecords,
    selectedStaffs,
    setSelectedStaffs,
    handleRemoveStaff,
    imageAccessURL,
  } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    fetchStaffRecords();
  }, []);

  function handleSelectStaff(id) {
    if (selectedStaffs.includes(id)) {
      setSelectedStaffs(selectedStaffs.filter((staffId) => staffId !== id));
    } else {
      setSelectedStaffs([...selectedStaffs, id]);
    }
  }

  function filterStaffs() {
    let filteredStaffs = [...staffRecords];

    if (search) {
      filteredStaffs = filteredStaffs.filter((staff) =>
        staff.employeeId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (position) {
      filteredStaffs = filteredStaffs.filter(
        (staffs) => staffs.role === position
      );
    }

    return filteredStaffs;
  }
  return (
    <div className="staff-container">
      <div className="main-content">
        <h2>Staff Records</h2>
        <hr />
        <div className="staff-records-filter">
          <div className="staffSearch-holder">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="search"
              name="staffSearch"
              id="staffSearch"
              placeholder="Search here"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            name="position-filter"
            id="position-filter"
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="">Position</option>
            <option value="warden">Warden</option>
            <option value="SRO">SRO</option>
            <option value="supervisor">Supervisor</option>
            <option value="librarian">Librarian</option>
          </select>
        </div>
        {selectedStaffs.length > 0 && (
          <button onClick={() => handleRemoveStaff()} className="delete-btn">
            Delete Selected
          </button>
        )}
        <div className="staff-records-container">
          {filterStaffs().map((staff) => {
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
                  <img
                    src={
                      staff.staffImage ? imageAccessURL + staff.staffImage : ""
                    }
                    alt={`${staff.name}'s Image`}
                  />
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
