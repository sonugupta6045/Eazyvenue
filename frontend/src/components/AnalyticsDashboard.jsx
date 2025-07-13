import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const res = await axios.get("/api/analytics/venues-summary");
    setSummary(res.data);
  };

  if (!summary) return <div>Loading analytics...</div>;

  return (
    <div style={{
      background: "#f1f5f9",
      borderRadius: 12,
      padding: 24,
      margin: "32px 0",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
    }}>
      <h2>Admin Analytics Dashboard</h2>
      <div style={{ fontSize: "1.2em", marginBottom: 16 }}>
        <b>Total Venues Registered:</b> {summary.totalVenues}
      </div>
      <div>
        <b>Venues by Location:</b>
        <ul>
          {summary.venuesByLocation.map(loc => (
            <li key={loc._id}>
              <b>{loc._id || "Unknown"}</b>: {loc.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}