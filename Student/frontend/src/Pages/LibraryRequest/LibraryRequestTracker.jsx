import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import "./LibraryRequest.css";

function LibraryRequestTracker() {
  const {
    libraryRequestForm,
    fetchLibraryRequestForm,
    authToken,
    cancelLibraryRequest,
    navigate,
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
      <h5>Student ID: {libraryRequestForm.studentId}</h5>
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
        <div className="request-tracker-timeline">
          <div className="tracher-head">
            <h2>Timeline:-</h2>
            <h5>
              Date:{" "}
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h5>
          </div>
          <div className="tracker-timeline-group">
            <label>
              {new Date(libraryRequestForm.requestDate).toLocaleTimeString(
                "en-Gb",
                {
                  hour12: true,
                }
              )}
            </label>
            <span></span>
            <p>Your Request Has been Submitted</p>
          </div>
          <div className="tracker-timeline-group">
            {!libraryRequestForm.wardenApproval ? (
              <>
                <label>00:00:00</label>
                <span></span>
                <p>Waiting for Warden Approval</p>
              </>
            ) : (
              <>
                {libraryRequestForm.wardenApproval.status === "approved" ? (
                  <>
                    <label>
                      {new Date(
                        libraryRequestForm.wardenApproval.time
                      ).toLocaleTimeString("en-Gb", {
                        hour12: true,
                      })}
                    </label>
                    <span></span>
                    <p>Your Request has been Approved by Warden</p>
                  </>
                ) : (
                  <>
                    <label>
                      {new Date(
                        libraryRequestForm.wardenApproval.time
                      ).toLocaleTimeString("en-Gb", {
                        hour12: true,
                      })}
                    </label>
                    <span></span>
                    <p>Your Request has been Rejected by Warden</p>
                  </>
                )}
              </>
            )}
          </div>
          {libraryRequestForm.wardenApproval && (
            <div className="tracker-timeline-group">
              {!libraryRequestForm.SROApproval ? (
                <>
                  <label>00:00:00</label>
                  <span></span>
                  <p>Waiting for SRO Approval</p>
                </>
              ) : (
                <>
                  {libraryRequestForm.SROApproval.status === "approved" ? (
                    <>
                      <label>
                        {new Date(
                          libraryRequestForm.SROApproval.time
                        ).toLocaleTimeString("en-Gb", {
                          hour12: true,
                        })}
                      </label>
                      <span></span>
                      <p>Your Request has been Approved by SRO</p>
                    </>
                  ) : (
                    <>
                      <label>
                        {new Date(
                          libraryRequestForm.SROApproval.time
                        ).toLocaleTimeString("en-Gb", {
                          hour12: true,
                        })}
                      </label>
                      <span></span>
                      <p>Your Request has been Rejected by SRO</p>
                    </>
                  )}
                </>
              )}
            </div>
          )}
          {libraryRequestForm.in && (
            <div className="tracker-timeline-group">
              <label>
                {new Date(libraryRequestForm.in.time).toLocaleTimeString(
                  "en-Gb",
                  {
                    hour12: true,
                  }
                )}
              </label>
              <span></span>
              <p>You entered the library</p>
            </div>
          )}
          {libraryRequestForm.out && (
            <div className="tracker-timeline-group">
              <label>
                {new Date(libraryRequestForm.out.time).toLocaleTimeString(
                  "en-Gb",
                  {
                    hour12: true,
                  }
                )}
              </label>
              <span></span>
              <p>You exit the library</p>
            </div>
          )}
        </div>
        {/* <div className="section">
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
        </div> */}
        <div className="tracker-request-">
          {libraryRequestForm.wardenApproval?.status === "approved" &&
            libraryRequestForm.SROApproval?.status === "approved" && (
              <>
                <div className="tracker-request-approved">Form Approved</div>
                <button
                  onClick={() =>
                    navigate("dashboard/library/request/form", {
                      state: libraryRequestForm,
                    })
                  }
                >
                  View
                </button>
              </>
            )}
        </div>

        <div className="section">
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
        </div>
      </div>
    </div>
  );
}

export default LibraryRequestTracker;
