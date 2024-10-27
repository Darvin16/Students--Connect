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

  const calcDelayTime = (time) => {
    if (!time) {
      return "-";
    }

    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : ``} ${
      remainingMinutes > 0
        ? `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
        : ""
    }`;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Library Past Records
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead
            style={{
              backgroundColor: "blue",
            }}
          >
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Request ID
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Student Name
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Block Name
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Room Number
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Branch
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Warden Approval
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                SRO Approval
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                In Time
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Out Time
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Delay Time
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Request Cancelled
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Download File
              </TableCell>
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
                  Time:{" "}
                  {record.wardenApproval
                    ? new Date(record.wardenApproval?.time).toLocaleString(
                        "en-GB",
                        {
                          hour12: true,
                        }
                      )
                    : ""}
                </TableCell>
                <TableCell>
                  Status: {record.SROApproval?.status} <br />
                  By: {record.SROApproval?.by} <br />
                  Time:{" "}
                  {record.SROApproval
                    ? new Date(record.SROApproval?.time).toLocaleString(
                        "en-GB",
                        {
                          hour12: true,
                        }
                      )
                    : ""}
                </TableCell>
                <TableCell>
                  {record.in
                    ? new Date(record.in?.time).toLocaleString("en-GB", {
                        hour12: true,
                      })
                    : "-"}
                </TableCell>
                <TableCell>
                  {record.out
                    ? new Date(record.out?.time).toLocaleString("en-GB", {
                        hour12: true,
                      })
                    : "-"}
                </TableCell>
                <TableCell>{calcDelayTime(record.delayTime)}</TableCell>
                <TableCell>
                  {record.cancelRequest?.status ? (
                    <>
                      Cancelled at{" "}
                      {new Date(record.cancelRequest?.time).toLocaleString(
                        "en-GB",
                        { hour12: true }
                      )}{" "}
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
                    onClick={() => generatePDF(record.requestId, "library")}
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
