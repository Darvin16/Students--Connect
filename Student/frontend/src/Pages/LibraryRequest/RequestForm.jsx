import React from "react";
import { useLocation } from "react-router-dom";
import "./requestForm.css";

function RequestForm() {
  const formData = useLocation().state;
  return (
      <div className="request-form-page">
          <h2>Request Form</h2>
      <div className="request-form-body">
        <p>
          {new Date(formData.requestDate).toLocaleDateString("en-Gb", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
          })}
        </p>
        <p>
          The form is approved by warden and SRO of the student hostel block, so
          your details should be recorded with time.
        </p>
      </div>
      <div className="request-form-details">
        <div className="request-form-group">
          <b>Student Id: </b>
          <span>{formData.studentId}</span>
        </div>
        <div className="request-form-group">
          <b>Block Name: </b>
          <span>{formData.studentBlockName}</span>
        </div>
        <div className="request-form-group">
          <b>Student Name: </b>
          <span>{formData.studentName}</span>
        </div>
        <div className="request-form-group">
          <b>Room No: </b>
          <span>{formData.studentRoomNumber}</span>
        </div>
        <div className="request-form-group">
          <b>Department: </b>
          <span>{formData.studentDepartment}</span>
        </div>
        <div className="request-form-group">
          <b>Branch: </b>
          <span>{formData.studentBranchName}</span>
        </div>
        <div className="request-form-group">
          <b>Academic Year: </b>
          <span>{formData.studentAcademicYear}</span>
        </div>
        <div className="request-form-group">
          <b>Application Received Time: </b>
          <span>
            {new Date(formData.requestDate).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
        <div className="request-form-group">
          <p>
            <b>Approved By:-</b>
          </p>
          <p>
            <b>Warden Name: </b>
            <span>{formData.wardenApproval?.wardenName}</span>
          </p>
          <p>
            <b>Approved On: </b>
            <span>
              {new Date(formData.wardenApproval?.time).toLocaleDateString(
                "en-GB",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                }
              )}
            </span>
          </p>
        </div>
        <div className="request-form-group">
          <p>
            <b>Approved By:-</b>
          </p>
          <p>
            <b>SRO Name: </b>
            <span>{formData.SROApproval?.SROName}</span>
          </p>
          <p>
            <b>Approved On: </b>
            <span>
              {new Date(formData.SROApproval?.time).toLocaleDateString(
                "en-GB",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                }
              )}
            </span>
          </p>
        </div>
        <div className="request-form-group closer">
          <p><strong>Note: </strong>
            Delay Time will be Calculate with rest time of <b>30 minutes</b> if
            the request was approved within <b>9pm</b>, Otherwise rest time will
            be considered as <b>15 minutes</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RequestForm;
