import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function EditStaff() {
  const { editStaff, setEditStaff, handleEditStaff } = useContext(AppContext);
  return (
    <div>
      <h1>Edit staff</h1>
      <form onSubmit={(e) => handleEditStaff(e)}>
        <div>
          <label htmlFor="employeeId">Employee Id:</label>
          <input
            type="text"
            name="employeeId"
            id="employeeId"
            onChange={(e) =>
              setEditStaff((prev) => ({ ...prev, employeeId: e.target.value }))
            }
            value={editStaff.employeeId}
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
              setEditStaff((prev) => ({ ...prev, name: e.target.value }))
            }
            value={editStaff.name}
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
              setEditStaff((prev) => ({ ...prev, email: e.target.value }))
            }
            value={editStaff.email}
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
              setEditStaff((prev) => ({ ...prev, phone: e.target.value }))
            }
            value={editStaff.phone}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            onChange={(e) =>
              setEditStaff((prev) => ({ ...prev, role: e.target.value }))
            }
            value={editStaff.role}
            required
          >
            <option value="">select role</option>
            <option value="warden">Warden</option>
            <option value="SRO">SRO</option>
            <option value="supervisor">Supervisor</option>
            <option value="librarian">Librarian</option>
          </select>
        </div>
        {editStaff.role !== "librarian" && addStaff.role !== "" && (
          <div>
            <label htmlFor="blockName">Block Name:</label>
            <select
              name="blockName"
              id="blockName"
              onChange={(e) =>
                setEditStaff((prev) => ({
                  ...prev,
                  blockName: e.target.value,
                }))
              }
              value={editStaff.blockName}
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
          <label
            htmlFor="gender"
          >
            Gender:
          </label>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={(e) =>
              setEditStaff((prev) => ({ ...prev, gender: e.target.value }))
            }
            checked={editStaff.gender === "male"}
            required
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={(e) =>
              setEditStaff((prev) => ({ ...prev, gender: e.target.value }))
            }
            checked={editStaff.gender === "female"}
            required
          />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <button type="submit">Add</button>
          <button type="reset" onClick={() => setEditStaff(null)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStaff;
