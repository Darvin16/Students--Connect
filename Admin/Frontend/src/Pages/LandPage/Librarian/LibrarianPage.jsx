import React from "react";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";
import "./LibrarianPage.css";

function LibrarianPage() {
  const { userData, dashboardInfo } = useContext(AppContext);
  return (
    <div className="librarian-landing-page">
      <div className="librarian-page-hero">
        <em>
          <h2>Librarian Dashboard</h2>
        </em>
        <div className="librarian-card-holder">
          <div className="librarian-info-card">
            <p>Students Approved</p>
            <p>{dashboardInfo.libraryRequestsCount}</p>
          </div>
          <div className="librarian-info-card">
            <p>Entry Status</p>
            <p>{dashboardInfo.entryStatus}</p>
          </div>
          <div className="librarian-info-card">
            <p>Exit Status</p>
            <p>{dashboardInfo.exitStatus}</p>
          </div>
          <div className="librarian-info-card">
            <p>Total Visits</p>
            <p>{dashboardInfo.totalVisits}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibrarianPage;
