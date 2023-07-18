const express = require("express");
const { User, validateUser } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/all", async (req, res) => {
  let allUsers = await User.find().select("username").sort("asc");
  res.send(allUsers);
});

router.post("/register", async (req, res) => {
  /**User Request Validation */
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /**Check Duplication on Username*/
  let username = await User.findOne({ username: req.body.username });
  if(username) return res.status(400).send("Username Already Exists.");

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

  await user.save();

  const token = user.getAuthToken({ _id: user._id });
  res.send(token);
});

module.exports = router;


