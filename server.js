const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Import routes
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");

// Use routes
app.use("/auth", authRoutes);
app.use("/", homeRoutes); 

app.get("/", (req, res) => {
  res.send("Welcome to the Library App!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
