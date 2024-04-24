require("dotenv").config();
const express = require("express");
const path = require("path");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);
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
// f774fe793192459ed9fe8bccf970105bf715f797
// Use this code to go back:
// git reset --hard f774fe793192459ed9fe8bccf970105bf715f797
