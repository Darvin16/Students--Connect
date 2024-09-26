import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Libraryrecords.css";
import { AppContext } from "../../Context/AppContext";
import { useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper, TableContainer } from "@mui/material";


function LibraryRecordsHistory() {
  const {
    userData,
    libraryRecords,
    fetchLibraryRequests,
  } = useContext(AppContext);

  useEffect(() => {
    if (libraryRecords.length === 0) {
      fetchLibraryRequests();
    }
  }, [libraryRecords]);

  if (userData?.role === "warden" || userData?.role === "SRO") {
    return (<Container>
      <Typography variant="h4" gutterBottom align="center">
        Library Past Records
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Block Name</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Warden Approval</TableCell>
              <TableCell>SRO Approval</TableCell>
              <TableCell>In Time</TableCell>
              <TableCell>Out Time</TableCell>
              <TableCell>Delay Time</TableCell>
              <TableCell>Request Cancelled</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {libraryRecords.map((record) => (
              <TableRow key={record.requestId}>
                <TableCell>{record.requestId}</TableCell>
                <TableCell>{record.studentName}</TableCell>
                <TableCell>{record.studentBlockName}</TableCell>
                <TableCell>{record.studentRoomNumber}</TableCell>
                <TableCell>{record.studentBranchName}</TableCell>
                <TableCell>
                  Status: {record.wardenApproval?.status} <br />
                  By: {record.wardenApproval?.by} <br />
                  Time: {new Date(record.wardenApproval?.time).toLocaleString()}
                </TableCell>
                <TableCell>
                  Status: {record.SROApproval?.status} <br />
                  By: {record.SROApproval?.by} <br />
                  Time: {new Date(record.SROApproval?.time).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(record.in?.time).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(record.out?.time).toLocaleString()}
                </TableCell>
                <TableCell>{(record.delayTime) / (1000 * 60 )} minutes</TableCell>
                <TableCell>
                  {record.cancelRequest?.status ? (
                    <>
                      Cancelled at {new Date(record.cancelRequest?.time).toLocaleString()} <br />
                      Reason: {record.cancelRequest?.reason}
                    </>
                  ) : (
                    "No"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>)
  }

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
              {libraryRecords.map((request) => (
                <tr key={request.requestid}>
                  <td>{request.studentId}</td>
                  <td>{request.studentName}</td>
                  <td>{request.studentDepartment}</td>
                  <td>{request.studentBlockName}</td>
                  <td>{request.studentRoomNumber}</td>
                  <td>{request.requestForm}</td>
                  <td>
                    {new Date(request.requestDate).toLocaleString("en-GB", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td>
                    <p>Warden: {request.wardenApproval?.status}</p>
                    <p>SRO: {request.SROApproval?.status}</p>
                    <p>IN: {request.in?.by}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LibraryRecordsHistory
