import * as dao from "./dao.js";

function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await dao.findUserById(id);
    res.json(user);
  };
  const findByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };
  const findUserByCredentials = async (req, res) => {
    const { username, password } = req.params;
    const user = await dao.findUserByCredentials(username, password);
    res.json(user);
  };

  const findUsersByRole = async (req, res) => {
    const role = req.params.role;
    const users = await dao.findUsersByRole(role);
    res.json(users);
  };

  const createUser = async (req, res) => {
    try {
      const { username, password, email, role } = req.body; // Using req.body instead of req.params
      const user = await dao.createUser({
        username,
        password,
        email,
        role,
      });
      if (user) {
        const currentUser = user;
        req.session["currentUser"] = currentUser;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" }); // Send appropriate error response
    }
  };

  const updateUser = async (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    const status = await dao.updateUser(id, newUser);
    const currentUser = await dao.findUserById(id);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };
  const updateFirstName = async (req, res) => {
    const id = req.params.id;
    const newFirstName = req.params.newFirstName;
    const status = await dao.updateUser(id, { firstName: newFirstName });
    res.json(status);
  };
  const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await dao.deleteUser(id);
    res.json(status);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      const currentUser = user;
      req.session["currentUser"] = currentUser;
      res.json(user);
    } else {
      res.sendStatus(403);
    }
  };
  const signout = async (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          // handle error case
          res.status(500).send("Error in session destruction");
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(200); // or handle the error case
    }
  };

  //   const signup = async (req, res) => {};
  const account = async (req, res) => {
    const currentUser = req.session["currentUser"];
    res.json(currentUser);
  };

  app.post("/api/users/signout", signout);
  app.post("/api/users/signin", signin);
  app.post("/api/users/account", account);
  app.post("/api/users/signup", createUser);

  app.delete("/api/users/:id", deleteUser);
  app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName);
  app.get("/api/users/role/:role", findUsersByRole);
  app.get("/api/users", findAllUsers); // ADMIN can see all users
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/username/:username", findByUsername);
  app.get("/api/users/credentials/:username/:password", findUserByCredentials);
  app.put("/api/users/:id", updateUser);
}

export default UserRoutes;
