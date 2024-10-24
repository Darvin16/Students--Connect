import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import "./StaffRecord.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEnvelope,
  faPhone,
  faBuilding,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../Component/Pagination/Pagination";

function StaffRecord() {
  const {
    fetchStaffRecords,
    staffRecords,
    selectedStaffs,
    setSelectedStaffs,
    handleRemoveStaff,
    imageAccessURL,
    dashboardInfo,
  } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [blockName, setBlockName] = useState("");
  const [deleteStaff, setDeleteStaff] = useState(false);

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

    if (blockName) {
      filteredStaffs = filteredStaffs.filter(
        (staff) => staff.blockName === blockName
      );
    }

    return filteredStaffs;
  }

  function staffDisplayFunction(data) {
    return (
      <div className="staff-records-container">
        {data.map((staff, index) => {
          return (
            <div key={index} className="staff-card">
              {deleteStaff && (
                <input
                  type="checkbox"
                  name="deleteCheckbox"
                  id="deleteCheckbox"
                  className="delete-checkbox"
                  checked={selectedStaffs.includes(staff.employeeId)}
                  onChange={() => handleSelectStaff(staff.employeeId)}
                />
              )}
              <div className="staff-info">
                <div className="staff-card-title">
                  <img
                    src={
                      staff.staffImage ? imageAccessURL + staff.staffImage : ""
                    }
                    alt={`${staff.name}'s Image`}
                  />
                  <div>
                    <p>{staff.name}</p>
                    <p>{staff.role}</p>
                  </div>
                </div>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faIdBadge} />
                  </span>
                  : {staff.employeeId}
                </p>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  : {staff.email}
                </p>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  : {staff.phone}
                </p>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faBuilding} />
                  </span>
                  : {staff.role !== "librarian" ? staff.blockName : "Library"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="staff-container">
      <div className="main-content">
        <h2>Employee Records</h2>
        <div className="staff-record-insights">
          <div className="staff-record-insight-card">
            <p>Activated Request</p>
            <p>{dashboardInfo.staffCount}</p>
          </div>
          <div className="staff-record-insight-card">
            <p>Total Users</p>
            <p>{dashboardInfo.staffActiveCount}</p>
          </div>
        </div>
        <div className="staff-records-filter">
          <select
            name="block-name"
            id="block-name"
            value={blockName}
            onChange={(e) => setBlockName(e.target.value)}
          >
            <option value="">Block</option>
            <option value="A-sannasi">A - Sannasi</option>
            <option value="B-thamarai">B - Thamari</option>
            <option value="C-malligai">C - Malligai</option>
            <option value="D-agasthiyar">D - Agasthiyar</option>
            <option value="E-nelson_mandela">E - Nelson Mandela</option>
            <option value="F-oori">F - Oori</option>
            <option value="G-paari">G - Paari</option>
          </select>
          <div className="staffSearch-holder">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="search"
              name="staffSearch"
              id="staffSearch"
              placeholder="Search here with id"
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

          {deleteStaff ? (
            <button
              className="staff-delete-cancel"
              onClick={() => {
                setDeleteStaff(false);
                setSelectedStaffs([]);
              }}
            >
              Cancel
            </button>
          ) : (
            <button className="delete-btn" onClick={() => setDeleteStaff(true)}>
              Delete
            </button>
          )}

          {selectedStaffs.length > 0 && (
            <button onClick={() => handleRemoveStaff()} className="delete-btn">
              Delete Selected
            </button>
          )}
        </div>
        <Pagination
          data={filterStaffs()}
          itemPerPage={6}
          displayFunction={staffDisplayFunction}
        />
      </div>
    </div>
  );
}

export default StaffRecord;
