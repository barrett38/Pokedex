require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;
const { register, login } = require("./auth.js");

app.use(express.json());
app.use(cors());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware to handle Account POST requests
app.post("/register", register);
app.post("/login", login);

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// Stopping place:
// 4a8296567e5972178129addcbf642e8a866a9eeb

// Use this code to go back:
// git reset --hard COMMITT_ID
