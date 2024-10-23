import React, { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";

function LeaveRequests() {
  const { handleLeaveRequest, fetchLeaveRequests, leaveRequests } =
    useContext(AppContext);

  useEffect(() => {
    if (leaveRequests.length === 0) {
      fetchLeaveRequests();
    }
  }, [leaveRequests]);

  if (leaveRequests.length === 0) {
    return <>Loading...</>;
  }

  return (
    <div className="leave-requests-page">
      <h1>Leave Requests</h1>
      <hr />
      {leaveRequests.map((request) => {
        return (
          <div className="leave-request-group">
            <h2>{request.studentName}</h2>
            <button
              onClick={() => handleLeaveRequest(request.requestId, "approved")}
            >
              Approve
            </button>
            <button
              onClick={() => handleLeaveRequest(request.requestId, "rejected")}
            >
              Reject
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default LeaveRequests;
