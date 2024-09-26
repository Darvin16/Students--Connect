import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css"; // CSS Module

function Signup() {
  const { signupForm, setSignupForm, Signup } = useContext(AppContext);
  const [showHostelInfo, setShowHostelInfo] = useState(false); // State for toggling

  console.log(signupForm);

  return (
    <div className={`container ${styles.signupPage}`}>
      <div className={styles.signupContainer}>
        <h2 className="text-center">Student Connect</h2>
        <h3 className="text-center">
          {showHostelInfo ? "Hostel Registration" : "Student Details"}
        </h3>
        <div className="form-switch my-3 text-center">
          <label className="form-check-label mx-3">Student Details</label>
          <input
            className="form-check-input"
            type="checkbox"
            checked={showHostelInfo}
            onChange={() => setShowHostelInfo(!showHostelInfo)}
          />
          <label className="form-check-label mx-3">Hostel Info</label>
        </div>

        <form className={styles.signupForm} onSubmit={(e) => Signup(e)}>
          {!showHostelInfo ? (
            // Student Details Section
            <>
              <div className="form-group">
                <label htmlFor="studentId">Student Id:</label>
                <input
                  className="form-control"
                  type="text"
                  name="studentId"
                  id="studentId"
                  value={signupForm.studentId}
                  onChange={(e) =>
                    setSignupForm((prev) => ({
                      ...prev,
                      studentId: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  value={signupForm.name}
                  onChange={(e) =>
                    setSignupForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  id="phone"
                  value={signupForm.phone}
                  placeholder="0000000000"
                  pattern="[0-9]{10}"
                  onChange={(e) =>
                    setSignupForm((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department:</label>
                <select
                  className="form-control"
                  name="department"
                  id="department"
                  value={signupForm.department}
                  onChange={(e) => {
                    setSignupForm((prev) => ({
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
              </div>

              <div className="form-group">
                <label htmlFor="branchName">Branch Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="branchName"
                  id="branchName"
                  value={signupForm.branchName}
                  placeholder="AI, CSE, ECE, etc..."
                  onChange={(e) => {
                    setSignupForm((prev) => ({
                      ...prev,
                      branchName: e.target.value,
                    }));
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="academic-year">Academic Year:</label>
                <input
                  className="form-control"
                  type="text"
                  name="academic-year"
                  id="academic-year"
                  value={signupForm.academicYear}
                  placeholder={new Date.getFullYear()}
                  onChange={(e) => {
                    setSignupForm((prev) => ({
                      ...prev,
                      academicYear: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="blockName">Block Name:</label>
                <select
                  className="form-control"
                  name="blockName"
                  id="blockName"
                  value={signupForm.blockName}
                  onChange={(e) =>
                    setSignupForm((prev) => ({
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
              </div>

              <div className="form-group">
                <label htmlFor="roomNumber">Room Number:</label>
                <input
                  className="form-control"
                  type="text"
                  name="roomNumber"
                  id="roomNumber"
                  value={signupForm.roomNumber}
                  onChange={(e) => {
                    setSignupForm((prev) => ({
                      ...prev,
                      roomNumber: e.target.value,
                    }));
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={signupForm.gender === "male"}
                    onChange={(e) =>
                      setSignupForm((prev) => ({
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
                    checked={signupForm.gender === "female"}
                    onChange={(e) =>
                      setSignupForm((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    required
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password:</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  value={signupForm.confirmPassword}
                  onChange={(e) =>
                    setSignupForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </>
          )}

          <div className="text-center mt-3">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
