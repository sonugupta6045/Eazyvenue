import express from "express";
import { bookVenue } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", bookVenue);

export default router;