import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Libraryrecords.css";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableContainer,
} from "@mui/material";

function LibraryRecordsHistory() {
  const { userData, libraryRecords, fetchLibraryRequests, generatePDF } =
    useContext(AppContext);

  useEffect(() => {
    if (libraryRecords.length === 0) {
      fetchLibraryRequests();
    }
  }, [libraryRecords]);

  return (
    <Container>
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
              <TableCell>Download File</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {[...libraryRecords].reverse().map((record) => (
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
                <TableCell>
                  {(record.delayTime / (1000 * 60)).toFixed(2)} minutes
                </TableCell>
                <TableCell>
                  {record.cancelRequest?.status ? (
                    <>
                      Cancelled at{" "}
                      {new Date(record.cancelRequest?.time).toLocaleString()}{" "}
                      <br />
                      Reason: {record.cancelRequest?.reason}
                    </>
                  ) : (
                    "No"
                  )}
                </TableCell>
                <TableCell>
                  <button
                    className="download-file-btn"
                    onClick={() => generatePDF(record.requestId)}
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default LibraryRecordsHistory;
