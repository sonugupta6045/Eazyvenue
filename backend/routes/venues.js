import express from "express";
import {
    getAllVenues,
    addVenue,
    updateAvailability,
    getAvailability,
    updateVenue
} from "../controllers/venueController.js";

const router = express.Router();

router.get("/", getAllVenues);
router.post("/", addVenue);
router.patch("/:id/availability", updateAvailability);
router.patch("/:id", updateVenue);
router.get("/:id/availability", getAvailability);

export default router;