import session from "express-session";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from "./users/routes.js";
import LikesRoutes from "./likes/routes.js";
import FollowsRoutes from "./follows/routes.js";
import ReviewRoutes from "./reviews/routes.js";
import MovieRoutes from "./movies/routes.js";
import "dotenv/config.js";

// const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/movie_house";
// const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
// const SESSION_SECRET = process.env.SESSION_SECRET || "any string";
// const PORT = process.env.PORT || 4000;

// mongoose.connect(DB_URL);

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/movie_house";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    // origin: process.env.FRONTEND_URL,
    origin:
      "https://6577e0601f78d20008318e4b--vermillion-basbousa-3a5cbb.netlify.app/",
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
LikesRoutes(app);
FollowsRoutes(app);
ReviewRoutes(app);
MovieRoutes(app);

app.listen(process.env.PORT || 4000);
