import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./StudentRecord.css";

function StudentRecord() {
  const {
    userData,
    studentRecords,
    selectedStudents,
    setSelectedStudents,
    handleDeleteStudent,
    fetchStudentRecords,
  } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [sortby, setSortby] = useState({
    blockName: "",
    department: "",
  });
  const [academicYear, setAcademicYear] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  function handleSelectStudent(id) {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((studId) => studId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  }

  function filterStudents() {
    let filteredStudents = [...studentRecords];

    if (search) {
      filteredStudents = filteredStudents.filter((student) =>
        student.studentId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (academicYear !== 0) {
      filteredStudents = filteredStudents.filter((student) =>
        student.academicYear.toString().includes(academicYear)
      );
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

  if (userData.role === "SRO") {
    return (
      <div className="student-record-page">
        <div className="student-records-filter-container">
          <h2>Student Records</h2>
          <hr />
          <div className="student-records-filter">
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
            <select
              name="blockName-filter"
              id="blockName-filter"
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
            <select
              name="department-filter"
              id="department-filter"
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
          </div>
          <div className="filterby-year">
            <label htmlFor="academic-year">
              <b>Academic Year: </b>
            </label>
            <input
              type="number"
              name="academic-year"
              id="academic-year"
              onChange={(e) => setAcademicYear(e.target.value)}
            />
          </div>
        </div>
        <div className="student-record-container">
          <div className="student-record-container-group student-record-container-group-title">
            <p>
              <b>Sign No</b>
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

  return (
    <div className="student-record-page">
      <div className="student-records-filter-container">
        <h2>Student Records</h2>
        <hr />
        <div className="student-records-filter">
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
          <select
            name="blockName-filter"
            id="blockName-filter"
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
          <select
            name="department-filter"
            id="department-filter"
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
        </div>
        <div className="filterby-year">
          <label htmlFor="academic-year">
            <b>Academic Year: </b>
          </label>
          <input
            type="number"
            name="academic-year"
            id="academic-year"
            onChange={(e) => setAcademicYear(e.target.value)}
          />
        </div>
        <div className="student-record-delete">
          {selectedStudents.length > 0 && (
            <button onClick={() => handleDeleteStudent()}>
              Delete Selected
            </button>
          )}
          <button
            className={`student-delete-btn ${
              showDelete ? "student-delete-cancel" : ""
            }`}
            onClick={() => {
              setShowDelete((prev) => !prev);
              setSelectedStudents([]);
            }}
          >
            {showDelete ? "Cancel" : "Delete"}
          </button>
        </div>
      </div>
      <div className="student-record-container">
        <div className="student-record-container-group student-record-container-group-title">
          {showDelete && (
            <p>
              <b>Select</b>
            </p>
          )}
          <p>
            <b>Sign No</b>
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
              {showDelete && (
                <input
                  type="checkbox"
                  name="deleteCheckbox"
                  id="deleteCheckbox"
                  checked={selectedStudents.includes(student.studentId)}
                  onChange={() => handleSelectStudent(student.studentId)}
                />
              )}
              <p>{index + 1}</p>
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

export default StudentRecord;
