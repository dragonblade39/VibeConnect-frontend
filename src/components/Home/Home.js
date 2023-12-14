import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  let username = location.state ? location.state.username : null;
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}

export default Home;
