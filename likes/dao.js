import model from "./model.js";

export const findAllLikes = () => model.find();
export const createUserLikesMovie = (userId, movieId, movieTitle) =>
  model.create({ user: userId, movieId: movieId, movieTitle: movieTitle });
export const deleteUserLikesMovie = (userId, movieId) =>
  model.deleteOne({ user: userId, movieId: movieId });
export const findUsersThatLikeMovie = (movieId) =>
  model.find({ movieId: movieId }).populate("user");
export const findMoviesThatUserLikes = (userId) => model.find({ user: userId });
