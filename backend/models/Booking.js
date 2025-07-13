import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // ISO date string
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" }
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;