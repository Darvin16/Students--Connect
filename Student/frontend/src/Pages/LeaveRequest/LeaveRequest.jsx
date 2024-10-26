import React, { useContext, useState } from "react";
import "./LeaveRequest.css";
import { AppContext } from "../../Context/AppContext";
import ToastMessage from "./ToastMessage";

function LeaveRequest() {
  const { handleLeaveRequest, imageAccessURL, userData, showToast } =
    useContext(AppContext);
  const [requestData, setRequestDate] = useState({
    terms_conditions: false,
    studentId: "",
    studentBlockName: "",
    studentName: "",
  });

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
              studentBlockName: userData.blockName,
              studentName: userData.name,
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
            <option
              value="A-sannasi"
              disabled={userData.blockName !== "A-sannasi"}
            >
              A - Sannasi
            </option>
            <option
              value="B-thamarai"
              disabled={userData.blockName !== "B-thamarai"}
            >
              B - Thamari
            </option>
            <option
              value="C-malligai"
              disabled={userData.blockName !== "C-malligai"}
            >
              C - Malligai
            </option>
            <option
              value="D-agasthiyar"
              disabled={userData.blockName !== "D-agasthiyar"}
            >
              D - Agasthiyar
            </option>
            <option
              value="E-nelson_mandela"
              disabled={userData.blockName !== "E-nelson_mandela"}
            >
              E - Nelson Mandela
            </option>
            <option value="F-oori" disabled={userData.blockName !== "F-oori"}>
              F - Oori
            </option>
            <option value="G-paari" disabled={userData.blockName !== "G-paari"}>
              G - Paari
            </option>
          </select>
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
        <div
          className="leave-request-body-group"
          style={{ gridColumn: "span 2" }}
        >
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
        <div
          className="leave-request-body-group-t&c"
          style={{ gridColumn: "span 2" }}
        >
          <input
            type="checkbox"
            name="terms_conditions"
            id="terms_conditions"
            checked={requestData.terms_conditions}
            onChange={() =>
              setRequestDate((prev) => ({
                ...prev,
                terms_conditions: !prev.terms_conditions,
              }))
            }
          />&nbsp;
          <label htmlFor="terms_conditions">
            I acknowledge that my academic details are added to this request details
          </label>
        </div>
        <div className="leave-request-body-group-btn">
          <button type="submit">Submit</button>
          <button
            type="reset"
            onClick={() => setRequestDate({ terms_conditions: false })}
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
