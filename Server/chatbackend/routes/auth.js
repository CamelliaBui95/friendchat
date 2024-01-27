const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const httpAuth = require("../middlewares/httpAuth");
const router = express.Router();

router.post("/", httpAuth, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /** Check if user was not already registered */
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email.");

  /** Check Password's Validity */
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) return res.status(400).send("Invalid Password.");

  const token = user.getAuthToken({ _id: user._id, isAuthorized: true });

  let status = user.status;
  status = status === "disconnected" ? "online" : status;

  user.status = status;

  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email,
    status: user.status,
    isInPublic: user.isInPublic,
    profile: user.profile
  });

  await user.save();
});

module.exports = router;
