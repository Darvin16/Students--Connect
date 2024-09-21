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
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [addStaff, setAddStaff] = useState({
    employeeId: "",
  });
  const [editStaff, setEditStaff] = useState(null);
  const [staffRecords, setStaffRecords] = useState([]);
  const [signupForm, setSignupForm] = useState({});

  useEffect(() => {
    if (authToken && !userData) {
      fetchUser();
      console.log(userData);
    }
  }, [authToken, userData]);

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
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred in fetch user");
        }
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

  function handleAddStaff(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/staff/add", addStaff, {
        headers: { authToken: authToken },
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
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

  function handleRemoveStaff(employeeId) {
    axios
      .post(
        "http://localhost:9000/staff/remove",
        { employeeId },
        {
          headers: { authToken: authToken },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
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
    navigate("/login");
  }

  return (
    <AppContext.Provider
      value={{
        userData,
        addStaff,
        setAddStaff,
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
        isAddingStaff,
        setIsAddingStaff,
        editStaff,
        setEditStaff,
        handleEditStaff,
        handleRemoveStaff,
        authToken,
        signupForm,
        setSignupForm,
        StaffSignup,
        loginForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
