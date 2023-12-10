import model from "./model.js";

export const findAllMovies = () => model.find();
export const findMovieById = (id) => model.findById(id);
export const createMovie = (movie) => model.create(movie);
export const updateMovie = (id, movie) =>
  model.updateOne({ _id: id }, { $set: movie });
export const deleteMovie = (id) => model.deleteOne({ _id: id });
export const findMovieByUser = (userId) =>
  model.find({ user: userId }).populate("user");
