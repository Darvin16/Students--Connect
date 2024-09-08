import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [loginForm, setLoginForm] = useState({
    employeeId: "",
    position: "",
  });
  const [adminLoginForm, setAdminLoginForm] = useState({
    email: "",
    password: "",
  });
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [addStaff, setAddStaff] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    blockName: "",
    gender: "",
  });
  const [editStaff, setEditStaff] = useState(null);
  const [staffRecords, setStaffRecords] = useState([]);

  async function fetchStaffRecords() {
    await axios
      .post("http://localhost:9000/staff/get")
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
      .post("http://localhost:9000/staff/add", addStaff)
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
      .post("http://localhost:9000/staff/edit", editStaff)
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

  function StaffLogin(e) {
    e.preventDefault();
    axios.post("http://localhost:9000/login/staff", loginForm).then().catch();
  }

  function AdminLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/login/admin", adminLoginForm)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          setUserData(res.data.userData);
          fetchStaffRecords();
          navigate("/dashboard");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <AppContext.Provider
      value={{
        userData,
        addStaff,
        setAddStaff,
        fetchStaffRecords,
        handleAddStaff,
        staffRecords,
        setAdminLoginForm,
        setLoginForm,
        StaffLogin,
        AdminLogin,
        navigate,
        isAddingStaff,
        setIsAddingStaff,
        editStaff,
        setEditStaff,
        handleEditStaff,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
