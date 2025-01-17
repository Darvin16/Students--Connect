import React, { useContext } from "react";
import "./supervisorpage.css";
import { AppContext } from "../../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function SupervisorPage() {
  const { userData, dashboardInfo } = useContext(AppContext);
  return (
    <div className="admin-dashboard">
      <div className="dashboard-greeting">
        <em>
          <h1>
            <em className="text-capitalize">{userData?.role}</em> Dashboard
          </h1>
        </em>
        <span className="date">
          {new Date()
            .toLocaleString("en-Gb", {
              month: "short",
              day: "numeric",
            })
            .replace(" ", "-")}
          &nbsp;
          <FontAwesomeIcon icon={faCalendarDays} />
        </span>
      </div>
      <div className="dashboard-insights">
        <h2>View Insights</h2>

        <div className="dashboard-cards">
          <div className="card">
            Total Students<p>{dashboardInfo.totalStudents}</p>
          </div>
          <div className="card">
            Raised Complaints<p>{dashboardInfo.raisedComplaints}</p>
          </div>
          <div className="card">
            Pending Complaints<p>{dashboardInfo.pendingComplaints}</p>
          </div>
          <div className="card">
            Resolved Complaints<p>{dashboardInfo.resolvedComplaints}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupervisorPage;
