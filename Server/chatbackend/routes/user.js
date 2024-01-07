const express = require("express");
const { User, validateNewUser, validateUser } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/all", async (req, res) => {
  let allUsers = await User.find().select("username").sort("asc");
  res.send(allUsers);
});

router.post("/getUserToken", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Exists.");

  let password = req.body.password;
  if (password === null || password.length === 0)
    return res.status(400).send("Invalid Password.");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(400).send("Invalid Password.");

  const token = user.getAuthToken({ _id: user._id });

  res.send(token);
});

router.post("/register", async (req, res) => {
  /**User Request Validation */
  const { error } = validateNewUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /**Check Duplication on Username*/
  let username = await User.findOne({ username: req.body.username });
  if (username) return res.status(400).send("Username Already Exists.");

  /**Check if user's email was already registered in db */
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already Registered.");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  /**Password Encryption*/
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.getAuthToken({ _id: user._id });

  //user.registerToken = token;

  await user.save();

  res.send(token);
});

module.exports = router;
