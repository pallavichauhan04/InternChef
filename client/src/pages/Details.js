import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state;

  const [reportReason, setReportReason] = useState("");
  const [reported, setReported] = useState(false);
  const [trustScore, setTrustScore] = useState(0);

  // ⭐ Review state
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  if (!job) return <p>No job data</p>;

  const isVerified =
    job.email.includes("@") &&
    !job.email.includes("gmail") &&
    job.website;

  if (trustScore === 0) {
    const baseScore = isVerified ? 90 : 60;
    setTrustScore(baseScore);
  }

  const handleReport = () => {
    if (!reportReason) {
      alert("Please select reason");
      return;
    }

    setTrustScore(prev => Math.max(prev - 5, 0));
    setReported(true);
    alert("Report submitted — trust score updated");
  };

  // ⭐ Add review handler
  const handleAddReview = () => {
    if (!reviewText.trim()) return;
    setReviews([...reviews, reviewText]);
    setReviewText("");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Type:</strong> {job.employmentType}</p>
      <p><strong>Mode:</strong> {job.mode}</p>
      <p><strong>Duration:</strong> {job.duration}</p>
      <p><strong>Stipend:</strong> {job.stipend}</p>
      <p><strong>Deadline:</strong> {job.deadline}</p>

      {isVerified ? (
        <p style={{ color: "green" }}>✔ Verified</p>
      ) : (
        <p style={{ color: "red" }}>⚠ Not Verified</p>
      )}

      <p><strong>Trust Score:</strong> {trustScore}%</p>

      <h3>Responsibilities</h3>
      <ul>
        {job.responsibilities.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>Requirements</h3>
      <p>{job.requiredSkills.join(", ")}</p>

      <h3>Company Contact</h3>
      <p>Email: {job.email}</p>
      <p>Website: {job.website}</p>

      <br />

      <h3>Report Listing</h3>

      <select
        value={reportReason}
        onChange={(e) => setReportReason(e.target.value)}
      >
        <option value="">Why are you reporting?</option>
        <option>Asking for money</option>
        <option>Fake listing</option>
        <option>No response from company</option>
        <option>Suspicious behaviour</option>
        <option>Other</option>
      </select>

      <br /><br />

      <button onClick={handleReport} disabled={reported}>
        {reported ? "Reported" : "Report"}
      </button>

      <br /><br />

      <button onClick={() => navigate("/apply", { state: job })}>
        Apply Now
      </button>

      <hr style={{ margin: "30px 0" }} />

      {/* ⭐ Review Section */}
      <h3>Reviews</h3>

      <textarea
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        rows="3"
        style={{ width: "100%" }}
      />

      <br /><br />

      <button onClick={handleAddReview}>
        Submit Review
      </button>

      <ul style={{ marginTop: "20px" }}>
        {reviews.map((rev, i) => (
          <li key={i}>{rev}</li>
        ))}
      </ul>

    </div>
  );
}

export default Details;
