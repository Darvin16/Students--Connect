import React, { useContext, useEffect, useState } from "react";
import "./LeaveRequest.css";
import { AppContext } from "../../Context/AppContext";
import ToastMessage from "./ToastMessage";

function LeaveRequest() {
  const { handleLeaveRequest, imageAccessURL, userData, showToast } =
    useContext(AppContext);
  const [requestData, setRequestDate] = useState({});

  useEffect(() => {
    if (userData) {
      setRequestDate((prev) => ({
        ...prev,
        studentImage: userData.studentImage,
      }));
    }
  }, [userData]);

  if (!userData) {
    return <div>Loading</div>;
  }

  return (
    <div className="leave-request-page">
      <div className="leave-request-header">
        <h2>Leave Request</h2>
        <button
          onClick={() =>
            setRequestDate((prev) => ({
              ...prev,
              studentId: userData.studentId,
              studentAcademicYear: userData.academicYear,
              studentBlockName: userData.blockName,
              studentBranchName: userData.branchName,
              studentDepartment: userData.department,
              studentName: userData.name,
              studentRoomNumber: userData.roomNumber,
            }))
          }
        >
          Auto-fill
        </button>
      </div>
      <form
        className="leave-request-body"
        onSubmit={(e) => {
          e.preventDefault();
          handleLeaveRequest(requestData);
        }}
      >
        <div className="leave-request-body-group">
          <img
            src={
              requestData.studentImage &&
              imageAccessURL + requestData.studentImage
            }
            alt="profile"
          />
        </div>
        <div className="leave-request-body-group">
          <label htmlFor="studentId">Reqistration No:</label>
          <input
            type="text"
            name="studentId"
            id="studentId"
            value={requestData.studentId}
            onChange={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                studentId: e.target.value,
              }));
            }}
            required
          />
        </div>
        <div className="leave-request-body-group">
          <label htmlFor="blockName">Block Name:</label>
          <select
            name="blockName"
            id="blockName"
            value={requestData.studentBlockName}
            onChange={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                studentBlockName: e.target.value,
              }));
            }}
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
        <div className="leave-request-body-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={requestData.studentName}
            onChange={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                studentName: e.target.value,
              }));
            }}
            required
          />
        </div>
        <div className="leave-request-body-group">
          <label htmlFor="academicYear">Academic Year:</label>
          <input
            type="text"
            name="academicYear"
            id="academicYear"
            value={requestData.studentAcademicYear}
            onChange={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                studentAcademicYear: e.target.value,
              }));
            }}
            minLength={4}
            maxLength={4}
            required
          />
        </div>
        <div className="leave-request-body-group">
          <label htmlFor="department">Department:</label>
          <select
            name="department"
            id="department"
            value={requestData.studentDepartment}
            onChange={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                studentDepartment: e.target.value,
              }));
            }}
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
        <div className="leave-request-body-group">
          <label htmlFor="branchName">Branch Name:</label>
          <input
            type="text"
            name="branchName"
            id="branchName"
            value={requestData.studentBranchName}
            onChange={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                studentBranchName: e.target.value,
              }));
            }}
            required
          />
        </div>
        <div className="leave-request-body-group">
          <label htmlFor="leaveType">Leave Type:</label>
          <select
            name="leaveType"
            id="leaveType"
            value={requestData.leaveType}
            onChange={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                leaveType: e.target.value,
              }));
            }}
            required
          >
            <option value="">Select</option>
            <option value="Health_Issues">Health Issues</option>
            <option value="Function">Function</option>
            <option value="Personal">Personal </option>
            <option value="Exam">Exam</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>
        <div className="leave-request-body-group">
          <label htmlFor="leaveDate">Leave Duration:</label>
          <div className="leave-request-body-group-date">
            <input
              type="date"
              name="leaveDate"
              id="leaveDate"
              value={requestData.from}
              onChange={(e) => {
                setRequestDate((prev) => ({
                  ...prev,
                  from: e.target.value,
                }));
                if (requestData.oneDayLeave) {
                  setRequestDate((prev) => ({ ...prev, to: prev.from }));
                }
              }}
              required
            />
            {!requestData.oneDayLeave && (
              <>
                <span>to</span>
                <input
                  type="date"
                  name="leaveDate"
                  id="leaveDate"
                  value={requestData.to}
                  onChange={(e) => {
                    setRequestDate((prev) => ({
                      ...prev,
                      to: e.target.value,
                    }));
                  }}
                  required
                />
              </>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              name="oneDayLeave"
              id="oneDayLeave"
              checked={requestData.oneDayLeave}
              onChange={(e) => {
                setRequestDate((prev) => ({
                  ...prev,
                  oneDayLeave: !prev.oneDayLeave,
                  to: prev.from,
                }));
              }}
            />
            &nbsp;
            <label htmlFor="oneDayLeave">One Day Leave</label>
          </div>
        </div>
        <div className="leave-request-body-group">
          <label htmlFor="reason">Remark/Reason:</label>
          <textarea
            name="reason"
            id="reason"
            value={requestData.reason || ""}
            onChange={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                reason: e.target.value,
              }));
            }}
            required
          ></textarea>
        </div>
        <div className="leave-request-body-group">
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="text"
            name="roomNumber"
            id="roomNumber"
            value={requestData.studentRoomNumber}
            onChange={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                studentRoomNumber: e.target.value,
              }));
            }}
            required
          />
        </div>
        <div className="leave-request-body-group">
          <label htmlFor="parentContactNo">Parents Contact No:</label>
          <input
            type="tel"
            name="parentContactNo"
            id="parentContactNo"
            pattern="[0-9]{10}"
            placeholder="1234567890"
            value={requestData.parentContactNo}
            onInput={(e) => {
              setRequestDate((prev) => ({
                ...prev,
                parentContactNo: e.target.value,
              }));
            }}
            required
          />
        </div>
        <div className="leave-request-body-group-btn">
          <button type="submit">Submit</button>
          <button
            type="reset"
            onClick={() =>
              setRequestDate({ studentImage: userData.studentImage })
            }
          >
            Cancel
          </button>
        </div>
      </form>
      {showToast && <ToastMessage />}
    </div>
  );
}

export default LeaveRequest;
