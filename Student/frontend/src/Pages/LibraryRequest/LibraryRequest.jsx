import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import "./LibraryRequest.css";

function LibraryRequest() {
  const { userData, sendLibraryRequest } = useContext(AppContext);

  const [libraryRequestData, setLibraryRequestData] = useState({
    phone: "",
    name: "",
    academicYear: "",
    department: "",
    branchName: "",
    blockName: "",
    roomNumber: "",
    description: "",
    terms_conditions: false,
  });
  const [autofill, setAutofill] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (autofill && userData) {
      setLibraryRequestData({
        phone: userData.phone || "",
        name: userData.name || "",
        academicYear: userData.academicYear || "",
        department: userData.department || "",
        branchName: userData.branchName || "",
        blockName: userData.blockName || "",
        roomNumber: userData.roomNumber || "",
        description: "",
        terms_conditions: false,
      });
    }
  }, [autofill, userData]);

  return (
    <div className="library-request-page">
      <div className="library-request-header">
        <h2>Raise Request</h2>
        <hr />
      </div>
      <div className="library-request-form-container">
        <div className="library-request-form-header">
          <h3>Student Details</h3>
          <button onClick={() => setAutofill(true)}>Auto-fill</button>
        </div>
        <form
          className="library-request-form"
          onSubmit={(e) => {
            e.preventDefault();
            setShowPreview(true);
          }}
        >
          <div className="library-request-form-group-1">
            <div className="library-request-group">
              <label htmlFor="contact_no">Contact No:</label>
              <input
                type="text"
                name="contact_no"
                id="contact_no"
                minLength={10}
                value={libraryRequestData.phone}
                onChange={(e) =>
                  setLibraryRequestData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="library-request-group">
              <label htmlFor="name">Student Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={libraryRequestData.name}
                onChange={(e) =>
                  setLibraryRequestData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="library-request-group">
              <label htmlFor="academic_year">Academic Year:</label>
              <input
                type="text"
                name="academic_year"
                id="academic_year"
                value={libraryRequestData.academicYear}
                onChange={(e) =>
                  setLibraryRequestData((prev) => ({
                    ...prev,
                    academicYear: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="library-request-group">
              <label htmlFor="department">Department:</label>
              <select
                name="department"
                id="department"
                value={libraryRequestData.department}
                onChange={(e) =>
                  setLibraryRequestData((prev) => ({
                    ...prev,
                    department: e.target.value,
                  }))
                }
                required
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
            <div className="library-request-group">
              <label htmlFor="branch">Branch:</label>
              <input
                type="text"
                name="branch"
                id="branch"
                value={libraryRequestData.branchName}
                onChange={(e) =>
                  setLibraryRequestData((prev) => ({
                    ...prev,
                    branchName: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="library-request-group">
              <label htmlFor="block_name">Block Name:</label>
              <select
                name="blockName"
                id="blockName"
                value={libraryRequestData.blockName}
                onChange={(e) =>
                  setLibraryRequestData((prev) => ({
                    ...prev,
                    blockName: e.target.value,
                  }))
                }
                required
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
            </div>
            <div className="library-request-group">
              <label htmlFor="room_no">Room No:</label>
              <input
                type="text"
                name="room_no"
                id="room_no"
                value={libraryRequestData.roomNumber}
                onChange={(e) =>
                  setLibraryRequestData((prev) => ({
                    ...prev,
                    roomNumber: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
          <div className="library-request-form-group-2">
            <div className="library-request-group-2">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                id="description"
                value={libraryRequestData.description}
                onChange={(e) =>
                  setLibraryRequestData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              ></textarea>
            </div>
            <div className="library-request-group-2">
              <input
                type="checkbox"
                name="terms_conditions"
                id="terms_conditions"
                checked={libraryRequestData.terms_conditions}
                onChange={() =>
                  setLibraryRequestData((prev) => ({
                    ...prev,
                    terms_conditions: !prev.terms_conditions,
                  }))
                }
                required
              />
              <label htmlFor="terms_conditions">
                I have read and agree to the terms and conditions
              </label>
            </div>
            <div className="library-request-group-2">
              <button type="submit">Preview</button>
            </div>
          </div>
        </form>
      </div>
      {showPreview && (
        <div className="library-request-preview">
          <h3>Check Your Details</h3>
          <div className="library-request-preview-form">
            <div className="library-request-preview-group">
              <p>Student Name:</p>
              <p>{libraryRequestData.name}</p>
            </div>
            <div className="library-request-preview-group">
              <p>Student Id:</p>
              <p>{userData?.studentId}</p>
            </div>
            <div className="library-request-preview-group">
              <p>Contact No:</p>
              <p>{libraryRequestData.phone}</p>
            </div>
            <div className="library-request-preview-group">
              <p>Block Name:</p>
              <p>{libraryRequestData.blockName}</p>
            </div>
            <div className="library-request-preview-group">
              <p>Room No:</p>
              <p>{libraryRequestData.roomNumber}</p>
            </div>
            <div className="library-request-preview-group">
              <p>Department:</p>
              <p>{libraryRequestData.department}</p>
            </div>
            <div className="library-request-preview-group">
              <p>Branch:</p>
              <p>{libraryRequestData.branchName}</p>
            </div>
            <div className="library-request-preview-group">
              <p>Reason:</p>
              <p>{libraryRequestData.description}</p>
            </div>
            <div className="library-request-preview-group">
              <button
                onClick={() => {
                  sendLibraryRequest(libraryRequestData);
                  setAutofill(false);
                  setShowPreview(false);
                  setLibraryRequestData({
                    phone: "",
                    name: "",
                    studentId: "",
                    academicYear: "",
                    department: "",
                    branchName: "",
                    blockName: "",
                    roomNumber: "",
                    description: "",
                    terms_conditions: false,
                  });
                }}
              >
                Send
              </button>
              <button
                onClick={() => {
                  setAutofill(false);
                  setShowPreview(false);
                  setLibraryRequestData({
                    phone: "",
                    name: "",
                    studentId: "",
                    academicYear: "",
                    department: "",
                    branchName: "",
                    blockName: "",
                    roomNumber: "",
                    description: "",
                    terms_conditions: false,
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LibraryRequest;
