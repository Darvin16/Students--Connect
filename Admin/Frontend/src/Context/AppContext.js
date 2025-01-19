import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fileDownload from "js-file-download";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      ""
  );
  const [userData, setUserData] = useState();
  const [loginForm, setLoginForm] = useState({
    employeeId: "",
    password: "",
    rememberMe: false,
  });
  const [adminLoginForm, setAdminLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [staffEntryCount, setStaffEntryCount] = useState(0);
  const [addStaff, setAddStaff] = useState([]);
  const [addStaffResult, setAddStaffResult] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [studentEntryCount, setStudentEntryCount] = useState(0);
  const [addStudent, setAddStudent] = useState([]);
  const [addStudentResult, setAddStudentResult] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [staffRecords, setStaffRecords] = useState([]);
  const [studentRecords, setStudentRecords] = useState([]);
  const [signupForm, setSignupForm] = useState({});
  const [libraryRequests, setLibraryRequests] = useState([]);
  const [libraryRecords, setLibraryRecords] = useState([]);
  const [dashboardInfo, setDashboardInfo] = useState({});
  const imageAccessURL = "http://localhost:9000/StaffImages/";
  const studentUploadsURL = "http://localhost:9000/StudentImage/";
  const LeaveImagesURL = "http://localhost:9000/LeaveImages/";
  const [editProfile, setEditProfile] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [latePermissionRequests, setLatePermissionRequests] = useState([]);
  const [latePermissionRecords, setLatePermissionRecords] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [complaintRecords, setComplaintRecords] = useState([]);
  const URL = "http://localhost:9000";

  useEffect(() => {
    if (authToken && !userData) {
      fetchUser();
    }
  }, [authToken, userData]);

  useEffect(() => {
    if (authToken) {
      fetchStudentRecords();
      fetchLibraryRequests();
      fetchLeaveRequests();
      fetchDashboardInfo();
      fetchLatePermission();
      fetchComplaints();
    }
  }, [authToken]);

  async function fetchComplaints() {
    try {
      const response = await axios.get(`${URL}/fetch/complaints`, {
        headers: {
          authToken: authToken,
        },
      });

      if (response.status === 200) {
        setComplaints(response.data.complaints);
        setComplaintRecords(response.data.complaintRecords);
      }
    } catch (error) {
      console.error("Error: ", error.message, error);
    }
  }

  async function fetchLatePermission() {
    try {
      const result = await axios.get(`${URL}/late-permission/fetch`, {
        headers: {
          authToken: authToken,
        },
      });

      if (result.status === 200) {
        setLatePermissionRequests(result.data.requests);
        setLatePermissionRecords(result.data.records);
      }
    } catch (error) {
      console.error("Error: ", error.message, error);
    }
  }

  async function updateLatePermission(id, status) {
    try {
      const result = await axios.put(
        `${URL}/late-permission/update`,
        { id, status },
        {
          headers: {
            authToken: authToken,
          },
        }
      );

      if (result.status === 200) {
        fetchLatePermission();
        alert(result.data.message);
      }
    } catch (error) {
      console.error("Error: ", error.message, error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Error ouccred white updating status");
      }
    }
  }

  function fetchUser() {
    axios
      .post(
        "http://localhost:9000/fetch/user",
        {},
        {
          headers: { authToken: authToken },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setUserData(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchDashboardInfo() {
    axios
      .post(
        "http://localhost:9000/fetch/dashboard/info",
        {},
        {
          headers: { authToken: authToken },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setDashboardInfo(res.data.dashboardInfo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function fetchStaffRecords() {
    await axios
      .post(
        "http://localhost:9000/staff/get",
        {},
        {
          headers: { authToken: authToken },
        }
      )
      .then((res) => {
        setStaffRecords(res.data.staffRecords);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchStudentRecords() {
    axios
      .post(
        "http://localhost:9000/student/get",
        {},
        {
          headers: { authToken: authToken },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setStudentRecords(res.data.studentRecords);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchLibraryRequests() {
    axios
      .post(
        "http://localhost:9000/fetch/library/requests",
        {},
        {
          headers: { authToken: authToken },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setLibraryRequests(res.data.libraryRequests);
          setLibraryRecords(res.data.libraryRecords);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchLeaveRequests() {
    axios
      .get("http://localhost:9000/fetch/leave-request", {
        headers: { authToken: authToken },
      })
      .then((res) => {
        if (res.status === 200) {
          setLeaveRequests(res.data.leaveRequests);
          setLeaveRecords(res.data.leaveRecords);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function generatePDF(requestId, type) {
    axios
      .post(
        "http://localhost:9000/generate/pdf",
        {
          requestId: requestId,
          type: type,
        },
        {
          headers: { authToken: authToken },
          responseType: "blob",
        }
      )
      .then((res) => {
        if (res.status === 200) {
          const filename = res.headers["content-disposition"]
            ? res.headers["content-disposition"]
                .split("filename=")[1]
                .replace(/"/g, "")
            : `Request-${requestId}.pdf`;

          fileDownload(res.data, filename);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const errorData = JSON.parse(reader.result);
              if (errorData.message) {
                alert(errorData.message);
              } else {
                alert("An error occurred while generating the PDF.");
              }
            } catch (e) {
              alert("An error occurred while generating the PDF.");
            }
          };

          reader.readAsText(err.response.data);
        } else {
          alert("An error occurred while generating the PDF.");
        }
      });
  }

  function addProfileImage(image) {
    const imageToAdd = new FormData();
    imageToAdd.append("staffImage", image);

    axios
      .post(`http://localhost:9000/add/profile/image`, imageToAdd, {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          fetchUser();
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred in add profile image");
        }
      });
  }

  function handleLibraryRequest(requestId, status) {
    axios
      .post(
        "http://localhost:9000/update/library/requests",
        { requestId, status },
        {
          headers: {
            authToken: authToken,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          fetchLibraryRequests();
          fetchDashboardInfo();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An Error Occured");
        }
      });
  }

  function handleLeaveRequest(id, status, updateMany = {}) {
    axios
      .post(
        "http://localhost:9000/leave-request/update",
        { id, status, updateMany },
        {
          headers: {
            authToken: authToken,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          fetchLeaveRequests();
          fetchDashboardInfo();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred in leave request updation");
        }
      });
  }

  function handleAddStaff(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/staff/add", addStaff, {
        headers: { authToken: authToken },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          setAddStaffResult(res.data.results);
          fetchStaffRecords();
          fetchDashboardInfo();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred");
        }
      });
  }

  function handleEditProfile(dataToSend) {
    axios
      .put("http://localhost:9000/staff/edit", dataToSend, {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          fetchUser();
          setEditProfile({});
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred while editing the profile");
        }
      });
  }

  function handleRemoveStaff() {
    axios
      .delete("http://localhost:9000/staff/remove", {
        data: { selectedStaffs },
        headers: { authToken: authToken },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          fetchStaffRecords();
          setSelectedStaffs([]);
          fetchDashboardInfo();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred");
        }
      });
  }

  function handleAddStudent(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/student/add", addStudent, {
        headers: { authToken: authToken },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          setAddStudentResult(res.data.results);
          fetchStudentRecords();
          fetchDashboardInfo();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred");
        }
      });
  }

  function handleDeleteStudent() {
    axios
      .delete("http://localhost:9000/student/delete", {
        data: { selectedStudents },
        headers: { authToken: authToken },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          fetchStudentRecords();
          fetchDashboardInfo();
          setSelectedStudents([]);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred");
        }
      });
  }

  function forgotPassword(userId) {
    axios
      .post("http://localhost:9000/forgot-password", { userId })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred");
        }
      });
  }

  function resetPassword(token, newPassword, confirmPassword) {
    axios
      .post("http://localhost:9000/reset-password", {
        token,
        newPassword,
        confirmPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          navigate("login");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred");
        }
      });
  }

  function StaffLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/login/staff", loginForm)
      .then((res) => {
        if (res.status === 200) {
          setAuthToken(res.data.token);
          if (loginForm.rememberMe) {
            localStorage.setItem("authToken", res.data.token);
          } else {
            sessionStorage.setItem("authToken", res.data.token);
          }
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred");
        }
      });
  }

  function StaffSignup(e) {
    e.preventDefault();

    const formData = new FormData();
    for (const key in signupForm) {
      formData.append(key, signupForm[key]);
    }

    axios
      .post("http://localhost:9000/signup/staff", formData)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred");
        }
      });
  }

  function AdminLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/login/admin", adminLoginForm)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          setAuthToken(res.data.authToken);
          if (adminLoginForm.rememberMe) {
            localStorage.setItem("authToken", res.data.authToken);
          } else {
            sessionStorage.setItem("authToken", res.data.authToken);
          }
          fetchStaffRecords();
          navigate("/dashboard");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  function logout() {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setAuthToken("");
    setUserData(null);
    navigate("/login");
  }

  return (
    <AppContext.Provider
      value={{
        userData,
        addStaff,
        setAddStaff,
        selectedStaffs,
        setSelectedStaffs,
        addStudentResult,
        setAddStudentResult,
        fetchStaffRecords,
        handleAddStaff,
        logout,
        staffRecords,
        setAdminLoginForm,
        adminLoginForm,
        setLoginForm,
        StaffLogin,
        AdminLogin,
        navigate,
        addStudent,
        setAddStudent,
        handleRemoveStaff,
        handleAddStudent,
        authToken,
        signupForm,
        setSignupForm,
        StaffSignup,
        loginForm,
        studentRecords,
        selectedStudents,
        setSelectedStudents,
        handleDeleteStudent,
        studentEntryCount,
        setStudentEntryCount,
        staffEntryCount,
        setStaffEntryCount,
        addStaffResult,
        setAddStaffResult,
        fetchStudentRecords,
        libraryRequests,
        fetchLibraryRequests,
        handleLibraryRequest,
        libraryRecords,
        fetchDashboardInfo,
        dashboardInfo,
        generatePDF,
        fetchUser,
        addProfileImage,
        imageAccessURL,
        handleEditProfile,
        editProfile,
        setEditProfile,
        forgotPassword,
        resetPassword,
        handleLeaveRequest,
        fetchLeaveRequests,
        leaveRequests,
        leaveRecords,
        studentUploadsURL,
        LeaveImagesURL,
        latePermissionRecords,
        latePermissionRequests,
        updateLatePermission,
        complaints,
        complaintRecords,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
