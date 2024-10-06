import { Login } from "./Pages/Login/Login";
import AdminLogin from "./Pages/Login/AdminLogin";
import { AppContext, AppProvider } from "./Context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectRoutes from "./Component/ProtectRoutes";
import { useContext, useEffect } from "react";
import Signup from "./Pages/Signup/Signup";
import ForgotPassword from "./Pages/ResetPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";


function RootRedirect() {
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
    <div className="">
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route element={<ProtectRoutes />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
