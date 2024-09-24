import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { Outlet } from "react-router-dom";

function ProtectRoutes() {
  const { authToken, navigate } = useContext(AppContext);

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken,navigate]);
    
  return authToken ? <Outlet /> : null;
}

export default ProtectRoutes;
