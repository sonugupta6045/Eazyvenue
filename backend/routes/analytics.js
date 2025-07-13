import express from "express";
import Venue from "../models/Venue.js";
const router = express.Router();

router.get("/venues-summary", async (req, res) => {
  try {
    // Total venues
    const totalVenues = await Venue.countDocuments();

    // Venues by location
    const venuesByLocation = await Venue.aggregate([
      { $group: { _id: "$location", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ totalVenues, venuesByLocation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;