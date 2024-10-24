import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTable,
  faFilter,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import "./StudentRecord.css";

function AdminStudentRecords() {
  const { studentRecords, fetchStudentRecords, studentUploadsURL } =
    useContext(AppContext);
  const [search, setSearch] = useState("");
  const [sortby, setSortby] = useState({
    blockName: "",
    department: "",
    yearOrder: "",
    nameOrder: "",
    yearFrom: "",
    yearTo: "",
  });
  const [academicYear, setAcademicYear] = useState(0);
  const [filterby, setFilterby] = useState("");
  const [sortType, setSortType] = useState("");

  function filterStudents() {
    let filteredStudents = [...studentRecords];

    if (search) {
      filteredStudents = filteredStudents.filter((student) =>
        student.studentId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortby.yearFrom.length === 4) {
      filteredStudents = filteredStudents.filter(
        (student) => student.academicYear >= parseInt(sortby.yearFrom)
      );
    }
    if (sortby.yearTo.length === 4) {
      filteredStudents = filteredStudents.filter(
        (student) => student.academicYear <= parseInt(sortby.yearTo)
      );
    }

    if (sortby.yearOrder) {
      filteredStudents = filteredStudents.filter(
        (student) => student.academicYear
      );
      if (sortby.yearOrder === "asc") {
        filteredStudents.sort((a, b) => a.academicYear - b.academicYear);
      } else if (sortby.yearOrder === "desc") {
        filteredStudents.sort((a, b) => b.academicYear - a.academicYear);
      }
    }

    if (sortby.nameOrder) {
      filteredStudents = filteredStudents.filter((student) => student.name);
      if (sortby.nameOrder === "asc") {
        filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortby.nameOrder === "desc") {
        filteredStudents.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    if (sortby.blockName) {
      filteredStudents = filteredStudents.filter(
        (student) => student.blockName === sortby.blockName
      );
    }
    if (sortby.department) {
      filteredStudents = filteredStudents.filter(
        (student) => student.department === sortby.department
      );
    }

    return filteredStudents;
  }

  useEffect(() => {
    fetchStudentRecords();
  }, []);

  return (
    <div className="student-record-page">
      <div className="student-records-filter-container">
        <div className="student-records-filter-header">
          <p
            onClick={() => {
              setSearch("");
              setSortby({
                blockName: "",
                department: "",
                yearOrder: "",
                nameOrder: "",
                yearFrom: "",
                yearTo: "",
              });
            }}
          >
            All Student
          </p>
          <p onClick={() => setFilterby("department")}>By Department</p>
          <p onClick={() => setFilterby("blockName")}>By Block Name</p>
          <p onClick={() => setFilterby("academicYear")}>Academic Year</p>
        </div>
        <hr />
        <div className="student-records-filter">
          <span>
            <FontAwesomeIcon icon={faTable} />
            &nbsp; Table
          </span>
          <span
            onClick={() => {
              setFilterby("none");
              setSortType("");
            }}
          >
            <FontAwesomeIcon icon={faFilter} />
            &nbsp; Filter
          </span>
          <span
            onClick={() => {
              setFilterby("");
              setSortType("none");
            }}
          >
            <FontAwesomeIcon icon={faArrowDownWideShort} />
            &nbsp; Sort
          </span>
          <div className="studentSearch-holder">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="search"
              name="studentSearch"
              id="studentSearch"
              placeholder="Search here"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <hr />
      {filterby && (
        <div className="filterby-box">
          <h4>Filter By:</h4>
          <span className="filterby-box-close" onClick={() => setFilterby("")}>
            ❌
          </span>
          <div
            style={{
              display: "grid",
            }}
          >
            <label htmlFor="filterby">where,</label>&nbsp;
            <select
              name="filterby"
              id="filterby"
              value={filterby}
              onChange={(e) => {
                setFilterby(e.target.value);
              }}
            >
              <option value="none">Select</option>
              <option value="department">Department</option>
              <option value="blockName">Block Name</option>
              <option value="academicYear">Academic year</option>
            </select>
            &nbsp;
            {filterby === "department" && (
              <select
                name="department-filter"
                id="department-filter"
                value={sortby.department}
                onChange={(e) =>
                  setSortby((s) => ({ ...s, department: e.target.value }))
                }
              >
                <option value="">Select Department</option>
                <optgroup label="Bachelor's Degrees">
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="B.C.A">B.C.A</option>
                  <option value="B.Arch">B.Arch</option>
                  <option value="B.Des">B.Des</option>
                  <option value="B.Pharm">B.Pharm</option>
                  <option value="B.B.A">B.B.A</option>
                  <option value="B.M.S">B.M.S</option>
                  <option value="B.Com">B.Com</option>
                  <option value="B.I.T">B.I.T</option>
                  <option value="B.Voc">B.Voc</option>
                  <option value="B.S">B.S</option>
                  <option value="B.F.A">B.F.A</option>
                  <option value="B.L">B.L</option>
                  <option value="B.Ed">B.Ed</option>
                  <option value="B.P.Ed">B.P.Ed</option>
                  <option value="B.F.Sc">B.F.Sc</option>
                  <option value="B.D.S">B.D.S</option>
                  <option value="B.H.M">B.H.M</option>
                  <option value="B.S.W">B.S.W</option>
                </optgroup>
                <optgroup label="Master's Degrees">
                  <option value="M.Sc">M.Sc</option>
                  <option value="M.C.A">M.C.A</option>
                  <option value="M.Arch">M.Arch</option>
                  <option value="M.Des">M.Des</option>
                  <option value="M.B.A">M.B.A</option>
                  <option value="M.S">M.S</option>
                  <option value="M.Pharm">M.Pharm</option>
                  <option value="M.Com">M.Com</option>
                  <option value="M.Phil">M.Phil</option>
                  <option value="M.Voc">M.Voc</option>
                  <option value="M.F.A">M.F.A</option>
                  <option value="M.Ed">M.Ed</option>
                  <option value="M.P.Ed">M.P.Ed</option>
                  <option value="M.L">M.L</option>
                  <option value="M.F.Sc">M.F.Sc</option>
                  <option value="M.D">M.D</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="M.Sc">M.Sc</option>
                </optgroup>
              </select>
            )}
            {filterby === "blockName" && (
              <select
                name="blockName-filter"
                id="blockName-filter"
                value={sortby.blockName}
                onChange={(e) =>
                  setSortby((s) => ({ ...s, blockName: e.target.value }))
                }
              >
                <option value="">Select Block</option>
                <option value="A-sannasi">A - Sannasi</option>
                <option value="B-thamarai">B - Thamari</option>
                <option value="C-malligai">C - Malligai</option>
                <option value="D-agasthiyar">D - Agasthiyar</option>
                <option value="E-nelson_mandela">E - Nelson Mandela</option>
                <option value="F-oori">F - Oori</option>
                <option value="G-paari">G - Paari</option>
              </select>
            )}
            {filterby === "academicYear" && (
              <span style={{ textWrap: "nowrap" }}>
                <label htmlFor="from">From</label>&nbsp;
                <input
                  type="number"
                  name="academic-year"
                  id="from"
                  minLength={4}
                  max={new Date().getFullYear()}
                  placeholder={new Date().getFullYear() - 4}
                  onChange={(e) => {
                    if (e.target.value > new Date().getFullYear()) {
                      return alert("Invalid Year");
                    }
                    setSortby((prev) => ({
                      ...prev,
                      yearFrom: e.target.value,
                    }));
                  }}
                />
                &nbsp;
                <label htmlFor="to">To</label>&nbsp;
                <input
                  type="number"
                  name="academic-year"
                  id="to"
                  minLength={4}
                  max={new Date().getFullYear()}
                  placeholder={new Date().getFullYear()}
                  onChange={(e) => {
                    if (e.target.value > new Date().getFullYear()) {
                      return alert("Invalid Year");
                    }
                    setSortby((prev) => ({ ...prev, yearTo: e.target.value }));
                  }}
                />
              </span>
            )}
          </div>
        </div>
      )}
      {sortType && (
        <div className="sortby-box">
          <h4>Sort by:</h4>
          <span className="filterby-box-close" onClick={() => setSortType("")}>
            ❌
          </span>
          <select
            name="sortby"
            id="sortby"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="none">Select</option>
            <option value="name">Name</option>
            <option value="year">Year</option>
          </select>
          {sortType === "name" && (
            <select
              name="sortby-name"
              id="sortby-name"
              onChange={(e) =>
                setSortby((prev) => ({ ...prev, nameOrder: e.target.value }))
              }
            >
              <option value="">Select</option>
              <option value="asc">Ascending (A→Z)</option>
              <option value="desc">Descending (Z→A)</option>
            </select>
          )}
          {sortType === "year" && (
            <select
              name="sortby-year"
              id="sortby-year"
              onChange={(e) =>
                setSortby((prev) => ({ ...prev, yearOrder: e.target.value }))
              }
            >
              <option value="">Select</option>
              <option value="asc">Ascending (1→9)</option>
              <option value="desc">Descending (9→1)</option>
            </select>
          )}
        </div>
      )}
      <div className="student-record-container">
        <div className="student-record-container-group student-record-container-group-title">
          <p>
            <b>Sign No</b>
          </p>
          <p>
            <b>Image</b>
          </p>
          <p>
            <b>Name</b>
          </p>
          <p>
            <b>Student Id</b>
          </p>
          <p>
            <b>Block Name</b>
          </p>
          <p>
            <b>Room No</b>
          </p>
          <p>
            <b>Department</b>
          </p>
          <p>
            <b>Academic Year</b>
          </p>
          <p>
            <b>Contact No</b>
          </p>
        </div>
        {filterStudents().map((student, index) => {
          return (
            <div
              key={student.studentId}
              className="student-record-container-group"
            >
              <p>{index + 1}</p>
              <img
                src={
                  student.studentImage
                    ? studentUploadsURL + student.studentImage
                    : ""
                }
                alt={`${student.name}'s image`}
              />
              <p>{student.name ? student.name : "-"}</p>
              <p>{student.studentId}</p>
              <p>{student.blockName ? student.blockName : "-"}</p>
              <p>{student.roomNumber ? student.roomNumber : "-"}</p>
              <p>{student.department ? student.department : "-"}</p>
              <p>{student.academicYear ? student.academicYear : "-"}</p>
              <p>{student.phone ? student.phone : "-"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminStudentRecords;
