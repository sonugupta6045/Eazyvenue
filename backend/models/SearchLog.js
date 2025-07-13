import mongoose from "mongoose";
const SearchLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  query: String,
  timestamp: { type: Date, default: Date.now }
});
const SearchLog = mongoose.model("SearchLog", SearchLogSchema);
export default SearchLog;
