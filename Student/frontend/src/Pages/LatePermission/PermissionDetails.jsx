import React, { useContext, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import "./latepermission.css";

function PermissionDetails() {
  const params = useParams();
  const [latePermission, setLatePermission] = useState({});
  const { imageAccessURL } = useContext(AppContext);
  useLayoutEffect(() => {
    getDetails();
  }, []);

  async function getDetails() {
    try {
      const response = await axios.get(
        `http://localhost:8000/late-permission/details/${params.id}`
      );
      if (response.status === 200) {
        setLatePermission(response.data.request);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("An error occurred, please try again");
      }
    }
  }

  if (Object.keys(latePermission).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="permission-detail-container container-fluid px-4 px-md-5 bg-secondary-subtle p-3">
      <div className="permission-detail row py-3 px-2 px-md-0 rounded bg-white">
        <div className="permission-header mb-2 col-12">
          <h4 className="m-0 text-nowrap">
            Permission (
            {new Date(latePermission.date).toLocaleDateString("en-GB")})
          </h4>
          <h5
            className={`text-capitalize ${
              latePermission.status.status === "accepted" && "text-success"
            } ${latePermission.status.status === "rejected" && "text-danger"}`}
          >
            {latePermission.status.status}
          </h5>
        </div>
        <div className="permission-image col-sm-6 pb-2 pb-lg-0">
          <img
            src={imageAccessURL + latePermission.studentImage}
            alt={latePermission.studentName + "'s Image"}
            className="rounded w-100 h-100"
          />
        </div>
        <div className="details col-sm-6 border-start border-2 pt-2 pt-lg-0">
          <h2 className="mb-0">{latePermission.studentName}</h2>
          <p className="text-muted">ID: {latePermission.studentId}</p>
          <div className="row row-cols-2">
            <p>
              <b>OUT:</b> {latePermission.outTime}
            </p>
            <p>
              <b>IN:</b> {latePermission.inTime}
            </p>
          </div>
          <div className="mb-3">
            <p className="m-0">
              Block: {latePermission.studentBlockName} (
              {latePermission.studentRoomNumber})
            </p>
            <p className="m-0">
              Department: {latePermission.studentDepartment}
            </p>
            <p className="m-0">
              Academic Year: {latePermission.studentAcademicYear}
            </p>
          </div>
          <div className="">
            <p className="mb-1">
              <b className="border-bottom border-3 border-primary">Reason:</b>
            </p>
            <p className="permission-reason">
              {latePermission.reason}
            </p>
          </div>
          <div>
            <p className="fw-bold text-primary">
              Approved by {latePermission.status.name} (
              {latePermission.status.by})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PermissionDetails;
