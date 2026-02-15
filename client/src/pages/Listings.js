import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const internships = [
  {
    title: "Frontend Developer Intern",
    company: "TechNova",
    employmentType: "Part-time",
    mode: "Remote",
    website: "https://technova.com",
    email: "hr@technova.com",
    duration: "3 Months",
    stipend: "₹8000/month",
    deadline: "30 July 2026",
    requiredSkills: ["React", "JavaScript", "HTML", "CSS","git", "dance"],
    responsibilities: [
      "Develop responsive UI components",
      "Collaborate with design team",
      "Fix bugs and improve performance",
      "Write clean and maintainable code"
    ]
  },
  {
    title: "Data Analyst Intern",
    company: "Insight Labs",
    employmentType: "Full-time",
    mode: "In-office",
    website: "https://insightlabs.com",
    email: "careers@insightlabs.com",
    duration: "2 Months",
    stipend: "₹10000/month",
    deadline: "15 August 2026",
    requiredSkills: ["Python", "SQL", "Excel", "Statistics"],
    responsibilities: [
      "Analyze datasets and generate insights",
      "Create dashboards and reports",
      "Assist in data cleaning",
      "Support analytics team"
    ]
  },
  {
    title: "Software Developer Intern",
    company: "Google",
    employmentType: "Full-time",
    mode: "In-office - Bangalore",
    website: "https://google.com",
    email: "careers@gmail.com",
    duration: "6 Months",
    stipend: "₹30,000/month",
    deadline: "30 March 2026",
    requiredSkills: ["React", "JavaScript", "HTML", "CSS","git", "dance"],
    responsibilities: [
      "Develop responsive UI components",
      "Collaborate with design team",
      "Fix bugs and improve performance",
      "Write clean and maintainable code"
    ]
  }
];

function Listings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ verification logic
  const isVerified = (email) => {
    return !email.toLowerCase().includes("gmail.com");
  };

  const filtered = internships.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>Opportunities</h2>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px" }}
      />

      {filtered.map((job, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px"
          }}
        >
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Type:</strong> {job.employmentType}</p>
          <p><strong>Mode:</strong> {job.mode}</p>

          {isVerified(job.email) ? (
            <p style={{ color: "green" }}>✔ Verified</p>
          ) : (
            <p style={{ color: "red" }}>⚠ Not Verified</p>
          )}

          <button onClick={() => navigate("/details", { state: job })}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}

export default Listings;

