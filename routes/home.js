const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const router = express.Router();

const SECRET_KEY = "your_secret_key";

// Middleware to verify the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// /addBook endpoint
router.post("/addBook", authenticateToken, (req, res) => {
    console.log("Received POST request at /addBook");
  const userRole = req.user.role;
  const { bookName, author, publicationYear } = req.body;

  // Check if the user is an admin
  if (userRole !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  // Validate parameters
  if (
    typeof bookName !== "string" ||
    typeof author !== "string" ||
    isNaN(Number(publicationYear))
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Format the new book entry
  const newBook = `${bookName}\n`;

  // Append new book to regularUser.csv
  fs.appendFile("regularUser.csv", newBook, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add book" });
    }
    res.json({ message: "Book added successfully" });
  });
});


// /deleteBook endpoint
router.post('/deleteBook', authenticateToken, (req, res) => {
  const userRole = req.user.role;
  const { bookName } = req.body;

  // Check if the user is an admin
  if (userRole !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Validate parameters
  if (typeof bookName !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Read and filter books
  const regularBooks = fs.readFileSync("regularUser.csv", "utf8").split("\n").filter(Boolean);
  const filteredBooks = regularBooks.filter(b => b.toLowerCase() !== bookName.toLowerCase());

  // Write updated books to file
  fs.writeFile("regularUser.csv", filteredBooks.join("\n"), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete book' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
});


// /home endpoint
router.get("/home", authenticateToken, (req, res) => {
  const userRole = req.user.role;

  const regularBooks = fs
    .readFileSync("regularUser.csv", "utf8")
    .split("\n")
    .filter(Boolean);
  let books = regularBooks;

  if (userRole === "admin") {
    const adminBooks = fs
      .readFileSync("adminUser.csv", "utf8")
      .split("\n")
      .filter(Boolean);
    books = [...books, ...adminBooks];
  }

  res.json({ books });
});

module.exports = router;
