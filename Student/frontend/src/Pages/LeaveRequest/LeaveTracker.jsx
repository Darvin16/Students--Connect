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
  const { fetchLeaveRequests, leaveRequestOption, leaveRequests } =
    useContext(AppContext);

  const [request, setRequest] = useState({});
  const [option, setOption] = useState("");
  const divElement = useRef(null);

  const setDynamicHeight = () => {
    console.log("hi");
    setTimeout(() => {
      if (divElement.current) {
        const height = divElement.current.offsetHeight + 20;

        const spans = document.getElementsByTagName("span");
        Array.from(spans).forEach((span) =>
          span.style.setProperty("--auto-height", `${height}px`)
        );
      }
    }, 0);
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
      setRequest({});
    }
  }, [option, leaveRequests]);

  return (
    <div className="leave-tracker-page">
      <div className="leave-tracker-header">
        <h2>Application Status</h2>
        <div className="leave-tracker-selecter">
          <label htmlFor="leave-tracker-option">Select Request:</label>
          <select
            name="leave-tracker-option"
            id="leave-tracker-option"
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="">None</option>
            {leaveRequestOption.map((op, index) => (
              <option key={index} value={op.value}>
                {op.option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="leave-tracker-body">
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
              {request.wardenApproval && request.SROApproval ? (
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
            <div className="leave-tracker-btn">
              <button>Download PDF</button>
              <button className="tracker-rejected">Cancel Request</button>
            </div>
          </div>
        ) : (
          <div className="empty-leave-tracker">
            <h3>No Request Selected</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaveTracker;
