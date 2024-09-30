import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import uploadImage from "../../Asset/upload.png";
import "./Profile.css";

function Profile() {
  const {
    authToken,
    userData,
    imageAccessURL,
    addProfileImage,
    fetchUser,
    handleEditProfile,
    editProfile,
    setEditProfile,
  } = useContext(AppContext);

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
      <div className="profile-page-group first-box">
        <div className="profile-page-image">
          <img
            src={
              userData.staffImage
                ? imageAccessURL + userData.staffImage
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
          {userData.role !== "librarian" ? (
            <p>(Block: {userData.blockName})</p>
          ) : (
            <></>
          )}
          <p>{userData.role}</p>
        </div>
        <button
          className="profile-edit-button"
          onClick={() => {
            setEditProfile({
              name: userData.name,
              phone: userData.phone,
              email: userData.email,
              blockName: userData.blockName,
              gender: userData.gender,
              address: userData.address,
            });
            window.scrollTo(0, 300);
          }}
        >
          Edit
        </button>
      </div>
      <form
        className="edit-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleEditProfile(editProfile);
        }}
      >
        <div className="profile-page-group">
          <h3>Staff Details</h3>
          <div className="profile-details">
            <div className="profile-details-group">
              <p>
                <b>Employee ID:</b>
              </p>
              <p>{userData.employeeId}</p>
            </div>
            <div className="profile-details-group">
              <p>
                <b>Staff Name:</b>
              </p>

              {Object.keys(editProfile).length > 0 ? (
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editProfile.name}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, name: e.target.value })
                  }
                  required
                />
              ) : (
                <p>{userData.name}</p>
              )}
            </div>
            <div className="profile-details-group">
              <p>
                <b>Position:</b>
              </p>
              <p>{userData.role}</p>
            </div>
            <div className="profile-details-group">
              <p>
                <b>E-mail:</b>
              </p>
              {Object.keys(editProfile).length > 0 ? (
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={editProfile.email}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, email: e.target.value })
                  }
                  required
                />
              ) : (
                <p>{userData.email}</p>
              )}
            </div>
            <div className="profile-details-group">
              <p>
                <b>Contact No:</b>
              </p>
              {Object.keys(editProfile).length > 0 ? (
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={editProfile.phone}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, phone: e.target.value })
                  }
                  required
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>
            <div className="profile-details-group">
              <p>
                <b>Gender:</b>
              </p>
              {Object.keys(editProfile).length > 0 ? (
                <div className="edit-radio">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={editProfile.gender==="male"}
                    onChange={(e) =>
                      setEditProfile((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    required
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={editProfile.gender==="female"}
                    onChange={(e) =>
                      setEditProfile((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    required
                  />
                  <label htmlFor="female">Female</label>
                </div>
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>
            {userData.role !== "librarian" ? (
              <div className="profile-details-group">
                <p>
                  <b>Block Name:</b>
                </p>
                {Object.keys(editProfile).length > 0 ? (
                  <select
                    name="blockName"
                    id="blockName"
                    value={editProfile.blockName}
                    onChange={(e) =>
                      setEditProfile((prev) => ({
                        ...prev,
                        blockName: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Select Block</option>
                    <option value="A-sannasi">A - Sannasi</option>
                    <option value="B-thamarai">B - Thamari</option>
                    <option value="C-malligai">C - Malligai</option>
                    <option value="D-agasthiyar">D - Agasthiyar</option>
                    <option value="E-nelson_mandela">E - Nelson Mandela</option>
                    <option value="F-oori">F - Oori</option>
                    <option value="G-paari">G - Paari</option>
                  </select>
                ) : (
                  <p>{userData.blockName}</p>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="profile-page-group">
          <div className="profile-details-group">
            <p>
              <b>Address: </b>
            </p>
            {Object.keys(editProfile).length > 0 ? (
              <textarea
                name="address"
                id="address"
                value={editProfile.address}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, address: e.target.value })
                }
                required
              ></textarea>
            ) : (
              <p>{userData.address}</p>
            )}
          </div>
          {Object.keys(editProfile).length > 0 && (
            <div className="edit-form-btn">
              <button type="submit">Submit</button>
              <button type="reset" onClick={() => setEditProfile({})}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
