import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    original_title: String,
    overview: String,
    original_language: String,
    release_date: { type: Date },
    poster_path: String,
    adult: Boolean,
  },
  { collection: "movies" }
);

export default schema;
