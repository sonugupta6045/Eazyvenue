import React from "react";

import EazyVenueLogo from '../assets/image1.png'; // You can name the import anything you like
export default function Header() {
  return (
    <header style={{
      padding: "16px 0",
      borderBottom: "1px solid #e5e7eb",
      marginBottom: 32,
      textAlign: "center"
    }}>
      <img src={EazyVenueLogo} alt="EazyVenue Logo" style={{ width: 100, height: 100 }} />
      <h1 style={{ margin: 0, fontWeight: 700, fontSize: "2.2rem", color: "#2563eb" }}>
        Eazy<span style={{ color: "#C13450" }}>Venue</span> Booking Dashboard
      </h1>
      <p style={{ color: "#64748b" }}>Book and manage venues with ease</p>
    </header>
  );
}
