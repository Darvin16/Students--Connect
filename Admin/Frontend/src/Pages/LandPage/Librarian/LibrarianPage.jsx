import React from "react";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";

function LibrarianPage() {
  const { userData } = useContext(AppContext);
  return <div>Welcome {userData?.name}</div>;
}

export default LibrarianPage;
