import * as dao from "./dao.js";

function FollowsRoutes(app) {
  const userFollowsUser = async (req, res) => {
    const follower = req.session["currentUser"]._id;
    const followed = req.params["followed"];
    const follows = await dao.userFollowsUser(follower, followed);
    res.json(follows);
  };
  const userUnfollowsUser = async (req, res) => {
    const follower = req.session["currentUser"]._id;
    const followed = req.params["followed"];
    const status = await dao.userUnfollowsUser(follower, followed);
    res.json(status);
  };
  const findFollowersOfUser = async (req, res) => {
    try {
      const followed = req.params["followed"];
      const followers = await dao.findFollowersOfUser(followed);

      if (followers.length === 0) {
        return res.status(204).json({ message: "No followers found" });
      }

      res.json(followers);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const findFollowedUsersByUser = async (req, res) => {
    try {
      const follower = req.params["follower"];
      const followed = await dao.findFollowedUsersByUser(follower);

      if (followed.length === 0) {
        return res.status(204).json({ message: "No followed users found" });
      }

      res.json(followed);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  app.post("/api/users/:followed/follows", userFollowsUser);
  app.delete("/api/users/:followed/follows", userUnfollowsUser);
  app.get("/api/users/:followed/followers", findFollowersOfUser);
  app.get("/api/users/:follower/following", findFollowedUsersByUser);
}

export default FollowsRoutes;
