import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/SignUp_Login/Login";
import Signup from "./Pages/SignUp_Login/Signup";
import { AppContext, AppProvider } from "./Context/AppContext";
import Dashboard from "./Pages/Dashboard/Dashboard";

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
              <Route path="/dashboard/*" element={<Dashboard/>} />
            </Route>
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
