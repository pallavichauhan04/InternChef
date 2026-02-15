import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state;

  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason) {
      alert("Please select a reason");
      return;
    }

    const currentScore = parseInt(localStorage.getItem(job.title)) || 90;
    const newScore = currentScore - 10;

    localStorage.setItem(job.title, newScore);

    alert("Report submitted. Trust score updated.");

    navigate("/details", { state: job });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Why are you reporting?</h2>

      <select onChange={(e) => setReason(e.target.value)}>
        <option value="">Select reason</option>
        <option>Asking for money</option>
        <option>Fake company</option>
        <option>No response</option>
        <option>Other</option>
      </select>

      <br /><br />

      <button onClick={handleSubmit}>Submit Report</button>
    </div>
  );
}

export default Report;
