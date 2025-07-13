import Venue from "../models/Venue.js";
import VenueAvailability from "../models/VenueAvailability.js";
import User from "../models/User.js";

export const getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.find().populate("owner", "name email");
        res.json(venues);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addVenue = async (req, res) => {
    try {
        const { name, location, description, price, capacity, amenities, image, owner } = req.body;
        // Optionally, check if owner exists
        const user = await User.findById(owner);
        if (!user) return res.status(400).json({ error: "Owner not found" });

        const venue = new Venue({ name, location, description, price, capacity, amenities, image, owner });
        await venue.save();
        res.status(201).json(venue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        let { date, isBlocked } = req.body;
        // Accept both single date and array of dates
        let dates = Array.isArray(date) ? date : [date];

        let results = [];
        for (let d of dates) {
            let availability = await VenueAvailability.findOne({ venue: id, date: d });
            if (availability) {
                availability.isBlocked = isBlocked;
                await availability.save();
            } else {
                availability = new VenueAvailability({ venue: id, date: d, isBlocked });
                await availability.save();
            }
            results.push(availability);
        }
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const avail = await VenueAvailability.find({ venue: id });
        res.json(avail);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const updatedVenue = await Venue.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedVenue) return res.status(404).json({ error: "Venue not found" });
    res.json(updatedVenue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};