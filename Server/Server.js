require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware to handle Account POST requests
app.post("/register"); //, register);
app.post("/login"); //, login);

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// Commit ID of last saved changes:
// 8b354b558318620ecede6dbd7b45440de76fb889
// Use this code to go back:
// git reset --hard 8b354b558318620ecede6dbd7b45440de76fb889
