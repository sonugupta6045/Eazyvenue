import mongoose from "mongoose";

const VenueAvailabilitySchema = new mongoose.Schema({
    venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
    date: { type: String, required: true }, // ISO date string
    isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

const VenueAvailability = mongoose.model("VenueAvailability", VenueAvailabilitySchema);

export default VenueAvailability;