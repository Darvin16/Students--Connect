import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/SignUp_Login/Login";
import Signup from "./Pages/SignUp_Login/Signup";
import { AppContext, AppProvider } from "./Context/AppContext";

function RootDirect() {
  const { authToken, navigate } = useContext(AppContext);

  useEffect(() => {
    if (authToken) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [authToken, navigate]);

  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<RootDirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
            // element={ }
            >
              <Route path="/dashboard" element={<div>Dashboard</div>} />
            </Route>
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
