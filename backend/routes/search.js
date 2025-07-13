import express from "express";
import SearchLog from "../models/SearchLog.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user, query } = req.body;
    const log = new SearchLog({ user, query });
    await log.save();
    res.status(201).json({ message: "Search logged" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;