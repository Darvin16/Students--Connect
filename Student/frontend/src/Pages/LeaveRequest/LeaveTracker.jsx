import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../Context/AppContext";
import "./LeaveRequest.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faCircle,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function LeaveTracker() {
  const {
    fetchLeaveRequests,
    leaveRequestOption,
    leaveRequests,
    cancelLeaveRequest,
    generatePDF,
  } = useContext(AppContext);

  const [request, setRequest] = useState({});
  const [option, setOption] = useState("");
  const divElement = useRef(null);
  const containerElement = useRef(null);
  const [showCancelBox, setShowCancelBox] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const setDynamicHeight = () => {
    console.log("called");
    setTimeout(() => {
      if (divElement.current) {
        const height = divElement.current.offsetHeight + 20;

        const spans = document.getElementsByTagName("span");
        Array.from(spans).forEach((span) =>
          span.style.setProperty("--auto-height", `${height}px`)
        );
      }
    }, 10);
  };

  useLayoutEffect(() => {
    if (option) {
      setDynamicHeight();
    }
    const handleResize = () => {
      setDynamicHeight();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [option]);

  useLayoutEffect(() => {
    setDynamicHeight();
  }, [containerElement.current?.clientWidth]);

  setDynamicHeight();

  useEffect(() => {
    if (leaveRequests.length === 0) {
      fetchLeaveRequests();
    }
  }, [leaveRequests]);

  useEffect(() => {
    if (option) {
      const selectedRequest = leaveRequests.find(
        (request) => request.from === parseInt(option)
      );
      setRequest(selectedRequest || {});
    } else {
      const selectedRequest = leaveRequests.sort(
        (a, b) => a.requestDate - b.requestDate
      )[0];
      setRequest(selectedRequest || {});
    }
  }, [option, leaveRequests]);

  return (
    <div className="leave-tracker-page">
      <div className="leave-tracker-header">
        <h2>Application Status</h2>
        <div className="leave-tracker-selecter">
          <label htmlFor="leave-tracker-option">
            <strong>Select Request:</strong>
          </label>
          <select
            name="leave-tracker-option"
            id="leave-tracker-option"
            value={request.from}
            onChange={(e) => setOption(e.target.value)}
          >
            {leaveRequestOption.map((op, index) => (
              <option key={index} value={op.value}>
                {op.option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="leave-tracker-body" ref={containerElement}>
        {Object.keys(request).length > 0 ? (
          <div className="leave-tracker-container">
            <div className="leave-tracker-group" ref={divElement}>
              <span className="tracker-approved">
                <FontAwesomeIcon icon={faLocationArrow} />
              </span>
              <p>
                Request raised by {request.studentName} ({request.studentId}).
              </p>
              <button className="tracker-approved">Sent</button>
            </div>
            <div className="leave-tracker-group">
              {request.wardenApproval ? (
                request.wardenApproval?.status === "approved" ? (
                  <>
                    <span className="tracker-approved">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>
                      Warden Approved ({request.studentBlockName}).
                      <br />
                      Please be patient as we wait for the SRO to review and
                      approve your request. Thank you for your understanding.
                    </p>
                    <button className="tracker-approved">Approved</button>
                  </>
                ) : (
                  <>
                    <span className="tracker-rejected">
                      <FontAwesomeIcon icon={faXmark} />
                    </span>
                    <p>
                      Warden Rejected ({request.studentBlockName}).
                      <br />
                      Your request has been rejected by the warden.
                    </p>
                    <button className="tracker-rejected">Rejected</button>
                  </>
                )
              ) : (
                <>
                  <span className="tracker-pending">
                    <FontAwesomeIcon icon={faCircle} />
                  </span>
                  <p>
                    Waiting for Warden Approval ({request.studentBlockName}).
                    <br />
                    The Request needs to be approved by warden and SRO, the
                    reports are managed and maintained.
                  </p>
                  <button className="tracker-pending">Pending</button>
                </>
              )}
            </div>
            <div className="leave-tracker-group">
              {request.SROApproval ? (
                request.SROApproval?.status === "approved" ? (
                  <>
                    <span className="tracker-approved">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>
                      SRO Approved ({request.studentBlockName}).
                      <br />
                      Your request has been approved by the SRO, and you have
                      been granted the leave you requested.
                    </p>
                    <button className="tracker-approved">Approved</button>
                  </>
                ) : (
                  <>
                    <span className="tracker-rejected">
                      <FontAwesomeIcon icon={faXmark} />
                    </span>
                    <p>
                      SRO Rejected ({request.studentBlockName}).
                      <br />
                      Your request has been rejected by the SRO.
                    </p>
                    <button className="tracker-rejected">Rejected</button>
                  </>
                )
              ) : (
                <>
                  <span className="tracker-pending">
                    <FontAwesomeIcon icon={faCircle} />
                  </span>
                  <p>
                    Waiting for SRO Approval ({request.studentBlockName}).
                    <br />
                    After finishing the verification to our block SRO, you can
                    download your leave report here.
                  </p>
                  <button className="tracker-pending">Pending</button>
                </>
              )}
            </div>
            <div className="leave-tracker-group">
              {request.wardenApproval &&
              request.wardenApproval?.status === "rejected" ? (
                <>
                  <span className="tracker-rejected">
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                  <p>
                    Request Rejected.
                    <br />
                    Your leave request has not been granted. Warden has rejected
                    your request
                  </p>
                  <button className="tracker-rejected">Rejected</button>
                </>
              ) : request.SROApproval ? (
                request.wardenApproval?.status === "approved" &&
                request.SROApproval?.status === "approved" ? (
                  <>
                    <span className="tracker-approved">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>
                      Request Approved.
                      <br />
                      Your request for leave has been approved. You can now
                      download your leave report.
                    </p>
                    <button className="tracker-approved">Approved</button>
                  </>
                ) : (
                  <>
                    <span className="tracker-rejected">
                      <FontAwesomeIcon icon={faXmark} />
                    </span>
                    <p>
                      Request Rejected.
                      <br />
                      Your leave request has not been granted.
                    </p>
                    <button className="tracker-rejected">Rejected</button>
                  </>
                )
              ) : (
                <>
                  <span className="tracker-pending">
                    <FontAwesomeIcon icon={faCircle} />
                  </span>
                  <p>
                    Request Pending.
                    <br />
                    The Request needs to be approved by warden and SRO, the
                    reports are managed and maintained.
                  </p>
                  <button className="tracker-pending">Pending</button>
                </>
              )}
            </div>
            <div className="leave-tracker-note">
              <p>
                <strong>Note:</strong> You can download the request pdf , Only
                after it has been approved.
              </p>
            </div>
            <div className="leave-tracker-btn">
              <button
                className={
                  !request.wardenApproval || !request.SROApproval
                    ? "leave-tracker-download-btn"
                    : ""
                }
                title={
                  !request.wardenApproval || !request.SROApproval
                    ? "Not Ready"
                    : ""
                }
                disabled={!request.wardenApproval || !request.SROApproval}
                onClick={() => generatePDF(request.requestId)}
              >
                Download PDF
              </button>
              <button
                className="tracker-rejected"
                onClick={() => {
                  setShowCancelBox(true);
                  setTimeout(() => window.scrollTo(0, 1000), 0);
                }}
              >
                Cancel Request
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-leave-tracker">
            <h3>&nbsp;No Request Selected</h3>
          </div>
        )}

        {showCancelBox && (
          <form
            className="leave-request-cancel"
            onSubmit={(e) => {
              e.preventDefault();
              cancelLeaveRequest({
                requestId: request.requestId,
                reason: cancelReason,
              });
              setShowCancelBox(false);
            }}
          >
            <label htmlFor="reason">
              Provide a Reason for the Cancellation
            </label>
            <textarea
              name="reason"
              id="reason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            ></textarea>
            <div className="leave-request-cancel-btn">
              <button type="submit">Submit</button>
              <button
                type="Cancel"
                className="tracker-rejected"
                onClick={() => setShowCancelBox(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LeaveTracker;
