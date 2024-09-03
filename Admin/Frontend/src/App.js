import { Login } from "./Pages/Login/Login";
import AdminLogin from "./Pages/Login/AdminLogin";
import { AppProvider } from "./Context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
