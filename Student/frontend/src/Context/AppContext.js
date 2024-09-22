import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken-st") ||
      sessionStorage.getItem("authToken-st") ||
      ""
  );
  const [signupForm, setSignupForm] = useState({});
  const [loginForm, setLoginForm] = useState({
    studentID: "",
    password: "",
    rememberMe: false,
  });
  const URL = "http://localhost:8000";
  const navigate = useNavigate();

  if (!userData) {
    console.log("user is not set");
  }

  function Signup(e) {
    e.preventDefault();

    axios
      .post(`${URL}/signup`, signupForm)
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
          alert("Error Occured");
        }
      });
  }

  function Login(e) {
    e.preventDefault();

    axios
      .post(`${URL}/login`, loginForm)
      .then((res) => {
        if (res.status === 200) {
          setAuthToken(res.data.token);
          if (loginForm.rememberMe) {
            localStorage.setItem("authToken-st", res.data.token);
          } else {
            sessionStorage.setItem("authToken-st", res.data.token);
          }
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("Error Occured");
        }
      });
  }

  function Logout() {
    localStorage.removeItem("authToken-st");
    sessionStorage.removeItem("authToken-st");
    setAuthToken("");
    navigate("/login");
    setUserData({});
  }

  return (
    <AppContext.Provider
      value={{
        userData,
        authToken,
        signupForm,
        loginForm,
        setLoginForm,
        setSignupForm,
        navigate,
        Signup,
        Login,
        Logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
