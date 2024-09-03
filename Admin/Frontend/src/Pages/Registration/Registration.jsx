import React, { useContext, useState } from "react";
import "./Registration.css";
import { AppContext } from "../../Context/AppContext";

export const Registration = () => {
  const { setLoginForm,Login } = useContext(AppContext);

  return (
    <div>
      <input type="text" onChange={(e)=>setLoginForm({...prev})} />
    </div>
  );
};
