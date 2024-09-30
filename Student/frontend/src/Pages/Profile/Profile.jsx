import React, { useContext, useEffect } from "react";
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
        <button
          className="profile-edit-button"
          onClick={() => {
            setEditProfile({
              name: userData.name,
              phone: userData.phone,
              email: userData.email,
              department: userData.department,
              branchName: userData.branchName,
              roomNumber: userData.roomNumber,
              gender: userData.gender,
              address: userData.address,
              academicYear: userData.academicYear,
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
                    checked={editProfile.gender === "male"}
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
                    checked={editProfile.gender === "female"}
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
            <div className="profile-details-group">
              <p>
                <b>Department:</b>
              </p>
              {Object.keys(editProfile).length > 0 ? (
                <select
                  name="department"
                  id="department"
                  value={editProfile.department}
                  onChange={(e) => {
                    setEditProfile((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }));
                  }}
                  required
                >
                  <option value="">Select Department</option>
                  <optgroup label="Bachelor's Degrees">
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="B.C.A">B.C.A</option>
                    <option value="B.Arch">B.Arch</option>
                    <option value="B.Des">B.Des</option>
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="B.B.A">B.B.A</option>
                    <option value="B.M.S">B.M.S</option>
                    <option value="B.Com">B.Com</option>
                    <option value="B.I.T">B.I.T</option>
                    <option value="B.Voc">B.Voc</option>
                    <option value="B.S">B.S</option>
                    <option value="B.F.A">B.F.A</option>
                    <option value="B.L">B.L</option>
                    <option value="B.Ed">B.Ed</option>
                    <option value="B.P.Ed">B.P.Ed</option>
                    <option value="B.F.Sc">B.F.Sc</option>
                    <option value="B.D.S">B.D.S</option>
                    <option value="B.H.M">B.H.M</option>
                    <option value="B.S.W">B.S.W</option>
                  </optgroup>

                  <optgroup label="Master's Degrees">
                    <option value="M.Sc">M.Sc</option>
                    <option value="M.C.A">M.C.A</option>
                    <option value="M.Arch">M.Arch</option>
                    <option value="M.Des">M.Des</option>
                    <option value="M.B.A">M.B.A</option>
                    <option value="M.S">M.S</option>
                    <option value="M.Pharm">M.Pharm</option>
                    <option value="M.Com">M.Com</option>
                    <option value="M.Phil">M.Phil</option>
                    <option value="M.Voc">M.Voc</option>
                    <option value="M.F.A">M.F.A</option>
                    <option value="M.Ed">M.Ed</option>
                    <option value="M.P.Ed">M.P.Ed</option>
                    <option value="M.L">M.L</option>
                    <option value="M.F.Sc">M.F.Sc</option>
                    <option value="M.D">M.D</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="M.Sc">M.Sc</option>
                  </optgroup>
                </select>
              ) : (
                <p>{userData.department}</p>
              )}
            </div>
            <div className="profile-details-group">
              <p>
                <b>Branch:</b>
              </p>
              {Object.keys(editProfile).length > 0 ? (
                <input
                  type="text"
                  name="branchName"
                  id="branchName"
                  value={editProfile.branchName}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      branchName: e.target.value,
                    })
                  }
                  required
                />
              ) : (
                <p>{userData.branchName}</p>
              )}
            </div>
            <div className="profile-details-group">
              <p>
                <b>Academic Year:</b>
              </p>
              {Object.keys(editProfile).length > 0 ? (
                <input
                  type="text"
                  name="academicYear"
                  id="academicYear"
                  value={editProfile.academicYear}
                  pattern="[0-9]{4}"
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      academicYear: e.target.value,
                    })
                  }
                  required
                />
              ) : (
                <p>{userData.academicYear}</p>
              )}
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
              {Object.keys(editProfile).length > 0 ? (
                <input
                  type="text"
                  name="roomNumber"
                  id="roomNumber"
                  value={editProfile.roomNumber}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      roomNumber: e.target.value,
                    })
                  }
                  required
                />
              ) : (
                <p>{userData.roomNumber}</p>
              )}
            </div>
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
