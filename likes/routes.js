import * as dao from "./dao.js";

function LikesRoutes(app) {
  const findAllLikes = async (req, res) => {
    const likes = await dao.findAllLikes();
    res.json(likes);
  };
  const createUserLikesMovie = async (req, res) => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const movieTitle = req.params.movieTitle;
    const like = await dao.createUserLikesMovie(userId, movieId, movieTitle);
    res.json(like);
  };
  const deleteUserLikesMovie = async (req, res) => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const like = await dao.deleteUserLikesMovie(userId, movieId);
    res.json(like);
  };
  const findUsersThatLikeMovie = async (req, res) => {
    try {
      const movieId = req.params.movieId;

      if (!movieId) {
        return res.status(400).json({ error: "Movie ID is required" });
      }

      const users = await dao.findUsersThatLikeMovie(movieId);

      if (users.length === 0) {
        return res
          .status(204)
          .json({ message: "No users found liking this movie" });
      }

      res.json(users);
    } catch (error) {
      console.error(`Error in findUsersThatLikeMovie: ${error}`);
      res
        .status(500)
        .json({ error: `Internal server error: ${error.message}` });
    }
  };

  const findMoviesThatUserLikes = async (req, res) => {
    try {
      const userId = req.params.userId;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const movies = await dao.findMoviesThatUserLikes(userId);

      if (movies.length === 0) {
        return res
          .status(204)
          .json({ message: "No movies found liked by this user" });
      }

      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  app.get("/api/likes", findAllLikes);
  app.post(
    "/api/users/:userId/likes/:movieId/:movieTitle",
    createUserLikesMovie
  );
  app.delete("/api/users/:userId/likes/:movieId", deleteUserLikesMovie);
  app.get("/api/likes/:movieId/users", findUsersThatLikeMovie);
  app.get("/api/users/:userId/movies", findMoviesThatUserLikes);
}

export default LikesRoutes;
