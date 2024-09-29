import React, { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import uploadImage from "../../Asset/upload.png";
import "./Profile.css";

function Profile() {
  const { authToken, userData, imageAccessURL, addProfileImage, fetchUser } =
    useContext(AppContext);

  useEffect(() => {
    if (authToken && !userData) {
      fetchUser();
    }
  }, [userData, authToken]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-page-group">
        <div className="profile-page-image">
          <img
            src={
              userData.studentImage
                ? imageAccessURL + userData.studentImage
                : uploadImage
            }
            alt="profile"
          />
          <label htmlFor="add-image">
            <span>+</span>
          </label>
          <input
            type="file"
            name="add-image"
            id="add-image"
            onChange={(e) => {
              if (e.target.files[0]) {
                addProfileImage(e.target.files[0]);
              }
            }}
            style={{
              opacity: 0,
            }}
          />
        </div>
        <div className="profile-page-header">
          <h3>{userData.name}</h3>
          <p>(Block: {userData.blockName})</p>
          <p>{userData.academicYear}</p>
        </div>
        <button className="profile-edit-button">Edit</button>
      </div>
      <div className="profile-page-group">
        <h3>Student Details</h3>
        <div className="profile-details">
          <div className="profile-details-group">
            <p>
              <b>Student ID:</b>
            </p>
            <p>{userData.studentId}</p>
          </div>
          <div className="profile-details-group">
            <p>
              <b>Student Name:</b>
            </p>
            <p>{userData.name}</p>
          </div>
          <div className="profile-details-group">
            <p>
              <b>E-mail:</b>
            </p>
            <p>{userData.email}</p>
          </div>
          <div className="profile-details-group">
            <p>
              <b>Contact No:</b>
            </p>
            <p>{userData.phone}</p>
          </div>
          <div className="profile-details-group">
            <p>
              <b>Gender:</b>
            </p>
            <p>{userData.gender}</p>
          </div>
          <div className="profile-details-group">
            <p>
              <b>Department:</b>
            </p>
            <p>{userData.department}</p>
          </div>
          <div className="profile-details-group">
            <p>
              <b>Branch:</b>
            </p>
            <p>{userData.branchName}</p>
          </div>
          <div className="profile-details-group">
            <p>
              <b>Academic Year:</b>
            </p>
            <p>{userData.academicYear}</p>
          </div>
          <div className="profile-details-group">
            <p>
              <b>Block Name:</b>
            </p>
            <p>{userData.blockName}</p>
          </div>
          <div className="profile-details-group">
            <p>
              <b>Room Number:</b>
            </p>
            <p>{userData.roomNumber}</p>
          </div>
        </div>
      </div>
      <div className="profile-page-group">
        <div className="profile-details-group">
          <p>
            <b>Address: </b>
          </p>
          <p>{userData.address}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
