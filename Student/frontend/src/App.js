import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/SignUp_Login/Login";
import Signup from "./Pages/SignUp_Login/Signup";
import { AppContext, AppProvider } from "./Context/AppContext";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectRoutes from "./Component/ProtectRoutes";
import ForgotPassword from "./Pages/ResetPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import PermissionDetails from "./Pages/LatePermission/PermissionDetails";

function RootDirect() {
  const { authToken, navigate } = useContext(AppContext);

  useEffect(() => {
    if (authToken) {
      navigate("/dashboard");
    }
  }, [authToken, navigate]);

  return (
    <div className="bg-body-secondary landing-page p-3">
      <div className="bg-light rounded-2 pb-3">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              StudentConnect
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#features">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact us
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/login")}
                  >
                    Login / SignUp
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr className="m-0" />
        <div
          className="container bg-info mt-3 position-relative rounded-2 banner"
          style={{ height: "50vh" }}
        >
          <div className="text-light position-absolute bottom-0">
            <h1>Student Connect</h1>
            <p>
              A mordern, easy-to-use system that helps you manage your student
              housing community.
            </p>
          </div>
        </div>
        <div id="about" className="container mt-3">
          <h2>About us</h2>
          <p>
            Student Connect is your go-to platform for managing hostel life
            efficiently and effortlessly. Designed to bridge the gap between
            students and administrators, our innovative web application
            simplifies key processes such as leave requests, library
            permissions, and more – all in real-time. Student Connect is here to
            make student administration smarter, more transparent, and more
            efficient for both students and administrators. Join us today and
            experience the future of hostel management!
          </p>
          <p>
            <b>For Students and administrators</b>
          </p>
          <p>
            Manage your hostel life with ease. Submit leave requests, get
            library permissions, and track your approvals – all from one place.
            Streamline your management tasks. Review, approve, and monitor
            student requests, and maintain clear and organized records.
          </p>
        </div>
        <div id="features" className="container mt-3 ">
          <h2>Features</h2>
          <div className="row gap-2">
            <div className="col-sm-12 col-md-5 col-lg card">
              <img src="" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg card">
              <img src="" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg card">
              <img src="" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg card">
              <img src="" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg card">
              <img src="" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/late-permission/details/:id"
              element={<PermissionDetails />}
            />
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
