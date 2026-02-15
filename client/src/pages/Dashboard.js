import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Welcome to InternChef</h2>

      <button onClick={() => navigate("/listings")}>
        Browse Opportunities
      </button>

      <br /><br />

      <button onClick={() => navigate("/safety")}>
        Safety Tips
      </button>
    </div>
  );
}

export default Dashboard;
