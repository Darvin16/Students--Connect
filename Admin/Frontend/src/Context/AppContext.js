import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [editStaff, setEditStaff] = useState(null);
  const [studentEntryCount, setStudentEntryCount] = useState(0);
  const [addStudent, setAddStudent] = useState([]);
  const [addStudentResult, setAddStudentResult] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [staffRecords, setStaffRecords] = useState([]);
  const [studentRecords, setStudentRecords] = useState([]);
  const [signupForm, setSignupForm] = useState({});
  const [libraryRequests, setLibraryRequests] = useState([]);

  useEffect(() => {
    if (authToken && !userData) {
      fetchUser();
    }
  }, [authToken, userData]);

  useEffect(() => {
    if (authToken) {
      fetchStudentRecords();
      fetchLibraryRequests();
    }
  }, [authToken]);

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
        }
      })
      .catch((err) => {
        console.log(err);
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

  function handleEditStaff(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/staff/edit", editStaff, {
        headers: { authToken: authToken },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          setEditStaff(false);
          fetchStaffRecords();
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
    axios
      .post("http://localhost:9000/signup/staff", signupForm)
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
        editStaff,
        setEditStaff,
        handleEditStaff,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
