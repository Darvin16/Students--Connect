import React, { useContext, useEffect } from "react";
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

function LeaveRecords() {
  const { fetchLeaveRequests, leaveRecords, generatePDF } =
    useContext(AppContext);

  useEffect(() => {
    if (leaveRecords.length === 0) {
      fetchLeaveRequests();
    }
  }, [leaveRecords]);

  if (leaveRecords.length === 0) return <>Loading...</>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Leave Past Records
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
                Department
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
                Requested Date
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Leave Duration
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
            {[...leaveRecords].reverse().map((record) => (
              <TableRow key={record.requestId}>
                <TableCell>{record.requestId}</TableCell>
                <TableCell>{record.studentName}</TableCell>
                <TableCell>{record.studentBlockName}</TableCell>
                <TableCell>{record.studentRoomNumber}</TableCell>
                <TableCell>{record.studentDepartment}</TableCell>
                <TableCell>{record.studentBranchName}</TableCell>
                <TableCell>
                  Status:&nbsp;{record.wardenApproval?.status} <br />
                  By:&nbsp;{record.wardenApproval?.by} <br />
                  Time:&nbsp;
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
                  Status:&nbsp;{record.SROApproval?.status} <br />
                  By:&nbsp;{record.SROApproval?.by} <br />
                  Time:&nbsp;
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
                  {new Date(record.requestDate).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {record.oneDayLeave
                    ? new Date(record.from).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : `${new Date(record.from).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })} to ${new Date(record.to).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}`}
                </TableCell>
                <TableCell>
                  {record.cancelRequest?.status ? (
                    <>
                      Cancelled at{" "}
                      {new Date(record.cancelRequest?.time).toLocaleString(
                        "en-GB",
                        {
                          hour12: true,
                        }
                      )}
                      <br />
                      <br />
                      Reason:&nbsp;{record.cancelRequest?.reason}
                    </>
                  ) : (
                    "No"
                  )}
                </TableCell>
                <TableCell>
                  <button
                    className="download-file-btn"
                    onClick={() => generatePDF(record.requestId, "leave")}
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

export default LeaveRecords;
