import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function AddStaff() {
  const { addStaff, handleAddStaff, setAddStaff, setIsAddingStaff } =
    useContext(AppContext);
  return (
    <div>
      <h1>Add staff</h1>
      <form onSubmit={(e) => handleAddStaff(e)}>
        <div>
          <label htmlFor="employeeId">Employee Id:</label>
          <input
            type="text"
            name="employeeId"
            id="employeeId"
            onChange={(e) =>
              setAddStaff((prev) => ({ ...prev, employeeId: e.target.value }))
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
              setAddStaff((prev) => ({ ...prev, name: e.target.value }))
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
              setAddStaff((prev) => ({ ...prev, email: e.target.value }))
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
            onChange={(e) =>
              setAddStaff((prev) => ({ ...prev, phone: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            onChange={(e) =>
              setAddStaff((prev) => ({ ...prev, role: e.target.value }))
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
        {addStaff.role !== "librarian" && addStaff.role !== "" && (
          <div>
            <label htmlFor="blockName">Block Name:</label>
            <select
              name="blockName"
              id="blockName"
              onChange={(e) =>
                setAddStaff((prev) => ({
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
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={(e) =>
              setAddStaff((prev) => ({ ...prev, gender: e.target.value }))
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
              setAddStaff((prev) => ({ ...prev, gender: e.target.value }))
            }
            required
          />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <button type="submit">Add</button>
          <button type="reset" onClick={() => setIsAddingStaff(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStaff;
