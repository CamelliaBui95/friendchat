const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require('express');
const httpAuth = require("../middlewares/httpAuth");
const router = express.Router();

router.post('/', httpAuth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    /** Check if user was not already registered */
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email.");
    
    /** Check Password's Validity */
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send("Invalid Password.");

    const token = user.getAuthToken({ _id: user._id, isAuthorized: true });
    
    res.header("x-auth-token", token).send({
      username: user.username,
      email: user.email,
      status: user.status,
      isInPublic: user.isInPublic,
    });
});

const validate = req => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(8).max(50).required(),
  });

  return schema.validate(req);
};

module.exports = router;
