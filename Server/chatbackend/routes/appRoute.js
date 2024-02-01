const { Interest } = require("../models/interest");
const express = require("express");
const httpAuth = require("../middlewares/httpAuth");
const router = express.Router();

router.post("/get-interests-by-category", httpAuth, async (req, res) => {
  if (!req.body.categoryID)
    return res.status(400).send("A valid CategoryId is required.");

  const interests = await Interest.find({
    category: req.body.categoryID,
  }).sort("name");

  res.send(interests);
});

module.exports = router;
