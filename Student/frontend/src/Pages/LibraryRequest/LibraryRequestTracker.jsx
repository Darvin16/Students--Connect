import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import "./LibraryRequest.css";

function LibraryRequestTracker() {
  const {
    libraryRequestForm,
    fetchLibraryRequestForm,
    authToken,
    cancelLibraryRequest,
  } = useContext(AppContext);

  const [cancelRequest, setCancelRequest] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    if (authToken && !libraryRequestForm) {
      fetchLibraryRequestForm();
    }
  }, [authToken, libraryRequestForm]);

  if (!libraryRequestForm) {
    return (
      <div>
        <h1>Here you see your library request prograss</h1>
      </div>
    );
  }

  return (
    <div className="library-request-tracker-page">
      <h1>Application Tracking Status</h1>
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className={`progress-step completed`}>
          ✅<p>Raised</p>
        </div>
        <div
          className={`progress-step ${
            libraryRequestForm.wardenApproval?.status === "approved"
              ? "completed"
              : ""
          }`}
        >
          {libraryRequestForm.wardenApproval ? (
            libraryRequestForm.wardenApproval.status === "approved" ? (
              <>✅</>
            ) : (
              <>❌</>
            )
          ) : (
            <>⚪</>
          )}
          <p> Warden Approval</p>
        </div>
        <div
          className={`progress-step ${
            libraryRequestForm.SROApproval?.status === "approved"
              ? "completed"
              : ""
          }`}
        >
          {libraryRequestForm.SROApproval ? (
            libraryRequestForm.SROApproval.status === "approved" ? (
              <>✅</>
            ) : (
              <>❌</>
            )
          ) : (
            <>⚪</>
          )}
          <p>SRO Approval</p>
        </div>
        <div
          className={`progress-step ${
            libraryRequestForm.SROApproval?.status === "approved" &&
            libraryRequestForm.wardenApproval?.status === "approved"
              ? "completed"
              : ""
          }`}
        >
          {libraryRequestForm.wardenApproval &&
          libraryRequestForm.SROApproval ? (
            libraryRequestForm.wardenApproval.status === "approved" &&
            libraryRequestForm.SROApproval?.status === "approved" ? (
              <>✅</>
            ) : (
              <>❌</>
            )
          ) : (
            <>⚪</>
          )}
          <p>Success</p>
        </div>
      </div>

      <div className="request-details">
        <div className="section">
          <h3>Student Details</h3>
          <p>
            <strong>Student ID:</strong> {libraryRequestForm.studentId}
          </p>
          <p>
            <strong>Name:</strong> {libraryRequestForm.studentName}
          </p>
          <p>
            <strong>Block Name:</strong> {libraryRequestForm.studentBlockName}
          </p>
          <p>
            <strong>Room Number:</strong> {libraryRequestForm.studentRoomNumber}
          </p>
          <p>
            <strong>Department:</strong> {libraryRequestForm.studentDepartment}
          </p>
          <p>
            <strong>Branch:</strong> {libraryRequestForm.studentBranchName}
          </p>
          <p>
            <strong>Academic Year:</strong>{" "}
            {libraryRequestForm.studentAcademicYear}
          </p>
          <p>
            <strong>Contact No:</strong> {libraryRequestForm.studentContactNo}
          </p>
        </div>

        <div className="section">
          <h3>Request Details</h3>
          <p>
            <strong>Request ID:</strong> {libraryRequestForm.requestId}
          </p>
          <p>
            <strong>Request Date:</strong>{" "}
            {new Date(libraryRequestForm.requestDate).toLocaleString()}
          </p>
          <p>
            <strong>Description:</strong> {libraryRequestForm.description}
          </p>
        </div>

        <div className="section">
          <h3>Warden Approval</h3>
          <p>
            <strong>Status:</strong> {libraryRequestForm.wardenApproval?.status}
          </p>
          <p>
            <strong>Approved By:</strong>{" "}
            {libraryRequestForm.wardenApproval?.by}
          </p>
          <p>
            <strong>Approval Time:</strong>{" "}
            {new Date(libraryRequestForm.wardenApproval?.time).toLocaleString()}
          </p>
          <p>
            <strong>Warden Name:</strong>{" "}
            {libraryRequestForm.wardenApproval?.wardenName}
          </p>
        </div>

        <div className="section">
          <h3>SRO Approval</h3>
          <p>
            <strong>Status:</strong> {libraryRequestForm.SROApproval?.status}
          </p>
          <p>
            <strong>Approved By:</strong> {libraryRequestForm.SROApproval?.by}
          </p>
          <p>
            <strong>Approval Time:</strong>{" "}
            {new Date(libraryRequestForm.SROApproval?.time).toLocaleString()}
          </p>
          <p>
            <strong>SRO Name:</strong> {libraryRequestForm.SROApproval?.SROName}
          </p>
        </div>

        <div className="section">
          <h3>Library Log</h3>
          <p>
            <strong>Check In Time:</strong>{" "}
            {new Date(libraryRequestForm.in?.time).toLocaleString()}
          </p>
          <p>
            <strong>Checked In By:</strong> {libraryRequestForm.in?.by}
          </p>
          <p>
            <strong>Librarian (In):</strong>{" "}
            {libraryRequestForm.in?.librarianName}
          </p>

          <p>
            <strong>Check Out Time:</strong>{" "}
            {new Date(libraryRequestForm.out?.time).toLocaleString()}
          </p>
          <p>
            <strong>Checked Out By:</strong> {libraryRequestForm.out?.by}
          </p>
          <p>
            <strong>Librarian (Out):</strong>{" "}
            {libraryRequestForm.out?.librarianName}
          </p>
        </div>

        <div className="section">
          <h3>Delay & Cancellation</h3>
          <p>
            <strong>Delay Time:</strong> {libraryRequestForm.delayTime} hours
          </p>
          {libraryRequestForm.cancelRequest?.status ? (
            <>
              <p>
                <strong>Request Canceled:</strong> Yes
              </p>
              <p>
                <strong>Cancellation Reason:</strong>{" "}
                {libraryRequestForm.cancelRequest?.reason}
              </p>
              <p>
                <strong>Cancellation Time:</strong>{" "}
                {new Date(
                  libraryRequestForm.cancelRequest?.time
                ).toLocaleString()}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Request Canceled:</strong> No
              </p>
              {!cancelRequest ? (
                <button
                  className="cancel-button"
                  onClick={() => setCancelRequest(true)}
                >
                  Cancel Request
                </button>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    cancelLibraryRequest(
                      libraryRequestForm.requestId,
                      cancelReason
                    );
                    setCancelRequest(false);
                    setCancelReason("");
                  }}
                >
                  <label htmlFor="cancel-reason">
                    <strong>Reason:</strong>
                  </label>
                  <textarea
                    name="cancel-reason"
                    className="form-control"
                    id="cancel-reason"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    required
                  ></textarea>
                  <br />
                  <button type="submit" className="btn btn-danger">
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary"
                    onClick={() => {
                      setCancelReason("");
                      setCancelRequest(false);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LibraryRequestTracker;
