import React, { useState } from "react";
import axios from "axios";

export default function VenueForm({ onVenueAdded, ownerId }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [amenities, setAmenities] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || !description || !price || !capacity || !amenities || !image || !ownerId) {
      alert("All fields are required!");
      return;
    }
    await axios.post("/api/venues", {
      name,
      location,
      description,
      price: Number(price),
      capacity: Number(capacity),
      amenities: amenities.split(",").map(a => a.trim()),
      image,
      owner: ownerId
    });
    setName("");
    setLocation("");
    setDescription("");
    setPrice("");
    setCapacity("");
    setAmenities("");
    setImage("");
    onVenueAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
      <h2>Add New Venue</h2>
      <div className="flex-row" style={{ flexWrap: "wrap", gap: 12 }}>
        <input placeholder="Venue Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        <input placeholder="Capacity" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} required />
        <input placeholder="Amenities (comma separated)" value={amenities} onChange={e => setAmenities(e.target.value)} required />
        <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required />
        <button type="submit">Add Venue</button>
      </div>
    </form>
  );
}