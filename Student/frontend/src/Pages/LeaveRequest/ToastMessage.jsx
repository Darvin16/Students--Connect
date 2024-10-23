import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./LeaveRequest.css";
import { AppContext } from "../../Context/AppContext";

function ToastMessage() {
  const { setShowToast } = useContext(AppContext);

  return (
    <div className="toast-box">
      <h3>Request Raised Successfully</h3>
      <FontAwesomeIcon icon={faCircleCheck} />
      <button onClick={() => setShowToast(false)}>Continue</button>
      <p>Check request status to view</p>
    </div>
  );
}

export default ToastMessage;
