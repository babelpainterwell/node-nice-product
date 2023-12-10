import * as dao from "./dao.js";

function ReviewRoutes(app) {
  const findAllReviews = async (req, res) => {
    try {
      const reviews = await dao.findAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).send("Error occurred while fetching all reviews.");
    }
  };

  const findReviewById = async (req, res) => {
    try {
      const id = req.params.id;
      const review = await dao.findReviewById(id);
      if (!review) {
        return res.status(404).send("Review not found.");
      }
      res.json(review);
    } catch (error) {
      res.status(500).send("Error occurred while fetching review by ID.");
    }
  };

  const findReviewsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const reviews = await dao.findReviewsByUser(userId);
      res.json(reviews);
    } catch (error) {
      res.status(500).send("Error occurred while fetching reviews by user.");
    }
  };

  const findReviewsByMovie = async (req, res) => {
    try {
      const movieId = req.params.movieId;
      const reviews = await dao.findReviewsByMovie(movieId);
      res.json(reviews);
    } catch (error) {
      res.status(500).send("Error occurred while fetching reviews by movie.");
    }
  };

  const createReview = async (req, res) => {
    try {
      const { user, movieId, movieTitle, content } = req.body;

      const review = {
        user: user,
        movieId: movieId,
        movieTitle: movieTitle,
        content: content,
      };
      const newReview = await dao.createReview(review);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).send("Error occurred while creating a review.");
    }
  };

  const updateReview = async (req, res) => {
    try {
      const id = req.params.id;
      const review = req.body;
      const status = await dao.updateReview(id, review);
      if (status.modifiedCount === 0) {
        return res.status(404).send("No review found to update.");
      }
      res.json(status);
    } catch (error) {
      res.status(500).send("Error occurred while updating the review.");
    }
  };

  const deleteReview = async (req, res) => {
    try {
      const id = req.params.id;
      const status = await dao.deleteReview(id);
      if (status.deletedCount === 0) {
        return res.status(404).send("No review found to delete.");
      }
      res.json(status);
    } catch (error) {
      res.status(500).send("Error occurred while deleting the review.");
    }
  };

  app.get("/api/reviews", findAllReviews);
  app.get("/api/reviews/:id", findReviewById);
  app.get("/api/reviews/user/:userId", findReviewsByUser);
  app.get("/api/reviews/movie/:movieId", findReviewsByMovie);
  app.post("/api/reviews", createReview);
  app.put("/api/reviews/:id", updateReview);
  app.delete("/api/reviews/:id", deleteReview);
}

export default ReviewRoutes;
