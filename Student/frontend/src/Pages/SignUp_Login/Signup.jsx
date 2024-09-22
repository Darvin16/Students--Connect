import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

function Signup() {
  const { setSignupForm, Signup } = useContext(AppContext);

  return (
    <div>
      <form onSubmit={(e) => Signup(e)}>
        <div>
          <label htmlFor="studentId">Student Id:</label>
          <input
            type="text"
            name="studentId"
            id="studentId"
            onChange={(e) =>
              setSignupForm((prev) => ({
                ...prev,
                studentId: e.target.value,
              }))
            }
            required
          />
        </div>
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            name="department"
            id="department"
            onChange={(e) => {
              setSignupForm((prev) => ({
                ...prev,
                department: e.target.value,
              }));
            }}
            required
          />
        </div>
        <div>
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
        <div>
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="text"
            name="roomNumber"
            id="roomNumber"
            onChange={(e) => {
              setSignupForm((prev) => ({
                ...prev,
                roomNumber: e.target.value,
              }));
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
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
        <div>
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
        <div>
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
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
