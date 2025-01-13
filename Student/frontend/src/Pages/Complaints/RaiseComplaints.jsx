import React, { useContext, useState } from "react";
import "./RaiseComplaints.css";
import { AppContext } from "../../Context/AppContext";

const RaiseComplaints = () => {
  const { handleComplaintSubmit } = useContext(AppContext);
  const [formData, setFormData] = useState({
    registrationNo: "",
    studentName: "",
    blockName: "",
    roomNo: "",
    issueType: "",
    description: "",
    hasPhoto: false,
    photo: null,
  });

  const issueOptions = [
    "Fans Fix",
    "WiFi Issues",
    "Water Issues",
    "AC Issues",
    "Ragging Issues",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Raise Your Complaints</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleComplaintSubmit(formData);
          setFormData({
            registrationNo: "",
            studentName: "",
            blockName: "",
            roomNo: "",
            issueType: "",
            description: "",
            hasPhoto: false,
            photo: null,
          });
        }}
      >
        <div className="form-group">
          <label>Registration No:</label>
          <input
            type="text"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Block Name:</label>
          <select
            name="blockName"
            id="blockName"
            value={formData.blockName}
            onChange={handleChange}
            required
          >
            <option value="">--Select Block--</option>
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
          <label>Room No:</label>
          <input
            type="text"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Complaint Issue:</label>
          <select
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            required
          >
            <option value="">--Select an Issue--</option>
            {issueOptions.map((issue, index) => (
              <option key={index} value={issue}>
                {issue}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Complaint Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="hasPhoto"
            checked={formData.hasPhoto}
            className="me-1"
            onChange={() =>
              setFormData((prev) => ({ ...prev, hasPhoto: !prev.hasPhoto }))
            }
          />
          <label className="d-inline">Has a Photo To Upload</label>
        </div>
        {formData.hasPhoto && (
          <div className="form-group">
            <label>Upload Photo:</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
        )}
        <div className="form-group submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RaiseComplaints;
