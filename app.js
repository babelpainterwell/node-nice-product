import session from "express-session";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from "./users/routes.js";
import LikesRoutes from "./likes/routes.js";
import FollowsRoutes from "./follows/routes.js";
import ReviewRoutes from "./reviews/routes.js";
import MovieRoutes from "./movies/routes.js";

mongoose.connect("mongodb://localhost:27017/movie_house");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
LikesRoutes(app);
FollowsRoutes(app);
ReviewRoutes(app);
MovieRoutes(app);

app.listen(4000);
