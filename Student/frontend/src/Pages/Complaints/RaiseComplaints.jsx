import React, { useState } from "react";
import "./RaiseComplaints.css";

const RaiseComplaints = () => {
    const [formData, setFormData] = useState({
        registrationNo: "",
        studentName: "",
        blockName: "",
        roomNo: "",
        issueType: "",
        description: "",
        photo: null,
    });

    const [message, setMessage] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("registrationNo", formData.registrationNo);
        formDataToSend.append("studentName", formData.studentName);
        formDataToSend.append("blockName", formData.blockName);
        formDataToSend.append("roomNo", formData.roomNo);
        formDataToSend.append("issueType", formData.issueType);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("photo", formData.photo);

        try {
            // Replace `/api/complaints` with your backend endpoint
            const response = await fetch("/api/complaints", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                setMessage("Complaint submitted successfully!");
                setFormData({
                    registrationNo: "",
                    studentName: "",
                    blockName: "",
                    roomNo: "",
                    issueType: "",
                    description: "",
                    photo: null,
                });
            } else {
                setMessage("Error submitting complaint. Please try again.");
            }
        } catch (error) {
            setMessage("Network error. Please try again later.");
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Raise Your Complaints</h2>
            <form onSubmit={handleSubmit}>
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
                    <input
                        type="text"
                        name="blockName"
                        value={formData.blockName}
                        onChange={handleChange}
                        required
                    />
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
                    <label>Upload Photo:</label>
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group submit-button">
                    <button type="submit">Submit</button>
                </div>
            </form>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default RaiseComplaints;
