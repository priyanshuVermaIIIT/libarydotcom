const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

console.log("auth.js loaded"); // Add this line

const SECRET_KEY = "your_secret_key";

// Sample users data
const users = [
  { username: "admin", password: "adminpass", role: "admin" },
  { username: "user", password: "userpass", role: "regular" },
];

// /login endpoint
router.post("/login", (req, res) => {
  
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

module.exports = router;
