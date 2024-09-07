import { Login } from "./Pages/Login/Login";
import AdminLogin from "./Pages/Login/AdminLogin";
import { AppProvider } from "./Context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/dashboard/*" element={<Dashboard/>} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
