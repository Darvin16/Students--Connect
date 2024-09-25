import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Libraryrecords.css'; // Import the CSS file for styling

const LibraryRequests = () => {
    // Sample data for library requests (you can replace this with your API data)
    const requests = [
        {
            id: 1,
            studentId: 'S001',
            studentName: 'Alice Smith',
            department: 'Computer Science',
            blockName: 'Block A',
            roomNo: '101',
            requestForm: 'Library Access for Study',
            requestedDate: '2024-09-25 10:00 AM',
        },
        {
            id: 2,
            studentId: 'S002',
            studentName: 'Bob Johnson',
            department: 'Mathematics',
            blockName: 'Block B',
            roomNo: '202',
            requestForm: 'Library Access for Research',
            requestedDate: '2024-09-24 09:30 AM',
        },
        // Add more requests as needed
    ];

    const handleApprove = (requestId) => {
        // Logic for approving the request (e.g., API call)
        console.log(`Approved request ID: ${requestId}`);
    };

    const handleReject = (requestId) => {
        // Logic for rejecting the request (e.g., API call)
        console.log(`Rejected request ID: ${requestId}`);
    };

    return (
        <div className="library-requests-container">
            <h2 className="text-center my-4">Library Requests</h2>
            <div className="card">
                <div className="card-body">
                    <table className="table table-responsive">
                        <thead className="thead-light">
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Block Name</th>
                                <th>Room No</th>
                                <th>Request Form</th>
                                <th>Requested Date & Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.studentId}</td>
                                    <td>{request.studentName}</td>
                                    <td>{request.department}</td>
                                    <td>{request.blockName}</td>
                                    <td>{request.roomNo}</td>
                                    <td>{request.requestForm}</td>
                                    <td>{request.requestedDate}</td>
                                    <td>
                                        <button className="btn btn-success me-1" onClick={() => handleApprove(request.id)}>
                                            Approve
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleReject(request.id)}>
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LibraryRequests;
