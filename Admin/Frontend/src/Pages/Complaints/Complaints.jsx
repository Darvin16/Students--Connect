import React, { useContext, useMemo, useState } from "react";
import "./complaints.css";
import { AppContext } from "../../Context/AppContext";

function Complaints() {
  const { complaints } = useContext(AppContext);
  const [filters, setFilters] = useState({
    id: "",
    issueType: "",
    blockName: "",
  });
  const issueOptions = [
    "Fans Fix",
    "WiFi Issues",
    "Water Issues",
    "AC Issues",
    "Ragging Issues",
    "Others",
  ];

  const handleFilters = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredComplaints = useMemo(() => {
    let items = [...complaints];
    const { id, issueType, blockName } = filters;
    items = items.filter((item) => {
      const { studentId, issue, studentBlockName } = item;
      return (
        (!id || studentId === id) &&
        (!issueType || issue === issueType) &&
        (!blockName || studentBlockName === blockName)
      );
    });
    return items;
  }, [filters, complaints]);

  return (
    <div className="complaints container">
      <div className="row title mt-2">
        <h4 className=" col-12 col-md-6 d-flex align-items-center">
          Complaint Management
        </h4>
        <search className="col-12 col-md-6 input-group w-auto align-items-center ms-md-auto flex-grow-1 mb-2">
          <div className="input-group-text">🔍</div>
          <input
            type="search"
            name="id"
            id="search-id"
            className="form-control"
            placeholder="Seacrh by id"
            value={filters.id}
            onChange={handleFilters}
          />
        </search>
      </div>
      <hr className="m-0 opacity-100" />
      <div className="row row-gap-2 filter mt-2">
        <div className="col-12 col-md-6 d-flex align-items-center">
          <p className="m-0 bg-info p-1 rounded text-white flex-grow-1 flex-md-grow-0">
            <b className="border-end">📅</b> {new Date().toDateString("en-Gb")}
          </p>
        </div>
        <div className="col-md-6 d-flex flex-wrap flex-md-nowrap gap-2 justify-content-end">
          <select
            name="issueType"
            className="p-1 rounded border-secondary-subtle flex-grow-1 flex-md-grow-0"
            value={filters.issueType}
            onChange={handleFilters}
            required
          >
            <option value="">--Select an Issue--</option>
            {issueOptions.map((issue, index) => (
              <option key={index} value={issue}>
                {issue}
              </option>
            ))}
          </select>
          <select
            name="blockName"
            id="blockName"
            className="p-1 rounded border-secondary-subtle flex-grow-1 flex-md-grow-0"
            value={filters.blockName}
            onChange={handleFilters}
            required
          >
            <option value="">--Select Block--</option>
            <option value="A-sannasi">A - Sannasi</option>
            <option value="B-thamarai">B - Thamari</option>
            <option value="C-malligai">C - Malligai</option>
            <option value="D-agasthiyar">D - Agasthiyar</option>
            <option value="E-nelson_mandela">E - Nelson Mandela</option>
            <option value="F-oori">F - Oori</option>
            <option value="G-paari">G - Paari</option>
          </select>
          <button
            className="btn btn-secondary m-0"
            onClick={() =>
              setFilters({
                id: "",
                issueType: "",
                blockName: "",
              })
            }
          >
            Reset
          </button>
        </div>
      </div>
      <div className="row m-0 complaint-table mt-3">
        <table>
          <thead>
            <tr className="row m-0 row-cols-6 py-1 shadow bg-primary rounded-2 text-white text-center mb-2">
              <th>Student Id</th>
              <th>Block Name</th>
              <th>Room no</th>
              <th>Issue</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => {
              return (
                <tr
                  key={complaint._id}
                  className="row m-0 row-cols-6 py-1 shadow rounded-2 text-center mb-2 d-flex align-items-center"
                >
                  <td>{complaint.studentId}</td>
                  <td>{complaint.studentBlockName}</td>
                  <td>{complaint.studentRoomNumber}</td>
                  <td>{complaint.issue}</td>
                  <td className="d-flex justify-content-center">
                    <button className="bg-primary text-white border-0 p-2 fs-6 rounded-circle d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-file-earmark-arrow-down"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                      </svg>
                    </button>
                  </td>
                  <td className="text-capitalize">{complaint.status.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Complaints;
