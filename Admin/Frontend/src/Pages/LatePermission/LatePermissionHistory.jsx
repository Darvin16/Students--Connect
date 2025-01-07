import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext.js";
import "./latepermission.css";

function LatePermissionHistory() {
  const { latePermissionRecords, studentUploadsURL } = useContext(AppContext);
  const [selectedRequest, setSelectedRequest] = useState({});

  const showModal = (request) => {
    document.getElementById("late-permission-dialog").showModal();
    setSelectedRequest(request);
  };
  const closeModal = () => {
    document.getElementById("late-permission-dialog").close();
    setSelectedRequest({});
  };

  return (
    <div className="container late-permission-requests p-4">
      <h2 className="m-0">Late Entry Permission Records</h2>
      <hr className="m-0 mb-4" />
      <table className="w-100">
        <thead className="text-center">
          <tr className="row mb-3 bg-primary rounded-2 shadow text-white">
            <th className="col-1 py-2 border-end border-white">Sign no.</th>
            <th className="col-1 py-2 border-end border-white">Image</th>
            <th className="col-2 py-2 border-end border-white">Id</th>
            <th className="col-2 py-2 border-end border-white">Name</th>
            <th className="col-2 py-2 border-end border-white">Room number</th>
            <th className="col-1 py-2 border-end border-white">Out time</th>
            <th className="col-1 py-2 border-end border-white">In time</th>
            <th className="col-2 py-2">Review</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {latePermissionRecords.map((request, index) => {
            return (
              <tr className="row shadow py-2 rounded-2" key={request._id}>
                <td className="col-1 my-auto">{index + 1}</td>
                <td className="col-1 my-auto">
                  <img
                    src={studentUploadsURL + request.studentImage}
                    alt={request.studentName + "'s Image"}
                    className="rounded-circle late-permission-record-img"
                  />
                </td>
                <td className="col-2 my-auto">{request.studentId}</td>
                <td className="col-2 my-auto">{request.studentName}</td>
                <td className="col-2 my-auto">
                  {request.studentBlockName + " " + request.studentRoomNumber}
                </td>
                <td className="col-1 my-auto">{request.outTime}</td>
                <td className="col-1 my-auto">{request.inTime}</td>
                <td className="col-2 my-auto">
                  <button
                    className="btn bg-primary"
                    onClick={() => showModal(request)}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <dialog
        id="late-permission-dialog"
        className="position-fixed top-50 start-50 translate-middle rounded border-0 shadow "
      >
        <div className="text-center">
          <img
            src={studentUploadsURL + selectedRequest.studentImage}
            alt={selectedRequest.studentName + "'s Image"}
            className="w-100"
          />
          <p className="text-muted">Reg no: {selectedRequest.studentId}</p>
        </div>
        <div className="mx-3 mt-3 row row-cols-md-2  text-nowrap">
          <p className="col">
            <b>Name:</b> {selectedRequest.studentName}
          </p>
          <p className="col">
            <b>Contact No:</b> {selectedRequest.studentContactNo}
          </p>
          <p className="col">
            <b>Block:</b> {selectedRequest.studentBlockName}
          </p>
          <p className="col">
            <b>Room:</b> {selectedRequest.studentRoomNumber}
          </p>
          <p className="col">
            <b>Department:</b> {selectedRequest.studentDepartment}
          </p>
          <p className="col">
            <b>Academic Year:</b> {selectedRequest.studentAcademicYear}
          </p>
          <p className="col">
            <b>Out Time:</b> {selectedRequest.outTime}
          </p>
          <p className="col">
            <b>In Time:</b> {selectedRequest.inTime}
          </p>
        </div>
        <div className="mx-3 mb-3 row">
          <p className="m-0">
            <b>Reason:</b>
          </p>
          <p className="late-permission-reason m-0">{selectedRequest.reason}</p>
        </div>
        <div className="m-2 text-center">
          <button
            className="d-block btn bg-scoundary ms-auto"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default LatePermissionHistory;
