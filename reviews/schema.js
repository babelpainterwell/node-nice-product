import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    movieId: String,
    movieTitle: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "reviews" }
);

export default schema;
