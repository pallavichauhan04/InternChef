import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Listings from "./pages/Listings";
import Details from "./pages/Details";
import Apply from "./pages/Apply";
import Report from "./pages/Report";
import SafetyTips from "./pages/SafetyTips";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/details" element={<Details />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/report" element={<Report />} />
        <Route path="/safety" element={<SafetyTips />} />
      </Routes>
    </Router>
  );
}

export default App;
