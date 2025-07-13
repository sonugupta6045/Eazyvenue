import React from "react";
import BookingForm from "./BookingForm";
import VenueManager from "./VenueManager";

export default function VenueList({
  venues,
  onManage,
  onBook,
  isOwner,
  ownerId,
  selectedVenue,
  showManager,
  showBooking,
  onCloseManager,
  onCloseBooking,
  userId
}) {
  return (
    <div>
      <h2>All Venues</h2>
      {venues.length === 0 && <p>No venues found.</p>}
      {venues.map(v => (
        <div key={v._id}>
          <div className="venue-card">
            <div>
              <b>{v.name}</b> <span style={{ color: "#64748b" }}>({v.location})</span>
              <div style={{ fontSize: "0.95em", color: "#64748b" }}>
                Owner: {v.owner?.name || "N/A"}
              </div>
              <div style={{ marginTop: 6, color: "#C13450" }}>
                <b>Description:</b> {v.description}
              </div>
              <div>
                <b>Price:</b> ${v.price} &nbsp; <b>Capacity:</b> {v.capacity}
              </div>
              <div>
                <b>Amenities:</b> {Array.isArray(v.amenities) ? v.amenities.join(", ") : v.amenities}
              </div>
              {v.image && (
                <div style={{ marginTop: 8 }}>
                  <img src={v.image} alt={v.name} style={{ width: 120, borderRadius: 8, border: "1px solid #f8bbd0" }} />
                </div>
              )}
            </div>
            <div>
              {isOwner && v.owner?._id === ownerId && (
                <button onClick={() => onManage(v)}>Manage</button>
              )}
              {!isOwner && (
                <button onClick={() => onBook(v)}>Book</button>
              )}
            </div>
          </div>
          {/* Inline forms */}
          {showManager && selectedVenue && selectedVenue._id === v._id && (
            <VenueManager
              venue={selectedVenue}
              onClose={onCloseManager}
            />
          )}
          {showBooking && selectedVenue && selectedVenue._id === v._id && (
            <BookingForm
              venue={selectedVenue}
              userId={userId}
              onClose={onCloseBooking}
            />
          )}
        </div>
      ))}
    </div>
  );
}