const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Example route
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

// Registration route
app.post("/register", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  res.send(`Registration successful for email/username: ${email}`);
});

// Login route
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  res.send(`Login successful for email/username: ${email}`);
});

// Catch-all route to return the main index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
