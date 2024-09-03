import { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [adminData, setAdminData] = useState("adminhgjhgjh");
  const [loginForm, setLoginForm] = useState({
    login_as: "",
    position:"",
    Employee_id: "",
    password: "",
    OTP: "",
  });
    
  function Login(e) {
    e.preventDefault();
    axios.post("http://localhost:9000/admin/Login", loginForm).then().catch();
  }

  return (
    <AppContext.Provider value={{ adminData,setLoginForm,Login }}>{children}</AppContext.Provider>
  );
};
