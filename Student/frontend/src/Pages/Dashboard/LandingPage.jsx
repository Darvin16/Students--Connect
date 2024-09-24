import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function LandingPage() {
  const { userData } = useContext(AppContext);

  return <div>hi {userData?.name}</div>;
}

export default LandingPage;
