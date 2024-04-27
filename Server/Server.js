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

// Commit ID of last saved changes:
// 8b354b558318620ecede6dbd7b45440de76fb889

// Imported Register and Login from Auth,
// Adjusted Header to include LogInPage route:
// c407637d64ab27ea8a23cbf00c91ac51a9d83c5d

// Added AuthContext, not used yet:
// 290110f0cb9a630e330146e2e319a6a591fb692a

// Use this code to go back:
// git reset --hard COMMITT_ID
