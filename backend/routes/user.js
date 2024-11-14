const express = require("express");
const router = express.Router();
const user = require("../models/users");
const bcrypt = require("bcrypt");

//register user
router.post("/signup", async (req, res) => {
  try {
    //generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newuser = new user({
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword,
    });
    //saveuser
    const saveduser = await newuser.save();
    res.json(saveduser);
  } catch (err) {
    res.json(err);
  }
});


// login
router.post("/login", async (req, res) => {
  try {
    // find user
    const checkuser = await user.findOne({ username: req.body.username });
    if (!checkuser) {
      return res.status(404).json("User not found. Please register.");
    }
    // validate password
    const validpassword = await bcrypt.compare(req.body.password, checkuser.password);
    if (!validpassword) {
      return res.status(400).json("Invalid password. Please try again.");
    }
    res.status(200).json(checkuser);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
