import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Libraryrecords.css";
import { AppContext } from "../../Context/AppContext";
import { useEffect } from "react";

const LibraryRequests = () => {
  const { libraryRequests, fetchLibraryRequests, handleLibraryRequest } =
    useContext(AppContext);

  useEffect(() => {
    if (libraryRequests.length === 0) {
      fetchLibraryRequests();
    }
  }, [libraryRequests]);

  return (
    <div className="library-requests-container">
      <h2 className="text-center my-4">Library Requests</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-responsive">
            <thead className="thead-light">
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Block Name</th>
                <th>Room No</th>
                <th>Request Form</th>
                <th>Requested Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {libraryRequests.map((request) => (
                <tr key={request.requestid}>
                  <td>{request.studentId}</td>
                  <td>{request.studentName}</td>
                  <td>{request.studentDepartment}</td>
                  <td>{request.studentBlockName}</td>
                  <td>{request.studentRoomNumber}</td>
                  <td>{request.requestForm}</td>
                  <td>
                    {new Date(request.requestDate).toLocaleString("en-GB", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    })}
                  </td>
                  {request.wardenApproval ? (
                    <td>{request.wardenApproval.status}</td>
                  ) : (
                    <td>
                      <button
                        className="btn btn-success me-1"
                        onClick={() =>
                          handleLibraryRequest(request.requestId, "accepted")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleLibraryRequest(request.requestId, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LibraryRequests;
