import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Apply() {
  const location = useLocation();
  const job = location.state;

  const requiredSkills = job?.requiredSkills || [];

  // Candidate fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(null);
  const [fit, setFit] = useState("");
  const [color, setColor] = useState("");
  const [missingSkills, setMissingSkills] = useState([]);

  // NEW applied state (only addition)
  const [applied, setApplied] = useState(false);

  const extractTextFromPDF = async (typedArray) => {
    const pdf = await pdfjsLib.getDocument(typedArray).promise;

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      content.items.forEach(item => {
        fullText += item.str + " ";
      });
    }

    return fullText.toLowerCase();
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const text = await extractTextFromPDF(typedArray);
      setResumeText(text);
    };

    reader.readAsArrayBuffer(file);
  };

  // EXACT working ATS logic
  const checkATS = () => {
    if (!resumeText) {
      alert("Upload resume first");
      return;
    }

    const words = resumeText.split(/\W+/);

    let matched = 0;
    let missing = [];

    requiredSkills.forEach(skill => {
      if (words.includes(skill.toLowerCase())) {
        matched++;
      } else {
        missing.push(skill);
      }
    });

    const atsScore = Math.round((matched / requiredSkills.length) * 100);

    setScore(atsScore);
    setMissingSkills(missing);

    if (atsScore >= 70) {
      setFit("Good Fit");
      setColor("green");
    } else if (atsScore >= 40) {
      setFit("Okay Fit");
      setColor("orange");
    } else {
      setFit("Bad Fit");
      setColor("red");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Apply for {job?.title}</h2>

      <h3>Candidate Details</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option>Female</option>
        <option>Male</option>
        <option>Other</option>
      </select>

      <br /><br />

      <input type="file" accept="application/pdf" onChange={handleFile} />

      <br /><br />

      <button onClick={checkATS}>Check ATS Score</button>

      <br /><br />

      {score !== null && (
        <div>
          <h3>ATS Score: {score}%</h3>
          <h3 style={{ color }}>{fit}</h3>

          <p>
            <strong>Missing Skills:</strong>{" "}
            {missingSkills.length ? missingSkills.join(", ") : "None"}
          </p>

          <br />

          <button
            disabled={applied}
            style={{
              padding: "10px 20px",
              backgroundColor: applied ? "gray" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: applied ? "not-allowed" : "pointer"
            }}
            onClick={() => {
              alert("Application submitted successfully!");
              setApplied(true);
            }}
          >
            {applied ? "APPLIED" : "Apply Now"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Apply;
