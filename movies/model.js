import schema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("movies", schema);
export default model;
