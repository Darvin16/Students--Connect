import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState("adminhgjhgjh");
  const [loginForm, setLoginForm] = useState({
    employeeId: "",
    position: "",
  });
  const [adminLoginForm, setAdminLoginForm] = useState({
    email: "",
    password: "",
  });

  function StaffLogin(e) {
    e.preventDefault();
    axios.post("http://localhost:9000/login/staff", loginForm).then().catch();
  }

  function AdminLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/login/admin", adminLoginForm)
      .then()
      .catch();
  }

  return (
    <AppContext.Provider
      value={{
        adminData,
        setAdminLoginForm,
        setLoginForm,
        StaffLogin,
        AdminLogin,
        navigate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
