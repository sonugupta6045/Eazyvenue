import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function VenueManager({ venue, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Editable fields
  const [name, setName] = useState(venue.name);
  const [location, setLocation] = useState(venue.location);
  const [description, setDescription] = useState(venue.description);
  const [price, setPrice] = useState(venue.price);
  const [capacity, setCapacity] = useState(venue.capacity);
  const [amenities, setAmenities] = useState(Array.isArray(venue.amenities) ? venue.amenities.join(", ") : venue.amenities);
  const [image, setImage] = useState(venue.image);

  useEffect(() => {
    fetchBlockedDates();
    // eslint-disable-next-line
  }, [venue]);

  const fetchBlockedDates = async () => {
    const res = await axios.get(`/api/venues/${venue._id}/availability`);
    setBlockedDates(res.data.filter(d => d.isBlocked).map(d => new Date(d.date)));
  };

  const blockDate = async () => {
    if (!selectedDate) return;
    await axios.patch(`/api/venues/${venue._id}/availability`, {
      date: selectedDate.toISOString().slice(0, 10),
      isBlocked: true
    });
    setSelectedDate(null);
    fetchBlockedDates();
  };

  const unblockDate = async (date) => {
    await axios.patch(`/api/venues/${venue._id}/availability`, {
      date: date.toISOString().slice(0, 10),
      isBlocked: false
    });
    fetchBlockedDates();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.patch(`/api/venues/${venue._id}`, {
      name,
      location,
      description,
      price: Number(price),
      capacity: Number(capacity),
      amenities: amenities.split(",").map(a => a.trim()),
      image
    });
    setEditMode(false);
    // Optionally, you can refetch venue details here or call a parent update
    alert("Venue updated!");
  };

  return (
    <div style={{ margin: "24px 0" }}>
      <h3>Manage Venue: {venue.name}</h3>
      <button onClick={() => setEditMode(!editMode)} style={{ marginBottom: 12 }}>
        {editMode ? "Cancel Edit" : "Edit Venue Details"}
      </button>
      {editMode ? (
        <form onSubmit={handleEdit} style={{ marginBottom: 24 }}>
          <div className="flex-row" style={{ flexWrap: "wrap", gap: 12 }}>
            <input placeholder="Venue Name" value={name} onChange={e => setName(e.target.value)} required />
            <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
            <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
            <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
            <input placeholder="Capacity" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} required />
            <input placeholder="Amenities (comma separated)" value={amenities} onChange={e => setAmenities(e.target.value)} required />
            <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required />
            <button type="submit">Save Changes</button>
          </div>
        </form>
      ) : null}
      <div className="flex-row">
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          placeholderText="Select a date"
          excludeDates={blockedDates}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        />
        <button onClick={blockDate}>Block Date</button>
        <button onClick={onClose} style={{ background: "#64748b" }}>Close</button>
      </div>
      <div style={{ marginTop: 16 }}>
        <b>Blocked Dates:</b>
        <ul>
          {blockedDates.map(d => (
            <li key={d.toISOString()}>
              <span className="blocked-date">{d.toISOString().slice(0, 10)}</span>
              <button
                style={{ marginLeft: 8, background: "#16a34a" }}
                onClick={() => unblockDate(d)}
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}