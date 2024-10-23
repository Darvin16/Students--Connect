import React, { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";

function LeaveRecords() {
  const { fetchLeaveRequests, leaveRecords } = useContext(AppContext);

  useEffect(() => {
    if (leaveRecords.length === 0) {
      fetchLeaveRequests();
    }
  }, [leaveRecords]);

  if (leaveRecords.length === 0) return <>Loading...</>;

  return (
    <div className="leave-records-page">
      <h1>Leave Records</h1>
      <hr />
      {leaveRecords.map((request) => {
        return (
          <div className="leave-records-group">
            <h2>{request.studentName}</h2>
            <h3>{request.wardenApproval?.status}</h3>
            <h3>{request.SROApproval?.status}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default LeaveRecords;
