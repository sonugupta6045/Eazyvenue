import Booking from "../models/Booking.js";
import VenueAvailability from "../models/VenueAvailability.js";

export const bookVenue = async (req, res) => {
    try {
        const { venue, user, date } = req.body;
        // Check if date is blocked
        const blocked = await VenueAvailability.findOne({ venue, date, isBlocked: true });
        if (blocked) return res.status(400).json({ message: "Date is blocked" });
        // Check if already booked
        const booked = await Booking.findOne({ venue, date, status: "booked" });
        if (booked) return res.status(400).json({ message: "Already booked" });
        // Book it
        const booking = new Booking({ venue, user, date });
        await booking.save();
        // Mark the date as blocked
        let availability = await VenueAvailability.findOne({ venue, date });
        if (availability) {
            availability.isBlocked = true;
            await availability.save();
        } else {
            availability = new VenueAvailability({ venue, date, isBlocked: true });
            await availability.save();
        }
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};