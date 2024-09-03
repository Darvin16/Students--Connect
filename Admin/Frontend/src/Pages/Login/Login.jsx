import React, { useContext, useState } from "react";
import "./Login.css";
import { AppContext } from "../../Context/AppContext";

export const Login = () => {
  const { setLoginForm,Login } = useContext(AppContext);

  return (
    <div>
      <input type="text" onChange={(e)=>setLoginForm({...prev})} />
    </div>
  );
};
