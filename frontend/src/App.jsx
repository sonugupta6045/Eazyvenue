import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import VenueForm from "./components/VenueForm";
import VenueList from "./components/VenueList";
import VenueManager from "./components/VenueManager";
import BookingForm from "./components/BookingForm";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

// Replace these with your actual MongoDB _id values for the demo users
const DEMO_USERS = {
  owner: "6873786a5ec98c7c3ac66d14",
  user: "6873b24d2ce40217a4615ae4"
};

export default function App() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("user");
  const [userId, setUserId] = useState(DEMO_USERS["user"]);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showManager, setShowManager] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    fetchVenues();
  }, []);

  // When role changes, auto-fill the userId
  useEffect(() => {
    setUserId(DEMO_USERS[role]);
  }, [role]);

  useEffect(() => {
    if (search.trim() === "") return;
    const timeout = setTimeout(() => {
      axios.post("/api/search", { user: userId, query: search });
    }, 500); // debounce
    return () => clearTimeout(timeout);
  }, [search, userId]);

  const fetchVenues = async () => {
    const res = await axios.get("/api/venues");
    setVenues(res.data);
  };

  const handleManage = (venue) => {
    setSelectedVenue(venue);
    setShowManager(true);
  };

  const handleBook = (venue) => {
    setSelectedVenue(venue);
    setShowBooking(true);
  };

  const filteredVenues = venues.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header />
      <div className="flex-row" style={{ marginBottom: 24 }}>
        <label>
          <b>Role:</b>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="user">User</option>
            <option value="owner">Venue Owner</option>
          </select>
        </label>
        
       
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search venues by name or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "50%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1" }}
        />
      </div>
      {(role === "owner" || role === "admin") && <AnalyticsDashboard />}
      {role === "owner" && userId && (
        <VenueForm onVenueAdded={fetchVenues} ownerId={userId} />
      )}
      <VenueList
        venues={filteredVenues}
        onManage={handleManage}
        onBook={handleBook}
        isOwner={role === "owner"}
        ownerId={userId}
        selectedVenue={selectedVenue}
        showManager={showManager}
        showBooking={showBooking}
        onCloseManager={() => {
          setShowManager(false);
          setSelectedVenue(null);
          fetchVenues();
        }}
        onCloseBooking={() => {
          setShowBooking(false);
          setSelectedVenue(null);
        }}
        userId={userId}
      />
     
    </div>
  );
}