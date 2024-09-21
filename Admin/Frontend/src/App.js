import { Login } from "./Pages/Login/Login";
import AdminLogin from "./Pages/Login/AdminLogin";
import { AppContext, AppProvider } from "./Context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectRoutes from "./Component/ProtectRoutes";
import { useContext, useEffect } from "react";


function RootRedirect() {
  const { authToken, navigate } = useContext(AppContext);

  useEffect(() => {
    console.log(authToken);
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
            <Route path="/adminlogin" element={<AdminLogin />} />
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
