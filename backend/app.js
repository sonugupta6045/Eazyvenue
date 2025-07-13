import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import venueRoutes from "./routes/venues.js";
import bookingRoutes from "./routes/bookings.js";
import searchRoutes from "./routes/search.js";
import analyticsRoutes from "./routes/analytics.js";


dotenv.config();

console.log("process.env.MONGO_URL", process.env.MONGO_URL); // to check MONGO_URI

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoutes);
app.use("/api/analytics", analyticsRoutes);

mongoose.connect(`${process.env.MONGO_URL}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));