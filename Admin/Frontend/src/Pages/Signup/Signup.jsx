import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import "./signup.css";

function Signup() {
  const { signupForm, setSignupForm, StaffSignup, navigate } =
    useContext(AppContext);

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={(e) => StaffSignup(e)}>
        <div className="form-group">
          <label htmlFor="profileImage"></label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            onChange={(e) =>
              setSignupForm((prev) => ({
                ...prev,
                staffImage: e.target.files[0],
              }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="employeeId">Employee Id:</label>
          <input
            type="text"
            name="employeeId"
            id="employeeId"
            onChange={(e) =>
              setSignupForm((prev) => ({ ...prev, employeeId: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) =>
              setSignupForm((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) =>
              setSignupForm((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="0000000000"
            pattern="[0-9]{10}"
            onChange={(e) =>
              setSignupForm((prev) => ({ ...prev, phone: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            onChange={(e) =>
              setSignupForm((prev) => ({ ...prev, role: e.target.value }))
            }
            required
          >
            <option value="">Select Role</option>
            <option value="warden">Warden</option>
            <option value="SRO">SRO</option>
            <option value="supervisor">Supervisor</option>
            <option value="librarian">Librarian</option>
          </select>
        </div>
        {signupForm.role !== "librarian" && (
          <div className="form-group">
            <label htmlFor="blockName">Block Name:</label>
            <select
              name="blockName"
              id="blockName"
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
        )}
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, gender: e.target.value }))
              }
              required
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, gender: e.target.value }))
              }
              required
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setSignupForm((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            onChange={(e) =>
              setSignupForm((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
      <div className="login-prompt">
        <button onClick={() => navigate("/login")} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
