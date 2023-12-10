import * as dao from "./dao.js";

function MovieRoutes(app) {
  const findAllMovies = async (req, res) => {
    try {
      const movies = await dao.findAllMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).send("Error occurred while fetching all movies.");
    }
  };

  const findMovieById = async (req, res) => {
    try {
      const id = req.params.id;
      const movie = await dao.findMovieById(id);
      if (!movie) {
        return res.status(404).send("Movie not found.");
      }
      res.json(movie);
    } catch (error) {
      res.status(500).send("Error occurred while fetching movie by ID.");
    }
  };

  const createMovie = async (req, res) => {
    try {
      const {
        user,
        original_title,
        overview,
        original_language,
        poster_path,
        adult,
        release_date,
      } = req.body;

      const movie = {
        user: user,
        original_title: original_title,
        overview: overview,
        original_language: original_language,
        release_date: release_date,
        poster_path: poster_path,
        adult: adult,
      };
      const newMovie = await dao.createMovie(movie);
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).send("Error occurred while creating a movie.");
    }
  };

  const updateMovie = async (req, res) => {
    try {
      const id = req.params.id;
      const movie = req.body;
      const status = await dao.updateMovie(id, movie);
      if (status.modifiedCount === 0) {
        return res.status(404).send("No movie found to update.");
      }
      res.json(status);
    } catch (error) {
      res.status(500).send("Error occurred while updating the movie.");
    }
  };

  const deleteMovie = async (req, res) => {
    try {
      const id = req.params.id;
      const status = await dao.deleteMovie(id);
      if (status.deletedCount === 0) {
        return res.status(404).send("No movie found to delete.");
      }
      res.json(status);
    } catch (error) {
      res.status(500).send("Error occurred while deleting the movie.");
    }
  };

  const findMovieByUser = async (req, res) => {
    try {
      const userId = req.params.userId;

      // Check if userId is undefined or invalid
      if (!userId || typeof userId !== "string" || userId.trim() === "") {
        return res.status(400).send("Invalid or missing user ID.");
      }

      const movies = await dao.findMovieByUser(userId);

      // If no movies are found, you might want to handle that as well
      if (!movies || movies.length === 0) {
        return res.status(404).send("No movies found for the specified user.");
      }

      res.json(movies);
    } catch (error) {
      console.error("Error occurred while fetching movies by user:", error); // Logging the actual error can help in debugging
      res.status(500).send("Error occurred while fetching movies by user.");
    }
  };

  app.get("/api/movies", findAllMovies);
  app.get("/api/movies/:id", findMovieById);
  app.post("/api/movies", createMovie);
  app.put("/api/movies/:id", updateMovie);
  app.delete("/api/movies/:id", deleteMovie);
  app.get("/api/movies/user/:userId", findMovieByUser);
}

export default MovieRoutes;
