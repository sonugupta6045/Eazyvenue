import mongoose from "mongoose";

const VenueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    capacity: { type: Number, required: true },
    amenities: { type: [String], required: true },
    image: { type: String, required: true },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Venue = mongoose.model("Venue", VenueSchema);

export default Venue;