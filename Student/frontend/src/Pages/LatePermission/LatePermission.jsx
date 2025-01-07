import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

function LatePermission() {
  const {
    latePermission,
    handleLatePermissionCancel,
    handleLatePermissionRequest,
  } = useContext(AppContext);
  const [request, setRequest] = useState({
    id: "",
    name: "",
    outTime: "",
    inTime: "",
    reason: "",
  });

  if (Object.keys(latePermission).length > 0) {
    return (
      <div className="container-fluid">
        <div className="row mb-3">
          <h2>Late Permission:-</h2>
          <h5 className="text-muted">
            Status:{" "}
            <span
              className={`text-capitalize ${
                latePermission.status.status === "accepted" && "text-success"
              } ${
                latePermission.status.status === "rejected" && "text-danger"
              }`}
            >
              {latePermission.status.status}
            </span>
          </h5>
        </div>
        <div className="row">
          <h4>Details:-</h4>
          <p>
            <b>Out Time:</b> {latePermission.outTime}
          </p>
          <p>
            <b>In Time:</b> {latePermission.inTime}
          </p>
          <p>
            <b>Your Reason:</b> {latePermission.reason}
          </p>
        </div>
        <div className="row">
          <button
            className="ms-2 mt-5 col-3 btn btn-danger"
            onClick={() => handleLatePermissionCancel(latePermission._id)}
          >
            Cancel Request
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <h1 className="text-center">Late Permission</h1>
      <form onSubmit={() => handleLatePermissionRequest(request)}>
        <label htmlFor="student-id" className="form-label">
          Id:
        </label>
        <input
          type="text"
          name="studentId"
          id="student-id"
          className="form-control"
          value={request.id}
          onChange={(e) =>
            setRequest((prev) => ({ ...prev, id: e.target.value }))
          }
          placeholder="eg: RS1232234424"
          required
        />
        <label htmlFor="student-name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          name="studentName"
          id="student-name"
          className="form-control"
          value={request.name}
          onChange={(e) =>
            setRequest((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="eg: John Doe"
          required
        />
        <label htmlFor="out-time" className="form-label">
          Out Time:
        </label>
        <input
          type="time"
          name="outTime"
          id="out-time"
          className="form-control"
          value={request.outTime}
          onChange={(e) =>
            setRequest((prev) => ({ ...prev, outTime: e.target.value }))
          }
          required
        />
        <label htmlFor="in-time" className="form-label">
          In Time:
        </label>
        <input
          type="time"
          name="inTime"
          id="in-time"
          className="form-control"
          value={request.inTime}
          onChange={(e) =>
            setRequest((prev) => ({ ...prev, inTime: e.target.value }))
          }
          required
        />
        <label htmlFor="reason" className="form-label">
          Reason:
        </label>
        <textarea
          name="reason"
          id="reason"
          className="form-control"
          value={request.reason}
          onChange={(e) =>
            setRequest((prev) => ({ ...prev, reason: e.target.value }))
          }
          placeholder="eg: Need permission for 'xyz' from '10:00 pm' to '11:00 pm'"
          required
        ></textarea>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LatePermission;
