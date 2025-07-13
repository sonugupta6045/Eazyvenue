import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingForm({ venue, userId, onClose }) {
  const [date, setDate] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    fetchBlockedDates();
    // eslint-disable-next-line
  }, [venue]);

  const fetchBlockedDates = async () => {
    const res = await axios.get(`/api/venues/${venue._id}/availability`);
    // Convert blocked date strings to Date objects
    setBlockedDates(res.data.filter(d => d.isBlocked).map(d => new Date(d.date)));
  };

  const bookVenue = async () => {
    if (!date) return;
    try {
      await axios.post("/api/bookings", {
        venue: venue._id,
        user: userId,
        date: date.toISOString().slice(0, 10) // format as YYYY-MM-DD
      });
      alert("Booked!");
      setDate(null);
      onClose();
    } catch (e) {
      alert(e.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div style={{ margin: "24px 0" }}>
      <h3>Book Venue: {venue.name}</h3>
      <div className="flex-row">
        <DatePicker
          selected={date}
          onChange={setDate}
          placeholderText="Select a date"
          excludeDates={blockedDates}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        />
        <button onClick={bookVenue}>Book</button>
        <button onClick={onClose} style={{ background: "#64748b" }}>Close</button>
      </div>
    </div>
  );
}