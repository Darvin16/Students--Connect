import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState();
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
  const imageAccessURL = "http://localhost:8000/studentImage/";
  const navigate = useNavigate();
  const [libraryRequestForm, setLibraryRequestForm] = useState();
  const [editProfile, setEditProfile] = useState({});

  useEffect(() => {
    if (authToken && !userData) {
      fetchUser();
    }
  }, [authToken, userData]);

  useEffect(() => {
    if (authToken) {
      fetchLibraryRequestForm();
    }
  }, [authToken]);

  function fetchUser() {
    axios
      .post(
        `${URL}/fetch/user`,
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

  function fetchLibraryRequestForm() {
    axios
      .post(
        `${URL}/fetch/library/request`,
        {},
        {
          headers: { authToken: authToken },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setLibraryRequestForm(res.data.libraryRequestForm);
        }
      })
      .catch((err) => {
        console.log(err);
        setLibraryRequestForm();
      });
  }

  function sendLibraryRequest(requestData) {
    axios
      .post(`${URL}/library/request`, requestData, {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          fetchLibraryRequestForm();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred in send library request");
        }
      });
  }

  function cancelLibraryRequest(requestId, reason) {
    axios
      .post(
        `${URL}/library/request/cancel`,
        { requestId, reason },
        {
          headers: { authToken: authToken },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          fetchLibraryRequestForm();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred in cancel library request");
        }
      });
  }

  function addProfileImage(image) {
    const imageToAdd = new FormData();
    imageToAdd.append("studentImage", image);

    axios
      .post(`${URL}/add/profile/image`, imageToAdd, {
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

  function handleLeaveRequest(requestData) {
    axios
      .post(`${URL}/leave-request/raise`, requestData, {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An Error Occured in Send Leave Request, Please try again");
        }
      });
  }

  function cancelLeaveRequest(cancelData) {
    axios
      .post(`${URL}/leave-request/cancel`, cancelData, {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred in cancel leave request");
        }
      });
  }

  function handleEditProfile(dataToSend) {
    axios
      .put(`${URL}/student/edit`, dataToSend, {
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

  function Signup(e) {
    e.preventDefault();

    const formData = new FormData();
    for (const key in signupForm) {
      formData.append(key, signupForm[key]);
    }

    axios
      .post(`${URL}/signup`, formData)
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

  function forgotPassword(userId) {
    axios
      .post(`${URL}/forgot-password`, { userId })
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
      .post(`${URL}/reset-password`, {
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

  function Logout() {
    localStorage.removeItem("authToken-st");
    sessionStorage.removeItem("authToken-st");
    setAuthToken("");
    navigate("/login");
    setUserData(null);
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
        sendLibraryRequest,
        libraryRequestForm,
        fetchLibraryRequestForm,
        cancelLibraryRequest,
        imageAccessURL,
        addProfileImage,
        fetchUser,
        handleEditProfile,
        editProfile,
        setEditProfile,
        resetPassword,
        forgotPassword,
        handleLeaveRequest,
        cancelLeaveRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
