import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function LibraryRequest() {
  const { userData } = useContext(AppContext);
  return <div>{userData?.studentId}</div>;
}

export default LibraryRequest;
