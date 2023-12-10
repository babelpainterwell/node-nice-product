import model from "./model.js";

export const findAllReviews = () => model.find().populate("user");
export const findReviewById = (id) => model.findById(id).populate("user");
export const findReviewsByUser = (userId) =>
  model.find({ user: userId }).populate("user");
export const findReviewsByMovie = (movieId) =>
  model.find({ movieId }).populate("user");
export const createReview = (review) => model.create(review);
export const updateReview = (id, review) =>
  model.updateOne({ _id: id }, { $set: review });
export const deleteReview = (id) => model.deleteOne({ _id: id });
